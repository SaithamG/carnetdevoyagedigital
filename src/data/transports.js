// Tarifs relevés en juillet 2026 aux sources officielles / japan-guide.
// Montants par personne, convertis à ~185¥/€.

export const transports = [
  {
    from: 'Aéroport Haneda',
    to: 'Shinjuku (Hôtel)',
    type: 'Tokyo Monorail + JR Yamanote',
    cost: '~4€',
    desc: 'Validation rapide avec ta carte Suica digitale sur Apple Pay rechargée via Revolut. Aucun billet papier.',
  },
  {
    from: 'Shinjuku',
    to: 'Nikko (A/R)',
    type: 'Limited Express direct',
    cost: '~45€',
    desc: "4 140¥ l'aller (2h), soit ~8 280¥ l'A/R. ⚠ Ce n'est PAS un Spacia : les Spacia partent d'Asakusa. Le direct depuis Shinjuku est un service conjoint JR-Tobu — vérifie le bon canal de réservation, l'ouverture est à 1 mois pile.",
  },
  {
    from: 'Shinjuku',
    to: 'Hakone (A/R)',
    type: 'Hakone Free Pass (2 jours)',
    cost: '~33€',
    desc: "6 100¥. Couvre l'A/R Odakyu, le train Tozan, le téléphérique, le bateau du lac Ashi et les bus. Il n'existe qu'en 2 ou 3 jours : tu n'en utiliseras qu'un, c'est incompressible et ça reste rentable.",
  },
  {
    from: 'Tokyo',
    to: 'Kyoto',
    type: 'Shinkansen Nozomi (TGV)',
    cost: '~75€',
    desc: "13 850¥ en siège réservé (2h15), sur l'app SmartEX 1 mois avant. PAS besoin des places « bagages hors format » : tes valises 23kg partent par Takkyubin le 14 au soir, tu montes ici avec un petit sac.",
  },
  {
    from: 'Kyoto',
    to: 'Osaka',
    type: 'JR Special Rapid Service',
    cost: '~3€',
    desc: 'Train de banlieue classique (30min). Paiement direct en bipant la carte Suica.',
  },
  {
    from: 'Kansai',
    to: 'Ouest Japon',
    type: 'Kansai-Hiroshima Area Pass',
    cost: '~92€',
    desc: "17 000¥, 5 jours consécutifs (activation le 23). Couvre Himeji, Kobe, le Shinkansen Osaka→Hiroshima et le ferry de Miyajima. ⚠ PAS Nara : tu y vas en Kintetsu, et le 20, avant même l'activation. Il n'économise que ~470¥ sur l'ensemble — prends-le pour la simplicité, pas pour le gain.",
  },
  {
    from: 'Hiroshima',
    to: 'Tokyo Station',
    type: 'Shinkansen Nozomi',
    cost: '~105€',
    desc: "19 440¥ en siège réservé (4h). La grande remontée, à réserver sur SmartEX. ⚠ Hors Pass (il s'arrête à Hiroshima), et le train termine à Tokyo Station : Ueno se fait ensuite par la Yamanote (6-8 min).",
  },
  {
    from: 'Tokyo Ueno',
    to: 'Aéroport Haneda',
    type: 'JR Yamanote + Tokyo Monorail',
    cost: '~4€',
    desc: "Trajet retour le dernier matin (vol 08h30). Yamanote jusqu'à Hamamatsucho (~25 min) puis Monorail jusqu'au terminal (~20 min) : ~50 min, ~650¥ à la Suica. Variante : Yamanote → Shinagawa → Keikyu direct. ATTENTION : le Keisei Skyliner ne dessert QUE Narita, jamais Haneda. ⏰ PARS À 5h15 (le « 05h45 » noté ici avant était faux : il ne laissait que 1h55 sur place). Départ 5h15 → Haneda ~6h05, soit 2h25 avant le vol. ⚠️ POURQUOI PAS 3h COMME À CDG : le Monorail ne circule pas avant ~5h00, et le premier Yamanote depuis Ueno est vers 4h30-4h45. Arriver à Haneda à 5h30 est à la limite du physiquement possible en transport public — ce n'est pas un choix de confort, c'est le réseau qui ne suit pas. Si tu veux vraiment 3h : taxi Ueno → Haneda (~40 min, ~7 000-9 000¥ soit 40-50€, roule à toute heure). Sinon, 2h25 à Haneda vaut largement 3h à CDG : l'aéroport est nettement plus fluide.",
  },
];
