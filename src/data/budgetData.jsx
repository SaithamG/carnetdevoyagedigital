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
    label: 'Reste Vol A/R (Air China)',
    cost: 488,
    icon: <Plane size={16} />,
    color: 'blue',
    type: 'epargne',
    desc: '3 x 163€ via PayPal 4x',
  },
  {
    label: 'TGV Aix-Paris A/R',
    cost: 120,
    icon: <TrainFront size={16} />,
    color: 'red',
    type: 'epargne',
    desc: 'Navette aéroport (déduit en Oct)',
  },
  {
    label: 'Hébergement (21 nuits)',
    cost: 783,
    icon: <Hotel size={16} />,
    color: 'emerald',
    type: 'epargne',
    desc: 'Ta part (50%) - Payé sur place',
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
    desc: 'USJ, TeamLab, Himeji, etc.',
  },
  {
    label: 'Nourriture & Vie (22j)',
    cost: 770,
    icon: <Utensils size={16} />,
    color: 'purple',
    type: 'salaire',
    desc: 'Ajusté à 35€/j (Tabehoudai)',
  },
  {
    label: 'Shopping & Goodies',
    cost: 330,
    icon: <ShoppingBag size={16} />,
    color: 'amber',
    type: 'salaire',
    desc: 'Maillot Volley, OP Gym, Figurines',
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
