import React from 'react';
import { Wallet, Zap, Calendar, ArrowDownCircle } from 'lucide-react';
import { budgetData, totalEpargneUsed } from '../data/budgetData';
import { cashflowTimeline } from '../data/cashflowTimeline';
import {
  surplusPrudent, surplusGodMode, soldeReel, soldeReelDate,
  salaireNov, chargesFrance,
} from '../data/constants';
import { COLOR_CLASSES } from '../data/colorMap';

const Finance = () => (
  <div className="space-y-6 animate-in fade-in duration-500">
    <div className="bg-gradient-to-br from-slate-900 to-slate-950 p-6 rounded-[2rem] border border-slate-800 shadow-xl text-center relative overflow-hidden">
      <div className="relative z-10 flex flex-col justify-center items-center">
        <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-1">
          Marge de Sécurité au Retour
        </p>
        <p className="text-5xl font-black italic text-white">
          + {surplusPrudent} <span className="text-slate-500">→</span> {surplusGodMode} €
        </p>
        <div className="flex gap-2 mt-4 flex-wrap justify-center">
          <span className="text-[10px] font-black uppercase bg-slate-800 text-slate-300 px-3 py-1.5 rounded-full border border-slate-700">
            Prudent {surplusPrudent}€ — épargne capée à 500€/mois
          </span>
          <span className="text-[10px] font-black uppercase bg-emerald-950/30 text-emerald-400 px-3 py-1.5 rounded-full border border-emerald-900/50">
            God Mode {surplusGodMode}€ — si la CAF débloque
          </span>
        </div>
        <p className="text-xs text-slate-400 mt-4 font-medium max-w-lg">
          Ancré sur ton solde <strong>réel</strong> de {soldeReel}€ au {soldeReelDate}.
          Sans aucun revenu freelance ni prime d'activité : elle serait du bonus.
        </p>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* POCHE EPARGNE */}
      <div className="bg-slate-900 p-6 rounded-[2rem] border border-slate-800">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="font-black italic text-white flex items-center gap-2 mb-1">
              <Wallet className="text-blue-400" /> Poche 1 : L'Épargne
            </h3>
            <p className="text-[10px] text-slate-400 uppercase font-bold">L'infrastructure du voyage</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-red-400 uppercase font-bold">À Payer</p>
            <p className="text-lg font-black text-red-400 italic">- {totalEpargneUsed} €</p>
          </div>
        </div>

        <div className="space-y-3">
          {budgetData.filter((i) => i.type === 'epargne').map((item, i) => (
            <div key={i} className="flex justify-between items-center bg-slate-950 p-3 rounded-xl border border-slate-800">
              <div>
                <p className="text-xs font-bold text-slate-300 flex items-center gap-2">
                  <span className={COLOR_CLASSES[item.color].text500}>{item.icon}</span>
                  {item.label}
                </p>
                <p className="text-[10px] text-slate-500 mt-1">{item.desc}</p>
              </div>
              <p className="text-sm font-black text-white">{item.cost} €</p>
            </div>
          ))}
        </div>
      </div>

      {/* POCHE MOIS BLANC */}
      <div className="bg-indigo-950/30 p-6 rounded-[2rem] border border-indigo-900/50">
        <h3 className="font-black italic text-white mb-4 flex items-center gap-2">
          <Zap className="text-indigo-400" /> Poche 2 : Le Mois Blanc
        </h3>
        <p className="text-[10px] text-indigo-300 uppercase mb-4 font-bold">Le salaire de Nov paie la vie sur place</p>

        <div className="space-y-3">
          <div className="flex justify-between items-center bg-indigo-900/30 p-3 rounded-xl">
            <p className="text-xs font-bold text-indigo-100 flex items-center gap-2">
              <ArrowDownCircle size={14} className="text-emerald-400" /> Salaire Nov + CAF
            </p>
            <p className="text-sm font-black text-emerald-400">+ {salaireNov} €</p>
          </div>
          <div className="flex justify-between items-center bg-indigo-900/30 p-3 rounded-xl">
            <p className="text-xs font-bold text-indigo-100 flex items-center gap-2">
              <ArrowDownCircle size={14} className="text-red-400 rotate-180" /> Loyer & Tél France
            </p>
            <p className="text-sm font-black text-red-400">- {chargesFrance} €</p>
          </div>

          <div className="pt-2 border-t border-indigo-500/30 mt-3">
            {budgetData.filter((i) => i.type === 'salaire').map((item, i) => (
              <div key={i} className="flex justify-between items-center py-2">
                <div>
                  <span className="text-[11px] font-bold text-indigo-200 flex items-center gap-2">
                    <span className={COLOR_CLASSES[item.color].text400}>{item.icon}</span>
                    {item.label}
                  </span>
                  <p className="text-[9px] text-indigo-300/70 mt-1">{item.desc}</p>
                </div>
                <span className="text-sm font-black text-red-300">- {item.cost} €</span>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center text-sm mt-2 pt-3 border-t border-indigo-400">
            <span className="font-black text-indigo-100">Solde fin de mois</span>
            <span className="font-black text-emerald-400">0 € (Zéro dette)</span>
          </div>
        </div>
      </div>
    </div>

    {/* TIMELINE */}
    <div className="bg-slate-900 p-6 rounded-[2rem] border border-slate-800">
      <h3 className="font-black italic text-white mb-6 flex items-center gap-2">
        <Calendar className="text-blue-400" /> Timeline de l'Épargne
      </h3>
      <div className="space-y-3 relative before:absolute before:inset-0 before:ml-[1.4rem] before:-translate-x-px before:w-0.5 before:bg-slate-800">
        {cashflowTimeline.map((item, idx) => (
          <div key={idx} className="relative flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border-4 border-slate-900 bg-slate-800 flex items-center justify-center text-[10px] font-black text-slate-400 shrink-0 z-10">
              {idx + 1}
            </div>
            <div className="flex-1 bg-slate-950 p-4 rounded-2xl border border-slate-800/80 hover:border-slate-700 transition-colors">
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-2 mb-2">
                <h4 className="font-bold text-white text-sm flex items-center gap-2">
                  {item.month}
                  {item.actual ? (
                    <span className="text-[9px] font-black uppercase bg-emerald-950/40 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-900/50">Réel</span>
                  ) : (
                    <span className="text-[9px] font-black uppercase bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full border border-slate-700">Projeté</span>
                  )}
                </h4>
                {item.actual ? (
                  <span className="text-lg font-black text-emerald-400 italic">Solde : {item.balance} €</span>
                ) : (
                  <span className="text-sm font-black italic flex items-center gap-2">
                    <span className="text-slate-400">{item.balancePrudent} €</span>
                    <span className="text-slate-600">→</span>
                    <span className="text-emerald-400">{item.balanceGodMode} €</span>
                  </span>
                )}
              </div>
              <div className="flex justify-between items-center bg-slate-900/50 p-2 rounded-lg mb-2">
                <span className="text-xs text-emerald-400">{item.textIn}</span>
                <span className="text-xs font-bold text-red-400">{item.textOut}</span>
              </div>
              <p className="text-[10px] text-slate-500">{item.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Finance;
