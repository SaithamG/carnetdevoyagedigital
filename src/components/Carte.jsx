import React, { useMemo, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPinned, CheckCircle2 } from 'lucide-react';
import { itineraryData } from '../data/itineraryData';
import { regions } from '../data/regions';
import { getGeo, imageForMapUrl } from '../data/itineraryGeo';

const makeIcon = (color) =>
  L.divIcon({
    className: '',
    html: `<div style="width:18px;height:18px;border-radius:50%;background:${color};border:3px solid #0f172a;box-shadow:0 0 0 1px ${color}66, 0 2px 6px rgba(0,0,0,.6)"></div>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
    popupAnchor: [0, -10],
  });

const ICON_DEFAULT = makeIcon('#3b82f6');
const ICON_VISITED = makeIcon('#10b981');

// Recentre la carte sur les marqueurs affichés.
const FitBounds = ({ points }) => {
  const map = useMap();
  React.useEffect(() => {
    if (!points.length) return;
    if (points.length === 1) {
      map.setView(points[0], 13);
    } else {
      map.fitBounds(points, { padding: [40, 40] });
    }
  }, [map, points]);
  return null;
};

const Carte = () => {
  const [activeRegion, setActiveRegion] = useState('all');

  const visitedSteps = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem('japan_visited_steps') || '{}');
    } catch {
      return {};
    }
  }, []);

  // Construit un marqueur par lieu (dédoublonné sur mapUrl) pour la zone filtrée.
  const markers = useMemo(() => {
    const byPlace = new Map();
    const regionIds = activeRegion === 'all' ? regions.map((r) => r.id) : [activeRegion];

    regionIds.forEach((regionId) => {
      const region = itineraryData[regionId];
      if (!region) return;
      region.days.forEach((day) => {
        day.steps.forEach((step) => {
          const geo = getGeo(step.mapUrl);
          if (!geo) return;
          const visited = !!visitedSteps[`${day.date}_${step.time}`];
          const existing = byPlace.get(step.mapUrl);
          if (existing) {
            existing.visited = existing.visited || visited;
            existing.entries.push({ date: day.date, time: step.time, title: step.title });
          } else {
            byPlace.set(step.mapUrl, {
              coords: geo.coords,
              title: step.title,
              desc: step.desc,
              mapUrl: step.mapUrl,
              visited,
              entries: [{ date: day.date, time: step.time, title: step.title }],
            });
          }
        });
      });
    });

    return Array.from(byPlace.values());
  }, [activeRegion, visitedSteps]);

  const points = useMemo(() => markers.map((m) => m.coords), [markers]);
  const visitedCount = markers.filter((m) => m.visited).length;

  const filters = [{ id: 'all', name: 'Tout le voyage' }, ...regions];

  return (
    <div className="space-y-4 animate-in fade-in duration-500">
      {/* Filtres régions */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setActiveRegion(f.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap border ${
              activeRegion === f.id
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40 border-blue-500'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            {f.icon} {f.name}
          </button>
        ))}
      </div>

      {/* Légende */}
      <div className="flex items-center gap-5 text-[11px] font-bold text-slate-400 px-1">
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-blue-500 border-2 border-slate-950" /> À visiter
        </span>
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-emerald-500 border-2 border-slate-950" /> Déjà visité
        </span>
        <span className="ml-auto flex items-center gap-1.5 text-emerald-400">
          <CheckCircle2 size={13} /> {visitedCount}/{markers.length} lieux
        </span>
      </div>

      {/* Carte */}
      <div className="rounded-[2rem] overflow-hidden border border-slate-800 shadow-xl">
        <MapContainer
          center={[35.0, 137.0]}
          zoom={6}
          scrollWheelZoom
          style={{ height: '70vh', width: '100%', background: '#0f172a' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <FitBounds points={points} />
          {markers.map((m) => (
            <Marker key={m.mapUrl} position={m.coords} icon={m.visited ? ICON_VISITED : ICON_DEFAULT}>
              <Popup>
                <div className="min-w-[180px]">
                  <img
                    src={imageForMapUrl(m.mapUrl)}
                    alt={m.title}
                    loading="lazy"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    className="w-full h-24 object-cover rounded-lg mb-2"
                  />
                  <p className="font-black text-slate-900 text-sm mb-1">{m.title}</p>
                  <p className="text-[11px] text-slate-600 leading-snug mb-2">{m.desc}</p>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {m.entries.map((e, i) => (
                      <span key={i} className="text-[10px] font-bold bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                        {e.date} · {e.time}
                      </span>
                    ))}
                  </div>
                  <a
                    href={m.mapUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:underline"
                  >
                    <MapPinned size={12} /> Ouvrir dans Google Maps
                  </a>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <p className="text-[11px] text-slate-500 italic px-1">
        Astuce : les zones de carte déjà consultées restent disponibles hors-ligne.
      </p>
    </div>
  );
};

export default Carte;
