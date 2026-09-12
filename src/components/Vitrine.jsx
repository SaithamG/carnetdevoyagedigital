import React from 'react';
import { CalendarDays, MapPin, TrainFront, Languages, ShieldAlert, FileDown, AtSign } from 'lucide-react';

// `court` sert sous md : les libellés longs s'empilaient une par ligne sur un
// téléphone et repoussaient le carnet hors de l'écran.
const ATOUTS = [
  { icon: <CalendarDays size={14} />, label: 'Chaque journée, heure par heure',   court: 'Heure par heure' },
  { icon: <MapPin size={14} />,       label: 'La carte de toutes les étapes',     court: 'La carte' },
  { icon: <TrainFront size={14} />,   label: 'Les trajets et les correspondances', court: 'Les trajets' },
  { icon: <Languages size={14} />,    label: 'Le lexique de survie',              court: 'Le lexique' },
  { icon: <ShieldAlert size={14} />,  label: 'Les urgences, hors connexion',      court: 'Urgences hors ligne' },
  { icon: <FileDown size={14} />,     label: 'Et le PDF, toujours là',            court: 'Le PDF aussi' },
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

      <ul className="mt-4 md:mt-5 flex flex-wrap gap-1.5 md:gap-2">
        {ATOUTS.map((a) => (
          <li
            key={a.label}
            className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900/60 px-2 py-1 text-[10px] md:px-2.5 md:py-1.5 md:text-[11px] font-bold text-slate-300"
          >
            <span className="text-slate-500">{a.icon}</span>
            <span className="md:hidden">{a.court}</span>
            <span className="hidden md:inline">{a.label}</span>
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

    <p className="px-5 md:px-7 py-3 border-t border-slate-800/80 bg-slate-900/50 text-[12px] text-slate-300 font-medium leading-relaxed">
      <span className="font-black" style={{ color: '#c9683f' }}>Par où commencer :</span> faites simplement défiler.
      En dessous se trouve un carnet réel, vingt-deux jours au Japon, du premier matin au dernier
      train. Tout est ouvert et tout se clique : les journées, la carte, les trajets, le lexique.
    </p>
  </section>
);

export default Vitrine;
