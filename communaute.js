// =====================================================
// Appli communautaire « Los Santos à la loupe »
// Inscription 16+, chat par salons en temps réel, recherche d'activité
// (annonces validées), profil, espace modération.
// Données : Firebase (Authentication + Cloud Firestore, hébergé en UE).
// La sécurité est assurée côté serveur par firebase/firestore.rules.
// =====================================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword,
  signOut, sendEmailVerification, reload
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  getFirestore, doc, getDoc, collection, query, where, orderBy, limit, getDocs,
  onSnapshot, writeBatch, updateDoc, deleteDoc, addDoc, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const CFG = (window.LSL_CONFIG || {}).FIREBASE || null;
const PLATEFORMES = ["PS5", "PS4", "Xbox Series", "Xbox One", "PC"];
const ACTIVITES = ["Braquage Cayo Perico", "Braquage du Casino", "Doomsday Heist", "Braquages classiques", "Courses", "Business / ventes", "Missions de contact", "Mode Adversaire", "Exploration / secrets", "Autre"];
const SALONS = [
  { id: "general", nom: "💬 Général", description: "Discussions libres sur GTA V et GTA Online" },
  { id: "braquages", nom: "💰 Braquages", description: "Préparer et réussir les braquages" },
  { id: "courses", nom: "🏁 Courses & véhicules", description: "Voitures, courses, tuning" },
  { id: "entraide", nom: "🆘 Entraide", description: "Tu bloques sur une mission ? Demande ici" },
  { id: "secrets", nom: "🔍 Secrets & mystères", description: "Easter eggs, théories et découvertes" },
  { id: "hors-sujet", nom: "🎲 Hors-sujet", description: "Tout le reste (dans le respect du règlement)" }
];
const PSEUDO_RE = /^[A-Za-z0-9_-]{3,20}$/;

const $ = s => document.querySelector(s);
const app = $("#c-app");
const esc = t => String(t ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const date = ts => (ts && typeof ts.toDate === "function") ? ts.toDate() : new Date();
const heure = ts => date(ts).toLocaleString("fr-BE", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });
const parDate = (a, b) => date(b.creeLe) - date(a.creeLe);
const lignes = snap => snap.docs.map(d => ({ id: d.id, ...d.data() }));

let auth = null, db = null, utilisateur = null, profil = null;
let salonActif = SALONS[0], arretChat = null, onglet = "chat", inscriptionEnCours = false;
let dernierEnvoi = 0, derniereAnnonceLocale = 0;

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
  const code = (e && e.code) || "";
  const textes = {
    "auth/email-already-in-use": "Cette adresse e-mail a déjà un compte. Connecte-toi.",
    "auth/invalid-email": "Adresse e-mail invalide.",
    "auth/weak-password": "Mot de passe trop faible (8 caractères minimum).",
    "auth/invalid-credential": "E-mail ou mot de passe incorrect.",
    "auth/wrong-password": "E-mail ou mot de passe incorrect.",
    "auth/user-not-found": "E-mail ou mot de passe incorrect.",
    "auth/too-many-requests": "Trop de tentatives. Réessaie dans quelques minutes.",
    "auth/network-request-failed": "Pas de connexion internet ou serveur injoignable.",
    "permission-denied": "Action refusée (non autorisée, trop rapide ou contenu invalide).",
    "failed-precondition": "Le serveur se prépare (index en cours de création). Réessaie dans quelques minutes.",
    "unavailable": "Serveur momentanément injoignable. Réessaie dans un instant."
  };
  return textes[code] || (e && e.message) || "Erreur inconnue.";
}

function centre(html) {
  $("#c-onglets").hidden = true;
  app.innerHTML = `<div class="c-centre">${html}</div>`;
}

// ---------- Démarrage ----------
function init() {
  if (!CFG || !CFG.apiKey || !CFG.projectId) {
    centre(`
      <div class="bloc c-carte">
        <h1>Communauté</h1>
        <p><strong>La communauté arrive bientôt !</strong></p>
        <p>Bientôt ici : un chat entre fans de GTA, organisé par salons, et un espace <strong>Recherche d'activité</strong> pour trouver des coéquipiers pour tes braquages, courses et missions.</p>
        <a class="btn btn-neon" href="index.html">Retour au site</a>
      </div>`);
    return;
  }
  const appFb = initializeApp(CFG);
  auth = getAuth(appFb);
  auth.languageCode = "fr";
  db = getFirestore(appFb);
  let demarre = false;
  onAuthStateChanged(auth, u => {
    if (inscriptionEnCours) return;
    // n'agit que si l'utilisateur connecté change vraiment (évite d'effacer un message d'erreur)
    if (demarre && (u?.uid || null) === (utilisateur?.uid || null)) return;
    demarre = true;
    demarrer(u);
  });
}

async function demarrer(u) {
  quitterSalon();
  $("#c-toast").hidden = true;
  $("#c-qui").textContent = "";
  utilisateur = u || null;
  profil = null;
  if (!u) { onglet = "chat"; salonActif = SALONS[0]; ecranConnexion(); return; }
  if (!u.emailVerified) { ecranVerification(u); return; }
  let snap;
  try { snap = await getDoc(doc(db, "profils", u.uid)); }
  catch (e) { centre(`<div class="bloc c-carte"><h2>Erreur</h2><p>${esc(msgErreur(e))}</p><button class="btn btn-neon" id="c-deco">Se déconnecter</button></div>`); $("#c-deco").onclick = () => signOut(auth); return; }
  if (!snap.exists()) { ecranFinaliserProfil(u); return; }
  profil = { id: u.uid, ...snap.data() };
  if (profil.banni) {
    centre(`<div class="bloc c-carte"><h2>Compte suspendu</h2><p>Ton compte a été suspendu par la modération pour non-respect du règlement.</p><button class="btn btn-neon" id="c-deco">Se déconnecter</button></div>`);
    $("#c-deco").onclick = () => signOut(auth);
    return;
  }
  $("#c-qui").textContent = profil.pseudo;
  afficherOnglets();
  ouvrir(onglet);
}

// ---------- Création du profil (pseudo réservé en même temps) ----------
async function creerProfil(u, pseudo, plateforme) {
  const pseudoMin = pseudo.toLowerCase();
  const lot = writeBatch(db);
  lot.set(doc(db, "profils", u.uid), {
    pseudo, pseudoMin, plateforme, ageConfirme: true, reglementAccepte: true, role: "membre", banni: false,
    creeLe: serverTimestamp(), dernierMessage: serverTimestamp(), derniereAnnonce: serverTimestamp()
  });
  lot.set(doc(db, "pseudos", pseudoMin), { uid: u.uid });
  await lot.commit();
}

async function pseudoLibre(pseudo) {
  const s = await getDoc(doc(db, "pseudos", pseudo.toLowerCase()));
  return !s.exists();
}

function champsProfil() {
  const optPf = ['<option value="Non précisé">Plateforme (facultatif)</option>', ...PLATEFORMES.map(p => `<option>${p}</option>`)].join("");
  return `
    <label>Pseudo<input name="pseudo" required maxlength="20" autocomplete="nickname" placeholder="3 à 20 caractères : lettres, chiffres, _ ou -"></label>
    <label>Plateforme<select name="plateforme">${optPf}</select></label>`;
}

function validerProfil(f, pbs) {
  if (!PSEUDO_RE.test(f.pseudo.value.trim())) pbs.push("pseudo de 3 à 20 caractères (lettres sans accent, chiffres, _ ou -)");
  if (!f.age.checked) pbs.push("confirmer avoir 16 ans ou plus");
  if (!f.regles.checked) pbs.push("accepter le règlement");
}

const casesAcceptation = `
  <label class="case"><input type="checkbox" name="age"> J'ai 16 ans ou plus.</label>
  <label class="case"><input type="checkbox" name="regles"> J'accepte le <a href="#" class="lien-regles">règlement de la communauté</a> et les <a href="index.html#/mentions" target="_blank">mentions légales</a>.</label>`;

function brancherReglement() {
  app.querySelectorAll(".lien-regles").forEach(a => a.onclick = e => { e.preventDefault(); $("#c-reglement").showModal(); });
}

// ---------- Connexion / inscription ----------
function ecranConnexion(mode = "connexion") {
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
        ${champsProfil()}
        <label>E-mail<input name="email" type="email" required autocomplete="email"></label>
        <label>Mot de passe<input name="mdp" type="password" required minlength="8" autocomplete="new-password" placeholder="8 caractères minimum"></label>
        ${casesAcceptation}
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
      try { await signInWithEmailAndPassword(auth, f.email.value.trim(), f.mdp.value); }
      catch (err) { msg(`<p class="erreur">${esc(msgErreur(err))}</p>`); }
      b.disabled = false;
    };
    return;
  }

  brancherReglement();
  $("#f-inscription").onsubmit = async e => {
    e.preventDefault();
    const f = e.target, b = f.querySelector("button[type=submit]");
    const pseudo = f.pseudo.value.trim(), email = f.email.value.trim();
    const pbs = [];
    validerProfil(f, pbs);
    if (!/^\S+@\S+\.\S+$/.test(email)) pbs.push("e-mail valide");
    if (f.mdp.value.length < 8) pbs.push("mot de passe de 8 caractères minimum");
    if (pbs.length) { msg(`<p class="erreur">Il faut : ${pbs.join(", ")}.</p>`); return; }
    b.disabled = true; msg("");
    inscriptionEnCours = true;
    let cred = null;
    try {
      if (!(await pseudoLibre(pseudo))) throw { code: "pseudo-pris" };
      cred = await createUserWithEmailAndPassword(auth, email, f.mdp.value);
      try { await creerProfil(cred.user, pseudo, f.plateforme.value); }
      catch (err) { await cred.user.delete().catch(() => {}); throw { code: "pseudo-pris" }; }
      await sendEmailVerification(cred.user, { url: location.origin + location.pathname }).catch(() => {});
      inscriptionEnCours = false;
      demarrer(auth.currentUser);
    } catch (err) {
      inscriptionEnCours = false;
      b.disabled = false;
      msg(`<p class="erreur">${esc(err.code === "pseudo-pris" ? "Ce pseudo est déjà pris. Choisis-en un autre." : msgErreur(err))}</p>`);
      if (!auth.currentUser) return;
      demarrer(auth.currentUser);
    }
  };
}

function ecranVerification(u) {
  centre(`
    <div class="bloc c-carte">
      <h2>📧 Vérifie ta boîte mail</h2>
      <p>Un lien de confirmation a été envoyé à <strong>${esc(u.email)}</strong>. Clique dessus (pense à regarder dans les spams), puis reviens ici.</p>
      <div class="boutons">
        <button class="btn btn-degrade" id="v-ok">J'ai confirmé mon e-mail</button>
        <button class="btn btn-neon" id="v-renvoi">Renvoyer l'e-mail</button>
      </div>
      <div id="v-msg"></div>
      <p><button class="btn-lien" id="c-deco">Se déconnecter</button></p>
    </div>`);
  $("#c-deco").onclick = () => signOut(auth);
  $("#v-renvoi").onclick = async () => {
    try { await sendEmailVerification(u, { url: location.origin + location.pathname }); $("#v-msg").innerHTML = `<p class="succes">E-mail renvoyé.</p>`; }
    catch (err) { $("#v-msg").innerHTML = `<p class="erreur">${esc(msgErreur(err))}</p>`; }
  };
  $("#v-ok").onclick = async () => {
    await reload(u).catch(() => {});
    const cu = auth.currentUser;
    if (cu && cu.emailVerified) { await cu.getIdToken(true).catch(() => {}); demarrer(cu); }
    else $("#v-msg").innerHTML = `<p class="erreur">Ton e-mail n'est pas encore confirmé. Clique sur le lien reçu par mail, puis réessaie.</p>`;
  };
}

function ecranFinaliserProfil(u) {
  centre(`
    <div class="bloc c-carte">
      <h2>Finalise ton profil</h2>
      <p>Il manque ton pseudo pour accéder à la communauté.</p>
      <form class="form" id="f-profil-init" novalidate>
        ${champsProfil()}
        ${casesAcceptation}
        <div id="f-msg"></div>
        <button class="btn btn-degrade" type="submit">Valider</button>
      </form>
      <p><button class="btn-lien" id="c-deco">Se déconnecter</button></p>
    </div>`);
  brancherReglement();
  $("#c-deco").onclick = () => signOut(auth);
  $("#f-profil-init").onsubmit = async e => {
    e.preventDefault();
    const f = e.target, pbs = [];
    validerProfil(f, pbs);
    if (pbs.length) { $("#f-msg").innerHTML = `<p class="erreur">Il faut : ${pbs.join(", ")}.</p>`; return; }
    try {
      if (!(await pseudoLibre(f.pseudo.value.trim()))) throw { code: "pseudo-pris" };
      await creerProfil(u, f.pseudo.value.trim(), f.plateforme.value);
      demarrer(u);
    } catch (err) {
      $("#f-msg").innerHTML = `<p class="erreur">${esc(err.code === "pseudo-pris" || err.code === "permission-denied" ? "Ce pseudo est déjà pris. Choisis-en un autre." : msgErreur(err))}</p>`;
    }
  };
}

// ---------- Navigation ----------
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
  quitterSalon();
  ({ chat: vueChat, activites: vueActivites, profil: vueProfil, admin: vueAdmin })[k]();
}

// ---------- CHAT ----------
function quitterSalon() {
  if (arretChat) { arretChat(); arretChat = null; }
}

function vueChat(prefill = "") {
  app.innerHTML = `
    <div class="c-chat">
      <div class="c-salons" role="tablist" aria-label="Salons">
        ${SALONS.map(s => `<button class="c-salon ${s.id === salonActif.id ? "actif" : ""}" data-id="${s.id}" title="${esc(s.description)}">${esc(s.nom)}</button>`).join("")}
      </div>
      <p class="note c-salon-desc">${esc(salonActif.description)}</p>
      <div class="c-fil" id="c-fil"><p class="note">Chargement des messages…</p></div>
      <form class="c-envoi" id="c-envoi">
        <input name="texte" maxlength="1000" autocomplete="off" placeholder="Écris un message (respecte le règlement)" aria-label="Message">
        <button class="btn btn-degrade" type="submit">Envoyer</button>
      </form>
    </div>`;
  app.querySelectorAll(".c-salon").forEach(b => b.onclick = () => {
    salonActif = SALONS.find(s => s.id === b.dataset.id) || SALONS[0];
    quitterSalon();
    vueChat();
  });
  const actif = app.querySelector(".c-salon.actif");
  if (actif && actif.scrollIntoView) actif.scrollIntoView({ inline: "center", block: "nearest" });
  const form = $("#c-envoi");
  if (prefill) { form.texte.value = prefill; form.texte.focus(); }
  form.onsubmit = async e => {
    e.preventDefault();
    const texte = form.texte.value.trim();
    if (!texte) return;
    if (Date.now() - dernierEnvoi < 3200) { toast("Doucement ! Attends quelques secondes entre deux messages.", true); return; }
    const b = form.querySelector("button"); b.disabled = true;
    try {
      const lot = writeBatch(db);
      lot.set(doc(collection(db, "messages")), {
        salonId: salonActif.id, auteurId: profil.id, auteurPseudo: profil.pseudo, auteurPlateforme: profil.plateforme,
        contenu: texte, masque: false, creeLe: serverTimestamp()
      });
      lot.update(doc(db, "profils", profil.id), { dernierMessage: serverTimestamp() });
      await lot.commit();
      dernierEnvoi = Date.now();
      form.texte.value = "";
    } catch (err) {
      toast(err.code === "permission-denied" ? "Message refusé : attends quelques secondes entre deux messages, et vérifie qu'il respecte le règlement." : msgErreur(err), true);
    }
    b.disabled = false;
  };
  ecouterSalon();
}

function ecouterSalon() {
  quitterSalon();
  const id = salonActif.id;
  const q = query(collection(db, "messages"), where("salonId", "==", id), where("masque", "==", false), orderBy("creeLe", "desc"), limit(60));
  let premier = true;
  arretChat = onSnapshot(q, snap => {
    if (salonActif.id !== id) return;
    afficherMessages(lignes(snap).reverse(), premier);
    premier = false;
  }, err => {
    const fil = $("#c-fil");
    if (fil) fil.innerHTML = `<p class="erreur">${esc(msgErreur(err))}</p>`;
  });
}

function afficherMessages(liste, versLeBas) {
  const fil = $("#c-fil");
  if (!fil) return;
  const enBas = fil.scrollHeight - fil.scrollTop - fil.clientHeight < 80;
  const admin = profil.role === "admin";
  fil.innerHTML = liste.length ? liste.map(m => {
    const moi = m.auteurId === profil.id;
    return `
    <div class="c-msg ${moi ? "moi" : ""}" data-id="${esc(m.id)}">
      <div class="c-msg-tete">
        <strong>${esc(m.auteurPseudo || "Membre")}</strong>
        ${m.auteurPlateforme && m.auteurPlateforme !== "Non précisé" ? `<span class="pastille">${esc(m.auteurPlateforme)}</span>` : ""}
        <time>${heure(m.creeLe)}</time>
      </div>
      <p>${esc(m.contenu)}</p>
      <div class="c-msg-actions">
        ${!moi ? `<button data-act="signaler" title="Signaler ce message">🚩 Signaler</button>` : ""}
        ${admin && !moi ? `<button data-act="masquer">🙈 Masquer</button>` : ""}
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
  try {
    if (act === "supprimer") await deleteDoc(doc(db, "messages", id));
    else await updateDoc(doc(db, "messages", id), { masque: true });
    toast(act === "supprimer" ? "Message supprimé." : "Message masqué.");
  } catch (err) { toast(msgErreur(err), true); }
}

async function signaler(type, cible) {
  const raison = prompt("Pourquoi signales-tu ce contenu ? (insulte, spam, triche, contenu choquant…)");
  if (raison === null) return;
  if (raison.trim().length < 3) { toast("Explique en quelques mots, s'il te plaît.", true); return; }
  try {
    await addDoc(collection(db, "signalements"), {
      auteurId: profil.id, auteurPseudo: profil.pseudo, typeCible: type, cibleId: String(cible),
      raison: raison.trim().slice(0, 300), statut: "ouvert", creeLe: serverTimestamp()
    });
    toast("Merci, ton signalement a été envoyé à la modération.");
  } catch (err) { toast(msgErreur(err), true); }
}

// ---------- RECHERCHE D'ACTIVITÉ ----------
function vueActivites() {
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
  $("#a-pf").onchange = afficherAnnonces;
  $("#a-act").onchange = afficherAnnonces;
  chargerAnnonces();
}

let annoncesPubliees = [];
async function chargerAnnonces() {
  try {
    const snap = await getDocs(query(collection(db, "annonces"), where("statut", "==", "publiee"), orderBy("creeLe", "desc"), limit(100)));
    annoncesPubliees = lignes(snap);
    afficherAnnonces();
  } catch (err) {
    const l = $("#a-liste"); if (l) l.innerHTML = `<p class="erreur">${esc(msgErreur(err))}</p>`;
  }
}

function afficherAnnonces() {
  const liste = $("#a-liste");
  if (!liste) return;
  const pf = $("#a-pf").value, act = $("#a-act").value;
  const res = annoncesPubliees.filter(a => (!pf || a.plateforme === pf) && (!act || a.activite.toLowerCase().includes(act.toLowerCase())));
  liste.innerHTML = res.length ? res.map(a => carteAnnonce(a, true)).join("")
    : `<p class="vide">${pf || act ? `Aucune annonce${pf ? " sur " + esc(pf) : ""}${act ? " pour « " + esc(act) + " »" : ""}. Essaie « Toutes plateformes » / « Toutes activités ».` : "Aucune annonce pour l'instant. Publie la première !"}</p>`;
  liste.querySelectorAll("[data-repondre]").forEach(b => b.onclick = () => {
    salonActif = SALONS.find(s => s.id === "entraide");
    onglet = "chat";
    $("#c-onglets").querySelectorAll("button").forEach(x => x.classList.toggle("actif", x.dataset.onglet === "chat"));
    vueChat(`@${b.dataset.repondre} `);
  });
  liste.querySelectorAll("[data-signaler]").forEach(b => b.onclick = () => signaler("annonce", b.dataset.signaler));
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
    if (Date.now() - derniereAnnonceLocale < 61000) { $("#fa-msg").innerHTML = `<p class="erreur">Attends une minute avant de publier une autre annonce.</p>`; return; }
    const b = f.querySelector("button[type=submit]"); b.disabled = true;
    try {
      const lot = writeBatch(db);
      lot.set(doc(collection(db, "annonces")), { ...v, auteurId: profil.id, auteurPseudo: profil.pseudo, statut: "en_attente", creeLe: serverTimestamp() });
      lot.update(doc(db, "profils", profil.id), { derniereAnnonce: serverTimestamp() });
      await lot.commit();
      derniereAnnonceLocale = Date.now();
      $("#zone-form").innerHTML = `<div class="succes">✅ Annonce envoyée ! Elle sera visible dès qu'elle aura été validée. Tu peux suivre son statut dans l'onglet Profil.</div>`;
    } catch (err) {
      b.disabled = false;
      $("#fa-msg").innerHTML = `<p class="erreur">${esc(err.code === "permission-denied" ? "Annonce refusée : attends une minute entre deux annonces et vérifie les champs." : msgErreur(err))}</p>`;
    }
  };
}

function carteAnnonce(a, actions) {
  const moi = a.auteurId === profil.id;
  return `
  <div class="bloc c-annonce">
    <div class="meta"><span class="pastille">${esc(a.plateforme)}</span><span class="pastille">👥 ${esc(a.places)} joueur${a.places > 1 ? "s" : ""}</span></div>
    <h3>${esc(a.activite)}</h3>
    <p><strong>🕒 ${esc(a.quand)}</strong></p>
    ${a.description ? `<p>${esc(a.description)}</p>` : ""}
    <p class="note">Par <strong>${esc(a.auteurPseudo || "Membre")}</strong> · ${heure(a.creeLe)}</p>
    ${actions && !moi ? `<div class="c-msg-actions"><button data-repondre="${esc(a.auteurPseudo || "")}">💬 Répondre dans le chat</button><button data-signaler="${esc(a.id)}">🚩 Signaler</button></div>` : ""}
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
        <p><a href="#" class="lien-regles">📜 Règlement de la communauté</a></p>
        <p><a href="index.html#/mentions">⚖️ Mentions légales et données personnelles</a></p>
        <button class="btn btn-plein" id="c-deco">Se déconnecter</button>
      </div>
    </div>`;
  brancherReglement();
  $("#c-deco").onclick = () => signOut(auth);
  $("#f-profil").onsubmit = async e => {
    e.preventDefault();
    const pf = e.target.plateforme.value;
    try { await updateDoc(doc(db, "profils", profil.id), { plateforme: pf }); profil.plateforme = pf; toast("Profil enregistré."); }
    catch (err) { toast(msgErreur(err), true); }
  };
  const z = $("#mes-annonces");
  let liste;
  try { liste = lignes(await getDocs(query(collection(db, "annonces"), where("auteurId", "==", profil.id)))).sort(parDate); }
  catch (err) { if (z) z.innerHTML = `<p class="erreur">${esc(msgErreur(err))}</p>`; return; }
  if (!$("#mes-annonces")) return;
  const ST = { en_attente: ["wait", "En attente de validation"], publiee: ["ok", "Publiée"], refusee: ["rum", "Refusée"], terminee: ["theo", "Terminée"] };
  z.innerHTML = liste.length ? liste.map(a => `
    <div class="c-ligne">
      <div><strong>${esc(a.activite)}</strong> · ${esc(a.plateforme)} · ${esc(a.quand)}<br><span class="statut ${(ST[a.statut] || ST.en_attente)[0]}">${(ST[a.statut] || ST.en_attente)[1]}</span></div>
      <button class="btn-lien" data-suppr="${esc(a.id)}">🗑️ Supprimer</button>
    </div>`).join("") : `<p class="vide">Tu n'as encore publié aucune annonce.</p>`;
  z.querySelectorAll("[data-suppr]").forEach(b => b.onclick = async () => {
    if (!confirm("Supprimer cette annonce ?")) return;
    try { await deleteDoc(doc(db, "annonces", b.dataset.suppr)); toast("Annonce supprimée."); vueProfil(); }
    catch (err) { toast(msgErreur(err), true); }
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
  const go = async (promesse, ok) => { try { await promesse; toast(ok); vueAdmin(); } catch (err) { toast(msgErreur(err), true); } };

  // Annonces en attente
  try {
    const ann = lignes(await getDocs(query(collection(db, "annonces"), where("statut", "==", "en_attente")))).sort((a, b) => -parDate(a, b));
    const za = $("#ad-annonces"); if (!za) return;
    za.innerHTML = ann.length ? ann.map(a => `
      <div class="c-modo">${carteAnnonce(a, false)}
        <div class="c-msg-actions"><button data-statut="publiee" data-id="${esc(a.id)}">✅ Publier</button><button data-statut="refusee" data-id="${esc(a.id)}">❌ Refuser</button></div>
      </div>`).join("") : `<p class="vide">Aucune annonce en attente. 👍</p>`;
    za.querySelectorAll("[data-statut]").forEach(b => b.onclick = () =>
      go(updateDoc(doc(db, "annonces", b.dataset.id), { statut: b.dataset.statut }), b.dataset.statut === "publiee" ? "Annonce publiée." : "Annonce refusée."));
  } catch (err) { const za = $("#ad-annonces"); if (za) za.innerHTML = `<p class="erreur">${esc(msgErreur(err))}</p>`; }

  // Signalements
  try {
    const sig = lignes(await getDocs(query(collection(db, "signalements"), where("statut", "==", "ouvert")))).sort((a, b) => -parDate(a, b));
    const blocs = [];
    for (const s of sig) {
      let cible = "", auteurCible = null;
      if (s.typeCible === "message" || s.typeCible === "annonce") {
        const d = await getDoc(doc(db, s.typeCible === "message" ? "messages" : "annonces", s.cibleId)).catch(() => null);
        if (d && d.exists()) {
          const c = d.data(); auteurCible = c.auteurId;
          cible = s.typeCible === "message"
            ? `<blockquote>« ${esc(c.contenu)} »<br><small>— ${esc(c.auteurPseudo || "?")}${c.masque ? " · déjà masqué" : ""}</small></blockquote>`
            : `<blockquote>${esc(c.activite)} — ${esc(c.description)}<br><small>— ${esc(c.auteurPseudo || "?")}</small></blockquote>`;
        } else cible = `<p class="note">Contenu déjà supprimé.</p>`;
      } else { auteurCible = s.cibleId; cible = `<p class="note">Signalement d'un membre.</p>`; }
      blocs.push(`
        <div class="c-modo">
          <p><span class="pastille">${esc(s.typeCible)}</span> signalé par <strong>${esc(s.auteurPseudo || "?")}</strong> · ${heure(s.creeLe)}</p>
          <p>Raison : <em>${esc(s.raison)}</em></p>
          ${cible}
          <div class="c-msg-actions">
            ${s.typeCible === "message" ? `<button data-masquer="${esc(s.cibleId)}">🙈 Masquer le message</button>` : ""}
            ${s.typeCible === "annonce" ? `<button data-refuser="${esc(s.cibleId)}">❌ Retirer l'annonce</button>` : ""}
            ${auteurCible && auteurCible !== profil.id ? `<button data-bannir="${esc(auteurCible)}">⛔ Suspendre l'auteur</button>` : ""}
            <button data-traite="${esc(s.id)}">✔️ Marquer traité</button>
          </div>
        </div>`);
    }
    const zs = $("#ad-signal"); if (!zs) return;
    zs.innerHTML = blocs.length ? blocs.join("") : `<p class="vide">Aucun signalement ouvert. 👍</p>`;
    zs.querySelectorAll("[data-masquer]").forEach(b => b.onclick = () => go(updateDoc(doc(db, "messages", b.dataset.masquer), { masque: true }), "Message masqué."));
    zs.querySelectorAll("[data-refuser]").forEach(b => b.onclick = () => go(updateDoc(doc(db, "annonces", b.dataset.refuser), { statut: "refusee" }), "Annonce retirée."));
    zs.querySelectorAll("[data-bannir]").forEach(b => b.onclick = () => { if (confirm("Suspendre ce membre ? Il ne pourra plus rien publier.")) go(updateDoc(doc(db, "profils", b.dataset.bannir), { banni: true }), "Membre suspendu."); });
    zs.querySelectorAll("[data-traite]").forEach(b => b.onclick = () => go(updateDoc(doc(db, "signalements", b.dataset.traite), { statut: "traite" }), "Signalement traité."));
  } catch (err) { const zs = $("#ad-signal"); if (zs) zs.innerHTML = `<p class="erreur">${esc(msgErreur(err))}</p>`; }

  // Membres suspendus
  try {
    const ban = lignes(await getDocs(query(collection(db, "profils"), where("banni", "==", true)))).sort((a, b) => a.pseudo.localeCompare(b.pseudo));
    const zb = $("#ad-bannis"); if (!zb) return;
    zb.innerHTML = ban.length ? ban.map(p => `<div class="c-ligne"><strong>${esc(p.pseudo)}</strong><button class="btn-lien" data-debannir="${esc(p.id)}">↩️ Réactiver</button></div>`).join("") : `<p class="vide">Aucun membre suspendu.</p>`;
    zb.querySelectorAll("[data-debannir]").forEach(b => b.onclick = () => go(updateDoc(doc(db, "profils", b.dataset.debannir), { banni: false }), "Membre réactivé."));
  } catch (err) { const zb = $("#ad-bannis"); if (zb) zb.innerHTML = `<p class="erreur">${esc(msgErreur(err))}</p>`; }
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
