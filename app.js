// =====================================================
// FICHIER 4/5 — app.js : navigation, filtres, carte, formulaire
// =====================================================

const app = document.getElementById("app");

// ---------- Outils ----------
function esc(t) {
  return String(t ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
const cat = id => CATEGORIES.find(c => c.id === id) || { nom: id, icone: "❔", couleur: "#7c3aed" };
const lieu = id => LIEUX.find(l => l.id === id) || { nom: id };
const statutHtml = s => `<span class="statut ${STATUTS[s].classe}" title="${esc(STATUTS[s].aide)}">${STATUTS[s].nom}</span>`;

function carteFiche(f) {
  const c = cat(f.categorie);
  return `
  <a class="fiche-carte" href="#/fiche/${f.id}">
    <div class="illu" style="--c:${c.couleur}">
      ${f.exemple ? '<span class="tag-exemple">EXEMPLE</span>' : ""}
      ${f.spoiler ? '<span class="tag-spoil">SPOILER</span>' : ""}
      <span aria-hidden="true">${c.icone}</span>
    </div>
    <div class="corps">
      <h3>${esc(f.titre)}</h3>
      <p>${esc(f.resume)}</p>
      <div class="meta">
        <span class="pastille">${c.nom}</span>
        <span class="pastille">${esc(f.difficulte)}</span>
        ${statutHtml(f.statut)}
      </div>
    </div>
  </a>`;
}

const bandeauDemo = `<div class="bandeau-demo">🔎 <strong>Version bêta.</strong> Les fiches sont vérifiées à partir de sources de référence (listées sur chaque fiche) mais pas encore testées en jeu par l'équipe.</div>`;

// ---------- Ciel et skyline (dessin original) ----------
function skylineSvg() {
  let tours = "";
  const hauteurs = [60, 95, 70, 140, 110, 180, 125, 90, 160, 75, 105, 135, 65, 85];
  hauteurs.forEach((h, i) => {
    const x = 330 + i * 45;
    tours += `<rect x="${x}" y="${300 - h}" width="38" height="${h}" fill="#1a0f2e"/>`;
    for (let y = 300 - h + 10; y < 290; y += 16) {
      if ((i + y) % 3 === 0) tours += `<rect x="${x + 8}" y="${y}" width="6" height="6" fill="#ffd27a" opacity=".7"/>`;
      if ((i + y) % 5 === 0) tours += `<rect x="${x + 22}" y="${y}" width="6" height="6" fill="#22e4ff" opacity=".6"/>`;
    }
  });
  const palmier = (x, s) => `
    <g transform="translate(${x},300) scale(${s})" fill="#120a22">
      <path d="M0 0 Q6 -60 2 -120 L8 -120 Q12 -60 8 0 Z"/>
      <path d="M5 -120 Q-30 -130 -55 -105 Q-25 -118 5 -114 Z"/>
      <path d="M5 -120 Q40 -135 65 -108 Q35 -120 5 -114 Z"/>
      <path d="M5 -120 Q-15 -150 -40 -150 Q-10 -140 5 -116 Z"/>
      <path d="M5 -120 Q30 -155 55 -150 Q25 -140 5 -116 Z"/>
    </g>`;
  return `
  <svg viewBox="0 0 1000 300" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
    <defs>
      <linearGradient id="sol" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe08a"/><stop offset="1" stop-color="#ff5e8a"/></linearGradient>
      <mask id="bandes"><rect width="1000" height="300" fill="#fff"/>
        <rect y="150" width="1000" height="6" fill="#000"/><rect y="168" width="1000" height="8" fill="#000"/>
        <rect y="188" width="1000" height="10" fill="#000"/><rect y="210" width="1000" height="12" fill="#000"/></mask>
    </defs>
    <circle cx="250" cy="200" r="120" fill="url(#sol)" mask="url(#bandes)" opacity=".95"/>
    <path d="M0 230 L120 170 L220 210 L330 150 L460 220 L520 300 L0 300 Z" fill="#2a1240" opacity=".9"/>
    ${tours}
    ${palmier(90, 1.1)}${palmier(180, .8)}${palmier(960, 1)}
    <rect y="292" width="1000" height="8" fill="#0d0a1a"/>
  </svg>`;
}

// ---------- Pages ----------
function pageAccueil() {
  const populaires = FICHES.filter(f => f.populaire).slice(0, 3);
  const recentes = [...FICHES].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);
  const compte = id => FICHES.filter(f => f.categorie === id).length;
  return `
  <section class="hero">
    <div class="hero-ciel"></div>
    ${skylineSvg()}
    <div class="hero-contenu">
      <span class="badge-fan">Site de fans indépendant · non officiel</span>
      <h1>Los Santos<br>à la loupe</h1>
      <p>Les détails que tu as croisés cent fois sans les voir. Scènes secrètes, easter eggs, mystères, références et événements rares de GTA V — expliqués, localisés et vérifiés.</p>
      <div class="boutons">
        <a class="btn btn-plein" href="#/catalogue">Explorer le catalogue</a>
        <a class="btn btn-neon" href="#/carte">Ouvrir la carte</a>
      </div>
    </div>
  </section>

  <div class="wrap">
    ${bandeauDemo}

    <section class="section">
      <h2>🔥 Les plus populaires</h2>
      <div class="grille">${populaires.map(carteFiche).join("")}</div>
    </section>

    <section class="section">
      <h2>🆕 Ajouts récents</h2>
      <div class="grille">${recentes.map(carteFiche).join("")}</div>
    </section>

    <section class="section">
      <h2>Explorer par catégorie</h2>
      <div class="grille-cat">
        ${CATEGORIES.map(c => `
          <a class="cat" style="--c:${c.couleur}" href="#/catalogue?cat=${c.id}">
            <span class="ico">${c.icone}</span>
            <strong>${c.nom}</strong>
            <small>${compte(c.id)} découverte${compte(c.id) > 1 ? "s" : ""}</small>
          </a>`).join("")}
      </div>
    </section>

    <section class="section">
      <div class="bloc">
        <h3>Rumeurs ou faits ?</h3>
        <p>Jetpack caché, fantômes, créatures… Ici, chaque découverte porte une étiquette claire : <strong>vérifié</strong>, <strong>théorie</strong> ou <strong>rumeur</strong>. On ne vend pas du rêve : on vérifie.</p>
        <a class="btn btn-degrade" href="#/rumeurs">Faire le tri</a>
      </div>
      <div class="bloc">
        <h3>Tu as repéré un truc bizarre ?</h3>
        <p>Propose ton détail. Il sera relu et vérifié avant d'apparaître sur le site.</p>
        <a class="btn btn-neon" href="#/proposer">Proposer un détail</a>
      </div>
    </section>
  </div>`;
}

function pageCatalogue(params) {
  const persos = [...new Set(FICHES.map(f => f.personnage))].sort();
  const lieuxUtilises = LIEUX.filter(l => FICHES.some(f => f.lieu === l.id));
  const opt = (val, txt, sel) => `<option value="${esc(val)}" ${sel === val ? "selected" : ""}>${esc(txt)}</option>`;
  const p = { q: params.get("q") || "", cat: params.get("cat") || "", perso: params.get("perso") || "", lieu: params.get("lieu") || "", diff: params.get("diff") || "" };
  return `
  <div class="wrap section">
    <h1>Catalogue</h1>
    <p>Toutes les découvertes, filtrables en un clin d'œil.</p>
    ${bandeauDemo}
    <div class="filtres">
      <input id="f-q" type="search" placeholder="Rechercher (ex : fantôme, Chiliad…)" value="${esc(p.q)}">
      <select id="f-cat">${opt("", "Toutes catégories", p.cat)}${CATEGORIES.map(c => opt(c.id, c.nom, p.cat)).join("")}</select>
      <select id="f-perso">${opt("", "Tous personnages", p.perso)}${persos.map(x => opt(x, x, p.perso)).join("")}</select>
      <select id="f-lieu">${opt("", "Tous lieux", p.lieu)}${lieuxUtilises.map(l => opt(l.id, l.nom, p.lieu)).join("")}</select>
      <select id="f-diff">${opt("", "Toutes difficultés", p.diff)}${["Facile", "Moyen", "Difficile"].map(d => opt(d, d, p.diff)).join("")}</select>
    </div>
    <div class="compteur" id="compteur"></div>
    <div class="grille" id="resultats"></div>
  </div>`;
}

function filtrerCatalogue() {
  const sansAccent = s => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const q = sansAccent(document.getElementById("f-q").value.trim());
  const c = document.getElementById("f-cat").value;
  const pe = document.getElementById("f-perso").value;
  const li = document.getElementById("f-lieu").value;
  const di = document.getElementById("f-diff").value;
  const res = FICHES.filter(f =>
    (!q || sansAccent(f.titre + " " + f.resume + " " + f.explication + " " + lieu(f.lieu).nom).includes(q)) &&
    (!c || f.categorie === c) && (!pe || f.personnage === pe) && (!li || f.lieu === li) && (!di || f.difficulte === di)
  );
  document.getElementById("compteur").textContent = `${res.length} découverte${res.length > 1 ? "s" : ""}`;
  document.getElementById("resultats").innerHTML = res.length
    ? res.map(carteFiche).join("")
    : `<p class="vide">Aucun résultat. Essaie d'enlever un filtre.</p>`;
}

function pageFiche(id) {
  const f = FICHES.find(x => x.id === id);
  if (!f) return page404();
  const c = cat(f.categorie);
  const contenu = `
    <div class="bloc"><h3>Le détail</h3><p>${esc(f.explication)}</p></div>
    <div class="bloc"><h3>Comment le découvrir</h3><ol>${f.etapes.map(e => `<li>${esc(e)}</li>`).join("")}</ol></div>`;
  return `
  <div class="wrap">
    <div class="fil"><a href="#/catalogue">Catalogue</a> › <a href="#/catalogue?cat=${c.id}">${c.nom}</a> › ${esc(f.titre)}</div>
    ${f.exemple ? bandeauDemo : ""}
    <div class="fiche-tete">
      <div class="illu" style="--c:${c.couleur}"><span aria-hidden="true">${c.icone}</span></div>
      <div class="titre">
        <h1 style="font-size:clamp(2rem,6vw,3.2rem)">${esc(f.titre)}</h1>
        <div class="meta">${statutHtml(f.statut)}<span class="pastille">${c.nom}</span><span class="pastille">Difficulté : ${esc(f.difficulte)}</span>${f.spoiler ? '<span class="statut rum">Spoiler</span>' : ""}</div>
      </div>
    </div>
    <div class="fiche-grille">
      <div>
        ${f.spoiler ? `
          <div class="spoiler" id="spoiler">
            <div class="spoiler-alerte"><div>
              <strong>⚠️ Attention spoiler</strong>
              <p>Cette fiche révèle des éléments de l'histoire ou de la fin du jeu.</p>
              <button class="btn btn-degrade" id="voir-spoiler">Afficher quand même</button>
            </div></div>
            <div class="cache">${contenu}</div>
          </div>` : contenu}
        <div class="bloc">
          <h3>Captures</h3>
          <div class="capture-vide">📸 Aucune capture pour l'instant.<br>Ajoute ici tes propres captures d'écran en jeu.</div>
        </div>
      </div>
      <aside>
        <div class="bloc">
          <h3>Infos pratiques</h3>
          <dl class="infos">
            <dt>Lieu</dt><dd>${esc(lieu(f.lieu).nom)}${lieu(f.lieu).x ? ` · <a href="#/carte?lieu=${f.lieu}">voir sur la carte</a>` : ""}</dd>
            <dt>Moment</dt><dd>${esc(f.moment)}</dd>
            <dt>Personnage</dt><dd>${esc(f.personnage)}</dd>
            <dt>Mission</dt><dd>${esc(f.mission)}</dd>
            <dt>Difficulté</dt><dd>${esc(f.difficulte)}</dd>
          </dl>
        </div>
        <div class="bloc">
          <h3>Vérification</h3>
          <p>${statutHtml(f.statut)}</p>
          <p class="note">${esc(STATUTS[f.statut].aide)}</p>
          <p class="note">🎮 Testé en jeu par l'équipe : <strong>${f.testeEnJeu ? "oui" : "pas encore"}</strong></p>
          <h3 style="margin-top:14px">Sources</h3>
          ${f.sources.length
            ? `<ul>${f.sources.map(s => `<li><a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.nom)}</a></li>`).join("")}</ul>`
            : `<p class="vide">Sources à ajouter avant publication.</p>`}
        </div>
      </aside>
    </div>
  </div>`;
}

function pageCarte(params) {
  const actif = params.get("lieu") || "";
  const lieuxCarte = LIEUX.filter(l => l.x !== null && FICHES.some(f => f.lieu === l.id));
  return `
  <div class="wrap section">
    <h1>Carte de Los Santos</h1>
    <p>Touche un point pour voir les découvertes liées à ce lieu.</p>
    <div class="carte-zone">
      <div>
        <svg class="carte-svg" viewBox="0 0 400 620" role="img" aria-label="Carte schématique de Los Santos et Blaine County">
          <defs><pattern id="vagues" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M0 10 Q5 5 10 10 T20 10" stroke="#12304d" fill="none"/></pattern></defs>
          <rect width="400" height="620" fill="url(#vagues)"/>
          <path d="M150 30 Q220 20 260 60 Q330 110 350 190 Q370 260 330 330 Q300 380 300 440 Q310 520 270 590 Q220 610 170 590 Q110 560 100 500 Q80 440 70 380 Q50 300 60 220 Q70 120 110 60 Z" fill="#1d2b22" stroke="#2f4a3a" stroke-width="3"/>
          <ellipse cx="240" cy="270" rx="45" ry="18" fill="#0f2a44"/>
          <path d="M120 420 Q200 380 290 430 L285 590 Q220 600 170 585 Q120 550 115 480 Z" fill="#2a2440"/>
          <path d="M160 40 Q150 200 200 300 Q230 380 220 480 Q215 540 240 590" stroke="#ff8a3d" stroke-width="3" fill="none" stroke-dasharray="6 5" opacity=".7"/>
          <path d="M80 300 Q200 330 330 300" stroke="#ff8a3d" stroke-width="2" fill="none" stroke-dasharray="6 5" opacity=".5"/>
          <path d="M140 160 L170 115 L200 160 Z" fill="#3b5a46"/>
          <path d="M285 225 L305 185 L325 225 Z" fill="#3b5a46"/>
          ${lieuxCarte.map(l => `
            <g class="pin ${l.id === actif ? "actif" : ""}" data-lieu="${l.id}" tabindex="0" role="button" aria-label="${esc(l.nom)}">
              <circle class="halo" cx="${l.x}" cy="${l.y}" r="12"/>
              <circle class="point" cx="${l.x}" cy="${l.y}" r="7"/>
              <text x="${l.x > 260 ? l.x - 12 : l.x + 12}" y="${l.y + 4}" text-anchor="${l.x > 260 ? "end" : "start"}">${esc(l.nom)}</text>
            </g>`).join("")}
        </svg>
        <p class="note">Carte schématique originale, dessinée pour ce site. Les positions sont approximatives et non à l'échelle.</p>
      </div>
      <div id="panneau-lieu"></div>
    </div>
  </div>`;
}

function afficherLieu(id) {
  const panneau = document.getElementById("panneau-lieu");
  document.querySelectorAll(".pin").forEach(p => p.classList.toggle("actif", p.dataset.lieu === id));
  if (!id) {
    const partout = FICHES.filter(f => f.lieu === "partout");
    panneau.innerHTML = `<div class="bloc"><h3>Choisis un lieu</h3><p>Touche un point sur la carte.</p>
      ${partout.length ? `<p class="note">Découvertes disséminées sur toute la carte :</p><div class="grille">${partout.map(carteFiche).join("")}</div>` : ""}</div>`;
    return;
  }
  const liste = FICHES.filter(f => f.lieu === id);
  panneau.innerHTML = `<h2>${esc(lieu(id).nom)}</h2><div class="grille">${liste.map(carteFiche).join("")}</div>`;
}

function pageRumeurs() {
  const colonne = s => {
    const liste = FICHES.filter(f => f.statut === s);
    return `
    <div class="bloc col-statut">
      <h3>${statutHtml(s)}</h3>
      <p class="note">${STATUTS[s].aide}</p>
      ${liste.length ? `<ul>${liste.map(f => `<li><a href="#/fiche/${f.id}">${esc(f.titre)}</a>${f.spoiler ? ' <span class="statut rum">Spoiler</span>' : ""}</li>`).join("")}</ul>`
        : `<p class="vide">Rien ici pour le moment.</p>`}
    </div>`;
  };
  return `
  <div class="wrap section">
    <h1>Rumeurs ou faits ?</h1>
    <p>Internet regorge de « secrets » de GTA V. Certains sont réels, d'autres sont des théories, d'autres encore de pures inventions. Ici on trie.</p>
    ${bandeauDemo}
    <div class="colonnes-statut">${["verifie", "theorie", "rumeur", "a-verifier"].map(colonne).join("")}</div>
    <div class="bloc" style="margin-top:16px">
      <h3>Notre méthode</h3>
      <ol>
        <li>On teste le détail nous-mêmes en jeu quand c'est possible.</li>
        <li>On croise au moins deux sources sérieuses.</li>
        <li>Sans preuve, on n'affirme rien : on parle de théorie ou de rumeur.</li>
      </ol>
    </div>
  </div>`;
}

function pageProposer() {
  return `
  <div class="wrap section">
    <h1>Proposer un détail</h1>
    <p>Tu as repéré quelque chose ? Raconte-nous. Chaque proposition est relue et vérifiée avant publication.</p>
    <form class="form" id="form-proposer" novalidate>
      <label>Titre du détail *<input name="titre" required maxlength="120" placeholder="Ex : Un message caché sur un panneau à Paleto Bay"></label>
      <label>Catégorie *<select name="categorie" required><option value="">Choisir…</option>${CATEGORIES.map(c => `<option value="${c.id}">${c.nom}</option>`).join("")}</select></label>
      <label>Description *<textarea name="description" rows="5" required maxlength="2000" placeholder="Qu'as-tu vu ? Pourquoi c'est intéressant ?"></textarea></label>
      <label>Comment le trouver<textarea name="etapes" rows="3" maxlength="1500" placeholder="Lieu, heure, personnage, mission…"></textarea></label>
      <label>Lien vers une preuve (vidéo, capture, article)<input name="source" type="url" placeholder="https://…"></label>
      <label>Contient un spoiler ?<select name="spoiler"><option value="non">Non</option><option value="oui">Oui</option></select></label>
      <label>Ton pseudo<input name="pseudo" maxlength="40"></label>
      <label>E-mail (facultatif, pour te recontacter)<input name="email" type="email"></label>
      <label class="case"><input type="checkbox" name="accord" required> J'accepte que ma proposition soit relue, modifiée si besoin et publiée, et que mes données soient traitées comme indiqué dans les <a href="#/mentions">mentions légales</a>. *</label>
      <div id="form-message"></div>
      <button class="btn btn-degrade" type="submit">Envoyer pour modération</button>
    </form>
  </div>`;
}

function envoyerProposition(e) {
  e.preventDefault();
  const form = e.target;
  const d = Object.fromEntries(new FormData(form));
  const msg = document.getElementById("form-message");
  const manque = [];
  if (!d.titre?.trim()) manque.push("titre");
  if (!d.categorie) manque.push("catégorie");
  if (!d.description?.trim()) manque.push("description");
  if (!d.accord) manque.push("accord");
  if (manque.length) { msg.innerHTML = `<p class="erreur">Il manque : ${manque.join(", ")}.</p>`; return; }
  if (d.source && !/^https?:\/\//.test(d.source)) { msg.innerHTML = `<p class="erreur">Le lien doit commencer par https://</p>`; return; }
  // DÉMO : pour l'instant la proposition est gardée uniquement dans ce navigateur.
  try {
    const liste = JSON.parse(localStorage.getItem("propositions") || "[]");
    liste.push({ ...d, statut: "en-attente", date: new Date().toISOString() });
    localStorage.setItem("propositions", JSON.stringify(liste));
  } catch (err) { /* stockage indisponible : on continue */ }
  form.reset();
  msg.innerHTML = `<div class="succes">✅ Merci ! Ta proposition est en attente de modération.<br><small>(Version de démonstration : l'envoi vers l'équipe n'est pas encore branché.)</small></div>`;
}

function pageAPropos() {
  return `<div class="wrap section texte">
    <h1>À propos</h1>
    <p><strong>Los Santos à la loupe</strong> est un site de fans indépendant, créé par des joueurs pour des joueurs. Notre but : faire découvrir les petits détails de GTA V qu'on rate facilement — scènes secrètes, dialogues, easter eggs, références, lieux insolites et événements rares.</p>
    <h2>Notre engagement</h2>
    <ul>
      <li>On n'invente pas de secrets.</li>
      <li>Chaque fiche affiche son statut : vérifié, théorie, rumeur ou à vérifier.</li>
      <li>Les spoilers sont signalés et masqués par défaut.</li>
      <li>On cite nos sources.</li>
    </ul>
    <h2>Pas un site officiel</h2>
    <p>Ce site n'est ni officiel, ni affilié, ni approuvé par Rockstar Games ou Take-Two Interactive. Toutes les illustrations sont des créations originales.</p>
  </div>`;
}

function pageSources() {
  const toutes = FICHES.flatMap(f => f.sources.map(s => ({ ...s, fiche: f })));
  return `<div class="wrap section texte">
    <h1>Sources</h1>
    <p>Voici les sources consultées pour rédiger et vérifier les fiches. Chaque fiche liste aussi ses propres sources.</p>
    ${toutes.length
      ? `<ul>${toutes.map(s => `<li><a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.nom)}</a> — pour « <a href="#/fiche/${s.fiche.id}">${esc(s.fiche.titre)}</a> »</li>`).join("")}</ul>`
      : `<div class="bandeau-demo">Aucune source n'est encore listée : les fiches actuelles sont des exemples de démonstration. Les sources seront ajoutées au fur et à mesure des vérifications.</div>`}
    <h2>Comment on choisit nos sources</h2>
    <ul>
      <li>Nos propres tests en jeu (avec captures quand c'est possible).</li>
      <li>Wikis de communauté reconnus et guides détaillés.</li>
      <li>Vidéos montrant le détail en jeu, de façon reproductible.</li>
    </ul>
  </div>`;
}

function pageMentions() {
  return `<div class="wrap section texte">
    <h1>Mentions légales</h1>
    <h2>Éditeur du site</h2>
    <p>[Nom ou pseudo de l'éditeur] — [Adresse e-mail de contact]<br>Site personnel non commercial, édité depuis la Belgique.</p>
    <h2>Hébergement</h2>
    <p>Render Services, Inc. — San Francisco, Californie, États-Unis — render.com</p>
    <h2>Site de fans non officiel</h2>
    <p>Ce site n'est pas officiel et n'est ni affilié, ni approuvé, ni sponsorisé par Rockstar Games ou Take-Two Interactive. Grand Theft Auto, GTA et les noms associés sont des marques de leurs propriétaires respectifs, citées ici à des fins d'information. Aucun logo, aucune image ni aucune musique du jeu n'est reproduit sur ce site.</p>
    <h2>Propriété intellectuelle</h2>
    <p>Les textes et illustrations originales du site appartiennent à leur auteur. Les courtes mentions d'éléments du jeu sont faites à des fins de commentaire et d'information.</p>
    <h2>Données personnelles</h2>
    <p>Le formulaire « Proposer un détail » collecte uniquement les informations que tu choisis d'envoyer (pseudo, e-mail facultatif, contenu). Elles servent seulement à la modération et à te recontacter si besoin. Conformément au RGPD, tu peux demander l'accès ou la suppression de tes données à l'adresse de contact ci-dessus.</p>
    <h2>Espace Communauté (comptes membres)</h2>
    <p>L'espace Communauté est réservé aux membres inscrits de <strong>16 ans et plus</strong>. Pour fonctionner, il enregistre : ton adresse e-mail (connexion), ton pseudo, ta plateforme de jeu, tes messages, tes annonces et tes signalements. Ces données servent uniquement à faire fonctionner l'espace et à le modérer. Elles ne sont ni vendues ni partagées.</p>
    <p>Elles sont hébergées par Google Firebase (Google Ireland Ltd, base de données située dans l'Union européenne) et conservées tant que ton compte existe. Tu peux demander à tout moment l'accès, la correction ou la suppression de ton compte et de tes données à l'adresse de contact ci-dessus.</p>
    <p><strong>Signaler un contenu :</strong> bouton 🚩 sur chaque message et annonce, ou par e-mail à l'adresse de contact. Les annonces sont vérifiées avant publication. La modération peut masquer des messages et suspendre des comptes qui ne respectent pas le règlement.</p>
    <h2>Cookies</h2>
    <p>Ce site n'utilise pas de cookies publicitaires ni de traceurs. L'espace Communauté enregistre seulement ta session de connexion dans ton navigateur, pour que tu restes connecté.</p>
  </div>`;
}

function page404() {
  return `<div class="wrap section"><h1>Page introuvable</h1><p>Même avec une loupe, on ne trouve rien ici.</p><a class="btn btn-plein" href="#/">Retour à l'accueil</a></div>`;
}


// ---------- Véhicules ----------
const prixTxt = n => n == null ? "—" : n.toLocaleString("fr-BE").replace(/ | /g, " ") + " GTA$";
const typeV = t => TYPES_VEHICULE[t] || { nom: t, icone: "🚘" };

function carteVehicule(v) {
  const t = typeV(v.type);
  const hist = v.histoire.dispo === true ? "Histoire ✓" : v.histoire.dispo === false ? "Online seulement" : "Histoire : ?";
  return `
  <a class="fiche-carte" href="#/vehicule/${v.id}">
    <div class="illu" style="--c:#3b82f6"><span aria-hidden="true">${t.icone}</span></div>
    <div class="corps">
      <small class="note">${esc(v.marque)} · ${esc(v.classe)}</small>
      <h3>${esc(v.nom)}</h3>
      <div class="specs-mini">
        <span>⚡ ${v.vitesse ? v.vitesse.kmh.toLocaleString("fr-BE") + " km/h" : "—"}</span>
        <span>💰 ${prixTxt(v.online.prix)}</span>
        <span>💺 ${v.places}</span>
      </div>
      <div class="meta"><span class="pastille">${t.nom}</span><span class="pastille">${hist}</span></div>
    </div>
  </a>`;
}

function pageVehicules() {
  const classes = [...new Set(VEHICULES.map(v => v.classe))].sort();
  return `
  <div class="wrap section">
    <h1>Véhicules</h1>
    <p>Fiches techniques complètes : prix, places, vitesse réelle, inspiration, améliorations et détails cachés. Mode histoire et GTA Online.</p>
    <div class="bandeau-demo">📏 <strong>Vitesse :</strong> on affiche la vitesse <em>mesurée</em> en jeu, véhicule entièrement amélioré (tests de Broughy1322, relevés par GTABase). C'est plus fiable que la jauge du jeu ou que les descriptions officielles, souvent exagérées. Les prix Online peuvent varier avec les promotions.</div>
    <div class="filtres">
      <input id="v-q" type="search" placeholder="Rechercher (ex : Adder, Pegassi, Franklin, Tron…)">
      <select id="v-type"><option value="">Tous types</option>${Object.entries(TYPES_VEHICULE).map(([k, t]) => `<option value="${k}">${t.icone} ${t.nom}</option>`).join("")}</select>
      <select id="v-classe"><option value="">Toutes classes</option>${classes.map(c => `<option>${esc(c)}</option>`).join("")}</select>
      <select id="v-mode"><option value="">Tous modes</option><option value="histoire">Dispo en mode histoire</option><option value="online">GTA Online</option></select>
      <select id="v-tri"><option value="nom">Tri : nom</option><option value="vitesse">Tri : plus rapide</option><option value="prix-">Tri : moins cher</option><option value="prix+">Tri : plus cher</option></select>
    </div>
    <div class="compteur" id="v-compteur"></div>
    <div class="grille" id="v-resultats"></div>
  </div>`;
}

function filtrerVehicules() {
  const sansAccent = x => x.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  const q = sansAccent(document.getElementById("v-q").value.trim());
  const ty = document.getElementById("v-type").value;
  const cl = document.getElementById("v-classe").value;
  const mo = document.getElementById("v-mode").value;
  const tri = document.getElementById("v-tri").value;
  let res = VEHICULES.filter(v =>
    (!q || sansAccent([v.nom, v.marque, v.classe, v.inspiration || "", v.histoire.texte, v.online.texte, ...v.caches, ...v.ameliorations].join(" ")).includes(q)) &&
    (!ty || v.type === ty) && (!cl || v.classe === cl) &&
    (!mo || (mo === "histoire" ? v.histoire.dispo === true : v.online.prix != null))
  );
  const cmp = {
    nom: (a, b) => a.nom.localeCompare(b.nom),
    vitesse: (a, b) => b.vitesse.kmh - a.vitesse.kmh,
    "prix-": (a, b) => (a.online.prix ?? Infinity) - (b.online.prix ?? Infinity),
    "prix+": (a, b) => (b.online.prix ?? -1) - (a.online.prix ?? -1)
  };
  res.sort(cmp[tri]);
  document.getElementById("v-compteur").textContent = `${res.length} véhicule${res.length > 1 ? "s" : ""}`;
  document.getElementById("v-resultats").innerHTML = res.length ? res.map(carteVehicule).join("") : `<p class="vide">Aucun véhicule. Essaie d'enlever un filtre.</p>`;
}

function pageVehicule(id) {
  const v = VEHICULES.find(x => x.id === id);
  if (!v) return page404();
  const t = typeV(v.type);
  const ligne = (k, val) => `<tr><th>${k}</th><td>${val}</td></tr>`;
  const histoireHtml = v.histoire.dispo === true
    ? `<p><span class="statut ok">Disponible</span></p><p>${esc(v.histoire.texte)}</p>`
    : v.histoire.dispo === false
      ? `<p><span class="statut rum">Absent du mode histoire</span></p><p>Ce véhicule n'existe que dans GTA Online.</p>`
      : `<p><span class="statut wait">Non confirmé</span></p><p>Nos sources ne précisent pas si ce véhicule est disponible en mode histoire. À vérifier.</p>`;
  return `
  <div class="wrap">
    <div class="fil"><a href="#/vehicules">Véhicules</a> › ${esc(v.nom)}</div>
    <div class="fiche-tete">
      <div class="illu" style="--c:#3b82f6"><span aria-hidden="true">${t.icone}</span></div>
      <div class="titre">
        <small class="note">${esc(v.marque)} · ${esc(v.classe)}</small>
        <h1 style="font-size:clamp(2rem,6vw,3.2rem)">${esc(v.nom)}</h1>
        <div class="specs-grandes">
          <div><strong>${v.vitesse.kmh.toLocaleString("fr-BE")}</strong><span>km/h mesurés</span></div>
          <div><strong>${v.places}</strong><span>place${v.places > 1 ? "s" : ""}</span></div>
          <div><strong>${v.tour || "—"}</strong><span>temps au tour</span></div>
        </div>
      </div>
    </div>
    <div class="fiche-grille">
      <div>
        <div class="bloc">
          <div class="onglets" role="tablist">
            <button class="onglet actif" role="tab" data-onglet="histoire" aria-selected="true">🎮 Mode histoire</button>
            <button class="onglet" role="tab" data-onglet="online" aria-selected="false">🌐 GTA Online</button>
          </div>
          <div class="panneau" data-panneau="histoire">${histoireHtml}</div>
          <div class="panneau" data-panneau="online" hidden>
            <table class="specs">
              ${ligne("Prix", prixTxt(v.online.prix))}
              ${ligne("Où l'acheter", esc(v.online.vendeur))}
            </table>
            ${v.online.texte ? `<p>${esc(v.online.texte)}</p>` : ""}
          </div>
        </div>
        <div class="bloc">
          <h3>🔧 Améliorations et équipement</h3>
          <ul>${v.ameliorations.map(a => `<li>${esc(a)}</li>`).join("")}</ul>
        </div>
        <div class="bloc">
          <h3>🔍 Détails cachés</h3>
          <ul>${v.caches.map(a => `<li>${esc(a)}</li>`).join("")}</ul>
        </div>
      </div>
      <aside>
        <div class="bloc">
          <h3>Fiche technique</h3>
          <table class="specs">
            ${ligne("Type", t.icone + " " + t.nom)}
            ${ligne("Marque", esc(v.marque))}
            ${ligne("Classe", esc(v.classe))}
            ${ligne("Places", v.places)}
            ${ligne("Transmission", esc(v.transmission))}
            ${ligne("Vitesse mesurée", `${v.vitesse.kmh.toLocaleString("fr-BE")} km/h<br><small class="note">${v.vitesse.mph.toLocaleString("fr-BE")} mph</small>`)}
            ${ligne("Temps au tour", v.tour || "—")}
            ${ligne("Inspiré de", v.inspiration ? esc(v.inspiration) : "Non précisé par nos sources")}
            ${ligne("Ajouté le", esc(v.sortie))}
          </table>
        </div>
        <div class="bloc">
          <h3>Sources</h3>
          <ul>${v.sources.map(s => `<li><a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.nom)}</a></li>`).join("")}</ul>
          <p class="note">Données relevées le 1er novembre 2026. Vitesse et temps au tour : tests de Broughy1322.</p>
        </div>
      </aside>
    </div>
  </div>`;
}

// ---------- Routeur ----------
function router() {
  const hash = location.hash.replace(/^#/, "") || "/";
  const [chemin, query] = hash.split("?");
  const params = new URLSearchParams(query || "");
  const parts = chemin.split("/").filter(Boolean);

  let html;
  switch (parts[0]) {
    case undefined:   html = pageAccueil(); break;
    case "catalogue": html = pageCatalogue(params); break;
    case "fiche":     html = pageFiche(parts[1]); break;
    case "carte":     html = pageCarte(params); break;
    case "vehicules": html = pageVehicules(); break;
    case "vehicule":  html = pageVehicule(parts[1]); break;
    case "rumeurs":   html = pageRumeurs(); break;
    case "proposer":  html = pageProposer(); break;
    case "a-propos":  html = pageAPropos(); break;
    case "sources":   html = pageSources(); break;
    case "mentions":  html = pageMentions(); break;
    default:          html = page404();
  }
  app.innerHTML = html;
  window.scrollTo(0, 0);

  // Lien actif dans le menu
  document.querySelectorAll(".nav a").forEach(a => {
    const cible = a.getAttribute("href").replace("#", "");
    a.classList.toggle("actif", cible === "/" ? chemin === "/" : chemin.startsWith(cible.replace(/s$/, "")));
  });
  fermerMenu();

  // Comportements propres à chaque page
  if (parts[0] === "catalogue") {
    ["f-q", "f-cat", "f-perso", "f-lieu", "f-diff"].forEach(id => document.getElementById(id).addEventListener("input", filtrerCatalogue));
    filtrerCatalogue();
  }
  if (parts[0] === "fiche") {
    const b = document.getElementById("voir-spoiler");
    if (b) b.addEventListener("click", () => {
      const s = document.getElementById("spoiler");
      s.querySelector(".spoiler-alerte").remove();
      s.querySelector(".cache").classList.remove("cache");
    });
  }
  if (parts[0] === "carte") {
    document.querySelectorAll(".pin").forEach(p => {
      p.addEventListener("click", () => afficherLieu(p.dataset.lieu));
      p.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); afficherLieu(p.dataset.lieu); } });
    });
    afficherLieu(params.get("lieu") || "");
  }
  if (parts[0] === "vehicules") {
    ["v-q", "v-type", "v-classe", "v-mode", "v-tri"].forEach(id => document.getElementById(id).addEventListener("input", filtrerVehicules));
    filtrerVehicules();
  }
  if (parts[0] === "vehicule") {
    document.querySelectorAll(".onglet").forEach(b => b.addEventListener("click", () => {
      document.querySelectorAll(".onglet").forEach(x => { const on = x === b; x.classList.toggle("actif", on); x.setAttribute("aria-selected", String(on)); });
      document.querySelectorAll(".panneau").forEach(pn => { pn.hidden = pn.dataset.panneau !== b.dataset.onglet; });
    }));
  }
  if (parts[0] === "proposer") {
    document.getElementById("form-proposer").addEventListener("submit", envoyerProposition);
  }
}

// ---------- Menu mobile ----------
const burger = document.getElementById("burger");
const nav = document.getElementById("nav");
function fermerMenu() { nav.classList.remove("ouvert"); burger.setAttribute("aria-expanded", "false"); }
burger.addEventListener("click", () => {
  const ouvert = nav.classList.toggle("ouvert");
  burger.setAttribute("aria-expanded", String(ouvert));
});

window.addEventListener("hashchange", router);
router();
