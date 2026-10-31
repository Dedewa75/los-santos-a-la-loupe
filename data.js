// =====================================================
// FICHIER 3/4 — data.js : le contenu du site
// Pour ajouter une découverte : copie un bloc { ... } dans FICHES
// =====================================================

const CATEGORIES = [
  { id: "mysteres",    nom: "Mystères",    icone: "🔍", couleur: "#8b5cf6" },
  { id: "easter-eggs", nom: "Easter eggs", icone: "🥚", couleur: "#f59e0b" },
  { id: "personnages", nom: "Personnages", icone: "🎭", couleur: "#ec4899" },
  { id: "lieux",       nom: "Lieux",       icone: "📍", couleur: "#14b8a6" },
  { id: "missions",    nom: "Missions",    icone: "🎯", couleur: "#ef4444" },
  { id: "vehicules",   nom: "Véhicules",   icone: "🚗", couleur: "#3b82f6" },
  { id: "faune",       nom: "Faune",       icone: "🦌", couleur: "#22c55e" },
  { id: "radio",       nom: "Radio",       icone: "📻", couleur: "#f97316" },
  { id: "references",  nom: "Références",  icone: "🎬", couleur: "#06b6d4" }
];

// Lieux de la carte schématique (x, y = position sur le dessin, pas une vraie carte)
const LIEUX = [
  { id: "paleto",       nom: "Paleto Bay",          x: 150, y: 70 },
  { id: "chiliad",      nom: "Mont Chiliad",        x: 170, y: 140 },
  { id: "gordon",       nom: "Mont Gordon",         x: 305, y: 205 },
  { id: "sandy",        nom: "Sandy Shores / Alamo Sea", x: 235, y: 265 },
  { id: "foret",        nom: "Forêts du nord",      x: 95,  y: 185 },
  { id: "vinewood",     nom: "Collines de Vinewood", x: 215, y: 415 },
  { id: "centre",       nom: "Centre de Los Santos", x: 220, y: 480 },
  { id: "plage",        nom: "Plage de Vespucci",   x: 140, y: 495 },
  { id: "port",         nom: "Port de Los Santos",  x: 240, y: 560 },
  { id: "partout",      nom: "Partout sur la carte", x: null, y: null }
];

// statut : "verifie" | "theorie" | "rumeur" | "a-verifier"
// ⚠️ Toutes les fiches ci-dessous sont des EXEMPLES DE DÉMONSTRATION
// à vérifier en jeu et à sourcer avant publication.
const FICHES = [
  {
    id: "fantome-mont-gordon",
    exemple: true,
    titre: "Le fantôme du Mont Gordon",
    categorie: "mysteres",
    resume: "Une silhouette fantomatique apparaîtrait la nuit au sommet du Mont Gordon.",
    explication: "Selon de nombreux joueurs, une apparition féminine se montre à une heure précise de la nuit sur le Mont Gordon, avec une inscription au sol à proximité. Le fantôme disparaît quand on s'approche trop. C'est l'un des mystères les plus partagés de la communauté.",
    etapes: [
      "Rends-toi au sommet du Mont Gordon (nord-est de la carte).",
      "Attends la nuit, entre 23 h et minuit (heure du jeu).",
      "Observe les rochers depuis une certaine distance, sans foncer dessus."
    ],
    lieu: "gordon",
    moment: "Nuit, entre 23 h et minuit (heure du jeu) — à confirmer",
    personnage: "Tous",
    mission: "Aucune (exploration libre)",
    difficulte: "Moyen",
    statut: "a-verifier",
    spoiler: false,
    populaire: true,
    date: "2026-10-28",
    sources: []
  },
  {
    id: "ovni-chiliad",
    exemple: true,
    titre: "L'OVNI au-dessus du Mont Chiliad",
    categorie: "mysteres",
    resume: "Une soucoupe volante qui ne se montrerait qu'aux joueurs ayant tout terminé.",
    explication: "D'après la communauté, un OVNI apparaît au-dessus du sommet du Mont Chiliad, mais seulement sous des conditions très strictes : progression complète du mode histoire, heure précise et météo pluvieuse.",
    etapes: [
      "Atteins 100 % de progression en mode histoire.",
      "Va au sommet du Mont Chiliad.",
      "Attends 3 h du matin (heure du jeu) par temps de pluie, puis regarde vers le ciel."
    ],
    lieu: "chiliad",
    moment: "Vers 3 h du matin, sous la pluie, après 100 % — à confirmer",
    personnage: "Tous",
    mission: "Après la fin de l'histoire",
    difficulte: "Difficile",
    statut: "a-verifier",
    spoiler: true,
    populaire: true,
    date: "2026-10-27",
    sources: []
  },
  {
    id: "fresque-chiliad",
    exemple: true,
    titre: "La fresque énigmatique du Mont Chiliad",
    categorie: "mysteres",
    resume: "Une peinture murale mystérieuse qui alimente les théories depuis la sortie du jeu.",
    explication: "Une fresque près du sommet du Mont Chiliad montrerait plusieurs symboles (un OVNI, un œuf, une silhouette…). Beaucoup de joueurs y voient un indice vers un secret caché. Aucune explication officielle n'a été donnée : son sens exact reste une théorie.",
    etapes: [
      "Monte au sommet du Mont Chiliad (le téléphérique facilite l'accès).",
      "Cherche la fresque près de la station d'arrivée.",
      "Observe les symboles et compare avec les théories de la communauté."
    ],
    lieu: "chiliad",
    moment: "À tout moment",
    personnage: "Tous",
    mission: "Aucune",
    difficulte: "Facile",
    statut: "theorie",
    spoiler: false,
    populaire: true,
    date: "2026-10-25",
    sources: []
  },
  {
    id: "rumeur-jetpack",
    exemple: true,
    titre: "Un jetpack caché en mode histoire ?",
    categorie: "mysteres",
    resume: "La rumeur la plus célèbre liée à la fresque du Mont Chiliad.",
    explication: "Pendant des années, des joueurs ont affirmé qu'un jetpack pouvait être débloqué en solo en résolvant le mystère du Mont Chiliad. À ce jour, nous n'avons trouvé aucune preuve fiable de cette affirmation. Nous la classons donc comme rumeur.",
    etapes: [
      "Aucune méthode confirmée.",
      "Méfie-toi des vidéos qui promettent une « méthode secrète » sans preuve."
    ],
    lieu: "chiliad",
    moment: "—",
    personnage: "—",
    mission: "—",
    difficulte: "Difficile",
    statut: "rumeur",
    spoiler: false,
    populaire: false,
    date: "2026-10-24",
    sources: []
  },
  {
    id: "plantes-peyotl",
    exemple: true,
    titre: "Les plantes qui te transforment en animal",
    categorie: "faune",
    resume: "Des plantes cachées permettent d'incarner temporairement un animal.",
    explication: "Dans les versions remasterisées du jeu, des plantes dissimulées un peu partout permettraient, une fois consommées, de jouer brièvement un animal : chien, oiseau, poisson… Un des détails les plus fun à chasser.",
    etapes: [
      "Explore les zones sauvages, plages et fonds marins.",
      "Repère une petite plante isolée et interagis avec elle.",
      "Profite de la séquence en tant qu'animal."
    ],
    lieu: "partout",
    moment: "Selon la plante (certaines dépendent du jour ou de l'heure) — à confirmer",
    personnage: "Tous",
    mission: "Aucune",
    difficulte: "Moyen",
    statut: "a-verifier",
    spoiler: false,
    populaire: true,
    date: "2026-10-30",
    sources: []
  },
  {
    id: "fragments-lettre",
    exemple: true,
    titre: "Les fragments de lettre et l'histoire d'un meurtre",
    categorie: "references",
    resume: "Des morceaux de lettre dispersés racontent une sombre affaire criminelle.",
    explication: "Des fragments de lettre sont cachés dans tout Los Santos et Blaine County. Une fois réunis, ils révèleraient l'histoire d'un meurtre, que certains joueurs rapprochent d'une célèbre affaire criminelle américaine non résolue. Le lien avec cette affaire reste une interprétation.",
    etapes: [
      "Cherche les fragments (petits papiers) dans les lieux insolites.",
      "Collecte-les tous pour débloquer la suite de l'histoire.",
      "Suis la piste finale révélée par la lettre complète."
    ],
    lieu: "partout",
    moment: "À tout moment",
    personnage: "À vérifier",
    mission: "Collection libre",
    difficulte: "Difficile",
    statut: "a-verifier",
    spoiler: true,
    populaire: false,
    date: "2026-10-29",
    sources: []
  },
  {
    id: "chasse-forestiere",
    exemple: true,
    titre: "La dernière chasse de Trevor",
    categorie: "missions",
    resume: "Une mission très particulière qui ne se débloque qu'à la toute fin.",
    explication: "Une mission spéciale serait accessible uniquement après avoir atteint 100 %. Elle emmène Trevor dans les forêts du nord pour une traque inhabituelle, clin d'œil à une célèbre créature de légende.",
    etapes: [
      "Termine le jeu à 100 %.",
      "Avec Trevor, cherche le nouveau marqueur dans les forêts du nord.",
      "Suis les traces jusqu'au bout."
    ],
    lieu: "foret",
    moment: "Après 100 %",
    personnage: "Trevor",
    mission: "Mission post-100 %",
    difficulte: "Difficile",
    statut: "a-verifier",
    spoiler: true,
    populaire: false,
    date: "2026-10-31",
    sources: []
  }
];

const STATUTS = {
  "verifie":    { nom: "Vérifié",     classe: "ok",    aide: "Testé en jeu et confirmé par des sources fiables." },
  "theorie":    { nom: "Théorie",     classe: "theo",  aide: "Interprétation plausible, mais rien d'officiel." },
  "rumeur":     { nom: "Rumeur",      classe: "rum",   aide: "Affirmation sans preuve fiable à ce jour." },
  "a-verifier": { nom: "À vérifier",  classe: "wait",  aide: "Exemple en attente de test en jeu et de sources." }
};
