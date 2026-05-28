import React from 'react';
import { AlertOctagon, PhoneCall, Building2, Languages, ShieldAlert } from 'lucide-react';

const NUMEROS = [
  { label: 'Police (Secours, Accidents)', sub: 'Vol, agression, urgence sécurité', numero: '110', big: true },
  { label: 'Ambulance / Pompiers', sub: 'Urgence médicale, incendie', numero: '119', big: true },
  { label: 'Ambassade de France à Tokyo', sub: 'Passeport perdu, assistance consulaire', numero: '+81 3-5798-6000', big: false },
  { label: 'Opposition CB (Revolut)', sub: "Blocage carte depuis l'application", numero: '+44 20 3322 8352', big: false },
];

const HOTELS = [
  { hotel: 'Toyoko Inn Shinjuku Kabukicho (Tokyo 1 & 2)', address: '東京都新宿区歌舞伎町2-20-15', sub: 'Tokyo Ouest & Est' },
  { hotel: 'Stay SAKURA Kyoto', address: '京都市中京区大宮通御池下る三坊大宮町146-1', sub: 'Kyoto' },
  { hotel: 'Toyoko Inn Osaka Honmachi', address: '大阪市中央区本町1-5-7', sub: 'Osaka' },
  { hotel: 'Comfort Hotel Hiroshima', address: '広島市中区中町3-11', sub: 'Hiroshima' },
  { hotel: 'Ryokan Sakuraya (Miyajima)', address: '廿日市市宮島町853', sub: 'Miyajima Island' },
  { hotel: 'Grids Tokyo Ueno Hotel Hostel', address: '東京都台東区上野7-10-4', sub: 'Tokyo Ueno Retour' },
];

const PHRASES = [
  { fr: 'Appelez une ambulance !', romaji: 'Kyukyusha wa yonde kudasai !', jp: '救急車を呼んでください！' },
  { fr: "J'ai perdu mon passeport.", romaji: 'Pasupoto wa nakushimashita.', jp: 'パスポートをなくしました。' },
  { fr: 'Je suis allergique aux fruits de mer.', romaji: 'Watashi wa gyokairui arerugi desu.', jp: '私は魚介類アレルギーです。' },
  { fr: "Emmenez-moi à cette adresse s'il vous plaît.", romaji: 'Kono jusho e tsurete itte kudasai.', jp: 'この住所へ連れて行ってください。' },
];

const Urgences = () => (
  <div className="space-y-6 animate-in fade-in duration-500">
    <div className="bg-red-950/20 border border-red-900/50 p-6 rounded-[2rem] relative overflow-hidden">
      <AlertOctagon className="absolute -right-4 -top-4 w-32 h-32 text-red-500 opacity-10" />
      <div className="relative z-10">
        <h2 className="text-xl font-black italic text-red-400 mb-2 flex items-center gap-2">
          <ShieldAlert /> Carte d'Urgences
        </h2>
        <p className="text-xs text-slate-300 leading-relaxed max-w-lg">
          Tout ce qu'il faut en situation critique. Les adresses japonaises sont à montrer directement au chauffeur de taxi ou aux secours.
        </p>
      </div>
    </div>

    <div className="bg-slate-900 p-6 rounded-[2rem] border border-slate-800">
      <h3 className="text-sm font-black uppercase text-slate-400 mb-4 flex items-center gap-2">
        <PhoneCall size={16} /> Numéros Vitaux
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {NUMEROS.map((n, idx) => (
          <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-between items-center">
            <div>
              <p className="text-xs font-bold text-white">{n.label}</p>
              <p className="text-[10px] text-slate-500 mt-0.5">{n.sub}</p>
            </div>
            <span className={`font-black text-red-400 ${n.big ? 'text-xl' : 'text-sm'}`}>{n.numero}</span>
          </div>
        ))}
      </div>
    </div>

    <div className="bg-slate-900 p-6 rounded-[2rem] border border-slate-800">
      <h3 className="text-sm font-black uppercase text-slate-400 mb-4 flex items-center gap-2">
        <Building2 size={16} /> Adresses Hôtels en Japonais (Chauffeur Taxi / Urgences)
      </h3>
      <div className="space-y-3">
        {HOTELS.map((item, idx) => (
          <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-2">
            <div>
              <p className="text-xs font-black text-slate-200">{item.hotel}</p>
              <p className="text-[10px] text-slate-500">{item.sub}</p>
            </div>
            <span className="text-sm md:text-base font-black text-blue-400 tracking-wider font-mono">{item.address}</span>
          </div>
        ))}
      </div>
    </div>

    <div className="bg-slate-900 p-6 rounded-[2rem] border border-slate-800">
      <h3 className="text-sm font-black uppercase text-slate-400 mb-4 flex items-center gap-2">
        <Languages size={16} /> Phrases d'Urgence Critiques
      </h3>
      <div className="space-y-3">
        {PHRASES.map((p, i) => (
          <div key={i} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-2">
            <div>
              <p className="text-xs font-black text-red-400">« {p.fr} »</p>
              <p className="text-xs text-slate-400 italic mt-0.5">{p.romaji}</p>
            </div>
            <span className="text-base text-slate-500 font-bold tracking-widest">{p.jp}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Urgences;
