// =====================================================
// Appli communautaire « Los Santos à la loupe »
// Inscription 16+, chat par salons en temps réel, recherche d'activité
// (annonces validées), profil, espace admin. Données : Supabase.
// =====================================================

const CFG = window.LSL_CONFIG || {};
const PLATEFORMES = ["PS5", "PS4", "Xbox Series", "Xbox One", "PC"];
const ACTIVITES = ["Braquage Cayo Perico", "Braquage du Casino", "Doomsday Heist", "Braquages classiques", "Courses", "Business / ventes", "Missions de contact", "Mode Adversaire", "Exploration / secrets", "Autre"];
const PSEUDO_RE = /^[A-Za-z0-9_-]{3,20}$/;

const $ = s => document.querySelector(s);
const app = $("#c-app");
const esc = t => String(t ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const heure = d => new Date(d).toLocaleString("fr-BE", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });

let sb = null, session = null, profil = null, salons = [], salonActif = null, canal = null, onglet = "chat";

// ---------- Petits outils ----------
function toast(texte, erreur = false) {
  const t = $("#c-toast");
  t.textContent = texte;
  t.classList.toggle("erreur", erreur);
  t.hidden = false;
  clearTimeout(toast._t);
  toast._t = setTimeout(() => { t.hidden = true; }, 4500);
}

function msgErreur(e) {
  const m = (e && (e.message || e.error_description || String(e))) || "Erreur inconnue";
  if (/Database error saving new user/i.test(m)) return "Inscription impossible : ce pseudo est peut-être déjà pris. Essaie-en un autre.";
  if (/already registered|already been registered/i.test(m)) return "Cette adresse e-mail a déjà un compte. Connecte-toi.";
  if (/Invalid login credentials/i.test(m)) return "E-mail ou mot de passe incorrect.";
  if (/Email not confirmed/i.test(m)) return "Confirme d'abord ton adresse e-mail (clique sur le lien reçu par mail).";
  if (/row-level security|violates row-level/i.test(m)) return "Action non autorisée.";
  if (/rate limit|too many/i.test(m)) return "Trop de tentatives. Réessaie dans quelques minutes.";
  if (/Failed to fetch|NetworkError/i.test(m)) return "Pas de connexion internet ou serveur injoignable.";
  return m;
}

function centre(html) {
  $("#c-onglets").hidden = true;
  app.innerHTML = `<div class="c-centre">${html}</div>`;
}

// ---------- Démarrage ----------
async function init() {
  if (!CFG.SUPABASE_URL || !CFG.SUPABASE_ANON_KEY) {
    centre(`
      <div class="bloc c-carte">
        <h1>Communauté</h1>
        <p><strong>La communauté arrive bientôt !</strong></p>
        <p>Bientôt ici : un chat entre fans de GTA, organisé par salons, et un espace <strong>Recherche d'activité</strong> pour trouver des coéquipiers pour tes braquages, courses et missions.</p>
        <a class="btn btn-neon" href="index.html">Retour au site</a>
      </div>`);
    return;
  }
  if (!window.supabase || !window.supabase.createClient) {
    centre(`<div class="bloc c-carte"><h2>Impossible de charger l'appli</h2><p>Vérifie ta connexion internet puis recharge la page.</p></div>`);
    return;
  }
  sb = window.supabase.createClient(CFG.SUPABASE_URL, CFG.SUPABASE_ANON_KEY);
  const { data } = await sb.auth.getSession();
  session = data.session;
  sb.auth.onAuthStateChange((_evt, s) => {
    const avant = session?.user?.id || null;
    session = s;
    if ((s?.user?.id || null) !== avant) demarrer();
  });
  demarrer();
}

async function demarrer() {
  quitterSalon();
  $("#c-toast").hidden = true;
  $("#c-qui").textContent = "";
  if (!session) { onglet = "chat"; salonActif = null; profil = null; ecranConnexion(); return; }
  const { data, error } = await sb.from("profils").select("*").eq("id", session.user.id).maybeSingle();
  if (error || !data) {
    centre(`<div class="bloc c-carte"><h2>Profil introuvable</h2><p>${esc(error ? msgErreur(error) : "Ton profil n'a pas été créé.")}</p><button class="btn btn-neon" id="c-deco">Se déconnecter</button></div>`);
    $("#c-deco").onclick = () => sb.auth.signOut();
    return;
  }
  profil = data;
  if (profil.banni) {
    centre(`<div class="bloc c-carte"><h2>Compte suspendu</h2><p>Ton compte a été suspendu par la modération pour non-respect du règlement.</p><button class="btn btn-neon" id="c-deco">Se déconnecter</button></div>`);
    $("#c-deco").onclick = () => sb.auth.signOut();
    return;
  }
  $("#c-qui").textContent = profil.pseudo;
  const { data: s } = await sb.from("salons").select("*").order("ordre");
  salons = s || [];
  salonActif = salonActif && salons.find(x => x.id === salonActif.id) ? salonActif : salons[0] || null;
  afficherOnglets();
  ouvrir(onglet);
}

// ---------- Connexion / inscription ----------
function ecranConnexion(mode = "connexion") {
  const optPf = ['<option value="Non précisé">Plateforme (facultatif)</option>', ...PLATEFORMES.map(p => `<option>${p}</option>`)].join("");
  centre(`
    <div class="bloc c-carte">
      <h1>Communauté</h1>
      <p>Discute avec d'autres fans de GTA et trouve des coéquipiers. Réservé aux membres inscrits de <strong>16 ans et plus</strong>.</p>
      <div class="onglets" role="tablist">
        <button class="onglet ${mode === "connexion" ? "actif" : ""}" data-mode="connexion" role="tab">Connexion</button>
        <button class="onglet ${mode === "inscription" ? "actif" : ""}" data-mode="inscription" role="tab">Créer un compte</button>
      </div>
      ${mode === "connexion" ? `
      <form class="form" id="f-connexion">
        <label>E-mail<input name="email" type="email" required autocomplete="email"></label>
        <label>Mot de passe<input name="mdp" type="password" required autocomplete="current-password"></label>
        <div id="f-msg"></div>
        <button class="btn btn-degrade" type="submit">Se connecter</button>
      </form>` : `
      <form class="form" id="f-inscription" novalidate>
        <label>Pseudo<input name="pseudo" required maxlength="20" autocomplete="nickname" placeholder="3 à 20 caractères : lettres, chiffres, _ ou -"></label>
        <label>Plateforme<select name="plateforme">${optPf}</select></label>
        <label>E-mail<input name="email" type="email" required autocomplete="email"></label>
        <label>Mot de passe<input name="mdp" type="password" required minlength="8" autocomplete="new-password" placeholder="8 caractères minimum"></label>
        <label class="case"><input type="checkbox" name="age"> J'ai 16 ans ou plus.</label>
        <label class="case"><input type="checkbox" name="regles"> J'accepte le <a href="#" id="lien-regles">règlement de la communauté</a> et les <a href="index.html#/mentions" target="_blank">mentions légales</a>.</label>
        <div id="f-msg"></div>
        <button class="btn btn-degrade" type="submit">Créer mon compte</button>
      </form>`}
    </div>`);
  app.querySelectorAll(".onglet").forEach(b => b.onclick = () => ecranConnexion(b.dataset.mode));
  const msg = t => { $("#f-msg").innerHTML = t; };

  if (mode === "connexion") {
    $("#f-connexion").onsubmit = async e => {
      e.preventDefault();
      const f = e.target, b = f.querySelector("button[type=submit]");
      b.disabled = true; msg("");
      const { error } = await sb.auth.signInWithPassword({ email: f.email.value.trim(), password: f.mdp.value });
      b.disabled = false;
      if (error) msg(`<p class="erreur">${esc(msgErreur(error))}</p>`);
    };
  } else {
    $("#lien-regles").onclick = e => { e.preventDefault(); $("#c-reglement").showModal(); };
    $("#f-inscription").onsubmit = async e => {
      e.preventDefault();
      const f = e.target, b = f.querySelector("button[type=submit]");
      const pseudo = f.pseudo.value.trim();
      const pbs = [];
      if (!PSEUDO_RE.test(pseudo)) pbs.push("pseudo de 3 à 20 caractères (lettres sans accent, chiffres, _ ou -)");
      if (!/^\S+@\S+\.\S+$/.test(f.email.value.trim())) pbs.push("e-mail valide");
      if (f.mdp.value.length < 8) pbs.push("mot de passe de 8 caractères minimum");
      if (!f.age.checked) pbs.push("confirmer avoir 16 ans ou plus");
      if (!f.regles.checked) pbs.push("accepter le règlement");
      if (pbs.length) { msg(`<p class="erreur">Il faut : ${pbs.join(", ")}.</p>`); return; }
      b.disabled = true; msg("");
      const { data, error } = await sb.auth.signUp({
        email: f.email.value.trim(),
        password: f.mdp.value,
        options: {
          emailRedirectTo: location.origin + location.pathname,
          data: { pseudo, plateforme: f.plateforme.value, age_confirme: true, reglement_accepte: true }
        }
      });
      b.disabled = false;
      if (error) { msg(`<p class="erreur">${esc(msgErreur(error))}</p>`); return; }
      if (!data.session) {
        centre(`<div class="bloc c-carte"><h2>📧 Vérifie ta boîte mail</h2><p>Ton compte <strong>${esc(pseudo)}</strong> est créé. Clique sur le lien reçu par e-mail pour l'activer (pense à regarder dans les spams), puis reviens te connecter.</p><button class="btn btn-neon" id="c-retour">Aller à la connexion</button></div>`);
        $("#c-retour").onclick = () => ecranConnexion("connexion");
      }
    };
  }
}

// ---------- Navigation de l'appli ----------
function afficherOnglets() {
  const items = [["chat", "💬", "Chat"], ["activites", "🎯", "Activités"], ["profil", "👤", "Profil"]];
  if (profil.role === "admin") items.push(["admin", "🛡️", "Modération"]);
  const nav = $("#c-onglets");
  nav.innerHTML = items.map(([k, i, n]) => `<button data-onglet="${k}" class="${k === onglet ? "actif" : ""}"><span aria-hidden="true">${i}</span>${n}</button>`).join("");
  nav.hidden = false;
  nav.querySelectorAll("button").forEach(b => b.onclick = () => ouvrir(b.dataset.onglet));
}

function ouvrir(k) {
  if (k === "admin" && profil.role !== "admin") k = "chat";
  onglet = k;
  $("#c-onglets").querySelectorAll("button").forEach(b => b.classList.toggle("actif", b.dataset.onglet === k));
  if (k !== "chat") quitterSalon();
  ({ chat: vueChat, activites: vueActivites, profil: vueProfil, admin: vueAdmin })[k]();
}

// ---------- CHAT ----------
function quitterSalon() {
  if (canal && sb) { sb.removeChannel(canal); }
  canal = null;
}

function vueChat(prefill = "") {
  app.innerHTML = `
    <div class="c-chat">
      <div class="c-salons" role="tablist" aria-label="Salons">
        ${salons.map(s => `<button class="c-salon ${salonActif && s.id === salonActif.id ? "actif" : ""}" data-id="${s.id}" title="${esc(s.description)}">${esc(s.nom)}</button>`).join("")}
      </div>
      <p class="note c-salon-desc">${esc(salonActif?.description || "")}</p>
      <div class="c-fil" id="c-fil"><p class="note">Chargement des messages…</p></div>
      <form class="c-envoi" id="c-envoi">
        <input name="texte" maxlength="1000" autocomplete="off" placeholder="Écris un message (respecte le règlement)" aria-label="Message">
        <button class="btn btn-degrade" type="submit">Envoyer</button>
      </form>
    </div>`;
  app.querySelectorAll(".c-salon").forEach(b => b.onclick = () => {
    salonActif = salons.find(s => String(s.id) === b.dataset.id);
    vueChat();
  });
  const actif = app.querySelector(".c-salon.actif");
  if (actif && actif.scrollIntoView) actif.scrollIntoView({ inline: "center", block: "nearest" });
  const form = $("#c-envoi");
  if (prefill) { form.texte.value = prefill; form.texte.focus(); }
  form.onsubmit = async e => {
    e.preventDefault();
    const texte = form.texte.value.trim();
    if (!texte || !salonActif) return;
    const b = form.querySelector("button"); b.disabled = true;
    const { error } = await sb.from("messages").insert({ salon_id: salonActif.id, auteur_id: profil.id, contenu: texte });
    b.disabled = false;
    if (error) { toast(msgErreur(error), true); return; }
    form.texte.value = "";
    chargerMessages(true);
  };
  if (!salonActif) { $("#c-fil").innerHTML = `<p class="vide">Aucun salon disponible.</p>`; return; }
  chargerMessages(true);
  quitterSalon();
  const id = salonActif.id;
  canal = sb.channel("salon-" + id)
    .on("postgres_changes", { event: "*", schema: "public", table: "messages", filter: "salon_id=eq." + id }, () => chargerMessages(false))
    .subscribe();
}

async function chargerMessages(versLeBas) {
  if (!salonActif) return;
  const fil = $("#c-fil");
  if (!fil) return;
  const id = salonActif.id;
  const { data, error } = await sb.from("messages")
    .select("id, contenu, cree_le, auteur_id, masque, profils(pseudo, plateforme)")
    .eq("salon_id", id).order("cree_le", { ascending: false }).limit(60);
  if (!salonActif || salonActif.id !== id || !$("#c-fil")) return;
  if (error) { fil.innerHTML = `<p class="erreur">${esc(msgErreur(error))}</p>`; return; }
  const enBas = fil.scrollHeight - fil.scrollTop - fil.clientHeight < 80;
  const liste = (data || []).slice().reverse();
  fil.innerHTML = liste.length ? liste.map(m => {
    const moi = m.auteur_id === profil.id, admin = profil.role === "admin";
    return `
    <div class="c-msg ${moi ? "moi" : ""} ${m.masque ? "masque" : ""}" data-id="${m.id}">
      <div class="c-msg-tete">
        <strong>${esc(m.profils?.pseudo || "Membre")}</strong>
        ${m.profils?.plateforme && m.profils.plateforme !== "Non précisé" ? `<span class="pastille">${esc(m.profils.plateforme)}</span>` : ""}
        <time>${heure(m.cree_le)}</time>
        ${m.masque ? `<span class="statut rum">Masqué</span>` : ""}
      </div>
      <p>${esc(m.contenu)}</p>
      <div class="c-msg-actions">
        ${!moi ? `<button data-act="signaler" title="Signaler ce message">🚩 Signaler</button>` : ""}
        ${admin ? `<button data-act="${m.masque ? "afficher" : "masquer"}">${m.masque ? "👁️ Réafficher" : "🙈 Masquer"}</button>` : ""}
        ${moi || admin ? `<button data-act="supprimer">🗑️ Supprimer</button>` : ""}
      </div>
    </div>`;
  }).join("") : `<p class="vide">Aucun message pour l'instant. Lance la discussion !</p>`;
  fil.querySelectorAll(".c-msg-actions button").forEach(b => b.onclick = () => actionMessage(b.dataset.act, b.closest(".c-msg").dataset.id));
  if (versLeBas || enBas) fil.scrollTop = fil.scrollHeight;
}

async function actionMessage(act, id) {
  if (act === "signaler") return signaler("message", id);
  if (act === "supprimer" && !confirm("Supprimer ce message ?")) return;
  const q = act === "supprimer"
    ? sb.from("messages").delete().eq("id", id)
    : sb.from("messages").update({ masque: act === "masquer" }).eq("id", id);
  const { error } = await q;
  if (error) toast(msgErreur(error), true);
  else { toast(act === "supprimer" ? "Message supprimé." : act === "masquer" ? "Message masqué." : "Message réaffiché."); chargerMessages(false); }
}

async function signaler(type, cible) {
  const raison = prompt("Pourquoi signales-tu ce contenu ? (insulte, spam, triche, contenu choquant…)");
  if (raison === null) return;
  if (raison.trim().length < 3) { toast("Explique en quelques mots, s'il te plaît.", true); return; }
  const { error } = await sb.from("signalements").insert({ auteur_id: profil.id, type_cible: type, cible_id: String(cible), raison: raison.trim().slice(0, 300) });
  if (error) toast(msgErreur(error), true);
  else toast("Merci, ton signalement a été envoyé à la modération.");
}

// ---------- RECHERCHE D'ACTIVITÉ ----------
async function vueActivites() {
  app.innerHTML = `
    <div class="c-page">
      <div class="c-titre-ligne">
        <h1>Recherche d'activité</h1>
        <button class="btn btn-degrade" id="btn-annonce">+ Publier une annonce</button>
      </div>
      <p>Trouve des coéquipiers pour tes braquages, courses et missions. Les annonces sont vérifiées par la modération avant publication.</p>
      <div id="zone-form"></div>
      <div class="filtres c-filtres">
        <select id="a-pf"><option value="">Toutes plateformes</option>${PLATEFORMES.map(p => `<option ${p === profil.plateforme ? "selected" : ""}>${p}</option>`).join("")}</select>
        <select id="a-act"><option value="">Toutes activités</option>${ACTIVITES.map(a => `<option>${a}</option>`).join("")}</select>
      </div>
      <div class="grille" id="a-liste"><p class="note">Chargement…</p></div>
    </div>`;
  $("#btn-annonce").onclick = formulaireAnnonce;
  $("#a-pf").onchange = chargerAnnonces;
  $("#a-act").onchange = chargerAnnonces;
  chargerAnnonces();
}

function formulaireAnnonce() {
  const z = $("#zone-form");
  if (z.innerHTML) { z.innerHTML = ""; return; }
  z.innerHTML = `
    <form class="form bloc" id="f-annonce" novalidate>
      <h3>Nouvelle annonce</h3>
      <label>Activité<input name="activite" list="liste-activites" maxlength="80" required placeholder="Ex : Braquage Cayo Perico"></label>
      <datalist id="liste-activites">${ACTIVITES.map(a => `<option value="${a}">`).join("")}</datalist>
      <label>Plateforme<select name="plateforme" required>${PLATEFORMES.map(p => `<option ${p === profil.plateforme ? "selected" : ""}>${p}</option>`).join("")}</select></label>
      <label>Quand ?<input name="quand" maxlength="60" required placeholder="Ex : ce soir 21h, samedi après-midi…"></label>
      <label>Joueurs recherchés<input name="places" type="number" min="1" max="7" value="1" required></label>
      <label>Détails (facultatif)<textarea name="description" maxlength="600" rows="3" placeholder="Ton niveau, ce que tu as déjà fait, micro ou pas…"></textarea></label>
      <p class="note">⚠️ Ne mets pas ton numéro, ton adresse ni d'autres infos personnelles.</p>
      <div id="fa-msg"></div>
      <button class="btn btn-degrade" type="submit">Envoyer pour validation</button>
    </form>`;
  $("#f-annonce").onsubmit = async e => {
    e.preventDefault();
    const f = e.target;
    const v = { activite: f.activite.value.trim(), plateforme: f.plateforme.value, quand: f.quand.value.trim(), places: parseInt(f.places.value, 10), description: f.description.value.trim() };
    const pbs = [];
    if (v.activite.length < 3) pbs.push("l'activité");
    if (v.quand.length < 2) pbs.push("le moment");
    if (!(v.places >= 1 && v.places <= 7)) pbs.push("un nombre de joueurs entre 1 et 7");
    if (pbs.length) { $("#fa-msg").innerHTML = `<p class="erreur">À compléter : ${pbs.join(", ")}.</p>`; return; }
    const b = f.querySelector("button[type=submit]"); b.disabled = true;
    const { error } = await sb.from("annonces").insert({ ...v, auteur_id: profil.id });
    b.disabled = false;
    if (error) { $("#fa-msg").innerHTML = `<p class="erreur">${esc(msgErreur(error))}</p>`; return; }
    $("#zone-form").innerHTML = `<div class="succes">✅ Annonce envoyée ! Elle sera visible dès qu'elle aura été validée. Tu peux suivre son statut dans l'onglet Profil.</div>`;
  };
}

async function chargerAnnonces() {
  const pf = $("#a-pf").value, act = $("#a-act").value;
  let q = sb.from("annonces").select("*, profils(pseudo)").eq("statut", "publiee").order("cree_le", { ascending: false }).limit(50);
  if (pf) q = q.eq("plateforme", pf);
  const { data, error } = await q;
  const liste = $("#a-liste");
  if (!liste) return;
  if (error) { liste.innerHTML = `<p class="erreur">${esc(msgErreur(error))}</p>`; return; }
  const res = (data || []).filter(a => !act || a.activite.toLowerCase().includes(act.toLowerCase()));
  liste.innerHTML = res.length ? res.map(a => carteAnnonce(a, true)).join("")
    : `<p class="vide">${pf || act ? `Aucune annonce${pf ? " sur " + esc(pf) : ""}${act ? " pour « " + esc(act) + " »" : ""}. Essaie « Toutes plateformes » / « Toutes activités ».` : "Aucune annonce pour l'instant. Publie la première !"}</p>`;
  liste.querySelectorAll("[data-repondre]").forEach(b => b.onclick = () => {
    const sal = salons.find(s => s.slug === "entraide") || salons[0];
    salonActif = sal; onglet = "chat";
    $("#c-onglets").querySelectorAll("button").forEach(x => x.classList.toggle("actif", x.dataset.onglet === "chat"));
    vueChat(`@${b.dataset.repondre} `);
  });
  liste.querySelectorAll("[data-signaler]").forEach(b => b.onclick = () => signaler("annonce", b.dataset.signaler));
}

function carteAnnonce(a, actions) {
  const moi = a.auteur_id === profil.id;
  return `
  <div class="bloc c-annonce">
    <div class="meta"><span class="pastille">${esc(a.plateforme)}</span><span class="pastille">👥 ${a.places} joueur${a.places > 1 ? "s" : ""}</span></div>
    <h3>${esc(a.activite)}</h3>
    <p><strong>🕒 ${esc(a.quand)}</strong></p>
    ${a.description ? `<p>${esc(a.description)}</p>` : ""}
    <p class="note">Par <strong>${esc(a.profils?.pseudo || "Membre")}</strong> · ${heure(a.cree_le)}</p>
    ${actions && !moi ? `<div class="c-msg-actions"><button data-repondre="${esc(a.profils?.pseudo || "")}">💬 Répondre dans le chat</button><button data-signaler="${a.id}">🚩 Signaler</button></div>` : ""}
  </div>`;
}

// ---------- PROFIL ----------
async function vueProfil() {
  app.innerHTML = `
    <div class="c-page">
      <h1>Mon profil</h1>
      <div class="bloc">
        <p><strong>Pseudo :</strong> ${esc(profil.pseudo)} ${profil.role === "admin" ? '<span class="statut ok">Admin</span>' : ""}</p>
        <form class="form" id="f-profil">
          <label>Plateforme<select name="plateforme">${["Non précisé", ...PLATEFORMES].map(p => `<option ${p === profil.plateforme ? "selected" : ""}>${p}</option>`).join("")}</select></label>
          <button class="btn btn-neon" type="submit">Enregistrer</button>
        </form>
      </div>
      <div class="bloc">
        <h3>Mes annonces</h3>
        <div id="mes-annonces"><p class="note">Chargement…</p></div>
      </div>
      <div class="bloc">
        <p><a href="#" id="voir-regles">📜 Règlement de la communauté</a></p>
        <p><a href="index.html#/mentions">⚖️ Mentions légales et données personnelles</a></p>
        <button class="btn btn-plein" id="c-deco">Se déconnecter</button>
      </div>
    </div>`;
  $("#voir-regles").onclick = e => { e.preventDefault(); $("#c-reglement").showModal(); };
  $("#c-deco").onclick = () => sb.auth.signOut();
  $("#f-profil").onsubmit = async e => {
    e.preventDefault();
    const pf = e.target.plateforme.value;
    const { error } = await sb.from("profils").update({ plateforme: pf }).eq("id", profil.id);
    if (error) toast(msgErreur(error), true); else { profil.plateforme = pf; toast("Profil enregistré."); }
  };
  const { data, error } = await sb.from("annonces").select("*, profils(pseudo)").eq("auteur_id", profil.id).order("cree_le", { ascending: false });
  const z = $("#mes-annonces");
  if (!z) return;
  if (error) { z.innerHTML = `<p class="erreur">${esc(msgErreur(error))}</p>`; return; }
  const ST = { en_attente: ["wait", "En attente de validation"], publiee: ["ok", "Publiée"], refusee: ["rum", "Refusée"], terminee: ["theo", "Terminée"] };
  z.innerHTML = (data || []).length ? data.map(a => `
    <div class="c-ligne">
      <div><strong>${esc(a.activite)}</strong> · ${esc(a.plateforme)} · ${esc(a.quand)}<br><span class="statut ${ST[a.statut][0]}">${ST[a.statut][1]}</span></div>
      <button class="btn-lien" data-suppr="${a.id}">🗑️ Supprimer</button>
    </div>`).join("") : `<p class="vide">Tu n'as encore publié aucune annonce.</p>`;
  z.querySelectorAll("[data-suppr]").forEach(b => b.onclick = async () => {
    if (!confirm("Supprimer cette annonce ?")) return;
    const { error } = await sb.from("annonces").delete().eq("id", b.dataset.suppr);
    if (error) toast(msgErreur(error), true); else { toast("Annonce supprimée."); vueProfil(); }
  });
}

// ---------- MODÉRATION (admin) ----------
async function vueAdmin() {
  app.innerHTML = `
    <div class="c-page">
      <h1>Modération</h1>
      <div class="bloc"><h3>Annonces à valider</h3><div id="ad-annonces"><p class="note">Chargement…</p></div></div>
      <div class="bloc"><h3>Signalements ouverts</h3><div id="ad-signal"><p class="note">Chargement…</p></div></div>
      <div class="bloc"><h3>Membres suspendus</h3><div id="ad-bannis"><p class="note">Chargement…</p></div></div>
    </div>`;
  // Annonces en attente
  const { data: ann } = await sb.from("annonces").select("*, profils(pseudo)").eq("statut", "en_attente").order("cree_le");
  const za = $("#ad-annonces"); if (!za) return;
  za.innerHTML = (ann || []).length ? ann.map(a => `
    <div class="c-modo">${carteAnnonce(a, false)}
      <div class="c-msg-actions"><button data-statut="publiee" data-id="${a.id}">✅ Publier</button><button data-statut="refusee" data-id="${a.id}">❌ Refuser</button></div>
    </div>`).join("") : `<p class="vide">Aucune annonce en attente. 👍</p>`;
  za.querySelectorAll("[data-statut]").forEach(b => b.onclick = async () => {
    const { error } = await sb.from("annonces").update({ statut: b.dataset.statut }).eq("id", b.dataset.id);
    if (error) toast(msgErreur(error), true); else { toast(b.dataset.statut === "publiee" ? "Annonce publiée." : "Annonce refusée."); vueAdmin(); }
  });

  // Signalements
  const { data: sig } = await sb.from("signalements").select("*, profils(pseudo)").eq("statut", "ouvert").order("cree_le");
  const zs = $("#ad-signal"); if (!zs) return;
  const blocs = [];
  for (const s of sig || []) {
    let cible = "", auteurCible = null;
    if (s.type_cible === "message") {
      const { data: m } = await sb.from("messages").select("id, contenu, auteur_id, masque, profils(pseudo)").eq("id", s.cible_id).maybeSingle();
      if (m) { auteurCible = m.auteur_id; cible = `<blockquote>« ${esc(m.contenu)} »<br><small>— ${esc(m.profils?.pseudo || "?")}${m.masque ? " · déjà masqué" : ""}</small></blockquote>`; }
      else cible = `<p class="note">Message déjà supprimé.</p>`;
    } else if (s.type_cible === "annonce") {
      const { data: a } = await sb.from("annonces").select("*, profils(pseudo)").eq("id", s.cible_id).maybeSingle();
      if (a) { auteurCible = a.auteur_id; cible = `<blockquote>${esc(a.activite)} — ${esc(a.description)}<br><small>— ${esc(a.profils?.pseudo || "?")}</small></blockquote>`; }
      else cible = `<p class="note">Annonce déjà supprimée.</p>`;
    } else {
      auteurCible = s.cible_id;
      cible = `<p class="note">Signalement d'un membre.</p>`;
    }
    blocs.push(`
      <div class="c-modo">
        <p><span class="pastille">${esc(s.type_cible)}</span> signalé par <strong>${esc(s.profils?.pseudo || "?")}</strong> · ${heure(s.cree_le)}</p>
        <p>Raison : <em>${esc(s.raison)}</em></p>
        ${cible}
        <div class="c-msg-actions">
          ${s.type_cible === "message" ? `<button data-masquer="${esc(s.cible_id)}">🙈 Masquer le message</button>` : ""}
          ${s.type_cible === "annonce" ? `<button data-refuser="${esc(s.cible_id)}">❌ Retirer l'annonce</button>` : ""}
          ${auteurCible && auteurCible !== profil.id ? `<button data-bannir="${esc(auteurCible)}">⛔ Suspendre l'auteur</button>` : ""}
          <button data-traite="${s.id}">✔️ Marquer traité</button>
        </div>
      </div>`);
  }
  zs.innerHTML = blocs.length ? blocs.join("") : `<p class="vide">Aucun signalement ouvert. 👍</p>`;
  const go = async (q, ok) => { const { error } = await q; if (error) toast(msgErreur(error), true); else { toast(ok); vueAdmin(); } };
  zs.querySelectorAll("[data-masquer]").forEach(b => b.onclick = () => go(sb.from("messages").update({ masque: true }).eq("id", b.dataset.masquer), "Message masqué."));
  zs.querySelectorAll("[data-refuser]").forEach(b => b.onclick = () => go(sb.from("annonces").update({ statut: "refusee" }).eq("id", b.dataset.refuser), "Annonce retirée."));
  zs.querySelectorAll("[data-bannir]").forEach(b => b.onclick = () => { if (confirm("Suspendre ce membre ? Il ne pourra plus rien publier.")) go(sb.from("profils").update({ banni: true }).eq("id", b.dataset.bannir), "Membre suspendu."); });
  zs.querySelectorAll("[data-traite]").forEach(b => b.onclick = () => go(sb.from("signalements").update({ statut: "traite" }).eq("id", b.dataset.traite), "Signalement traité."));

  // Membres suspendus
  const { data: ban } = await sb.from("profils").select("id, pseudo").eq("banni", true).order("pseudo");
  const zb = $("#ad-bannis"); if (!zb) return;
  zb.innerHTML = (ban || []).length ? ban.map(p => `<div class="c-ligne"><strong>${esc(p.pseudo)}</strong><button class="btn-lien" data-debannir="${p.id}">↩️ Réactiver</button></div>`).join("") : `<p class="vide">Aucun membre suspendu.</p>`;
  zb.querySelectorAll("[data-debannir]").forEach(b => b.onclick = () => go(sb.from("profils").update({ banni: false }).eq("id", b.dataset.debannir), "Membre réactivé."));
}

// ---------- Appli installable (PWA) ----------
let invitation = null;
window.addEventListener("beforeinstallprompt", e => {
  e.preventDefault();
  invitation = e;
  $("#btn-installer").hidden = false;
});
$("#btn-installer").onclick = async () => {
  if (!invitation) return;
  invitation.prompt();
  await invitation.userChoice;
  invitation = null;
  $("#btn-installer").hidden = true;
};
if ("serviceWorker" in navigator && location.protocol === "https:") {
  navigator.serviceWorker.register("sw.js").catch(() => {});
}

init();
