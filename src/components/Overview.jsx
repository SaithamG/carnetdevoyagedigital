import React from 'react';
import { CheckCircle2, Landmark, Plane, Activity, Coffee, Dumbbell } from 'lucide-react';
import { surplusFinal } from '../data/constants';

const Overview = () => (
  <div className="space-y-6 animate-in fade-in duration-500">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="md:col-span-2 bg-gradient-to-br from-slate-900 to-slate-950 p-6 rounded-[2rem] border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-1 flex items-center gap-2">
            <CheckCircle2 size={12} /> Surplus Garanti (Fin 2026)
          </p>
          <p className="text-4xl font-black italic text-white">+ {surplusFinal} €</p>
          <p className="text-xs text-slate-400 mt-2 font-medium max-w-lg">
            Calcul strict : 0 freelance futur, frais de Summer Tour inclus. Solde pur et sécurisé au retour du voyage.
          </p>
        </div>
        <Landmark className="absolute -right-4 -bottom-4 w-32 h-32 text-emerald-500 opacity-5" />
      </div>

      <div className="bg-slate-900 p-6 rounded-[2rem] border border-slate-800 flex flex-col justify-center">
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Statut suivi</p>
        <div className="flex items-center gap-3 bg-blue-950/30 p-3 rounded-xl border border-blue-900/50">
          <Plane size={18} className="text-blue-500" />
          <div>
            <p className="text-xs font-bold text-slate-200">Vol Air China</p>
            <p className="text-[10px] text-blue-400">3/4 Payé (Avance Majeure)</p>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-slate-900 p-6 rounded-[2rem] border border-slate-800 space-y-4">
      <h3 className="font-black italic text-white flex items-center gap-2 border-b border-slate-800 pb-3">
        <Activity className="text-emerald-500" /> Profil Voyageur
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-start gap-4">
          <Coffee className="text-orange-500 w-8 h-8 shrink-0" />
          <div>
            <p className="text-xs font-bold text-slate-200 uppercase mb-1">Niveau 0 Cuisine</p>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              100% repas extérieurs (budget de 35€/jour garanti). Petits-déj inclus à l'hôtel pour optimiser l'apport calorique gratuit.
            </p>
          </div>
        </div>
        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-start gap-4">
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
