import React from 'react';
import {
  Plane,
  TrainFront,
  Hotel,
  Train,
  Ticket,
  Utensils,
  ShoppingBag,
  Wallet,
} from 'lucide-react';

export const budgetData = [
  {
    label: 'Vol A/R (Air China) — Soldé',
    cost: 0,
    icon: <Plane size={16} />,
    color: 'blue',
    type: 'epargne',
    desc: '✓ 4/4 réglé via PayPal — plus rien à sortir',
  },
  {
    label: 'OUIGO Aix-Paris A/R',
    cost: 81,
    icon: <TrainFront size={16} />,
    color: 'orange',
    type: 'epargne',
    desc: "✓ ALLER du 7 nov payé (45€) — arrive gare Roissy CDG 2 à 13h31, dans l'aéroport. ⚠ MAIS c'est un OUIGO et AUCUNE option bagage n'a été prise : 10€ provisionnés pour tes 2 options à 5€, à ajouter en ligne AVANT le départ (20€/valise si tu paies au quai). Tu en récupères 5 si une seule valise suffit à l'aller. ✓ RETOUR du 1er déc RÉSERVÉ le 12 août (CDG T2 11h00 → Aix 14h10), ta part 26€ = 16€ + tes 2 options bagage à 5€, celles-là bien prises.",
  },
  {
    label: 'Nuits CDG (aller easyHotel + retour Eklo)',
    cost: 44,
    icon: <Hotel size={16} />,
    color: 'emerald',
    type: 'epargne',
    desc: "✓ Nuit 7→8 nov à l'easyHotel : payée en juillet (32€ ta part, 63,50€ la chambre) · ✓ Nuit 30 nov→1er déc à l'EKLO ROISSY : RÉSERVÉE le 12 août, Duo flexible 63€, annulable jusqu'au 28/11, SANS PRÉPAIEMENT. Ta part 31,50€ + 2 navettes à 6€ = 44€, payés sur place en novembre (donc comptés sur le mois du départ, pas en août).",
  },
  {
    label: 'Tokyo Drift (Fast & Furious)',
    cost: 107,
    icon: <Ticket size={16} />,
    color: 'purple',
    type: 'epargne',
    desc: 'Ven 27 nov au soir · ride-along JDM · GetYourGuide',
  },
  {
    label: 'Hébergement (22 nuits)',
    cost: 965,
    icon: <Hotel size={16} />,
    color: 'emerald',
    type: 'epargne',
    desc: "Ta part (50% de 1 761€ = 881€) — relevé sur tes résas Booking, payé sur place. ✅ AJOUT DU 13 AOÛT : nuit du 13→14 nov au RYOKAN TSUKINOYA (Miyanoshita, Hakone), 168€ pour deux → +84€ ta part. Réservé, annulable jusqu'au 30 octobre, SANS prépaiement ni carte bancaire. Chambre de style japonais avec source chaude privée, 9,6/10 sur 840 avis, 10 chambres seulement, 3 bains d'onsen réservables en privatif (tatouages acceptés). 💴 ⚠️ LE RYOKAN N'ACCEPTE PAS LA CARTE : 30 900¥ EN ESPÈCES le jour même (confirmé par eux le 13 août), et pas de distributeur à Miyanoshita — le liquide se retire à Tokyo ou à Hakone-Yumoto, pas sur place. Transport : 0€, ton Hakone Free Pass est valable 2 JOURS et tu n'en utilisais qu'un. ⏳ EN ATTENTE : demande envoyée au Toyoko Inn Shinjuku pour retirer la nuit du 13 de la résa 9→15 nov. S'ils acceptent sans toucher au tarif des 5 autres nuits, cette ligne retombe à 923€ (−41,50€). S'ils refusent, on garde tout tel quel : ne JAMAIS laisser annuler la résa Toyoko, elle est 479€ sous la médiane du marché.",
  },
  {
    label: 'Transports Japon (+ Pass)',
    cost: 475,
    icon: <Train size={16} />,
    color: 'orange',
    type: 'epargne',
    desc: 'Shinkansen, Pass & Suica',
  },
  {
    label: 'Takkyubin (2 envois de valises)',
    cost: 40,
    icon: <Train size={16} />,
    color: 'orange',
    type: 'epargne',
    desc: "⚠ POSTE OUBLIÉ jusqu'au 12 août : l'itinéraire prévoit 2 envois de valises (Tokyo→Osaka le 14 nov, puis retour vers Tokyo le 25) mais AUCUN budget n'était prévu. Tarif Yamato pour une valise 140-160 cm sur Tokyo-Osaka : 2 310 à 2 630¥ pièce. Ce n'est pas une option : tout le plan bagages en dépend (tu montes dans le Shinkansen avec un petit sac, sans avoir à réserver de place « hors format »). 🧳 RECALCULÉ LE 13 AOÛT — vous partez LÉGERS : 1 valise chacun à l'aller (au lieu de 2), la seconde s'achète au Japon. L'envoi du 14 nov ne porte donc que 2 valises au lieu de 4. Ta part passe de 53€ à 40€, en supposant que la valise achetée sur place voyage dans l'envoi retour du 25. 💡 Si vous l'achetez APRÈS le 25 nov (segment Ueno : Ameyoko, Akihabara), elle n'entre dans aucun envoi et cette ligne tombe à 27€.",
  },
  {
    label: 'Grands Parcs & Temples',
    cost: 340,
    icon: <Ticket size={16} />,
    color: 'pink',
    type: 'epargne',
    desc: "🔴 ERREUR CORRIGÉE LE 13 AOÛT — MAIKOYA ÉTAIT COMPTÉ EN DOUBLE. Le carnet portait « 30 800¥ ~185€ », mais 30 800¥ est le total POUR VOUS DEUX (capture de la page de résa : 2 adultes × 14 000¥ + 2 800¥ de taxe). Or toutes les lignes de ce budget suivent TA PART. Ta part réelle = 15 400¥ = 83€, pas 185€. ⇒ 102€ récupérés, et c'est ce qui finance la nuit de ryokan à Hakone. 🎢 USJ EN EXPRESS PASS 4 (décidé le 13 août) : ~12 800¥ ≈ 69€ au lieu de ~17 800¥ ≈ 96€ pour l'EP7, soit 27€ de plus récupérés. ⚠ PRENDRE LA BONNE VARIANTE : toutes ne couvrent pas Super Nintendo World — il faut celle du type « Mine Cart & Jurassic Park ». Détail de la ligne : Maikoya 83€ + Studio Pass ~47€ + Express Pass 4 ~69€ + TeamLab ~25€ = 224€, plus ~80€ estimés d'entrées annexes (Toshogu, Kiyomizu, Todai-ji, Himeji, Mont Rokko, Umeda Sky, Spa World, SPO-CHA, Joypolis, Shibuya Sky) ≈ 304€. Les 340€ gardent ~36€ de matelas : les tarifs USJ sont dynamiques et ceux de nov 2026 ne sont pas publiés. Photographe pro retiré (Insta / autonomie).",
  },
  {
    label: 'Nourriture & Vie (22j)',
    cost: 700,
    icon: <Utensils size={16} />,
    color: 'purple',
    type: 'salaire',
    desc: '~32€/j au lieu de 35 — konbini le matin, tabehoudai le soir',
  },
  {
    label: 'Shopping & Goodies',
    cost: 400,
    icon: <ShoppingBag size={16} />,
    color: 'amber',
    type: 'salaire',
    desc: '+70€ pris sur la bouffe : même poche, zéro impact sur le van',
  },
  {
    label: '2e valise (achetée au Japon)',
    cost: 45,
    icon: <ShoppingBag size={16} />,
    color: 'indigo',
    type: 'epargne',
    desc: "🧳 NOUVEAU (13 août) : vous partez avec 1 valise chacun et achetez la seconde sur place. Ce n'est PAS du shopping plaisir — d'où sa ligne à part, hors de l'enveloppe Goodies. Comptez 5 000 à 12 000¥ chez Don Quijote ou Bic Camera, soit 27 à 66€ : 45€ provisionnés. ✅ Ta franchise Air China est bien de 2 pièces × 23 kg : la valise achetée sur place rentre dans la franchise du retour, zéro supplément au comptoir. ⚠️ Ne PAS confondre avec une perte à l'aller : la franchise est un droit, pas un crédit prépayé — ne pas l'utiliser au départ ne coûte rien, et partir léger fait au contraire économiser 13€ de Takkyubin et 5€ d'option OUIGO. 💡 Achète-la après le 25 nov (segment Ueno : Ameyoko, Akihabara) : elle échappe alors au dernier envoi Takkyubin. ⚖️ ARBITRAGE TRANCHÉ PAR TOI LE 13 AOÛT : ces 45€ sortent de l'ÉPARGNE, pas des goodies. La poche « salaire de novembre » (bouffe + goodies + buffer) reste donc équilibrée pile sur le salaire du mois blanc, et tu ne rognes rien sur les figurines. Le prix de ce choix est visible et assumé : la marge de retour recule de 45€, c'est-à-dire 45€ d'avance en moins sur le van 2027. C'était le bon échange — mais c'est bien un échange, pas un repas gratuit.",
  },
  {
    label: 'Buffer France (5-9 Nov & 30-5 Déc)',
    cost: 146,
    icon: <Wallet size={16} />,
    color: 'slate',
    type: 'salaire',
    desc: 'Survie FR avant départ et au retour',
  },
];

export const totalEpargneUsed = budgetData
  .filter((i) => i.type === 'epargne')
  .reduce((acc, curr) => acc + curr.cost, 0);
