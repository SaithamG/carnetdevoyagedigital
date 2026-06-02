import React from 'react';
import {
  Plane,
  Hotel,
  Train,
  Utensils,
  Ticket,
  ShoppingBag,
} from 'lucide-react';

// Postes du budget, répartis en deux blocs : « avant » = à régler avant/au
// départ (vol, hébergement, transports), « place » = la vie sur place.
export const budgetData = [
  {
    label: 'Vol A/R (2 voyageurs)',
    cost: 1700,
    icon: <Plane size={16} />,
    color: 'blue',
    type: 'avant',
    desc: 'Estimation à confirmer · KIX aller / Tokyo retour',
  },
  {
    label: 'Hébergement (13 nuits)',
    cost: 1300,
    icon: <Hotel size={16} />,
    color: 'emerald',
    type: 'avant',
    desc: 'Airbnb Kyoto · maison Nagano · hôtel Kabukicho (estim.)',
  },
  {
    label: 'Transports au Japon (sans JR Pass)',
    cost: 600,
    icon: <Train size={16} />,
    color: 'orange',
    type: 'avant',
    desc: 'Haruka, Shinkansen, métros & monorail · billets sur place',
  },
  {
    label: 'Repas & vie (14 jours)',
    cost: 700,
    icon: <Utensils size={16} />,
    color: 'purple',
    type: 'place',
    desc: '~50€/jour : repas et petites dépenses du quotidien',
  },
  {
    label: 'Loisirs & activités',
    cost: 800,
    icon: <Ticket size={16} />,
    color: 'pink',
    type: 'place',
    desc: 'DisneySea, Small Worlds, musées, monorail, Sea Candle…',
  },
  {
    label: 'Souvenirs & shopping',
    cost: 1500,
    icon: <ShoppingBag size={16} />,
    color: 'amber',
    type: 'place',
    desc: 'Le gros poste plaisir du voyage',
  },
];

export const totalAvantDepart = budgetData
  .filter((i) => i.type === 'avant')
  .reduce((acc, curr) => acc + curr.cost, 0);

export const totalSurPlace = budgetData
  .filter((i) => i.type === 'place')
  .reduce((acc, curr) => acc + curr.cost, 0);

export const totalBudget = totalAvantDepart + totalSurPlace;

// Catégories du suivi de dépenses sur place (cash en yens). Réutilisées par le
// tracker (SuiviDepenses) et le budget total affiché dans le header.
export const trackerCategories = [
  { id: 'repas', label: 'Repas', icon: <Utensils size={18} />, color: 'rose', budgetEur: 700 },
  { id: 'loisirs', label: 'Loisirs', icon: <Ticket size={18} />, color: 'pink', budgetEur: 800 },
  { id: 'souvenirs', label: 'Souvenirs', icon: <ShoppingBag size={18} />, color: 'amber', budgetEur: 1500 },
  { id: 'transport', label: 'Transport local', icon: <Train size={18} />, color: 'indigo', budgetEur: 100 },
];
