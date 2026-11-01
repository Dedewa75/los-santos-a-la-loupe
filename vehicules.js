// =====================================================
// FICHIER 5/5 — vehicules.js : fiches techniques des véhicules
// Données relevées le 1er novembre 2026 (sources sur chaque fiche).
// Pour ajouter un véhicule : copie un bloc { ... } dans VEHICULES.
// histoire.dispo : true = disponible · false = absent · null = non confirmé
// =====================================================

const TYPES_VEHICULE = {
  voiture: { nom: "Voiture", icone: "🏎️" },
  moto: { nom: "Moto", icone: "🏍️" },
  helico: { nom: "Hélicoptère", icone: "🚁" },
  avion: { nom: "Avion", icone: "✈️" }
};

const src = nom => ({ nom: "GTABase — " + nom, url: "https://www.gtabase.com/grand-theft-auto-v/vehicles/" + nom.toLowerCase().replace(/[()]/g, "").replace(/\s+/g, "-") });

const VEHICULES = [
  {
    id: "adder", nom: "Adder", marque: "Truffade", classe: "Super", type: "voiture",
    places: 2, transmission: "Intégrale (AWD)", inspiration: "Bugatti Veyron Super Sport, Saab Aero-X",
    vitesse: { kmh: 203.2, mph: 126.25 }, tour: "1:04.365", sortie: "17 septembre 2013 (jeu de base)",
    histoire: { dispo: true, texte: "Achetable 1 000 000 $ sur internet, ou à voler devant le magasin Sessanta Nove, Portola Drive (Rockford Hills). Apparaît dans les missions « Blitz Play » et « I Fought the Law… »." },
    online: { prix: 1000000, vendeur: "Legendary Motorsport", texte: "Peut aussi être une cible des « Exotic Exports » (Auto Shop)." },
    ameliorations: ["Los Santos Customs ou atelier de véhicule", "Amélioration complète : 263 500 GTA$", "Non blindé"],
    caches: ["Sa description dans le jeu promet plus de 400 km/h (250 mph)… alors qu'en vrai, elle plafonne autour de 203 km/h.", "Devin Weston, personnage de l'histoire, en possède une."],
    sources: [src("Truffade Adder")]
  },
  {
    id: "zentorno", nom: "Zentorno", marque: "Pegassi", classe: "Super", type: "voiture",
    places: 2, transmission: "Intégrale (AWD)", inspiration: "Lamborghini Veneno, Sesto Elemento, Aventador",
    vitesse: { kmh: 196.7, mph: 122.25 }, tour: "1:00.878", sortie: "13 mai 2014 (mise à jour High Life)",
    histoire: { dispo: true, texte: "Achetable 725 000 $, ou à voler près des Los Santos Customs (Burton, aéroport, La Mesa)." },
    online: { prix: 725000, vendeur: "Legendary Motorsport", texte: "" },
    ameliorations: ["Amélioration complète : 338 939 GTA$", "Brouilleur anti-missiles", "Arrière pare-balles (pas de vitre arrière)"],
    caches: ["Comme elle n'a pas de lunette arrière, les balles tirées par l'arrière ne passent pas.", "Supercar hybride électrique selon le jeu."],
    sources: [src("Pegassi Zentorno")]
  },
  {
    id: "t20", nom: "T20", marque: "Progen", classe: "Super", type: "voiture",
    places: 2, transmission: "Intégrale (AWD)", inspiration: "McLaren P1, Tushek T600, Falcon F7",
    vitesse: { kmh: 197.1, mph: 122.5 }, tour: "1:00.778", sortie: "8 juillet 2015 (Ill-Gotten Gains, partie 2)",
    histoire: { dispo: true, texte: "Achetable 2 200 000 $ sur l'internet du jeu." },
    online: { prix: 2200000, vendeur: "Legendary Motorsport", texte: "" },
    ameliorations: ["Amélioration complète : 280 700 GTA$", "Aileron actif", "Non blindé"],
    caches: ["Son aileron arrière se déploie tout seul en roulant (aileron actif)."],
    sources: [src("Progen T20")]
  },
  {
    id: "turismo-r", nom: "Turismo R", marque: "Grotti", classe: "Super", type: "voiture",
    places: 2, transmission: "Propulsion (RWD)", inspiration: "LaFerrari, McLaren P1",
    vitesse: { kmh: 197.1, mph: 122.5 }, tour: "1:01.578", sortie: "4 mars 2014 (mise à jour Business)",
    histoire: { dispo: true, texte: "Achetable 500 000 $, ou à voler (rarement dans la circulation, Los Santos Customs de Burton, Portola Drive, hôtel Gentry Manor…)." },
    online: { prix: 500000, vendeur: "Legendary Motorsport", texte: "Offerte avec le Criminal Enterprise Starter Pack." },
    ameliorations: ["Amélioration complète : 342 300 GTA$", "Non blindée"],
    caches: ["Sa description annonce environ 338 km/h (210 mph) : la vitesse mesurée est bien plus basse."],
    sources: [{ nom: "GTABase — Grotti Turismo R", url: "https://gtabase.com/grand-theft-auto-v/vehicles/grotti-turismo-r" }]
  },
  {
    id: "infernus", nom: "Infernus", marque: "Pegassi", classe: "Super", type: "voiture",
    places: 2, transmission: "Intégrale (AWD)", inspiration: null,
    vitesse: { kmh: 190, mph: 118 }, tour: "1:02.462", sortie: "1er octobre 2013 (lancement de GTA Online)",
    histoire: { dispo: null, texte: "" },
    online: { prix: 440000, vendeur: "Premium Deluxe Motorsport (rotation hebdomadaire)", texte: "Actuellement retirée de la vente. Vue pour la dernière fois en vente le 18 septembre 2024." },
    ameliorations: ["Compatible Imani Tech (brouilleur anti-missiles : 400 000 GTA$)", "Blindage jusqu'à 100 % : 50 000 GTA$"],
    caches: ["Un des noms les plus anciens de la série : l'Infernus existe dans les GTA depuis des années."],
    sources: [{ nom: "GTABoss — Pegassi Infernus", url: "https://www.gtaboss.gg/gta-5-online/vehicles/pegassi-infernus" }]
  },
  {
    id: "krieger", nom: "Krieger", marque: "Benefactor", classe: "Super", type: "voiture",
    places: 2, transmission: "Intégrale (AWD)", inspiration: "Mercedes-AMG One, Audi R8 LMS GT3",
    vitesse: { kmh: 206, mph: 128 }, tour: "0:57.924", sortie: "12 septembre 2019 (Diamond Casino & Resort)",
    histoire: { dispo: null, texte: "" },
    online: { prix: 2875000, vendeur: "Legendary Motorsport", texte: "Peut être une cible des « Exotic Exports »." },
    ameliorations: ["Amélioration complète : 339 600 GTA$", "Brouilleur anti-missiles", "Arrière pare-balles"],
    caches: ["Sa description s'inspire de la technologie des monoplaces de course."],
    sources: [{ nom: "GTABase — Benefactor Krieger", url: "https://www.gtabase.com/grand-theft-auto-v/vehicles/krieger" }]
  },
  {
    id: "pariah", nom: "Pariah", marque: "Ocelot", classe: "Sport", type: "voiture",
    places: 2, transmission: "Propulsion (RWD)", inspiration: "Aston Martin V12 Zagato, Ferrari 812 Superfast, Jaguar F-Type",
    vitesse: { kmh: 218.9, mph: 136 }, tour: "1:00.644", sortie: "12 décembre 2017 (The Doomsday Heist)",
    histoire: { dispo: null, texte: "" },
    online: { prix: 1420000, vendeur: "Legendary Motorsport", texte: "" },
    ameliorations: ["Amélioration complète : 352 230 GTA$", "Blindage 100 % : 50 000 GTA$", "Non blindée"],
    caches: ["Classée « Sport », elle bat pourtant en vitesse de pointe toutes les supercars de cette liste."],
    sources: [src("Ocelot Pariah")]
  },
  {
    id: "comet-sr", nom: "Comet SR", marque: "Pfister", classe: "Sport", type: "voiture",
    places: 2, transmission: "Propulsion (RWD)", inspiration: "Porsche 997 GT2 RS",
    vitesse: { kmh: 196.3, mph: 122 }, tour: "1:01.778", sortie: "27 février 2018",
    histoire: { dispo: null, texte: "" },
    online: { prix: 1145000, vendeur: "Legendary Motorsport", texte: "Peut être une cible des « Exotic Exports »." },
    ameliorations: ["Amélioration complète : 327 550 GTA$", "Brouilleur anti-missiles", "Non blindée"],
    caches: ["Variante du Comet classique, la marque Pfister étant le clin d'œil du jeu à Porsche."],
    sources: [{ nom: "GTABase — Pfister Comet SR", url: "https://www.gtabase.com/grand-theft-auto-v/vehicles/Pfister-Comet-SR" }]
  },
  {
    id: "banshee", nom: "Banshee", marque: "Bravado", classe: "Sport", type: "voiture",
    places: 2, transmission: "Propulsion (RWD)", inspiration: null,
    vitesse: { kmh: 190.7, mph: 118.5 }, tour: "1:05.131", sortie: "1er octobre 2013 (lancement de GTA Online)",
    histoire: { dispo: null, texte: "" },
    online: { prix: 105000, vendeur: "Legendary Motorsport", texte: "" },
    ameliorations: ["Modifiable chez Los Santos Customs, au LS Car Meet, chez Benny's et chez Hao (HSW)", "Conversion HSW : 1 840 000 GTA$ (consoles PS5/Xbox Series et PC Enhanced)", "Avec HSW : environ 246 km/h (152,75 mph) et 1:00.677 au tour"],
    caches: ["La conversion Hao's Special Works transforme cette sportive bon marché en machine à records."],
    sources: [{ nom: "GTABoss — Bravado Banshee", url: "https://www.gtaboss.gg/gta-5-online/vehicles/bravado-banshee" }]
  },
  {
    id: "elegy-rh8", nom: "Elegy RH8", marque: "Annis", classe: "Sport", type: "voiture",
    places: 2, transmission: "Intégrale (AWD)", inspiration: "Nissan GT-R R35",
    vitesse: { kmh: 191.1, mph: 118.75 }, tour: "1:02.279", sortie: "17 septembre 2013 (jeu de base)",
    histoire: { dispo: true, texte: "Bonus pour les comptes Rockstar Social Club : disponible dans le garage de chaque personnage, menu « Special Vehicles »." },
    online: { prix: 95000, vendeur: "Legendary Motorsport / Benny's", texte: "Gratuite avec un compte Rockstar Social Club lié." },
    ameliorations: ["Amélioration complète : 318 140 GTA$", "Brouilleur anti-missiles"],
    caches: ["Sa description se moque du FIB, qui préférerait écraser les voitures importées plutôt que d'attraper des terroristes."],
    sources: [{ nom: "GTABase — Annis Elegy RH8", url: "https://www.gtabase.com/grand-theft-auto-v/vehicles/annis-elegy-rh8" }]
  },
  {
    id: "kuruma-blindee", nom: "Kuruma (blindée)", marque: "Karin", classe: "Sport", type: "voiture",
    places: 4, transmission: "Intégrale (AWD)", inspiration: "Mitsubishi Lancer Evo X, Subaru WRX STI 2015",
    vitesse: { kmh: 176.6, mph: 109.75 }, tour: null, sortie: "10 mars 2015 (mise à jour Heists)",
    histoire: { dispo: null, texte: "" },
    online: { prix: 698250, vendeur: "Southern S.A. Super Autos", texte: "Prix réduit de 525 000 GTA$ après la mission de braquage correspondante. Sur PS5 / Xbox Series : débloquée au palier 4 des « Original Heists » (Career Progress)." },
    ameliorations: ["Vitres pare-balles sur tous les côtés", "Un seul explosif suffit à la détruire"],
    caches: ["Introduite pour le premier braquage du jeu, « The Fleeca Job ». Très appréciée des débutants, car elle protège bien des balles."],
    sources: [src("Karin Kuruma (Armored)")]
  },
  {
    id: "ruiner-2000", nom: "Ruiner 2000", marque: "Imponte", classe: "Muscle", type: "voiture",
    places: 2, transmission: "Propulsion (RWD)", inspiration: "Pontiac Trans Am, façon KITT de la série K 2000 (Knight Rider)",
    vitesse: { kmh: 191.5, mph: 119 }, tour: "1:11.371", sortie: "13 décembre 2016 (Import/Export)",
    histoire: { dispo: null, texte: "" },
    online: { prix: 3750000, vendeur: "Warstock Cache & Carry", texte: "Prix réduit de 2 812 500 GTA$ après la mission « Special Vehicle Work » (entrepôt de véhicules requis). Ne peut pas être revendue." },
    ameliorations: ["Missiles à tête chercheuse", "Saut", "Parachute", "Non blindée"],
    caches: ["Clin d'œil à KITT, la voiture qui parle de la série K 2000 : le « 2000 » du nom rappelle d'ailleurs le titre français.", "Le jeu précise que le « modèle de série » a moins de missiles que l'original."],
    sources: [src("Imponte Ruiner 2000")]
  },
  {
    id: "deluxo", nom: "Deluxo", marque: "Imponte", classe: "Sportive classique", type: "voiture",
    places: 2, transmission: "—", inspiration: "DeLorean DMC-12 de Retour vers le futur",
    vitesse: { kmh: 204.8, mph: 127.25 }, tour: "1:06.500", sortie: "12 décembre 2017 (The Doomsday Heist)",
    histoire: { dispo: null, texte: "" },
    online: { prix: 5750000, vendeur: "Warstock Cache & Carry", texte: "Prix réduit de 4 312 500 GTA$ après la mission du Doomsday Heist correspondante (installation requise)." },
    ameliorations: ["Mitrailleuse", "Missiles à tête chercheuse", "Mode vol / lévitation", "Non blindée"],
    caches: ["Elle peut passer en mode vol à tout moment et même flotter sur l'eau : hommage évident à la voiture volante de Doc.", "Le nom Deluxo existait déjà dans GTA Vice City."],
    sources: [src("Imponte Deluxo")]
  },
  {
    id: "insurgent-pickup", nom: "Insurgent Pick-up", marque: "HVY", classe: "Tout-terrain", type: "voiture",
    places: 9, transmission: "—", inspiration: "Véhicules blindés Terradyne",
    vitesse: { kmh: 148.9, mph: 92.5 }, tour: "1:16.993", sortie: "10 mars 2015 (mise à jour Heists)",
    histoire: { dispo: null, texte: "" },
    online: { prix: 1795500, vendeur: "Warstock Cache & Carry", texte: "Prix réduit de 1 350 000 GTA$ après « The Humane Labs Raid ». Livré via Pegasus. Ni revendable ni modifiable." },
    ameliorations: ["Tourelle sur le plateau", "Très résistant aux explosifs (environ 9 RPG à blindage complet)"],
    caches: ["Sa description se moque de son propre nom : l'appeler « insurgé » serait plutôt ironique pour un blindé militaire.", "Jusqu'à 9 places, dont des passagers accrochés sur les côtés."],
    sources: [src("HVY Insurgent Pick-up")]
  },
  {
    id: "bati-801", nom: "Bati 801", marque: "Pegassi", classe: "Moto", type: "moto",
    places: 2, transmission: "Propulsion (RWD)", inspiration: "Ducati 848",
    vitesse: { kmh: 217.3, mph: 135 }, tour: "0:58.625", sortie: "17 septembre 2013 (jeu de base)",
    histoire: { dispo: true, texte: "Achetable 10 000 $, ou à voler à La Puerta et chez Sanders Motorcycles (Mission Row)." },
    online: { prix: 15000, vendeur: "Southern S.A. Super Autos", texte: "" },
    ameliorations: ["Amélioration complète : 109 800 GTA$", "Brouilleur anti-missiles"],
    caches: ["Pour 15 000 GTA$, elle va plus vite que des supercars à plusieurs millions.", "Héritière de la Bati 800 de GTA IV."],
    sources: [src("Pegassi Bati 801")]
  },
  {
    id: "hakuchou", nom: "Hakuchou", marque: "Shitzu", classe: "Moto", type: "moto",
    places: 2, transmission: "Propulsion (RWD)", inspiration: "Suzuki Hayabusa",
    vitesse: { kmh: 215.7, mph: 134 }, tour: "1:00.760", sortie: "2 octobre 2014 (Last Team Standing)",
    histoire: { dispo: true, texte: "Pas en vente : à voler uniquement. Fréquente dans la circulation et à Vespucci Beach." },
    online: { prix: 82000, vendeur: "Southern S.A. Super Autos", texte: "" },
    ameliorations: ["Amélioration complète : 109 800 GTA$", "Brouilleur anti-missiles"],
    caches: ["« Hakuchou » signifie « cygne » en japonais, tout comme « Hayabusa » est le nom d'un oiseau (le faucon pèlerin)."],
    sources: [src("Shitzu Hakuchou")]
  },
  {
    id: "oppressor-mk2", nom: "Oppressor Mk II", marque: "Pegassi", classe: "Moto", type: "moto",
    places: 1, transmission: "—", inspiration: "Concept de moto volante BMW",
    vitesse: { kmh: 205.6, mph: 127.75 }, tour: null, sortie: "14 août 2018 (After Hours)",
    histoire: { dispo: false, texte: "" },
    online: { prix: 8000000, vendeur: "Warstock Cache & Carry", texte: "Prix réduit de 6 000 000 GTA$ après 5 missions clients du Terrorbyte. Prix d'origine : 3 890 250 GTA$, modifié le 27 avril 2023." },
    ameliorations: ["Atelier spécialisé du Terrorbyte obligatoire pour la modifier", "Missiles à tête chercheuse (180 000 GTA$)", "Mitrailleuse explosive (275 000 GTA$)", "Contre-mesures : paillettes, leurres, fumée", "Amélioration complète : 508 450 GTA$"],
    caches: ["Une moto qui vole : la plus célèbre (et la plus détestée) de GTA Online.", "Interdite dans les courses classiques : seulement en courses « Transform »."],
    sources: [{ nom: "GTABase — Pegassi Oppressor Mk II", url: "https://www.gtabase.com/grand-theft-auto-v/vehicles/oppressor-mk-ii" }]
  },
  {
    id: "buzzard", nom: "Buzzard (hélico d'attaque)", marque: "Nagasaki", classe: "Hélicoptère", type: "helico",
    places: 4, transmission: "—", inspiration: "MD Helicopters AH-6 Little Bird",
    vitesse: { kmh: 233.4, mph: 145 }, tour: null, sortie: "17 septembre 2013 (jeu de base)",
    histoire: { dispo: true, texte: "Achetable 2 000 000 $, ou à voler à Fort Zancudo et au QG du NOOSE (Sustancia Road)." },
    online: { prix: 1750000, vendeur: "Warstock Cache & Carry", texte: "Ne peut pas être revendu." },
    ameliorations: ["Armé (hélicoptère d'attaque)", "Arrière pare-balles", "Peinture uniquement, pas d'autres modifications"],
    caches: ["Un code de triche permet de le faire apparaître en mode histoire."],
    sources: [src("Nagasaki Buzzard Attack Chopper")]
  },
  {
    id: "lazer", nom: "P-996 LAZER", marque: "JoBuilt", classe: "Avion de chasse", type: "avion",
    places: 1, transmission: "—", inspiration: "F-16 Fighting Falcon",
    vitesse: { kmh: 313.8, mph: 195 }, tour: null, sortie: "17 septembre 2013 (jeu de base)",
    histoire: { dispo: true, texte: "Pas en vente : à voler à Fort Zancudo. Apparaît dans la mission « Minor Turbulence » et dans l'École de pilotage." },
    online: { prix: 6500000, vendeur: "Warstock Cache & Carry", texte: "Rangé dans un hangar ou via Pegasus. Ne peut pas être revendu." },
    ameliorations: ["Missiles à tête chercheuse", "Arrière pare-balles", "Peinture uniquement"],
    caches: ["Impossible à acheter en Online pendant 4 ans : il n'est devenu achetable qu'avec la mise à jour Smuggler's Run (novembre 2017)."],
    sources: [src("JoBuilt P-996 LAZER")]
  },
  {
    id: "hydra", nom: "Hydra", marque: "Mammoth", classe: "Avion de chasse", type: "avion",
    places: 1, transmission: "—", inspiration: "Harrier II (BAe / McDonnell Douglas AV-8B), F-35 Lightning II",
    vitesse: { kmh: 336.8, mph: 209.25 }, tour: null, sortie: "10 mars 2015 (mise à jour Heists)",
    histoire: { dispo: null, texte: "" },
    online: { prix: 3990000, vendeur: "Warstock Cache & Carry", texte: "Prix réduit de 3 000 000 GTA$ après la mission de braquage correspondante. Ne peut pas être revendu." },
    ameliorations: ["Missiles à tête chercheuse", "Contre-mesures", "Décollage vertical (VTOL) et vol stationnaire", "Arrière pare-balles"],
    caches: ["Il décolle à la verticale, sans piste, comme le vrai Harrier.", "Le nom Hydra vient de GTA San Andreas, où l'avion existait déjà."],
    sources: [src("Mammoth Hydra")]
  }
];

// Photos libres de droits des véhicules RÉELS qui ont inspiré ceux du jeu (Wikimedia Commons)
// Ce ne sont PAS des images du jeu. Crédit et licence obligatoires (affichés sur la fiche).
const PHOTOS_REELLES = {
  "adder": {
    "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/94/Bugatti_Veyron_16.4_%E2%80%93_Frontansicht_%283%29%2C_5._April_2012%2C_D%C3%BCsseldorf.jpg/960px-Bugatti_Veyron_16.4_%E2%80%93_Frontansicht_%283%29%2C_5._April_2012%2C_D%C3%BCsseldorf.jpg",
    "page": "https://commons.wikimedia.org/wiki/File:Bugatti_Veyron_16.4_%E2%80%93_Frontansicht_(3),_5._April_2012,_D%C3%BCsseldorf.jpg",
    "auteur": "M 93",
    "licence": "CC BY-SA 3.0 de",
    "licenceUrl": "https://creativecommons.org/licenses/by-sa/3.0/de/deed.en",
    "legende": "Bugatti Veyron 16.4"
  },
  "zentorno": {
    "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/07/Geneva_MotorShow_2013_-_Lamborghini_Veneno_1.jpg/960px-Geneva_MotorShow_2013_-_Lamborghini_Veneno_1.jpg",
    "page": "https://commons.wikimedia.org/wiki/File:Geneva_MotorShow_2013_-_Lamborghini_Veneno_1.jpg",
    "auteur": "Clément Bucco-Lechat",
    "licence": "CC BY-SA 3.0",
    "licenceUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "legende": "Lamborghini Veneno"
  },
  "t20": {
    "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/61/2013_McLaren_P1.jpg/960px-2013_McLaren_P1.jpg",
    "page": "https://commons.wikimedia.org/wiki/File:2013_McLaren_P1.jpg",
    "auteur": "MrWalkr",
    "licence": "CC BY-SA 4.0",
    "licenceUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "legende": "McLaren P1"
  },
  "turismo-r": {
    "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5a/LaFerrari_front.jpg/960px-LaFerrari_front.jpg",
    "page": "https://commons.wikimedia.org/wiki/File:LaFerrari_front.jpg",
    "auteur": "Yanko Malinov",
    "licence": "CC BY-SA 4.0",
    "licenceUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "legende": "Ferrari LaFerrari"
  },
  "krieger": {
    "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0f/Mercedes-AMG_One_IAA_2023_1X7A0454.jpg/960px-Mercedes-AMG_One_IAA_2023_1X7A0454.jpg",
    "page": "https://commons.wikimedia.org/wiki/File:Mercedes-AMG_One_IAA_2023_1X7A0454.jpg",
    "auteur": "Alexander-93",
    "licence": "CC BY-SA 4.0",
    "licenceUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "legende": "Mercedes-AMG One"
  },
  "pariah": {
    "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ad/Aston_Martin_Vantage_V12_Zagato.jpg/960px-Aston_Martin_Vantage_V12_Zagato.jpg",
    "page": "https://commons.wikimedia.org/wiki/File:Aston_Martin_Vantage_V12_Zagato.jpg",
    "auteur": "MrWalkr",
    "licence": "CC BY-SA 4.0",
    "licenceUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "legende": "Aston Martin V12 Vantage Zagato"
  },
  "comet-sr": {
    "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/26/Porsche_911_GT2_RS_%28997%29.jpg/960px-Porsche_911_GT2_RS_%28997%29.jpg",
    "page": "https://commons.wikimedia.org/wiki/File:Porsche_911_GT2_RS_(997).jpg",
    "auteur": "Jacob Frey 4A",
    "licence": "CC BY 2.0",
    "licenceUrl": "https://creativecommons.org/licenses/by/2.0",
    "legende": "Porsche 911 GT2 RS (997)"
  },
  "elegy-rh8": {
    "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7a/Nissan_GT-R_%28R35%2C_2011_facelift%29_in_Brunei_01.jpg/960px-Nissan_GT-R_%28R35%2C_2011_facelift%29_in_Brunei_01.jpg",
    "page": "https://commons.wikimedia.org/wiki/File:Nissan_GT-R_(R35,_2011_facelift)_in_Brunei_01.jpg",
    "auteur": "Pangalau",
    "licence": "CC BY-SA 4.0",
    "licenceUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "legende": "Nissan GT-R (R35)"
  },
  "kuruma-blindee": {
    "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8b/Mitsubishi_Lancer_EVO_X.jpg/960px-Mitsubishi_Lancer_EVO_X.jpg",
    "page": "https://commons.wikimedia.org/wiki/File:Mitsubishi_Lancer_EVO_X.jpg",
    "auteur": "IFCAR",
    "licence": "Public domain",
    "licenceUrl": "",
    "legende": "Mitsubishi Lancer Evolution X"
  },
  "ruiner-2000": {
    "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3d/K.I.T.T._%28Knight_Industries_Two_Thousand%29_1987_Pontiac_Trans_Am_K.I.T.T._%28Knight_Industries_Two_Thousand%29_Knight_Rider_Tribute_%2838941267290%29.jpg/960px-K.I.T.T._%28Knight_Industries_Two_Thousand%29_1987_Pontiac_Trans_Am_K.I.T.T._%28Knight_Industries_Two_Thousand%29_Knight_Rider_Tribute_%2838941267290%29.jpg",
    "page": "https://commons.wikimedia.org/wiki/File:K.I.T.T._(Knight_Industries_Two_Thousand)_1987_Pontiac_Trans_Am_K.I.T.T._(Knight_Industries_Two_Thousand)_Knight_Rider_Tribute_(38941267290).jpg",
    "auteur": "Greg Gjerdingen from Willmar, USA",
    "licence": "CC BY 2.0",
    "licenceUrl": "https://creativecommons.org/licenses/by/2.0",
    "legende": "Pontiac Trans Am façon KITT"
  },
  "deluxo": {
    "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d8/DeLorean_DMC-12_BW_2017-07-16_15-10-09.jpg/960px-DeLorean_DMC-12_BW_2017-07-16_15-10-09.jpg",
    "page": "https://commons.wikimedia.org/wiki/File:DeLorean_DMC-12_BW_2017-07-16_15-10-09.jpg",
    "auteur": "Berthold Werner",
    "licence": "CC BY-SA 4.0",
    "licenceUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "legende": "DeLorean DMC-12"
  },
  "insurgent-pickup": {
    "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1a/GURKHA_RPV.jpg/960px-GURKHA_RPV.jpg",
    "page": "https://commons.wikimedia.org/wiki/File:GURKHA_RPV.jpg",
    "auteur": "LWitzke",
    "licence": "CC BY-SA 4.0",
    "licenceUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "legende": "Terradyne Gurkha"
  },
  "bati-801": {
    "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e4/Ducati_848_evo_Black_Mat.jpg/960px-Ducati_848_evo_Black_Mat.jpg",
    "page": "https://commons.wikimedia.org/wiki/File:Ducati_848_evo_Black_Mat.jpg",
    "auteur": "TheMalsa",
    "licence": "CC BY-SA 3.0",
    "licenceUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "legende": "Ducati 848 EVO"
  },
  "hakuchou": {
    "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/de/SUZUKI_Hayabusa_2007TMS.jpg/960px-SUZUKI_Hayabusa_2007TMS.jpg",
    "page": "https://commons.wikimedia.org/wiki/File:SUZUKI_Hayabusa_2007TMS.jpg",
    "auteur": "PekePON",
    "licence": "CC BY-SA 3.0",
    "licenceUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "legende": "Suzuki Hayabusa"
  },
  "buzzard": {
    "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4b/2_AH-6J_Little_Bird_de_l%27US_Army%2C_31_mars_2003%2C_Irak.jpg/960px-2_AH-6J_Little_Bird_de_l%27US_Army%2C_31_mars_2003%2C_Irak.jpg",
    "page": "https://commons.wikimedia.org/wiki/File:2_AH-6J_Little_Bird_de_l%27US_Army,_31_mars_2003,_Irak.jpg",
    "auteur": "Auteur inconnu",
    "licence": "Public domain",
    "licenceUrl": "",
    "legende": "Boeing AH-6 Little Bird"
  },
  "lazer": {
    "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/be/A_USAF_F-16_pilot_breaking_right_on_final_approach_over_northern_Las_Vegas.jpg/960px-A_USAF_F-16_pilot_breaking_right_on_final_approach_over_northern_Las_Vegas.jpg",
    "page": "https://commons.wikimedia.org/wiki/File:A_USAF_F-16_pilot_breaking_right_on_final_approach_over_northern_Las_Vegas.jpg",
    "auteur": "Master Sgt. Benjamin Bloker",
    "licence": "Public domain",
    "licenceUrl": "",
    "legende": "General Dynamics F-16"
  },
  "hydra": {
    "src": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/29/AV-8B_Harrier_II_of_VMA-214_launches_from_Prince_Sultan_Air_Base.jpg/960px-AV-8B_Harrier_II_of_VMA-214_launches_from_Prince_Sultan_Air_Base.jpg",
    "page": "https://commons.wikimedia.org/wiki/File:AV-8B_Harrier_II_of_VMA-214_launches_from_Prince_Sultan_Air_Base.jpg",
    "auteur": "Senior Airman Giovanni Sims",
    "licence": "Public domain",
    "licenceUrl": "",
    "legende": "AV-8B Harrier II"
  }
};
