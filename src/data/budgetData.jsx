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
    label: 'TGV Aix-Paris A/R',
    cost: 75,
    icon: <TrainFront size={16} />,
    color: 'red',
    type: 'epargne',
    desc: '✓ Aller 45€ payé · ⚠ reste le RETOUR du 1er déc',
  },
  {
    label: 'Nuits CDG (EasyHotel Villepinte)',
    cost: 32,
    icon: <Hotel size={16} />,
    color: 'orange',
    type: 'epargne',
    desc: '✓ Nuit 7→8 payée · ⚠ reste celle du 30 nov→1er déc (ta part)',
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
    label: 'Hébergement (21 nuits)',
    cost: 881,
    icon: <Hotel size={16} />,
    color: 'emerald',
    type: 'epargne',
    desc: 'Ta part (50% de 1 761€) — relevé sur tes résas Booking, payé sur place',
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
    label: 'Grands Parcs & Temples',
    cost: 400,
    icon: <Ticket size={16} />,
    color: 'pink',
    type: 'epargne',
    desc: 'USJ, TeamLab, journée du 17 : Maikoya 30 800¥ (kimono + samurai + thé inclus, ~185€). Photographe pro retiré (Insta / autonomie).',
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
