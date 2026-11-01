-- =====================================================================
-- Los Santos à la loupe — Base de données de l'appli communautaire
-- À coller UNE SEULE FOIS dans Supabase : SQL Editor > New query > Run
-- Crée : profils, salons de chat, messages, annonces, signalements
-- + toutes les règles de sécurité (RLS) + anti-spam + temps réel
-- =====================================================================

-- ---------- 1. PROFILS DES MEMBRES ----------
create table if not exists public.profils (
  id uuid primary key references auth.users (id) on delete cascade,
  pseudo text not null unique check (pseudo ~ '^[A-Za-z0-9_\-]{3,20}$'),
  plateforme text not null default 'Non précisé'
    check (plateforme in ('PS5','PS4','Xbox Series','Xbox One','PC','Non précisé')),
  age_confirme boolean not null default false,
  reglement_accepte boolean not null default false,
  role text not null default 'membre' check (role in ('membre','admin')),
  banni boolean not null default false,
  cree_le timestamptz not null default now()
);

-- ---------- 2. SALONS DE CHAT ----------
create table if not exists public.salons (
  id smallserial primary key,
  slug text not null unique,
  nom text not null,
  description text not null default '',
  ordre smallint not null default 0
);

insert into public.salons (slug, nom, description, ordre) values
  ('general',    '💬 Général',         'Discussions libres sur GTA V et GTA Online', 1),
  ('braquages',  '💰 Braquages',       'Préparer et réussir les braquages', 2),
  ('courses',    '🏁 Courses & véhicules', 'Voitures, courses, tuning', 3),
  ('entraide',   '🆘 Entraide',        'Tu bloques sur une mission ? Demande ici', 4),
  ('secrets',    '🔍 Secrets & mystères', 'Easter eggs, théories et découvertes', 5),
  ('hors-sujet', '🎲 Hors-sujet',      'Tout le reste (dans le respect du règlement)', 6)
on conflict (slug) do nothing;

-- ---------- 3. MESSAGES DU CHAT ----------
create table if not exists public.messages (
  id bigserial primary key,
  salon_id smallint not null references public.salons (id) on delete cascade,
  auteur_id uuid not null references public.profils (id) on delete cascade,
  contenu text not null check (char_length(btrim(contenu)) between 1 and 1000),
  masque boolean not null default false,
  cree_le timestamptz not null default now()
);
create index if not exists messages_salon_date on public.messages (salon_id, cree_le desc);

-- ---------- 4. ANNONCES « RECHERCHE D'ACTIVITÉ » ----------
create table if not exists public.annonces (
  id bigserial primary key,
  auteur_id uuid not null references public.profils (id) on delete cascade,
  activite text not null check (char_length(btrim(activite)) between 3 and 80),
  plateforme text not null
    check (plateforme in ('PS5','PS4','Xbox Series','Xbox One','PC')),
  quand text not null check (char_length(btrim(quand)) between 2 and 60),
  places smallint not null default 1 check (places between 1 and 7),
  description text not null default '' check (char_length(description) <= 600),
  statut text not null default 'en_attente'
    check (statut in ('en_attente','publiee','refusee','terminee')),
  cree_le timestamptz not null default now()
);
create index if not exists annonces_statut_date on public.annonces (statut, cree_le desc);

-- ---------- 5. SIGNALEMENTS ----------
create table if not exists public.signalements (
  id bigserial primary key,
  auteur_id uuid not null references public.profils (id) on delete cascade,
  type_cible text not null check (type_cible in ('message','annonce','membre')),
  cible_id text not null,
  raison text not null check (char_length(btrim(raison)) between 3 and 300),
  statut text not null default 'ouvert' check (statut in ('ouvert','traite')),
  cree_le timestamptz not null default now()
);

-- ---------- 6. FONCTIONS UTILITAIRES ----------
create or replace function public.est_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.profils where id = auth.uid() and role = 'admin' and not banni);
$$;

create or replace function public.est_membre_actif() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.profils
                 where id = auth.uid() and not banni and age_confirme and reglement_accepte);
$$;

-- Création automatique du profil à l'inscription (pseudo, âge, règlement)
create or replace function public.creer_profil() returns trigger
language plpgsql security definer set search_path = public as $$
declare
  m jsonb := coalesce(new.raw_user_meta_data, '{}'::jsonb);
begin
  if coalesce((m->>'age_confirme')::boolean, false) is not true then
    raise exception 'Inscription réservée aux 16 ans et plus.';
  end if;
  if coalesce((m->>'reglement_accepte')::boolean, false) is not true then
    raise exception 'Le règlement doit être accepté.';
  end if;
  insert into public.profils (id, pseudo, plateforme, age_confirme, reglement_accepte)
  values (new.id, m->>'pseudo', coalesce(m->>'plateforme', 'Non précisé'), true, true);
  return new;
end;
$$;

drop trigger if exists a_l_inscription on auth.users;
create trigger a_l_inscription after insert on auth.users
  for each row execute function public.creer_profil();

-- Un membre ne peut changer que son pseudo et sa plateforme (pas son rôle, ni son bannissement)
create or replace function public.proteger_profil() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  -- auth.uid() vide = commande lancée par toi dans le SQL Editor de Supabase : autorisée
  if auth.uid() is not null and not public.est_admin() then
    new.role := old.role;
    new.banni := old.banni;
    new.age_confirme := old.age_confirme;
    new.reglement_accepte := old.reglement_accepte;
  end if;
  return new;
end;
$$;
drop trigger if exists proteger_profil on public.profils;
create trigger proteger_profil before update on public.profils
  for each row execute function public.proteger_profil();

-- Anti-spam : 1 message toutes les 3 secondes, 3 annonces en attente maximum
create or replace function public.anti_spam_message() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if exists (select 1 from public.messages
             where auteur_id = new.auteur_id and cree_le > now() - interval '3 seconds') then
    raise exception 'Doucement ! Attends quelques secondes entre deux messages.';
  end if;
  return new;
end;
$$;
drop trigger if exists anti_spam_message on public.messages;
create trigger anti_spam_message before insert on public.messages
  for each row execute function public.anti_spam_message();

create or replace function public.limite_annonces() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if (select count(*) from public.annonces
      where auteur_id = new.auteur_id and statut = 'en_attente') >= 3 then
    raise exception 'Tu as déjà 3 annonces en attente de validation.';
  end if;
  new.statut := 'en_attente';  -- une nouvelle annonce passe TOUJOURS par la validation
  return new;
end;
$$;
drop trigger if exists limite_annonces on public.annonces;
create trigger limite_annonces before insert on public.annonces
  for each row execute function public.limite_annonces();

-- ---------- 7. SÉCURITÉ (RLS) ----------
alter table public.profils      enable row level security;
alter table public.salons       enable row level security;
alter table public.messages     enable row level security;
alter table public.annonces     enable row level security;
alter table public.signalements enable row level security;

-- Profils : visibles par les membres connectés ; chacun modifie le sien ; l'admin modifie tout
drop policy if exists profils_lire on public.profils;
create policy profils_lire on public.profils for select to authenticated using (true);
drop policy if exists profils_modifier on public.profils;
create policy profils_modifier on public.profils for update to authenticated
  using (id = auth.uid() or public.est_admin()) with check (id = auth.uid() or public.est_admin());

-- Salons : lisibles par les membres connectés
drop policy if exists salons_lire on public.salons;
create policy salons_lire on public.salons for select to authenticated using (true);

-- Messages
drop policy if exists messages_lire on public.messages;
create policy messages_lire on public.messages for select to authenticated
  using (not masque or public.est_admin());
drop policy if exists messages_ecrire on public.messages;
create policy messages_ecrire on public.messages for insert to authenticated
  with check (auteur_id = auth.uid() and public.est_membre_actif() and not masque);
drop policy if exists messages_moderer on public.messages;
create policy messages_moderer on public.messages for update to authenticated
  using (public.est_admin()) with check (public.est_admin());
drop policy if exists messages_supprimer on public.messages;
create policy messages_supprimer on public.messages for delete to authenticated
  using (auteur_id = auth.uid() or public.est_admin());

-- Annonces : publiées visibles par tous les membres ; l'auteur voit les siennes ; l'admin voit tout
drop policy if exists annonces_lire on public.annonces;
create policy annonces_lire on public.annonces for select to authenticated
  using (statut = 'publiee' or auteur_id = auth.uid() or public.est_admin());
drop policy if exists annonces_ecrire on public.annonces;
create policy annonces_ecrire on public.annonces for insert to authenticated
  with check (auteur_id = auth.uid() and public.est_membre_actif());
drop policy if exists annonces_moderer on public.annonces;
create policy annonces_moderer on public.annonces for update to authenticated
  using (public.est_admin()) with check (public.est_admin());
drop policy if exists annonces_supprimer on public.annonces;
create policy annonces_supprimer on public.annonces for delete to authenticated
  using (auteur_id = auth.uid() or public.est_admin());

-- Signalements : chacun crée et voit les siens ; l'admin voit et traite tout
drop policy if exists signalements_ecrire on public.signalements;
create policy signalements_ecrire on public.signalements for insert to authenticated
  with check (auteur_id = auth.uid() and public.est_membre_actif());
drop policy if exists signalements_lire on public.signalements;
create policy signalements_lire on public.signalements for select to authenticated
  using (auteur_id = auth.uid() or public.est_admin());
drop policy if exists signalements_traiter on public.signalements;
create policy signalements_traiter on public.signalements for update to authenticated
  using (public.est_admin()) with check (public.est_admin());

-- ---------- 8. TEMPS RÉEL (le chat se met à jour tout seul) ----------
do $$
begin
  alter publication supabase_realtime add table public.messages;
exception when duplicate_object then null;
end $$;

-- =====================================================================
-- APRÈS TA PROPRE INSCRIPTION SUR L'APPLI, pour devenir administrateur :
-- remplace TON_PSEUDO puis exécute cette ligne seule :
--   update public.profils set role = 'admin' where pseudo = 'TON_PSEUDO';
-- =====================================================================
