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
  { id: "paleto",   nom: "Paleto Bay",               x: 150, y: 70 },
  { id: "chiliad",  nom: "Mont Chiliad",             x: 170, y: 140 },
  { id: "raton",    nom: "Raton Canyon",             x: 95,  y: 190 },
  { id: "gordo",    nom: "Mont Gordo",               x: 305, y: 205 },
  { id: "sandy",    nom: "Sandy Shores / Alamo Sea", x: 235, y: 265 },
  { id: "vinewood", nom: "Collines de Vinewood",     x: 215, y: 415 },
  { id: "centre",   nom: "Centre de Los Santos",     x: 220, y: 480 },
  { id: "plage",    nom: "Plage de Vespucci",        x: 140, y: 495 },
  { id: "port",     nom: "Port de Los Santos",       x: 240, y: 560 },
  { id: "partout",  nom: "Partout sur la carte",     x: null, y: null }
];

// statut : "verifie" | "theorie" | "rumeur" | "a-verifier"
// testeEnJeu : true seulement quand l'équipe a reproduit le détail elle-même
const FICHES = [
  {
    id: "fantome-mont-gordo",
    titre: "Le fantôme du Mont Gordo",
    categorie: "mysteres",
    resume: "Chaque nuit, une silhouette fantomatique flotte au sommet du Mont Gordo.",
    explication: "Entre 23 h et minuit (heure du jeu), une apparition féminine se montre sur le pic est du Mont Gordo. Sous elle, le mot « JOCK » est écrit en rouge. Si tu t'approches trop, elle disparaît, puis revient quand tu recules. Un article de journal consultable sur l'internet du jeu permet de l'identifier : il s'agirait de Jolene Cranley-Evans, l'épouse du politicien Jock Cranley.",
    etapes: [
      "Rends-toi sur le pic est du Mont Gordo (nord-est de la carte).",
      "Attends entre 23 h et minuit (heure du jeu).",
      "Garde tes distances : le fantôme s'efface si tu t'approches trop."
    ],
    lieu: "gordo",
    moment: "Chaque nuit, entre 23 h et minuit (heure du jeu)",
    personnage: "Tous",
    mission: "Aucune (exploration libre)",
    difficulte: "Facile",
    statut: "verifie",
    testeEnJeu: false,
    spoiler: false,
    populaire: true,
    date: "2026-11-01",
    sources: [
      { nom: "GTA Wiki — Secrets and Easter Eggs in GTA V", url: "https://gta.wiki/w/Secrets_and_Easter_Eggs_in_GTA_V" },
      { nom: "Game Informer — How to find the ghost in GTA V (2013)", url: "https://www.gameinformer.com/b/features/archive/2013/09/25/how-to-find-the-ghost-in-grand-theft-auto-v.aspx" }
    ]
  },
  {
    id: "ovni-chiliad",
    titre: "L'OVNI au-dessus du Mont Chiliad",
    categorie: "mysteres",
    resume: "Une soucoupe qui ne se montre qu'aux joueurs ayant terminé le jeu à 100 %.",
    explication: "Une fois la progression à 100 % atteinte, un OVNI apparaît au-dessus du sommet du Mont Chiliad, mais seulement à 3 h du matin (heure du jeu) et par temps d'orage. La fresque de la station du téléphérique et une inscription près du panneau d'information au sommet seraient des indices qui annonçaient cette rencontre.",
    etapes: [
      "Atteins 100 % de progression en mode histoire.",
      "Monte au sommet du Mont Chiliad.",
      "Attends 3 h du matin (heure du jeu) par temps d'orage et lève les yeux."
    ],
    lieu: "chiliad",
    moment: "3 h du matin, par temps d'orage, après 100 %",
    personnage: "Tous",
    mission: "Après 100 % de progression",
    difficulte: "Difficile",
    statut: "verifie",
    testeEnJeu: false,
    spoiler: true,
    populaire: true,
    date: "2026-11-01",
    sources: [
      { nom: "GTA Wiki — Secrets and Easter Eggs in GTA V", url: "https://gta.wiki/w/Secrets_and_Easter_Eggs_in_GTA_V" },
      { nom: "GTA Wiki — Mount Chiliad", url: "https://gta.wiki/w/Mount_Chiliad_(HD_Universe)" }
    ]
  },
  {
    id: "fresque-chiliad",
    titre: "La fresque énigmatique du Mont Chiliad",
    categorie: "mysteres",
    resume: "La peinture murale qui alimente les théories des joueurs depuis 2013.",
    explication: "À la station du téléphérique du Mont Chiliad, une fresque montre notamment un œuf, un OVNI et une silhouette équipée d'un jetpack. Rockstar n'en a jamais donné d'explication officielle. Une lecture répandue y voit un indice vers les OVNI du jeu. En 2025, un vidéaste a proposé une interprétation : la fresque inviterait simplement à monter très haut pour trouver les OVNI. C'est une théorie séduisante, mais pas une confirmation.",
    etapes: [
      "Prends le téléphérique jusqu'au sommet du Mont Chiliad.",
      "Cherche la fresque à la station d'arrivée.",
      "Compare les symboles avec la fiche « L'OVNI au-dessus du Mont Chiliad »."
    ],
    lieu: "chiliad",
    moment: "À tout moment",
    personnage: "Tous",
    mission: "Aucune",
    difficulte: "Facile",
    statut: "theorie",
    testeEnJeu: false,
    spoiler: false,
    populaire: true,
    date: "2026-11-01",
    sources: [
      { nom: "GTA Wiki — Secrets and Easter Eggs in GTA V", url: "https://gta.wiki/w/Secrets_and_Easter_Eggs_in_GTA_V" },
      { nom: "OpenCritic — interprétation de la fresque (2025)", url: "https://opencritic.com/news/19747/after-12-years-one-of-grand-theft-autos-biggest-mysteries-has-been-solved" }
    ]
  },
  {
    id: "rumeur-jetpack",
    titre: "Un jetpack caché en mode histoire ?",
    categorie: "mysteres",
    resume: "La rumeur la plus célèbre liée à la fresque du Mont Chiliad.",
    explication: "Pendant des années, des joueurs ont cru qu'un jetpack pouvait être débloqué en solo en résolvant le mystère du Mont Chiliad. En 2015, des joueurs PC ont pu fouiller des zones habituellement fermées du jeu et n'y ont trouvé aucun jetpack. Aucune preuve fiable n'a été apportée depuis : on classe donc cette affirmation comme rumeur.",
    etapes: [
      "Aucune méthode n'a jamais été confirmée.",
      "Méfie-toi des vidéos qui promettent une « méthode secrète » sans preuve."
    ],
    lieu: "chiliad",
    moment: "—",
    personnage: "—",
    mission: "—",
    difficulte: "Difficile",
    statut: "rumeur",
    testeEnJeu: false,
    spoiler: false,
    populaire: false,
    date: "2026-11-01",
    sources: [
      { nom: "GamesRadar — The great GTA 5 UFO mystery is over (2015)", url: "https://gamesradar.com/gta-5-jetpack-ufo-mystery" }
    ]
  },
  {
    id: "plantes-peyotl",
    titre: "Les plantes qui te transforment en animal",
    categorie: "faune",
    resume: "27 plantes cachées permettent d'incarner un animal… et même Bigfoot.",
    explication: "Dans la version améliorée du jeu (PS4, Xbox One, PC et suivantes), 27 plantes de peyotl sont cachées dans des coins isolés. En consommer une te fait halluciner : tu joues brièvement un animal (chien, oiseau, cochon…). Une plante dorée spéciale existe aussi : elle permet de jouer Bigfoot, mais seulement après le 100 %, la mission « The Last One » et la collecte de toutes les autres plantes.",
    etapes: [
      "Explore les zones sauvages, les plages et les fonds marins.",
      "Repère une petite plante isolée et interagis avec elle.",
      "Pour la plante dorée : Raton Canyon, le mardi entre 5 h 30 et 8 h, par temps de neige ou de brouillard."
    ],
    lieu: "partout",
    moment: "Plantes normales : à tout moment · Plante dorée : mardi 5 h 30–8 h",
    personnage: "Tous",
    mission: "Aucune",
    difficulte: "Moyen",
    statut: "verifie",
    testeEnJeu: false,
    spoiler: false,
    populaire: true,
    date: "2026-11-01",
    sources: [
      { nom: "Gamer Guides — Peyote Plant", url: "https://www.gamerguides.com/grand-theft-auto-v/guide/collectibles/peyote-plant" },
      { nom: "GTA Myths Wiki — Peyote", url: "https://gta-myths.fandom.com/wiki/Peyote" }
    ]
  },
  {
    id: "fragments-lettre",
    titre: "Les 50 fragments de lettre et le meurtre de Leonora Johnson",
    categorie: "mysteres",
    resume: "Des morceaux de papier dispersés forment une confession de meurtre.",
    explication: "50 fragments de lettre sont cachés dans Los Santos et Blaine County. Michael, Franklin et Trevor peuvent tous en ramasser. Une fois réunis, ils forment une lettre de confession datée de 1975, qui révèle le coupable du meurtre de l'actrice Leonora Johnson. Seul Franklin peut ensuite confronter le meurtrier lors de la mission « A Starlet in Vinewood ».",
    etapes: [
      "Ramasse les fragments : ils bruissent dans le vent quand tu es proche.",
      "Avec Franklin, Chop peut t'aider à les repérer.",
      "Une fois les 50 réunis, lance « A Starlet in Vinewood » avec Franklin."
    ],
    lieu: "partout",
    moment: "À tout moment",
    personnage: "Franklin (confrontation finale)",
    mission: "A Starlet in Vinewood",
    difficulte: "Difficile",
    statut: "verifie",
    testeEnJeu: false,
    spoiler: true,
    populaire: false,
    date: "2026-11-01",
    sources: [
      { nom: "Grand Theft Wiki — Letter Scraps", url: "https://www.grandtheftwiki.com/Letter_Scraps" }
    ]
  },
  {
    id: "traque-sasquatch",
    titre: "La traque du sasquatch",
    categorie: "missions",
    resume: "La toute dernière mission du jeu, réservée aux joueurs à 100 %.",
    explication: "Une fois les 100 % atteints, Franklin peut rencontrer un chasseur à Raton Canyon qui traque un sasquatch. La poursuite à travers la forêt réserve une révélation inattendue sur la vraie nature de la « créature ». C'est la mission « The Last One », un clin d'œil aux légendes de Bigfoot.",
    etapes: [
      "Termine le jeu à 100 %.",
      "Avec Franklin, rends-toi au nouveau marqueur à Raton Canyon.",
      "Suis la piste jusqu'au bout."
    ],
    lieu: "raton",
    moment: "Après 100 %",
    personnage: "Franklin",
    mission: "The Last One",
    difficulte: "Difficile",
    statut: "verifie",
    testeEnJeu: false,
    spoiler: true,
    populaire: false,
    date: "2026-11-01",
    sources: [
      { nom: "GTABase — The Last One", url: "https://gtabase.com/grand-theft-auto-v/strangers/the-last-one" }
    ]
  }
];

const STATUTS = {
  "verifie":    { nom: "Vérifié",    classe: "ok",   aide: "Confirmé par des sources de référence." },
  "theorie":    { nom: "Théorie",    classe: "theo", aide: "Interprétation plausible, mais rien d'officiel." },
  "rumeur":     { nom: "Rumeur",     classe: "rum",  aide: "Affirmation sans preuve fiable à ce jour." },
  "a-verifier": { nom: "À vérifier", classe: "wait", aide: "En attente de sources fiables." }
};
