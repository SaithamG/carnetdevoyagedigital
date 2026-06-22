import React, { useState } from 'react';
import { MapPinned, BookOpen, Utensils, Languages, Lightbulb, AtSign, Globe, ArrowRight } from 'lucide-react';
import PlaceImage from './PlaceImage';

/* Rendu (lecture seule) d'un carnet importé, aux couleurs de l'agence.
   `data` = sortie de hydrateCarnet ; `brand` = config white-label. */
const ImportedCarnet = ({ data, brand }) => {
  const regionIds = data?.regionsMeta?.map((r) => r.id) || [];
  const [activeRegion, setActiveRegion] = useState(regionIds[0] || null);

  if (!data) return null;
  const accent = brand?.accent || '#c9683f';
  const region = activeRegion ? data.itineraryData[activeRegion] : null;

  return (
    <div className="space-y-8">
      {/* HERO BRANDÉ */}
      <div
        className="rounded-[2rem] border border-slate-800 p-8 text-center relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${accent}22, rgba(2,6,23,0.6))` }}
      >
        {brand?.logo ? (
          <img src={brand.logo} alt={brand.name} className="h-14 mx-auto mb-4 object-contain" />
        ) : (
          <p className="text-2xl font-black italic tracking-tight" style={{ color: accent }}>
            {brand?.name || 'Carnet'}
          </p>
        )}
        <h1 className="text-3xl font-black italic text-white mt-2">{data.title}</h1>
        {brand?.tagline && <p className="text-sm text-slate-400 mt-1">{brand.tagline}</p>}
        {data.intro && (
          <p className="text-sm text-slate-300/90 italic max-w-2xl mx-auto mt-4 leading-relaxed">{data.intro}</p>
        )}
      </div>

      {/* SÉLECTEUR D'ITINÉRAIRE */}
      {regionIds.length > 1 && (
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {data.regionsMeta.map((r) => (
            <button
              key={r.id}
              onClick={() => setActiveRegion(r.id)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-bold whitespace-nowrap border transition-all ${
                activeRegion === r.id ? 'text-white border-transparent' : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
              style={activeRegion === r.id ? { backgroundColor: accent } : undefined}
            >
              {r.icon} {r.name}
            </button>
          ))}
        </div>
      )}

      {/* ITINÉRAIRE */}
      {region && (
        <div className="space-y-6">
          {region.desc && (
            <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl flex items-start gap-3">
              <BookOpen size={20} style={{ color: accent }} className="shrink-0 mt-0.5" />
              <p className="text-sm text-slate-300 italic leading-relaxed">{region.desc}</p>
            </div>
          )}

          {region.days.map((day, idx) => (
            <div key={idx} className="bg-slate-900 rounded-[2rem] border border-slate-800 overflow-hidden">
              <div className="bg-slate-800/60 p-5 border-b border-slate-700/50 flex items-center gap-3">
                {day.date && (
                  <span className="text-[11px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest text-white" style={{ backgroundColor: accent }}>
                    {day.date}
                  </span>
                )}
                <h3 className="font-black italic text-white text-lg">{day.title}</h3>
              </div>

              <div className="p-6 space-y-6">
                {day.steps.map((step, sIdx) => (
                  <div key={sIdx} className="flex flex-col md:flex-row gap-4">
                    {step.time && (
                      <div className="shrink-0 w-20">
                        <span className="text-[11px] font-black text-slate-400 bg-slate-950 px-2 py-1.5 rounded-md border border-slate-800 inline-block w-full text-center">
                          {step.time}
                        </span>
                      </div>
                    )}
                    <div className="flex-1 p-4 rounded-2xl border border-slate-800 bg-slate-950/60 relative">
                      {step.mapUrl && (
                        <a
                          href={step.mapUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="absolute top-3 right-3 text-[10px] font-bold flex items-center gap-1 px-2 py-1 rounded-lg border"
                          style={{ color: accent, borderColor: `${accent}66` }}
                        >
                          <MapPinned size={13} /> Carte
                        </a>
                      )}
                      <PlaceImage
                        src={step.image}
                        title={step.title}
                        className="w-full h-44 object-cover rounded-xl border border-slate-800 mb-3"
                      />
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center border border-slate-800 bg-slate-900 shrink-0" style={{ color: accent }}>
                          {step.icon}
                        </div>
                        <div className="pr-12">
                          <h4 className="font-bold text-slate-100">{step.title}</h4>
                          {step.desc && <p className="text-[13px] text-slate-400 leading-relaxed mt-1">{step.desc}</p>}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* BONNES ADRESSES */}
      {data.addresses?.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-black italic text-white flex items-center gap-2">
            <Utensils size={20} style={{ color: accent }} /> Bonnes adresses
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {data.addresses.map((a, i) => (
              <div key={i} className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
                <PlaceImage src={a.image} title={a.name} className="w-full h-36 object-cover" />
                <div className="p-4">
                  <div className="flex items-center gap-2">
                    <span style={{ color: accent }}>{a.icon}</span>
                    <h4 className="font-bold text-slate-100">{a.name}</h4>
                  </div>
                  {a.category && <p className="text-[10px] font-black uppercase tracking-wider text-slate-500 mt-1">{a.category}</p>}
                  {a.desc && <p className="text-[13px] text-slate-400 leading-relaxed mt-2">{a.desc}</p>}
                  {a.mapUrl && (
                    <a href={a.mapUrl} target="_blank" rel="noreferrer" className="text-[11px] font-bold flex items-center gap-1 mt-2" style={{ color: accent }}>
                      <MapPinned size={12} /> Voir sur la carte
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* LEXIQUE */}
      {data.lexique?.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-black italic text-white flex items-center gap-2">
            <Languages size={20} style={{ color: accent }} /> Lexique de survie
          </h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {data.lexique.map((m, i) => (
              <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl p-3">
                <p className="font-bold text-slate-100 text-sm">{m.jp || m.fr}</p>
                <p className="text-[13px] text-slate-400">{m.jp ? m.fr : ''}</p>
                {m.prononciation && <p className="text-[11px] italic text-slate-500 mt-0.5">{m.prononciation}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CONSEILS */}
      {data.conseils?.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-black italic text-white flex items-center gap-2">
            <Lightbulb size={20} style={{ color: accent }} /> Conseils avant de partir
          </h2>
          <div className="space-y-2">
            {data.conseils.map((c, i) => (
              <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex gap-3 text-sm text-slate-300">
                <span className="font-black" style={{ color: accent }}>{i + 1}.</span>
                <span>{c}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* OUTRO + CTA */}
      <div
        className="rounded-[2rem] border border-slate-800 p-8 text-center"
        style={{ background: `linear-gradient(135deg, ${accent}22, rgba(2,6,23,0.6))` }}
      >
        {data.outro && <p className="text-sm text-slate-300 italic max-w-2xl mx-auto leading-relaxed mb-5">{data.outro}</p>}
        {(brand?.ctaUrl) && (
          <a
            href={brand.ctaUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white text-sm shadow-lg"
            style={{ backgroundColor: accent }}
          >
            {brand.ctaLabel || 'En savoir plus'} <ArrowRight size={16} />
          </a>
        )}
        <div className="flex items-center justify-center gap-4 mt-5">
          {brand?.instagram && (
            <a href={brand.instagram} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors">
              <AtSign size={20} />
            </a>
          )}
          {brand?.website && (
            <a href={brand.website} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors">
              <Globe size={20} />
            </a>
          )}
        </div>
        <p className="text-[10px] text-slate-600 mt-4 uppercase tracking-widest">{brand?.name} · Carnet de voyage</p>
      </div>
    </div>
  );
};

export default ImportedCarnet;
