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
    textIn: '+568€ (constaté le 5/09)',
    textOut: '-776,50€ (USJ + Maikoya + teamLab + Shein + Volley)',
    balancePrudent: 2213,
    balanceGodMode: 2463,
    actual: false,
    detail:
      "🏐 LICENCE VOLLEY AUC13VB PAYÉE LE 25 SEPTEMBRE — 295 € (Inscription LICENCES FFVB 2026-2027), EN UNE SEULE FOIS, SORTIE DE L’ÉPARGNE. ⛔ LE PAIEMENT EN 3× A ÉTÉ ÉCARTÉ : la 3e échéance serait tombée fin novembre, PENDANT LE JAPON — même règle que l’arbitrage Lego du 5/09 (aucune échéance sur le mois blanc, à l’autre bout du monde). 🔑 LE TARIF EST FIXE : le choix LICENCE LOISIR FFVB / LICENCE UFOLEP ne change PAS le prix, il ne joue que sur la couverture. Adhésion UFOLEP gratuite. ⚠️ CETTE DÉPENSE N’ÉTAIT DANS AUCUNE LIGNE DU CARNET : les soldes l’ignoraient, exactement comme les fringues avant elle. 👕 GARDE-ROBE HIVER COMMANDÉE LE 24 SEPTEMBRE — 15 articles, 201,50 € payés (sous-total 251,87 € − 50,37 € de code promo `lillyandshopping8525`, livraison gratuite), SORTIE DE L'ÉPARGNE. 11 hauts en 48(M) et 4 bas en 46(S), les 15 tailles vérifiées une par une sur les fiches produit. Plafond fixé à 250 € : on est 48,50 € en dessous, et c'est 30 € de MOINS que le panier cible du 18/09 (232,48 €) qui ne contenait qu'un seul sweat au lieu de deux. ⚠️ CETTE DÉPENSE N'ÉTAIT DANS AUCUNE LIGNE DU CARNET jusqu'ici : les soldes affichés l'ignoraient. Livraison attendue du 1er au 7 octobre. 🎢 USJ PAYÉ LE 23 SEPTEMBRE — 53 400¥ pour deux sur la Boursobank Ultim, en yens (≈296,34 € au taux du jour, 180,2¥/€). TA PART : 26 700¥ ≈ 148 € au lieu des 160 € provisionnés ⇒ +12 € sur ce mois et sur toute la suite de la chaîne (sorties 292 → 280 €). ⚠️ SORTIE DE L'ÉPARGNE : ≈296 € (300 € virés pour couvrir l'écart de taux). VERANE TE DOIT ≈148 € : comme pour le Tokyo Drift, cet argent n'est pas de l'épargne tant qu'il n'est pas remboursé. Chiffres à recaler au centime sur le débit réel. Variante finale : Express Pass 4 « Mine Cart & JAWS », Nintendo World garanti 17h00-18h00. — 💶 ENTRÉE CONSTATÉE, PAS PROJETÉE : 568 € virés le 5 septembre (1 593 − 1 025 de vie à Aix). Les 68 € au-dessus des 500 € du plan sont le RELIQUAT DU MOIS D'AOÛT non dépensé — il dormait sur le compte courant, donc hors épargne : en le virant, c'est un vrai gain de 68 €, pas un déplacement. ⚠️ Le God Mode de septembre est ramené à 568 € lui aussi : la CAF n'a pas débloqué ce mois-ci, prétendre 750 € serait faux. ⚠️ LE MOIS BUDGÉTAIRE VA DU 5 AU 5, pas du 1er au 30. 🎫 SORTIES RÉELLES : teamLab Borderless (14 nov, 15h) + teamLab Botanical Osaka (21 nov, 19h) PAYÉS LE 8 SEPTEMBRE — 81,56 € les deux pour deux, ta part 40,78 € (le budget tablait sur 25 €). ⛔ Les deux sont NON ANNULABLES, seule la date se reprogramme, 3 fois. 🍵 MAIKOYA (#3047861) PAYÉ LE 8 SEPTEMBRE — 30 800¥, ta part ~91 € : ce poste était porté sur NOVEMBRE (ligne « reste Parcs/Temples »), il est déplacé ici. Le solde final ne bouge pas. 💴 8,81 € économisés en refusant le DCC : AU JAPON, TOUJOURS PAYER EN YENS. 🎢 USJ : ACHAT LE MERCREDI 23 SEPT À 17h00 HEURE FRANÇAISE (minuit JST, la vente ouvre 2 mois calendaires avant — vérifié le 17/09), 160 € provisionnés pour une visite le mardi 24 novembre. ⚠️ LE STUDIO PASS N'EST PLUS À 47 € : le tarif réel est 9 400-11 900¥ selon la date (~55-69 €), le budget tablait sur 8 600¥. L'AREA TIMED ENTRY TICKET DE SUPER NINTENDO WORLD N'EST PLUS GRATUIT : le ticket libre de l'appli a disparu, il faut désormais un Advance Booking payant, un ticket du jour, la file Standby ou un pass VIP. ⛔ AUCUN billet USJ n'est annulable. LE PASS CHOISI N'EST PLUS « Mine Cart & Jurassic Park ». Relevé sur usjticketing.com : cette variante coûte 16 800¥ et ne contient NI Mario Kart NI Harry Potter. ✅ LE BON EST « UNIVERSAL EXPRESS PASS 4 : RACE & JAWS », 10 800¥/pers — Mario Kart + Harry Potter Forbidden Journey + Minion Mayhem + JAWS/Jurassic, entrée Super Nintendo World GARANTIE. C'est le pass le moins cher du site et il couvre les 3 univers voulus. ⛔ Pass 7 « Minecart & Selection » (21 800¥) écarté : +22 000¥ pour deux rien que pour couper la file de Mine Cart Madness. 🔑 Le Studio Pass donne accès à TOUT le parc, l'Express ne fait que COUPER LA FILE : Yoshi et Mine Cart se font en file normale. 📄 Fiche d'achat : resas-input/usj-24-nov-plan-achat.md",
  },
  {
    month: 'Oct 2026',
    textIn: '+500€ / +750€',
    textOut: '-190€ (Trains)',
    balancePrudent: 2523,
    balanceGodMode: 3023,
    actual: false,
    detail:
      'Shinkansen (85€) et Kansai Pass (105€). Le TGV n\'est plus ici : l\'aller est déjà payé et le retour part en août. LE TOKYO DRIFT N’EST PLUS SUR CE MOIS. Il était compté ici alors que GetYourGuide ne débite que le 24 NOVEMBRE : ses 142€ sont donc passés sur la ligne de novembre, et le solde d’octobre remonte de 2 889€ à 3 031€.',
  },
  {
    month: 'Départ (Nov)',
    textIn: '-',
    textOut: '-1636€ (Hôtels + ryokan + Infra + nuit CDG + Takkyubin + valise + Tokyo Drift)',
    balancePrudent: 887,
    balanceGodMode: 1387,
    actual: false,
    detail:
      "🔴 25 SEPTEMBRE — SORTIE PORTÉE DE 1 555 À 1 636 € : le poste « reste Parcs/Temples » passe de 49 à 130 € (+81 €). Les 49 € ne couvraient que 4 temples nommés alors qu'ils comptent en faire « plein », et Shibuya Sky (19 €) à lui seul en mangeait 40 %. Détail complet dans budgetData. 💴 À RETIRER EN ESPÈCES : ces entrées ne prennent quasiment jamais la carte. Paiement hôtels 965€ : 881€ de ta part relevée sur tes résas Booking (le budget tablait sur 783€, il manquait 98€) + 84€ pour la NUIT DE RYOKAN À HAKONE réservée le 13 août (Tsukinoya, Miyanoshita, 168€ pour deux, sans prépaiement). Reste Transports/Suica (270€) et reste Parcs/Temples, RAMENÉ DE 140€ À 49€ LE 9 SEPTEMBRE. 🍵 MAIKOYA EST SORTI DE CE MOIS : la « journée kimono du 17 » qui était comptée ici a été RÉSERVÉE ET PAYÉE LE 8 SEPTEMBRE (commande #3047861, 30 800¥ pour deux, ta part ~91€), elle est donc passée sur la ligne de SEPTEMBRE. Le solde final ne bouge pas. ↩️ Annulation Maikoya : 100% jusqu'au 16 nov 12h00 JST, PAR MAIL UNIQUEMENT à cs@maikoya.com, avec les 5 infos obligatoires (n° de commande, nom, email, date, nombre de participants) — incomplet = non enregistré. ⚔️🍵 L'ORDRE EST FIXÉ PAR LA CONFIRMATION : samouraï à 12h00 PUIS thé à 14h30, et non l'inverse. +44€ pour la nuit du 30 nov à l'Eklo Roissy (ta moitié de chambre 31,50€ + tes 2 navettes à 6€) — réservée sans prépaiement, donc payée sur place à ce moment-là et non en août. +40€ de Takkyubin, poste que le budget avait purement oublié alors que l'itinéraire s'appuie dessus (recalculé sur 2 valises à l'aller au lieu de 4 : −13€). +45€ pour la 2e valise achetée au Japon : arbitrage tranché le 13 août, elle sort de l'ÉPARGNE et non des goodies. Le mois blanc : le salaire de nov paie la vie sur place, pas l'épargne. ✅ 14 août : le Toyoko Inn ne peut pas modifier une résa Booking — les 6 nuits sont conservées et l'allègement de ~41,50€ n'aura pas lieu. Ce chiffre était un bonus espéré, jamais compté dans ce solde : rien ne bouge ici. 🏎️ TOKYO DRIFT, RÉSERVÉ LE 8 SEPTEMBRE — le poste le plus piégeux du mois. 💳 LE DÉBIT TOMBE LE MARDI 24 NOVEMBRE ET IL EST DE 284,56€ EN UNE SEULE FOIS, pas de 142€ : c’est TA carte qui encaisse pour deux. Cette ligne ne compte que tes 142€ parce que ⚠️ VÉRANE A DÉJÀ VIRÉ SES 142€ (reçus en septembre) — mais cet argent est sur ton compte DEPUIS SEPTEMBRE et il ne t’appartient pas : il doit encore être là le 24 novembre. Ne le lis jamais comme de l’épargne disponible. 🔑 Le prix est monté de 137,48€ à 142,28€/pers entre le 27 août et le 7 septembre (+5€ sur ta part) ; la course de nuit ayant pris la même hausse, l’option 3 de 17h30 gagne désormais sur tous les critères : même prix, 4h au lieu de 3, fin à 21h30 au lieu de 2h30 du matin. ↩️ Annulation gratuite jusqu’au 26 nov 17h30, changement de date possible jusqu’à 24h avant par WhatsApp. 💴 ⚠️ TSUKINOYA SE PAIE EN ESPÈCES, PAS DE CARTE : 30 900¥ le jour même (confirmé par le ryokan le 13 août). À retirer AVANT de monter à Hakone — il n'y a pas de konbini à Miyanoshita.",
  },
];
