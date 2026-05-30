import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import { imageForMapUrl } from '../data/itineraryGeo';

// Affiche la photo locale d'un lieu, avec repli propre (dégradé + nom) si le
// fichier est absent ou ne charge pas — jamais d'image cassée ni masquée.
const PlaceImage = ({ mapUrl, title, className = '' }) => {
  const [failed, setFailed] = useState(false);

  if (!mapUrl || failed) {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-1.5 bg-gradient-to-br from-slate-800 via-slate-850 to-slate-900 ${className}`}
      >
        <MapPin size={22} className="text-slate-600" />
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-3 text-center leading-tight line-clamp-2">
          {title}
        </span>
      </div>
    );
  }

  return (
    <img
      src={imageForMapUrl(mapUrl)}
      alt={title}
      loading="lazy"
      onError={() => setFailed(true)}
      className={className}
    />
  );
};

export default PlaceImage;
