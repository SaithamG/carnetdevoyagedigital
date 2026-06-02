import React from 'react';
import {
  Utensils,
  Ticket,
  ShoppingBag,
} from 'lucide-react';

// Budget « sur place » communiqué par Alban (dépenses du quotidien en yens).
// Les postes "avant le départ" (vol, hébergement, transports) ne sont pas
// renseignés : aucune estimation inventée. type = 'avant' réservé si Alban
// fournit ces montants plus tard.
export const budgetData = [
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
];
