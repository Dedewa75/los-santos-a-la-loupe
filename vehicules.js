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
  avion: { nom: "Avion", icone: "✈️" },
  militaire: { nom: "Militaire", icone: "🪖" }
};

const src = nom => ({ nom: "GTABase — " + nom, url: "https://www.gtabase.com/grand-theft-auto-v/vehicles/" + nom.toLowerCase().replace(/[()]/g, "").replace(/\s+/g, "-") });

const GB = (slug, nom) => ({ nom: "GTABase — " + nom, url: "https://www.gtabase.com/grand-theft-auto-v/vehicles/" + slug });

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
  },
  // ===== LOT 2 — ajouté le 1er novembre 2026 =====
  {
    id: "entity-xf", nom: "Entity XF", marque: "Overflod", classe: "Super", type: "voiture",
    places: 2, transmission: "Intégrale (AWD)", inspiration: "Koenigsegg CC8S et Agera (feux arrière de Lamborghini Aventador)",
    vitesse: { kmh: 196.7, mph: 122.25 }, tour: "1:01.678", sortie: "17 septembre 2013 (jeu de base)",
    histoire: { dispo: true, texte: "Achetable 795 000 $ sur l'internet du jeu, après la mission « I Fought the Law… »." },
    online: { prix: 795000, vendeur: "Legendary Motorsport", texte: "Peut être une cible des « Exotic Exports »." },
    ameliorations: ["Amélioration complète : 283 550 GTA$", "Brouilleur anti-missiles", "Arrière pare-balles"],
    caches: ["Sa description dans le jeu se moque longuement de la Suède, le pays du vrai Koenigsegg qui l'a inspirée."],
    sources: [GB("overflod-entity-xf", "Overflod Entity XF")]
  },
  {
    id: "osiris", nom: "Osiris", marque: "Pegassi", classe: "Super", type: "voiture",
    places: 2, transmission: "Intégrale (AWD)", inspiration: "Pagani Huayra, LaFerrari",
    vitesse: { kmh: 196.3, mph: 122 }, tour: "1:00.794", sortie: "10 juin 2015 (Ill-Gotten Gains, partie 1)",
    histoire: { dispo: true, texte: "Achetable 1 950 000 $ sur l'internet du jeu." },
    online: { prix: 1950000, vendeur: "Legendary Motorsport", texte: "" },
    ameliorations: ["Amélioration complète : 298 400 GTA$", "Non blindée"],
    caches: ["Ajoutée avec une mise à jour sur le thème du luxe tape-à-l'œil : l'esprit Pagani, en version Los Santos."],
    sources: [GB("pegassi-osiris", "Pegassi Osiris")]
  },
  {
    id: "cheetah", nom: "Cheetah", marque: "Grotti", classe: "Super", type: "voiture",
    places: 2, transmission: "Propulsion (RWD)", inspiration: "Ferrari Enzo, Koenigsegg Agera, GTA Spano",
    vitesse: { kmh: 194.3, mph: 120.75 }, tour: "1:02.396", sortie: "17 septembre 2013 (jeu de base)",
    histoire: { dispo: true, texte: "Achetable 650 000 $ sur l'internet du jeu. Apparaît dans la mission « I Fought the Law… »." },
    online: { prix: 650000, vendeur: "Legendary Motorsport", texte: "" },
    ameliorations: ["Amélioration complète : 279 500 GTA$", "Brouilleur anti-missiles"],
    caches: ["Une vétérane : la Cheetah existe dans GTA III, Vice City, San Andreas, Liberty City Stories, Vice City Stories… et GTA 6."],
    sources: [GB("grotti-cheetah", "Grotti Cheetah")]
  },
  {
    id: "vacca", nom: "Vacca", marque: "Pegassi", classe: "Super", type: "voiture",
    places: 2, transmission: "Propulsion (RWD)", inspiration: "Lamborghini Gallardo, McLaren MP4-12C",
    vitesse: { kmh: 193.9, mph: 120.5 }, tour: "1:03.864", sortie: "17 septembre 2013 (jeu de base)",
    histoire: { dispo: true, texte: "Achetable 240 000 $ sur l'internet du jeu. Apparaît dans les missions « The Wrap Up » et « Meltdown »." },
    online: { prix: 240000, vendeur: "Legendary Motorsport", texte: "" },
    ameliorations: ["Amélioration complète : 278 350 GTA$", "Brouilleur anti-missiles", "Arrière pare-balles"],
    caches: ["« Vacca » signifie « vache » en italien : un clin d'œil à Lamborghini, dont l'emblème est un taureau."],
    sources: [GB("pegassi-vacca", "Pegassi Vacca")]
  },
  {
    id: "bullet", nom: "Bullet", marque: "Vapid", classe: "Super", type: "voiture",
    places: 2, transmission: "Propulsion (RWD)", inspiration: "Ford GT",
    vitesse: { kmh: 192.7, mph: 119.75 }, tour: "1:07.450", sortie: "17 septembre 2013 (jeu de base)",
    histoire: { dispo: true, texte: "Pas en vente : à voler (Portola Drive à Rockford Hills, Kortz Center, Vinewood…). Apparaît dans la mission « Repossession »." },
    online: { prix: 155000, vendeur: "Legendary Motorsport", texte: "Peut aussi être demandée par Simeon (Export Requests, 20 000 GTA$) ou être une cible des « Exotic Exports »." },
    ameliorations: ["Amélioration complète : 263 500 GTA$", "Brouilleur anti-missiles", "Arrière pare-balles"],
    caches: ["Vapid est la marque du jeu qui parodie Ford : la Bullet est sa version de la Ford GT.", "Elle existait déjà dans San Andreas et GTA IV."],
    sources: [GB("vapid-bullet", "Vapid Bullet")]
  },
  {
    id: "voltic", nom: "Voltic", marque: "Coil", classe: "Super", type: "voiture",
    places: 2, transmission: "Propulsion (RWD), 1 rapport", inspiration: "Tesla Roadster, Lotus Elise",
    vitesse: { kmh: 171, mph: 106.25 }, tour: "1:05.315", sortie: "17 septembre 2013 (jeu de base)",
    histoire: { dispo: true, texte: "Pas en vente : à voler (Kortz Center, parking de l'aéroport, Vinewood Bowl, Rockford Hills…)." },
    online: { prix: 150000, vendeur: "Retirée de la vente (juin 2023)", texte: "Prix d'origine : 150 000 GTA$. Encore récupérable via le LS Car Meet (copie du véhicule d'un autre joueur) ou les rotations hebdomadaires." },
    ameliorations: ["Amélioration complète : 202 750 GTA$", "Toit amovible", "Version spéciale : Rocket Voltic (avec propulseur)"],
    caches: ["100 % électrique : une seule vitesse, comme une vraie voiture électrique.", "Sa description se moque de son autonomie, plus courte que la batterie d'un téléphone iFruit (le faux iPhone du jeu)."],
    sources: [GB("coil-voltic", "Coil Voltic")]
  },
  {
    id: "x80-proto", nom: "X80 Proto", marque: "Grotti", classe: "Super", type: "voiture",
    places: 2, transmission: "Intégrale (AWD)", inspiration: "Concept Ferrari F80, GreenGT LeMans",
    vitesse: { kmh: 206.4, mph: 128.25 }, tour: "1:00.677", sortie: "21 juin 2016 (Further Adventures in Finance and Felony)",
    histoire: { dispo: false, texte: "" },
    online: { prix: 2700000, vendeur: "Legendary Motorsport", texte: "" },
    ameliorations: ["Amélioration complète : 299 450 GTA$", "Aileron actif", "Non blindée"],
    caches: ["Elle s'inspire d'un concept de designer baptisé « Ferrari F80 », imaginé bien avant que Ferrari ne sorte une vraie voiture de ce nom."],
    sources: [GB("grotti-x80-proto", "Grotti X80 Proto")]
  },
  {
    id: "sultan-rs", nom: "Sultan RS", marque: "Karin", classe: "Super", type: "voiture",
    places: 2, transmission: "Intégrale (AWD)", inspiration: "Lexus IS, Mitsubishi Lancer Evo VI, Subaru Impreza",
    vitesse: { kmh: 190.3, mph: 118.25 }, tour: "1:04.030", sortie: "28 janvier 2016",
    histoire: { dispo: false, texte: "" },
    online: { prix: 807000, vendeur: "Sultan classique + conversion chez Benny's", texte: "Acheter une Sultan classique (12 000 GTA$), puis la convertir chez Benny's Original Motor Works (795 000 GTA$)." },
    ameliorations: ["Amélioration complète : 481 619 GTA$", "Nombreuses livrées", "Non blindée"],
    caches: ["Une berline transformée en « Super » : c'est l'une des rares voitures classées Super qui ressemble à une voiture de tous les jours.", "La Sultan RS existait déjà dans GTA IV."],
    sources: [GB("karin-sultan-rs", "Karin Sultan RS")]
  },
  {
    id: "jester", nom: "Jester", marque: "Dinka", classe: "Sport", type: "voiture",
    places: 2, transmission: "Intégrale (AWD)", inspiration: null,
    vitesse: { kmh: 192.3, mph: 119.5 }, tour: "1:02.980", sortie: "4 mars 2014 (mise à jour Business)",
    histoire: { dispo: true, texte: "Pas en vente : à voler, dans la circulation ou près des Los Santos Customs (Burton, aéroport, La Mesa)." },
    online: { prix: 240000, vendeur: "Retirée de la vente (juin 2023)", texte: "Prix d'origine : 240 000 GTA$. Encore récupérable via le LS Car Meet ou les rotations hebdomadaires." },
    ameliorations: ["Amélioration complète : 304 850 GTA$", "Arrière pare-balles"],
    caches: ["Hybride électrique selon le jeu.", "La Jester existait déjà dans GTA San Andreas."],
    sources: [GB("dinka-jester", "Dinka Jester")]
  },
  {
    id: "massacro", nom: "Massacro", marque: "Dewbauchee", classe: "Sport", type: "voiture",
    places: 2, transmission: "Propulsion (RWD)", inspiration: "Corvette C7, Ferrari F12 Berlinetta, Aston Martin Vanquish",
    vitesse: { kmh: 197.6, mph: 122.75 }, tour: "1:03.364", sortie: "13 mai 2014 (mise à jour High Life)",
    histoire: { dispo: true, texte: "Pas en vente : à voler, dans la circulation ou près des Los Santos Customs (Burton, aéroport, La Mesa)." },
    online: { prix: 275000, vendeur: "Legendary Motorsport", texte: "Peut être une cible des « Exotic Exports »." },
    ameliorations: ["Amélioration complète : 309 800 GTA$", "Brouilleur anti-missiles"],
    caches: ["Dewbauchee est la marque du jeu qui rappelle Aston Martin."],
    sources: [GB("dewbauchee-massacro", "Dewbauchee Massacro")]
  },
  {
    id: "dominator", nom: "Dominator", marque: "Vapid", classe: "Muscle", type: "voiture",
    places: 2, transmission: "Propulsion (RWD)", inspiration: "Ford Mustang",
    vitesse: { kmh: 194.3, mph: 120.75 }, tour: "1:08.118", sortie: "17 septembre 2013 (jeu de base)",
    histoire: { dispo: true, texte: "Pas en vente : à voler dans la rue." },
    online: { prix: 35000, vendeur: "Non précisé par notre source", texte: "Peut aussi être volée dans la rue. Simeon peut la demander (Export Requests, 5 250 GTA$)." },
    ameliorations: ["Amélioration complète : 221 325 GTA$", "Brouilleur anti-missiles", "Protection arrière disponible chez Los Santos Customs"],
    caches: ["Une muscle car à 35 000 GTA$ qui va plus vite que plusieurs supercars de cette liste."],
    sources: [GB("vapid-dominator", "Vapid Dominator")]
  },
  {
    id: "buffalo-s", nom: "Buffalo S", marque: "Bravado", classe: "Sport", type: "voiture",
    places: 4, transmission: "Propulsion (RWD)", inspiration: "Dodge Charger SRT8",
    vitesse: { kmh: 181.9, mph: 113 }, tour: "1:07.601", sortie: "17 septembre 2013 (jeu de base)",
    histoire: { dispo: true, texte: "La Buffalo S blanche est la voiture personnelle de Franklin. Elle l'accompagne pendant toute l'histoire et réapparaît toujours devant chez lui." },
    online: { prix: 96000, vendeur: "Southern S.A. Super Autos", texte: "Peut être une cible des « Exotic Exports »." },
    ameliorations: ["Amélioration complète : 240 375 GTA$", "Brouilleur anti-missiles"],
    caches: ["🚗 Voiture de Franklin : il a aussi une moto, la Bagger."],
    sources: [GB("bravado-buffalo-s", "Bravado Buffalo S")]
  },
  {
    id: "tailgater", nom: "Tailgater", marque: "Obey", classe: "Berline", type: "voiture",
    places: 4, transmission: "Propulsion (RWD)", inspiration: "Audi A6",
    vitesse: { kmh: 169, mph: 105 }, tour: "1:10.872", sortie: "17 septembre 2013 (jeu de base)",
    histoire: { dispo: true, texte: "La Tailgater noire est la voiture personnelle de Michael, pendant toute l'histoire. D'autres exemplaires peuvent être volés dans la rue." },
    online: { prix: 55000, vendeur: "Non précisé par notre source", texte: "Peut aussi être volée dans la rue. Simeon peut la demander (Export Requests, 8 250 GTA$)." },
    ameliorations: ["Amélioration complète : 157 100 GTA$", "Brouilleur anti-missiles"],
    caches: ["🚗 Voiture de Michael : une berline sage, à l'image du braqueur « rangé » qu'il prétend être.", "Obey est la marque du jeu qui rappelle Audi."],
    sources: [GB("obey-tailgater", "Obey Tailgater")]
  },
  {
    id: "bodhi", nom: "Bodhi", marque: "Canis", classe: "Tout-terrain", type: "voiture",
    places: 4, transmission: "Intégrale (AWD)", inspiration: "Avant de Land Rover Series III, Kaiser M715",
    vitesse: { kmh: 160.1, mph: 99.5 }, tour: "1:12.956", sortie: "17 septembre 2013 (jeu de base)",
    histoire: { dispo: true, texte: "Le Bodhi rouge est le véhicule personnel de Trevor. Il l'accompagne pendant toute l'histoire et réapparaît toujours devant chez lui." },
    online: { prix: 25000, vendeur: "Non précisé par notre source", texte: "Peut aussi être volé dans la rue." },
    ameliorations: ["Amélioration complète : 141 100 GTA$", "Brouilleur anti-missiles"],
    caches: ["🚙 Véhicule de Trevor : un vieux 4x4 increvable, comme son propriétaire."],
    sources: [GB("canis-bodhi", "Canis Bodhi")]
  },
  {
    id: "sanchez", nom: "Sanchez", marque: "Maibatsu", classe: "Moto (tout-terrain)", type: "moto",
    places: 2, transmission: "Propulsion (RWD)", inspiration: "Yamaha YZ450F, Kawasaki KX450F, Honda CRF450X",
    vitesse: { kmh: 192.3, mph: 119.5 }, tour: "1:03.665", sortie: "17 septembre 2013 (jeu de base)",
    histoire: { dispo: true, texte: "Pas en vente : à voler, notamment à Sandy Shores et Grapeseed. Un code de triche permet aussi de la faire apparaître." },
    online: { prix: 8000, vendeur: "Non précisé par notre source", texte: "Peut aussi être volée dans la rue." },
    ameliorations: ["Amélioration complète : 109 200 GTA$", "Brouilleur anti-missiles"],
    caches: ["Une des motos les plus anciennes de la série : elle est apparue dans Vice City, San Andreas, GTA IV… et revient dans GTA 6."],
    sources: [GB("maibatsu-sanchez", "Maibatsu Sanchez")]
  },
  {
    id: "shotaro", nom: "Shotaro", marque: "Nagasaki", classe: "Moto", type: "moto",
    places: 1, transmission: "Propulsion (RWD)", inspiration: "Lotus C-01, moto lumineuse du film Tron: Legacy",
    vitesse: { kmh: 199.2, mph: 123.75 }, tour: "0:57.490", sortie: "8 novembre 2016 (mise à jour Bikers)",
    histoire: { dispo: false, texte: "" },
    online: { prix: 2225000, vendeur: "Legendary Motorsport", texte: "Achetable seulement après avoir joué une manche du mode Adversaire « Deadline »." },
    ameliorations: ["Amélioration complète : 258 100 GTA$", "Brouilleur anti-missiles"],
    caches: ["Hommage direct aux motos lumineuses de Tron.", "Le mode « Deadline » qui la débloque reprend d'ailleurs le principe des courses de Tron : chaque moto laisse une traînée mortelle derrière elle."],
    sources: [GB("nagasaki-shotaro", "Nagasaki Shotaro")]
  },
  {
    id: "rhino", nom: "Rhino", marque: "—", classe: "Militaire", type: "militaire",
    places: 1, transmission: "Chenilles", inspiration: "Leopard 2A4, M1 Abrams",
    vitesse: { kmh: 65.6, mph: 40.75 }, tour: "2:23.910", sortie: "17 septembre 2013 (jeu de base)",
    histoire: { dispo: true, texte: "Achetable 3 000 000 $, ou à voler. Apparaît dans « The Paleto Score » et dans le Rampage militaire." },
    online: { prix: 1500000, vendeur: "Warstock Cache & Carry", texte: "Livré par Pegasus. Ne peut être ni revendu ni modifié." },
    ameliorations: ["Canon", "Blindé et pare-balles de tous les côtés", "Il faut environ 4 missiles à tête chercheuse pour le détruire"],
    caches: ["Le plus lent de tous nos véhicules (environ 65 km/h)… mais aussi l'un des plus durs à arrêter.", "Le Rhino est présent depuis GTA III."],
    sources: [GB("rhino-tank", "Rhino Tank")]
  },
  {
    id: "frogger", nom: "Frogger", marque: "Maibatsu", classe: "Hélicoptère", type: "helico",
    places: 4, transmission: "—", inspiration: "Eurocopter EC135 / EC145",
    vitesse: { kmh: 227.7, mph: 141.5 }, tour: "0:56.757", sortie: "17 septembre 2013 (jeu de base)",
    histoire: { dispo: true, texte: "Achetable 1 300 000 $, ou à voler (port de Los Santos, héliports de Vespucci…). Après la mission « Three's Company », Trevor reçoit un Frogger noir, garé à l'aérodrome de Sandy Shores." },
    online: { prix: 1300000, vendeur: "Elitás Travel", texte: "Offert avec le Criminal Enterprise Starter Pack. Ne peut pas être revendu." },
    ameliorations: ["Descente en rappel possible", "Brouilleur anti-missiles", "Arrière pare-balles", "Peinture uniquement"],
    caches: ["🚁 Hélico de Trevor : sa version noire porte les couleurs de Trevor Philips Industries."],
    sources: [GB("maibatsu-frogger", "Maibatsu Frogger")]
  },
  {
    id: "dodo", nom: "Dodo", marque: "Mammoth", classe: "Hydravion", type: "avion",
    places: 4, transmission: "—", inspiration: null,
    vitesse: { kmh: 216.1, mph: 134.25 }, tour: "0:55.335", sortie: "18 novembre 2014 (sortie PS4 / Xbox One)",
    histoire: { dispo: true, texte: "Débloqué via l'événement aléatoire « Sea Plane » : il faut le voler dans une crique au sud de la chaîne de San Chiaski. Ensuite achetable 500 000 $ et visible au lac de Vinewood et sur l'Alamo Sea." },
    online: { prix: 500000, vendeur: "Elitás Travel", texte: "Ne peut pas être revendu." },
    ameliorations: ["Flotte sur l'eau", "Des passagers peuvent s'accrocher sur les côtés", "Brouilleur anti-missiles", "Peinture uniquement"],
    caches: ["Ajouté seulement avec la version PS4 / Xbox One : les joueurs PS3 / Xbox 360 ne l'ont jamais eu.", "Le nom Dodo vient de GTA III et San Andreas."],
    sources: [GB("mammoth-dodo", "Mammoth Dodo")]
  },
  {
    id: "duster", nom: "Duster", marque: "Western Company", classe: "Avion", type: "avion",
    places: 2, transmission: "—", inspiration: "Stearman Model 75",
    vitesse: { kmh: 231.7, mph: 144 }, tour: "0:54.522", sortie: "17 septembre 2013 (jeu de base)",
    histoire: { dispo: true, texte: "Achetable 275 000 $, ou à voler (Grapeseed, hangar de McKenzie Field, aérodrome de Sandy Shores). Apparaît dans la mission « Minor Turbulence »." },
    online: { prix: 275000, vendeur: "Elitás Travel", texte: "Ne peut pas être revendu." },
    ameliorations: ["Blindé", "Peinture uniquement"],
    caches: ["Un vieux biplan d'épandage agricole qui bat en vitesse l'hélicoptère Frogger.", "Blindé, mais le pilote meurt dès la première roquette."],
    sources: [GB("western-company-duster", "Western Company Duster")]
  },
  // ===== LOT 3 — références cachées, ajouté le 1er novembre 2026 =====
  {
    id: "stromberg", nom: "Stromberg", marque: "Ocelot", classe: "Sportive classique", type: "voiture",
    places: 2, transmission: "Propulsion (RWD)", inspiration: "Maserati Bora et la Lotus Esprit sous-marine « Wet Nellie » du film James Bond L'Espion qui m'aimait",
    vitesse: { kmh: 181.5, mph: 112.75 }, tour: "1:07.351", sortie: "12 décembre 2017 (The Doomsday Heist)",
    histoire: { dispo: false, texte: "" },
    online: { prix: 2500000, vendeur: "Warstock Cache & Carry", texte: "Prix réduit de 1 875 000 GTA$ après la mission du Doomsday Heist correspondante (installation requise). Prix d'origine : 3 185 350 GTA$, modifié le 27 avril 2023." },
    ameliorations: ["Se transforme en sous-marin", "Missiles à tête chercheuse", "Blindée", "Amélioration complète : 259 100 GTA$"],
    caches: ["🎬 Hommage à James Bond : comme la Lotus de L'Espion qui m'aimait (1977), elle plonge et roule sous l'eau.", "Son nom reprend celui de Karl Stromberg, le méchant de ce même film."],
    sources: [GB("ocelot-stromberg", "Ocelot Stromberg")]
  },
  {
    id: "toreador", nom: "Toreador", marque: "Pegassi", classe: "Sportive classique", type: "voiture",
    places: 4, transmission: "Propulsion (RWD)", inspiration: "Lamborghini Marzal (concept de 1967)",
    vitesse: { kmh: 217.7, mph: 135.25 }, tour: "0:56.624", sortie: "15 décembre 2020 (The Cayo Perico Heist)",
    histoire: { dispo: false, texte: "" },
    online: { prix: 4250000, vendeur: "Warstock Cache & Carry", texte: "Prix d'origine : 3 660 000 GTA$, modifié le 27 avril 2023." },
    ameliorations: ["Se transforme en sous-marin", "Propulseur (rocket boost)", "Missiles à tête chercheuse illimités", "Blindée : environ 6 missiles pour la détruire", "Amélioration complète : 340 750 GTA$"],
    caches: ["Comme la Stromberg, elle plonge sous l'eau, mais avec un propulseur et des missiles en illimité.", "« Toreador » (toréador) poursuit le thème taurin de Pegassi, la marque qui parodie Lamborghini."],
    sources: [GB("toreador", "Pegassi Toreador")]
  },
  {
    id: "duke-o-death", nom: "Duke O'Death", marque: "Imponte", classe: "Muscle", type: "voiture",
    places: 2, transmission: "Propulsion (RWD)", inspiration: "Dodge Charger / Pontiac GTO",
    vitesse: { kmh: 184.3, mph: 114.5 }, tour: "1:09.519", sortie: "18 novembre 2014 (sortie PS4 / Xbox One)",
    histoire: { dispo: true, texte: "Débloquée par l'événement aléatoire « Duel » : prends la voiture garée près d'une station-service dans le désert de Grand Senora, puis échappe à la bande qui te prend en chasse. Ensuite achetable 279 000 $ et visible à El Burro Heights et près de Harmony." },
    online: { prix: 665000, vendeur: "Warstock Cache & Carry", texte: "Était offerte aux joueurs revenus de l'ancienne génération de consoles." },
    ameliorations: ["Blindée", "Côtés et arrière pare-balles", "Brouilleur anti-missiles", "Amélioration complète : 119 100 GTA$"],
    caches: ["🎬 L'événement qui la débloque s'appelle « Duel », comme le premier film de Spielberg (1971), où un automobiliste est traqué sur une route du désert.", "Au départ, elle était réservée au mode histoire des consoles PS4 / Xbox One."],
    sources: [GB("imponte-duke-o-death", "Imponte Duke O'Death")]
  },
  {
    id: "space-docker", nom: "Space Docker", marque: "BF", classe: "Tout-terrain", type: "voiture",
    places: 2, transmission: "Propulsion (RWD)", inspiration: "Buggy très modifié",
    vitesse: { kmh: 141.2, mph: 87.75 }, tour: "1:23.139", sortie: "17 septembre 2013 (jeu de base)",
    histoire: { dispo: true, texte: "Récompense après avoir ramassé toutes les pièces de vaisseau spatial pour Omega (missions secondaires jusqu'à « The Final Frontier »). Il apparaît ensuite dans le garage de chaque personnage, menu « Special Vehicles »." },
    online: { prix: null, vendeur: "Récompense uniquement (pas en vente)", texte: "Débloqué au palier de sponsor 500 de l'Arena War." },
    ameliorations: ["Arrière pare-balles", "Aucune modification possible"],
    caches: ["👽 Un buggy « extraterrestre » construit avec les pièces de vaisseau d'Omega, le hippie obsédé par les ovnis.", "En Online, il faut atteindre le palier 500 de l'Arena War : un des véhicules les plus longs à obtenir."],
    sources: [GB("space-docker", "BF Space Docker")]
  },
  {
    id: "liberator", nom: "Liberator", marque: "Vapid", classe: "Tout-terrain", type: "voiture",
    places: 2, transmission: "Intégrale (AWD)", inspiration: "Monster truck sur base de Ford Expedition (peinture façon « Star Bigfoot »)",
    vitesse: { kmh: 130.8, mph: 81.25 }, tour: "1:16.594", sortie: "1er juillet 2014 (Independence Day)",
    histoire: { dispo: true, texte: "Pas en vente : à voler uniquement." },
    online: { prix: 556511, vendeur: "Retiré de la vente (juin 2023)", texte: "N'était achetable que pendant l'événement annuel de la fête nationale américaine (Independence Day). Encore récupérable via le LS Car Meet." },
    ameliorations: ["Aucune modification possible", "Rangé comme véhicule Pegasus"],
    caches: ["🇺🇸 Un monster truck patriotique, sorti pour le 4 juillet.", "Son prix d'origine bizarrement précis : 556 511 GTA$."],
    sources: [GB("vapid-the-liberator", "Vapid Liberator")]
  },
  {
    id: "phantom-wedge", nom: "Phantom Wedge", marque: "JoBuilt", classe: "Utilitaire", type: "voiture",
    places: 5, transmission: "Propulsion (RWD)", inspiration: "Camion Peterbilt et le camion à lame de l'émission MythBusters",
    vitesse: { kmh: 158.1, mph: 98.25 }, tour: "1:20.080", sortie: "13 décembre 2016 (Import/Export)",
    histoire: { dispo: false, texte: "" },
    online: { prix: 2553600, vendeur: "Warstock Cache & Carry", texte: "Prix réduit de 1 920 000 GTA$ après la mission « Special Vehicle Work » (entrepôt de véhicules requis). Ne peut pas être modifié." },
    ameliorations: ["Lame à l'avant pour pousser les véhicules", "Attelage de remorquage", "Arrière pare-balles"],
    caches: ["📺 Inspiré du camion-bélier construit par l'émission MythBusters (Les Stars de la science) pour balayer les voitures.", "Un camion à 5 places : de quoi emmener toute l'équipe."],
    sources: [GB("jobuilt-phantom-wedge", "JoBuilt Phantom Wedge")]
  },
  {
    id: "scramjet", nom: "Scramjet", marque: "Declasse", classe: "Super", type: "voiture",
    places: 2, transmission: "Propulsion (RWD)", inspiration: "La Mach 5 du dessin animé Speed Racer (années 60), Alfa Romeo 33/2 Coupé Speciale",
    vitesse: { kmh: 210.4, mph: 130.75 }, tour: "0:57.775", sortie: "21 août 2018 (After Hours)",
    histoire: { dispo: false, texte: "" },
    online: { prix: 4000000, vendeur: "Warstock Cache & Carry", texte: "Se modifie uniquement dans l'atelier du centre d'opérations mobile (MOC) ou de l'Avenger. Prix d'origine : 3 480 000 GTA$, modifié le 27 avril 2023." },
    ameliorations: ["Propulseur (rocket boost)", "Saut", "Missiles à tête chercheuse", "Amélioration complète : 281 650 GTA$"],
    caches: ["📺 Hommage à la Mach 5 de Speed Racer : comme elle, la Scramjet peut sauter."],
    sources: [GB("scramjet", "Declasse Scramjet")]
  },
  {
    id: "vigilante", nom: "Vigilante", marque: "Grotti", classe: "Super", type: "voiture",
    places: 2, transmission: "Propulsion (RWD)", inspiration: "La Batmobile des films Batman (1989) et Batman, le défi (1992)",
    vitesse: { kmh: 236.2, mph: 146.75 }, tour: "0:55.872", sortie: "27 octobre 2017 (Smuggler's Run)",
    histoire: { dispo: false, texte: "" },
    online: { prix: 3750000, vendeur: "Warstock Cache & Carry", texte: "" },
    ameliorations: ["Pare-balles devant, sur les côtés et à l'arrière", "Propulseur (rocket boost)", "Missiles à tête chercheuse", "Amélioration complète : 435 600 GTA$"],
    caches: ["🦇 La Batmobile de Tim Burton, version Los Santos.", "Avec son propulseur, c'est la voiture la plus rapide du site : environ 236 km/h mesurés."],
    sources: [GB("grotti-vigilante", "Grotti Vigilante")]
  },
  {
    id: "issi", nom: "Issi", marque: "Weeny", classe: "Citadine", type: "voiture",
    places: 2, transmission: "Traction (FWD)", inspiration: "Mini Hatch / Mini Cooper (2001-2007)",
    vitesse: { kmh: 169.8, mph: 105.5 }, tour: "1:16.542", sortie: "17 septembre 2013 (jeu de base)",
    histoire: { dispo: true, texte: "Achetable 18 000 $, ou à voler. Apparaît dans les missions « Doting Dad », le Rampage des hipsters et « Paparazzo – Reality Check »." },
    online: { prix: 18000, vendeur: "Non précisé par notre source", texte: "Peut aussi être volée dans la rue." },
    ameliorations: ["Cabriolet (toit souple)", "Brouilleur anti-missiles", "Amélioration complète : 135 430 GTA$"],
    caches: ["🚗 L'Issi jaune est la voiture de Tracey, la fille de Michael.", "Weeny (« minuscule ») est la marque du jeu qui parodie Mini."],
    sources: [GB("weeny-issi", "Weeny Issi")]
  },
  {
    id: "elegy-retro", nom: "Elegy Retro Custom", marque: "Annis", classe: "Sport", type: "voiture",
    places: 2, transmission: "Intégrale (AWD)", inspiration: "Nissan Skyline GT-R",
    vitesse: { kmh: 185.9, mph: 115.5 }, tour: "1:03.212", sortie: "13 décembre 2016 (Import/Export)",
    histoire: { dispo: false, texte: "" },
    online: { prix: 999000, vendeur: "Elegy RH8 + conversion chez Benny's", texte: "Acheter une Elegy RH8 (95 000 GTA$, gratuite avec un compte Social Club), puis la convertir chez Benny's (904 000 GTA$). Peut être une cible des « Exotic Exports »." },
    ameliorations: ["Réglage spécial drift disponible au LS Car Meet (désactive les autres améliorations de performance)", "Nombreuses livrées", "Amélioration complète : 701 544 GTA$"],
    caches: ["La version « rétro » de l'Elegy RH8 : la Skyline GT-R, ancêtre de la GT-R moderne.", "Le nom Elegy existait déjà dans GTA San Andreas, et il revient dans GTA 6."],
    sources: [GB("annis-elegy-retro-custom", "Annis Elegy Retro Custom")]
  },
  {
    id: "811", nom: "811", marque: "Pfister", classe: "Super", type: "voiture",
    places: 2, transmission: "Intégrale (AWD)", inspiration: "Porsche 918 Spyder, Koenigsegg Regera",
    vitesse: { kmh: 210.4, mph: 130.75 }, tour: "1:02.946", sortie: "28 juin 2016 (Further Adventures in Finance and Felony)",
    histoire: { dispo: false, texte: "" },
    online: { prix: 1135000, vendeur: "Legendary Motorsport", texte: "Peut être une cible des « Exotic Exports »." },
    ameliorations: ["Toit amovible", "Hybride électrique", "Brouilleur anti-missiles", "Arrière pare-balles", "Amélioration complète : 302 000 GTA$"],
    caches: ["Pfister est la marque du jeu qui parodie Porsche : la 811 est sa version de la 918 hybride."],
    sources: [GB("pfister-811", "Pfister 811")]
  },
  {
    id: "xa-21", nom: "XA-21", marque: "Ocelot", classe: "Super", type: "voiture",
    places: 2, transmission: "Intégrale (AWD)", inspiration: "Jaguar C-X75, McLaren P1, Maserati GranTurismo, Koenigsegg Regera",
    vitesse: { kmh: 197.1, mph: 122.5 }, tour: "0:59.459", sortie: "15 août 2017 (Gunrunning)",
    histoire: { dispo: false, texte: "" },
    online: { prix: 1670000, vendeur: "Legendary Motorsport", texte: "Prix baissé le 14 mai 2026 (avant : 2 375 000 GTA$). Peut être une cible des « Exotic Exports »." },
    ameliorations: ["Aileron actif", "Hybride électrique", "Brouilleur anti-missiles", "Amélioration complète : 374 500 GTA$"],
    caches: ["Ocelot est la marque du jeu qui parodie Jaguar (l'ocelot est un petit félin, comme le jaguar)."],
    sources: [GB("ocelot-xa-21", "Ocelot XA-21")]
  },
  {
    id: "itali-gtb", nom: "Itali GTB", marque: "Progen", classe: "Super", type: "voiture",
    places: 2, transmission: "Intégrale (AWD)", inspiration: "McLaren 570S / 650S / P14, Trion Nemesis",
    vitesse: { kmh: 201.6, mph: 125.25 }, tour: "1:01.311", sortie: "10 janvier 2017 (Import/Export)",
    histoire: { dispo: false, texte: "" },
    online: { prix: 1189000, vendeur: "Benny's Original Motor Works", texte: "" },
    ameliorations: ["Existe en version Custom chez Benny's", "Amélioration complète : 350 700 GTA$"],
    caches: ["Progen est la marque du jeu qui rappelle McLaren (comme la T20, inspirée de la McLaren P1)."],
    sources: [GB("progen-itali-gtb", "Progen Itali GTB")]
  },
  {
    id: "tezeract", nom: "Tezeract", marque: "Pegassi", classe: "Super", type: "voiture",
    places: 2, transmission: "Intégrale (AWD)", inspiration: "Lamborghini Terzo Millennio (concept), SRT Tomahawk",
    vitesse: { kmh: 202.4, mph: 125.75 }, tour: "1:00.678", sortie: "27 mars 2018 (Southern SA Super Sport Series)",
    histoire: { dispo: false, texte: "" },
    online: { prix: 2825000, vendeur: "Legendary Motorsport", texte: "" },
    ameliorations: ["100 % électrique", "Brouilleur anti-missiles", "Livrées", "Amélioration complète : 243 430 GTA$"],
    caches: ["Inspirée du Terzo Millennio, un concept électrique de Lamborghini jamais commercialisé : dans le jeu, tu peux l'acheter."],
    sources: [GB("pegassi-tezeract", "Pegassi Tezeract")]
  },
  {
    id: "toros", nom: "Toros", marque: "Pegassi", classe: "SUV", type: "voiture",
    places: 4, transmission: "Intégrale (AWD)", inspiration: "Lamborghini Urus, Lamborghini Aventador, Audi Q8",
    vitesse: { kmh: 206.4, mph: 128.25 }, tour: "1:04.765", sortie: "18 décembre 2018 (Arena War)",
    histoire: { dispo: false, texte: "" },
    online: { prix: 498000, vendeur: "Legendary Motorsport", texte: "Peut aussi arriver comme voiture de client dans ton Auto Shop." },
    ameliorations: ["Livrées", "Brouilleur anti-missiles", "Amélioration complète : 402 600 GTA$"],
    caches: ["Un SUV familial à 4 places… plus rapide en pointe que l'Adder ou la Zentorno.", "« Toros » (taureaux) : encore un clin d'œil à l'emblème de Lamborghini."],
    sources: [GB("toros", "Pegassi Toros")]
  },
  {
    id: "akuma", nom: "Akuma", marque: "Dinka", classe: "Moto", type: "moto",
    places: 2, transmission: "Propulsion (RWD)", inspiration: "Ducati Monster",
    vitesse: { kmh: 195.1, mph: 121.25 }, tour: "0:58.892", sortie: "17 septembre 2013 (jeu de base)",
    histoire: { dispo: true, texte: "Achetable 9 000 $, ou à voler." },
    online: { prix: 9000, vendeur: "Southern S.A. Super Autos", texte: "" },
    ameliorations: ["Brouilleur anti-missiles", "Amélioration complète : 111 000 GTA$"],
    caches: ["« Akuma » signifie « démon » en japonais, un clin d'œil à la Ducati Monster qui l'a inspirée."],
    sources: [GB("dinka-akuma", "Dinka Akuma")]
  },
  {
    id: "avenger", nom: "Avenger", marque: "Mammoth", classe: "Avion (base volante)", type: "avion",
    places: 5, transmission: "—", inspiration: "Bell Boeing V-22 Osprey",
    vitesse: { kmh: 287.3, mph: 178.5 }, tour: "0:39.421", sortie: "12 décembre 2017 (The Doomsday Heist)",
    histoire: { dispo: false, texte: "" },
    online: { prix: 3450000, vendeur: "Warstock Cache & Carry", texte: "Rangé dans un hangar ou une installation (Facility). Se modifie uniquement dans leurs ateliers." },
    ameliorations: ["Base volante : options tourelle, atelier de véhicules, atelier d'armes", "Pilote automatique", "Mode furtif (invisible sur la mini-carte)", "Décollage vertical et vol stationnaire", "Amélioration complète : 2 394 850 GTA$"],
    caches: ["Un vrai QG volant : on peut y modifier des véhicules en plein vol.", "Le pilote automatique permet de quitter le cockpit pendant que l'avion vole seul."],
    sources: [GB("hvy-mammoth-avenger", "Mammoth Avenger")]
  },
  {
    id: "strikeforce", nom: "B-11 Strikeforce", marque: "—", classe: "Avion d'attaque", type: "avion",
    places: 1, transmission: "—", inspiration: "Fairchild Republic A-10 Thunderbolt II « Warthog », Northrop YA-9",
    vitesse: { kmh: 263.5, mph: 163.75 }, tour: "0:46.034", sortie: "7 août 2018 (After Hours)",
    histoire: { dispo: false, texte: "" },
    online: { prix: 3800000, vendeur: "Warstock Cache & Carry", texte: "Rangé dans un hangar, modifiable dans son atelier." },
    ameliorations: ["Canon inspiré du GAU-8 Avenger", "Missiles à tête chercheuse", "Bombes", "Contre-mesures", "Blindé : environ 6 missiles pour le détruire"],
    caches: ["Reprend l'avion A-10, surnommé « Warthog » (phacochère), célèbre pour son énorme canon rotatif."],
    sources: [GB("b-11-strikeforce", "B-11 Strikeforce")]
  },
  {
    id: "akula", nom: "Akula", marque: "—", classe: "Hélicoptère d'attaque", type: "helico",
    places: 4, transmission: "—", inspiration: "Kamov Ka-50 « Black Shark », Boeing-Sikorsky RAH-66 Comanche",
    vitesse: { kmh: 253.1, mph: 157.25 }, tour: "0:54.368", sortie: "12 décembre 2017 (The Doomsday Heist)",
    histoire: { dispo: false, texte: "" },
    online: { prix: 4500000, vendeur: "Warstock Cache & Carry", texte: "Prix réduit de 3 375 000 GTA$ après la mission du Doomsday Heist correspondante. Prix d'origine : 3 704 050 GTA$, modifié le 27 avril 2023." },
    ameliorations: ["Mode furtif (invisible sur la mini-carte)", "Missiles à tête chercheuse", "Bombes", "Blindé", "Amélioration complète : 1 109 850 GTA$"],
    caches: ["« Akula » signifie « requin » en russe, comme son inspiration, le Ka-50 « Black Shark »."],
    sources: [GB("akula", "Akula")]

  }
];

