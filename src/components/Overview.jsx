import React from 'react';
import { Leaf, Users, Mountain, Landmark, Building2, CalendarDays } from 'lucide-react';
import { regions } from '../data/regions';
import { itineraryData } from '../data/itineraryData';

const REGION_ICONS = {
  kyoto: <Landmark className="text-yellow-500 w-7 h-7 shrink-0" />,
  nagano: <Mountain className="text-emerald-500 w-7 h-7 shrink-0" />,
  tokyo1: <Building2 className="text-blue-400 w-7 h-7 shrink-0" />,
};

const Overview = () => {
  const totalDays = regions.reduce((acc, r) => acc + (itineraryData[r.id]?.days.length || 0), 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 bg-gradient-to-br from-slate-900 to-slate-950 p-6 rounded-[2rem] border border-slate-800 shadow-xl relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-1 flex items-center gap-2">
              <Leaf size={12} /> Japon · Automne 2026
            </p>
            <p className="text-4xl font-black italic text-white">17 → 30 octobre</p>
            <p className="text-xs text-slate-400 mt-2 font-medium max-w-lg">
              Deux semaines pour profiter de l'extérieur au frais, des premières couleurs d'automne (momiji) et de la
              nature, loin de la chaleur. Un voyage père-fils, à un rythme détendu.
            </p>
          </div>
          <Leaf className="absolute -right-4 -bottom-4 w-32 h-32 text-emerald-500 opacity-5" />
        </div>

        <div className="bg-slate-900 p-6 rounded-[2rem] border border-slate-800 flex flex-col justify-center">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3">Le voyage en bref</p>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <p className="text-2xl font-black text-blue-400">2</p>
              <p className="text-[9px] text-slate-500 uppercase font-bold mt-1">voyageurs</p>
            </div>
            <div>
              <p className="text-2xl font-black text-emerald-400">{totalDays}</p>
              <p className="text-[9px] text-slate-500 uppercase font-bold mt-1">jours</p>
            </div>
            <div>
              <p className="text-2xl font-black text-amber-400">{regions.length}</p>
              <p className="text-[9px] text-slate-500 uppercase font-bold mt-1">régions</p>
            </div>
          </div>
        </div>
      </div>

      {/* ITINÉRAIRE EN 3 TEMPS */}
      <div className="bg-slate-900 p-6 rounded-[2rem] border border-slate-800 space-y-4">
        <h3 className="font-black italic text-white flex items-center gap-2 border-b border-slate-800 pb-3">
          <CalendarDays className="text-blue-400" /> L'itinéraire en 3 temps
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {regions.map((r) => {
            const data = itineraryData[r.id];
            return (
              <div key={r.id} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-start gap-4">
                {REGION_ICONS[r.id]}
                <div>
                  <p className="text-xs font-bold text-slate-200 uppercase mb-1">{r.name}</p>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {data?.days.length || 0} jours · {data?.chapter?.split(':')[1]?.trim() || r.name}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* PROFIL VOYAGEUR */}
      <div className="bg-slate-900 p-6 rounded-[2rem] border border-slate-800 space-y-4">
        <h3 className="font-black italic text-white flex items-center gap-2 border-b border-slate-800 pb-3">
          <Users className="text-emerald-500" /> Profil Voyageur
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-start gap-4">
            <Users className="text-blue-400 w-8 h-8 shrink-0" />
            <div>
              <p className="text-xs font-bold text-slate-200 uppercase mb-1">Habitués de Tokyo</p>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Déjà deux voyages à Tokyo (en août) : pas besoin de tout expliquer. On va à l'essentiel, on explore par
                envies, et on garde du temps libre.
              </p>
            </div>
          </div>
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-start gap-4">
            <Mountain className="text-emerald-500 w-8 h-8 shrink-0" />
            <div>
              <p className="text-xs font-bold text-slate-200 uppercase mb-1">Cap sur la nature</p>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Le cœur du voyage : Nagano, Togakushi et ses forêts de cèdres, Obuse et l'automne. Du grand air, des
                temples et un rythme tranquille.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
