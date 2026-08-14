// Timeline de l'épargne.
//
// Jusqu'à juillet 2026 inclus : du CONSTATÉ (`balance` = solde réel).
// À partir d'août : de la PROJECTION, en deux scénarios (`balancePrudent` /
// `balanceGodMode`) — parce que le +750 €/mois dépend d'un déblocage CAF qui
// n'est pas acquis. Ne jamais réafficher un chiffre unique ici : il prétendrait
// savoir ce qu'on ne sait pas.

export const cashflowTimeline = [
  {
    month: 'Mars 2026',
    textIn: '+160€ (Fact. Tekinova)',
    textOut: '-',
    balance: 1131,
    actual: true,
    detail: 'Le 1er quart du vol et ton virement de 350€ sont inclus.',
  },
  {
    month: 'Avril 2026',
    textIn: '+350€ (Épargne)',
    textOut: '-163€ (PayPal 2/4)',
    balance: 1318,
    actual: true,
    detail: "L'épargne classique absorbe la 2ème échéance de l'avion.",
  },
  {
    month: 'Mai 2026',
    textIn: '+416€ (Augmentation)',
    textOut: '-306€ (Vol + Van)',
    balance: 1422,
    actual: true,
    detail:
      "L'augmentation n'a pris effet que le 22 avril 2026 suite à la mise à jour de mon Cerfa. Acompte du van (~143-146€) inclus ICI — c'est le seul, ne pas le recompter plus tard.",
  },
  {
    month: 'Juin 2026',
    textIn: '+500€ (Épargne capée)',
    textOut: '-163€ (PayPal 4/4)',
    balance: 1759,
    actual: true,
    detail:
      'God Mode désactivé. Recours CAF en cours. Épargne capée à 500 € pour budget Aix à 1 025 €. Le vol est 100% soldé à partir d\'ici.',
  },
  {
    month: 'Juillet 2026',
    textIn: '+750€ (500€ fixe + 250€ BTS)',
    textOut: '-552€ (Été + aespa + TGV + hôtel + avance)',
    balance: 1957,
    actual: true,
    detail:
      "SOLDE RÉEL RELEVÉ AU 17/07 : 1 957 €. Sorties : -280€ Summer Tour, -119€ place aespa 2027, -45€ TGV aller (payé en avance, il était budgété en octobre), -32€ nuit Villepinte, et ~40€ d'avance Flixbus jamais remboursée — ce n'est pas une dépense mais une créance dormante, à relancer ou à acter en perte, quand tu voudras. Reste ~36€ d'écart non identifié : sous le seuil de bruit sur 9 mois, on arrête de chercher.",
  },
  {
    month: 'Août 2026',
    textIn: '+500€ (capé) / +750€ (God Mode)',
    textOut: '-36€ (OUIGO retour payé + options bagage de l\'aller)',
    balancePrudent: 2421,
    balanceGodMode: 2671,
    actual: false,
    detail:
      "✓ OUIGO du 1er déc RÉSERVÉ le 12 août : 26€ ta part (16€ + tes 2 options bagage à 5€), contre 45€ provisionnés à l'origine → 19€ récupérés. ✓ Nuit du 30 nov RÉSERVÉE le même jour (Eklo Roissy) — mais en tarif flexible SANS PRÉPAIEMENT : rien ne sort en août, tu paies à l'hôtel. Les ~44€ (ta part de chambre + les 2 navettes) sont donc portés sur le mois du départ, pas ici. ⚠ AJOUT : 10€ pour tes options bagage de l'ALLER, qui est aussi un OUIGO et n'en avait aucune — à prendre en ligne avant qu'elles ne soient épuisées, sinon c'est 20€ par valise au quai le 7 nov. Août reste le mois le plus léger depuis mars.",
  },
  {
    month: 'Sept 2026',
    textIn: '+500€ / +750€',
    textOut: '-200€ (Parcs)',
    balancePrudent: 2721,
    balanceGodMode: 3221,
    actual: false,
    detail:
      "Achat USJ + TeamLab. 🎢 DÉCIDÉ LE 13 AOÛT : Express Pass 4 au lieu du 7 → ~69€ (12 800¥) au lieu de ~96€ (17 800¥), soit 27€ récupérés. Avec le Studio Pass d'entrée (~47€, que le budget oubliait) et TeamLab (~25€), le réel est vers 141€. On garde 200€ : le tarif Express est dynamique et celui de nov 2026 n'est pas publié. ⚠ Deux points à ne pas oublier au moment d'acheter : (1) toutes les variantes d'EP4 ne couvrent PAS Super Nintendo World, il faut celle du type « Mine Cart & Jurassic Park » ; (2) l'Express Pass n'est PAS obligatoire pour entrer dans Nintendo World — l'accès se gère par un Area Timed Entry Ticket GRATUIT via l'appli USJ, et un mardi de novembre il n'est souvent même pas exigé. L'EP achète du confort et une file prioritaire, pas un droit d'entrée.",
  },
  {
    month: 'Oct 2026',
    textIn: '+500€ / +750€',
    textOut: '-297€ (Trains + Tokyo Drift)',
    balancePrudent: 2924,
    balanceGodMode: 3674,
    actual: false,
    detail:
      'Shinkansen (85€) et Kansai Pass (105€). Le TGV n\'est plus ici : l\'aller est déjà payé et le retour part en août. Nouveau : Tokyo Drift (107€), à réserver le 27 oct.',
  },
  {
    month: 'Départ (Nov)',
    textIn: '-',
    textOut: '-1504€ (Hôtels + ryokan + Infra + nuit CDG + Takkyubin + valise)',
    balancePrudent: 1420,
    balanceGodMode: 2170,
    actual: false,
    detail:
      "Paiement hôtels 965€ : 881€ de ta part relevée sur tes résas Booking (le budget tablait sur 783€, il manquait 98€) + 84€ pour la NUIT DE RYOKAN À HAKONE réservée le 13 août (Tsukinoya, Miyanoshita, 168€ pour deux, sans prépaiement). Reste Transports/Suica (270€) et reste Parcs/Temples (140€, journée kimono du 17 incluse sans photographe pro). +44€ pour la nuit du 30 nov à l'Eklo Roissy (ta moitié de chambre 31,50€ + tes 2 navettes à 6€) — réservée sans prépaiement, donc payée sur place à ce moment-là et non en août. +40€ de Takkyubin, poste que le budget avait purement oublié alors que l'itinéraire s'appuie dessus (recalculé sur 2 valises à l'aller au lieu de 4 : −13€). +45€ pour la 2e valise achetée au Japon : arbitrage tranché le 13 août, elle sort de l'ÉPARGNE et non des goodies. Le mois blanc : le salaire de nov paie la vie sur place, pas l'épargne. ✅ 14 août : le Toyoko Inn ne peut pas modifier une résa Booking — les 6 nuits sont conservées et l'allègement de ~41,50€ n'aura pas lieu. Ce chiffre était un bonus espéré, jamais compté dans ce solde : rien ne bouge ici. 💴 ⚠️ TSUKINOYA SE PAIE EN ESPÈCES, PAS DE CARTE : 30 900¥ le jour même (confirmé par le ryokan le 13 août). À retirer AVANT de monter à Hakone — il n'y a pas de konbini à Miyanoshita.",
  },
];
