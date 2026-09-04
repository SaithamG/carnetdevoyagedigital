import React from 'react';
import { CalendarDays, MapPin, TrainFront, Languages, ShieldAlert, FileDown, AtSign } from 'lucide-react';

const ATOUTS = [
  { icon: <CalendarDays size={14} />, label: 'Chaque journée, heure par heure' },
  { icon: <MapPin size={14} />,       label: 'La carte de toutes les étapes' },
  { icon: <TrainFront size={14} />,   label: 'Les trajets et les correspondances' },
  { icon: <Languages size={14} />,    label: 'Le lexique de survie' },
  { icon: <ShieldAlert size={14} />,  label: 'Les urgences, hors connexion' },
  { icon: <FileDown size={14} />,     label: 'Et le PDF, toujours là' },
];

/**
 * Bloc d'accueil de la démo. Volontairement SANS TARIF : le prix se dit en
 * message privé, et il n'est pas le même pour un voyageur que pour une agence.
 */
const Vitrine = () => (
  <section className="mb-8 rounded-2xl border border-slate-800 bg-slate-950/50 overflow-hidden">
    <div className="p-5 md:p-7">
      <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">
        Carnet de voyage sur mesure
      </p>
      <h1 className="text-xl md:text-2xl font-black leading-tight mb-3">
        Le carnet de voyage qui remplace le PDF
      </h1>
      <p className="text-sm text-slate-400 leading-relaxed max-w-2xl">
        Un itinéraire ne se lit pas dans un document de quarante pages, au milieu d'une gare.
        Ici tout est à sa place, jour après jour, et ça s'ouvre sur le téléphone une fois sur place.
        Fait sur mesure — pour votre voyage, ou pour ceux que vous organisez.
      </p>

      <ul className="mt-5 flex flex-wrap gap-2">
        {ATOUTS.map((a) => (
          <li
            key={a.label}
            className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900/60 px-2.5 py-1.5 text-[11px] font-bold text-slate-300"
          >
            <span className="text-slate-500">{a.icon}</span>
            {a.label}
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <a
          href="https://instagram.com/mathias.hml"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-blue-600 hover:opacity-90 transition-opacity text-white px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wide"
        >
          <AtSign size={14} />
          Parlons de votre voyage
        </a>
        <p className="text-[11px] text-slate-500 font-medium">
          Réponse en direct, sans engagement.
        </p>
      </div>
    </div>

    <p className="px-5 md:px-7 py-3 border-t border-slate-800/80 text-[11px] text-slate-500 font-medium">
      Ci-dessous, un carnet réel : vingt-deux jours au Japon, du premier matin au dernier train.
      Faites défiler, tout est ouvert.
    </p>
  </section>
);

export default Vitrine;
