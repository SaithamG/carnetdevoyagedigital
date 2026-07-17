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
    textOut: '-552€ (Été + aespa + TGV + hôtel)',
    balance: 1957,
    actual: true,
    detail:
      "SOLDE RÉEL RELEVÉ AU 17/07 : 1 957 €. Détail : -280€ Summer Tour, -119€ place aespa 2027, -45€ TGV aller (payé en avance, il était budgété en octobre), -32€ nuit Villepinte. Il reste 76€ d'écart NON IDENTIFIÉ vs la projection (revente BTS sous les 250€ ? Summer Tour au-dessus de 280€ ?) — à retrouver sur le relevé.",
  },
  {
    month: 'Août 2026',
    textIn: '+500€ (capé) / +750€ (God Mode)',
    textOut: '-77€ (TGV retour + nuit Villepinte)',
    balancePrudent: 2380,
    balanceGodMode: 2630,
    actual: false,
    detail:
      'Réservation du retour : TGV du 1er déc (~45€) + 2ème nuit à Villepinte (32€, ta part). Les ventes SNCF ouvrent début août.',
  },
  {
    month: 'Sept 2026',
    textIn: '+500€ / +750€',
    textOut: '-225€ (Parcs)',
    balancePrudent: 2655,
    balanceGodMode: 3155,
    actual: false,
    detail: 'Achat de ton USJ Express Pass 7 (200€) et TeamLab (25€).',
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
    textOut: '-1228€ (Hôtels + Reste Infra)',
    balancePrudent: 1630,
    balanceGodMode: 2380,
    actual: false,
    detail:
      'Paiement hôtels (783€), reste Transports/Suica (270€) et reste Parcs/Temples (175€). Le mois blanc : le salaire de nov paie la vie sur place, pas l\'épargne.',
  },
];
