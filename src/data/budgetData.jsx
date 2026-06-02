import React from 'react';
import {
  Plane,
  Hotel,
  Train,
  Utensils,
  Ticket,
  ShoppingBag,
} from 'lucide-react';

export const budgetData = [
  {
    label: 'Vol A/R (2 voyageurs)',
    cost: 1700,
    icon: <Plane size={16} />,
    color: 'blue',
    type: 'epargne',
    desc: 'Estimation à confirmer · KIX aller / Tokyo retour',
  },
  {
    label: 'Hébergement (13 nuits)',
    cost: 1300,
    icon: <Hotel size={16} />,
    color: 'emerald',
    type: 'epargne',
    desc: 'Airbnb Kyoto · maison Nagano · hôtel Kabukicho (estim.)',
  },
  {
    label: 'Transports au Japon (sans JR Pass)',
    cost: 600,
    icon: <Train size={16} />,
    color: 'orange',
    type: 'epargne',
    desc: 'Haruka, Shinkansen, métros & monorail · billets sur place',
  },
  {
    label: 'Repas & vie (14 jours)',
    cost: 700,
    icon: <Utensils size={16} />,
    color: 'purple',
    type: 'salaire',
    desc: '~50€/jour : repas et petites dépenses du quotidien',
  },
  {
    label: 'Loisirs & activités',
    cost: 800,
    icon: <Ticket size={16} />,
    color: 'pink',
    type: 'salaire',
    desc: 'DisneySea, Small Worlds, musées, monorail, Sea Candle…',
  },
  {
    label: 'Souvenirs & shopping',
    cost: 1500,
    icon: <ShoppingBag size={16} />,
    color: 'amber',
    type: 'salaire',
    desc: 'Le gros poste plaisir du voyage',
  },
];

export const totalEpargneUsed = budgetData
  .filter((i) => i.type === 'epargne')
  .reduce((acc, curr) => acc + curr.cost, 0);
