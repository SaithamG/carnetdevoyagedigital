import React from 'react';
import { Sparkles, AtSign } from 'lucide-react';

/**
 * Bandeau de démonstration — présent uniquement sur la branche `demo`.
 * Le carnet ci-dessous est un vrai carnet, amputé de tout ce qui est personnel
 * (budget, réservations, notes privées). Son seul rôle ici est de vendre.
 */
const DemoBar = () => (
  <div className="sticky top-0 z-50 bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg">
    <div className="max-w-5xl mx-auto px-4 py-2.5 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
      <div className="flex items-center gap-2 min-w-0">
        <Sparkles size={16} className="shrink-0" />
        <p className="text-xs sm:text-sm font-bold leading-tight">
          Ceci est une démonstration.
          <span className="hidden sm:inline font-medium opacity-90">
            {' '}Votre voyage mérite le même carnet, fait sur mesure.
          </span>
        </p>
      </div>
      <a
        href="https://instagram.com/mathias.hml"
        target="_blank"
        rel="noopener noreferrer"
        className="shrink-0 flex items-center gap-1.5 bg-white text-orange-700 hover:bg-orange-50 transition-colors px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wide"
      >
        <AtSign size={14} />
        Je veux le mien
      </a>
    </div>
  </div>
);

export default DemoBar;
