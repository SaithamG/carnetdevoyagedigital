import React from 'react';
import { CheckCircle2, Landmark, Plane, Activity, Coffee, Dumbbell, MapPin, CalendarDays } from 'lucide-react';
import { surplusPrudent, surplusGodMode, soldeReel, soldeReelDate } from '../data/constants';

const Overview = () => (
  <div className="space-y-6 animate-in fade-in duration-500">

    {/* ── En-tête éditorial ── */}
    <div className="relative rounded-[2rem] overflow-hidden shadow-xl h-64 md:h-80">
      <img
        src="/images/itinerary/fushimi-inari-taisha.jpg"
        alt="Fushimi Inari-taisha, Kyoto"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
        <p className="text-[11px] font-black uppercase tracking-[0.3em] text-white/80 mb-2 flex items-center gap-2">
          <MapPin size={13} /> Kyoto · Tokyo · Osaka
        </p>
        <h1 style={{ color: '#ffffff' }} className="text-4xl md:text-5xl font-black italic leading-none drop-shadow-md">
          Japon 2026
        </h1>
        <p className="text-sm text-white/85 mt-3 flex items-center gap-2 font-medium">
          <CalendarDays size={14} /> 9 — 30 novembre · 21 jours
        </p>
      </div>
    </div>

    {/* ── Résumé budget & vol ── */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="md:col-span-2 bg-gradient-to-br from-slate-900 to-slate-950 p-7 rounded-[2rem] border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-2 flex items-center gap-2">
            <CheckCircle2 size={12} /> Surplus au retour (fin 2026)
          </p>
          <p className="text-4xl font-black italic text-white">
            + {surplusPrudent} <span className="text-slate-500">→</span> {surplusGodMode} €
          </p>
          <p className="text-xs text-slate-400 mt-3 font-medium max-w-lg leading-relaxed">
            Fourchette ancrée sur ton solde réel de {soldeReel}€ au {soldeReelDate}. Le bas suppose l'épargne
            capée à 500€/mois, le haut le déblocage CAF. Ni freelance ni prime d'activité comptés.
          </p>
        </div>
        <Landmark className="absolute -right-4 -bottom-4 w-32 h-32 text-emerald-500 opacity-5" />
      </div>

      <div className="bg-slate-900 p-6 rounded-[2rem] border border-slate-800 flex flex-col justify-center">
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3">Statut suivi</p>
        <div className="flex items-center gap-3 bg-blue-950/30 p-3 rounded-xl border border-blue-900/50">
          <Plane size={18} className="text-blue-500" />
          <div>
            <p className="text-xs font-bold text-slate-200">Vol Air China</p>
            <p className="text-[10px] text-blue-400">3/4 Payé (Avance Majeure)</p>
          </div>
        </div>
      </div>
    </div>

    {/* ── Profil voyageur ── */}
    <div className="bg-slate-900 p-7 rounded-[2rem] border border-slate-800 space-y-4">
      <h3 className="text-lg font-black italic text-white flex items-center gap-2 border-b border-slate-800 pb-3">
        <Activity className="text-emerald-500" /> Profil voyageur
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 flex items-start gap-4">
          <Coffee className="text-orange-500 w-8 h-8 shrink-0" />
          <div>
            <p className="text-xs font-bold text-slate-200 uppercase mb-1">Niveau 0 cuisine</p>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              100% repas extérieurs (budget de 35€/jour garanti). Petits-déj inclus à l'hôtel pour optimiser l'apport calorique gratuit.
            </p>
          </div>
        </div>
        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 flex items-start gap-4">
          <Dumbbell className="text-purple-500 w-8 h-8 shrink-0" />
          <div>
            <p className="text-xs font-bold text-slate-200 uppercase mb-1">Sportif / Muscu</p>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Apport protéiné massif (Tabehoudai, Yakiniku). Grosse marche quotidienne (20k pas). Pass One Piece Gym inclus.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Overview;
