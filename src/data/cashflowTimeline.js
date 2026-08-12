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
    textOut: '-58€ (OUIGO retour payé + nuit du 30 à réserver)',
    balancePrudent: 2399,
    balanceGodMode: 2649,
    actual: false,
    detail:
      "✓ OUIGO du 1er déc RÉSERVÉ le 12 août : 26€ ta part (16€ + tes 2 options bagage à 5€), contre 45€ provisionnés à l'origine puis 30€ → 19€ récupérés sur le mois. ⛔ Reste la nuit du 30 nov→1er déc, provisionnée à 32€ (ta part) et toujours pas réservée : c'est la dernière sortie ouverte d'août. Le choix d'hôtel n'est pas tranché — easyHotel Villepinte (provisionné, mais taxi obligatoire en plus) ou Eklo Roissy à 31€ + 6€ de navette qui dépose à la gare TGV.",
  },
  {
    month: 'Sept 2026',
    textIn: '+500€ / +750€',
    textOut: '-225€ (Parcs)',
    balancePrudent: 2655,
    balanceGodMode: 3155,
    actual: false,
    detail:
      "Achat USJ + TeamLab. Le budget table sur 200€ pour l'USJ ; le vrai tarif est ~96€ l'Express Pass 7 (17 800¥) + ~48€ le Studio Pass d'entrée (que le budget oubliait), soit ~144€. Avec TeamLab (~25€) on est plutôt vers 169€ que 225€. Les 225€ sont GARDÉS exprès : le tarif Express varie selon la date, autant garder le matelas.",
  },
  {
    month: 'Oct 2026',
    textIn: '+500€ / +750€',
    textOut: '-297€ (Trains + Tokyo Drift)',
    balancePrudent: 2858,
    balanceGodMode: 3608,
    actual: false,
    detail:
      'Shinkansen (85€) et Kansai Pass (105€). Le TGV n\'est plus ici : l\'aller est déjà payé et le retour part en août. Nouveau : Tokyo Drift (107€), à réserver le 27 oct.',
  },
  {
    month: 'Départ (Nov)',
    textIn: '-',
    textOut: '-1326€ (Hôtels + Reste Infra)',
    balancePrudent: 1532,
    balanceGodMode: 2282,
    actual: false,
    detail:
      "Paiement hôtels 881€ (ta part de 1 761€, RELEVÉ sur tes résas Booking — le budget tablait sur 783€, il manquait 98€), reste Transports/Suica (270€) et reste Parcs/Temples (175€, journée kimono du 17 incluse sans photographe pro). Le mois blanc : le salaire de nov paie la vie sur place, pas l'épargne.",
  },
];
