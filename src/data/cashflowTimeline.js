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
    textOut: '-225€ (Parcs)',
    balancePrudent: 2696,
    balanceGodMode: 3196,
    actual: false,
    detail:
      "Achat USJ + TeamLab. Le budget table sur 200€ pour l'USJ ; le vrai tarif est ~96€ l'Express Pass 7 (17 800¥) + ~48€ le Studio Pass d'entrée (que le budget oubliait), soit ~144€. Avec TeamLab (~25€) on est plutôt vers 169€ que 225€. Les 225€ sont GARDÉS exprès : le tarif Express varie selon la date, autant garder le matelas.",
  },
  {
    month: 'Oct 2026',
    textIn: '+500€ / +750€',
    textOut: '-297€ (Trains + Tokyo Drift)',
    balancePrudent: 2899,
    balanceGodMode: 3649,
    actual: false,
    detail:
      'Shinkansen (85€) et Kansai Pass (105€). Le TGV n\'est plus ici : l\'aller est déjà payé et le retour part en août. Nouveau : Tokyo Drift (107€), à réserver le 27 oct.',
  },
  {
    month: 'Départ (Nov)',
    textIn: '-',
    textOut: '-1423€ (Hôtels + Infra + nuit CDG + Takkyubin)',
    balancePrudent: 1476,
    balanceGodMode: 2226,
    actual: false,
    detail:
      "Paiement hôtels 881€ (ta part de 1 761€, RELEVÉ sur tes résas Booking — le budget tablait sur 783€, il manquait 98€), reste Transports/Suica (270€) et reste Parcs/Temples (175€, journée kimono du 17 incluse sans photographe pro). NOUVEAU : +44€ pour la nuit du 30 nov à l'Eklo Roissy (ta moitié de chambre 31,50€ + tes 2 navettes à 6€) — réservée sans prépaiement, donc payée sur place à ce moment-là et non en août. ⚠ NOUVEAU AUSSI : +53€ de Takkyubin, poste que le budget avait purement oublié alors que l'itinéraire s'appuie dessus (2 envois de 4 valises, ~2 470¥ pièce). Le mois blanc : le salaire de nov paie la vie sur place, pas l'épargne.",
  },
];
