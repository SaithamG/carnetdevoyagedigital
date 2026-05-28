import React from 'react';
import { Zap, Leaf, Flame, MapPin, ShoppingBag } from 'lucide-react';

export const regions = [
  { id: 'tokyo1', name: 'Tokyo Ouest', icon: <Zap size={16} /> },
  { id: 'kyoto', name: 'Kyoto', icon: <Leaf size={16} /> },
  { id: 'osaka', name: 'Osaka & Kansai', icon: <Flame size={16} /> },
  { id: 'hiroshima', name: 'Hiroshima', icon: <MapPin size={16} /> },
  { id: 'tokyo2', name: 'Tokyo Est', icon: <ShoppingBag size={16} /> },
];
