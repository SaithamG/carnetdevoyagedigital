import React, { useMemo, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPinned, CheckCircle2 } from 'lucide-react';
import { itineraryData } from '../data/itineraryData';
import { regions } from '../data/regions';
import { getGeo } from '../data/itineraryGeo';
import PlaceImage from './PlaceImage';

// Pin rond numéroté (numéro = ordre chronologique du parcours).
const makeIcon = (color, n) =>
  L.divIcon({
    className: '',
    html: `<div style="display:flex;align-items:center;justify-content:center;width:26px;height:26px;border-radius:50%;background:${color};border:3px solid #0f172a;box-shadow:0 0 0 1px ${color}66,0 2px 6px rgba(0,0,0,.6);color:#fff;font:800 11px/1 system-ui">${n}</div>`,
    iconSize: [26, 26],
    iconAnchor: [13, 13],
    popupAnchor: [0, -13],
  });

// Étiquette de ville en alphabet latin (le fond de carte n'a pas de labels).
// major=false (ville secondaire) : affichée seulement quand on filtre la région
// pour ne pas surcharger la vue « tout le voyage ».
const cityLabelIcon = (name, major) =>
  L.divIcon({
    className: '',
    html: `<div style="white-space:nowrap;transform:translateX(-50%);font:${major ? 800 : 700} ${major ? 14 : 12}px/1 system-ui;color:${major ? '#f1f5f9' : '#cbd5e1'};text-shadow:0 1px 3px #000,0 0 6px #000;letter-spacing:.06em;text-transform:uppercase">${name}</div>`,
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  });

// Villes réelles (coordonnées du centre-ville), nom en latin — comme une vraie
// carte. Chaque ville est rattachée aux régions de l'itinéraire où elle figure.
const CITIES = [
  { name: 'Tokyo',     coords: [35.690, 139.700], regions: ['tokyo1', 'tokyo2'], major: true },
  { name: 'Kyoto',     coords: [35.011, 135.768], regions: ['kyoto'],            major: true },
  { name: 'Osaka',     coords: [34.694, 135.502], regions: ['osaka'],            major: true },
  { name: 'Hiroshima', coords: [34.391, 132.452], regions: ['hiroshima'],        major: true },
  { name: 'Nikkō',     coords: [36.750, 139.610], regions: ['tokyo1'] },
  { name: 'Hakone',    coords: [35.232, 139.020], regions: ['tokyo1'] },
  { name: 'Nara',      coords: [34.685, 135.843], regions: ['osaka'] },
  { name: 'Kōbe',      coords: [34.690, 135.196], regions: ['osaka'] },
  { name: 'Himeji',    coords: [34.839, 134.694], regions: ['osaka'] },
  { name: 'Miyajima',  coords: [34.297, 132.320], regions: ['hiroshima'] },
  { name: 'Kamakura',  coords: [35.319, 139.546], regions: ['tokyo2'] },
];

// Recentre la carte sur les marqueurs et corrige la taille du conteneur
// (Leaflet calcule mal ses dimensions quand il s'initialise dans un onglet).
const FitBounds = ({ points }) => {
  const map = useMap();
  React.useEffect(() => {
    map.invalidateSize();
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

  const regionIds = useMemo(
    () => (activeRegion === 'all' ? regions.map((r) => r.id) : [activeRegion]),
    [activeRegion]
  );

  // Un marqueur par lieu (dédoublonné sur mapUrl), numéroté dans l'ordre
  // chronologique de première apparition dans l'itinéraire.
  const markers = useMemo(() => {
    const byPlace = new Map();
    let order = 0;

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
              order: ++order,
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
  }, [regionIds, visitedSteps]);

  const points = useMemo(() => markers.map((m) => m.coords), [markers]);
  const visitedCount = markers.filter((m) => m.visited).length;

  // Trajet reliant les lieux dans l'ordre chronologique (saute les doublons
  // consécutifs : on ne trace pas un segment vers le lieu où l'on est déjà).
  const routeCoords = useMemo(() => {
    const pts = [];
    regionIds.forEach((regionId) => {
      const region = itineraryData[regionId];
      if (!region) return;
      region.days.forEach((day) => {
        day.steps.forEach((step) => {
          const geo = getGeo(step.mapUrl);
          if (!geo) return;
          const last = pts[pts.length - 1];
          if (!last || last[0] !== geo.coords[0] || last[1] !== geo.coords[1]) {
            pts.push(geo.coords);
          }
        });
      });
    });
    return pts;
  }, [regionIds]);

  const showNames = activeRegion !== 'all';

  // Villes dont au moins une région est affichée. En vue « tout le voyage »
  // (showNames=false) on ne garde que les villes majeures pour rester lisible.
  const cityLabels = useMemo(
    () =>
      CITIES.filter(
        (c) => c.regions.some((r) => regionIds.includes(r)) && (showNames || c.major)
      ),
    [regionIds, showNames]
  );
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
      <div className="flex items-center gap-5 text-[11px] font-bold text-slate-400 px-1 flex-wrap">
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-blue-500 border-2 border-slate-950" /> À visiter
        </span>
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-emerald-500 border-2 border-slate-950" /> Déjà visité
        </span>
        <span className="text-slate-500">Les numéros suivent l'ordre du parcours</span>
        <span className="ml-auto flex items-center gap-1.5 text-emerald-400">
          <CheckCircle2 size={13} /> {visitedCount}/{markers.length} lieux
        </span>
      </div>

      {/* isolate + z-0 confinent le z-index élevé de Leaflet sous le header */}
      <div
        className="relative z-0 rounded-[2rem] overflow-hidden border border-slate-800 shadow-xl"
        style={{ isolation: 'isolate' }}
      >
        <MapContainer
          center={[35.0, 137.0]}
          zoom={6}
          scrollWheelZoom
          style={{ height: '70vh', width: '100%', background: '#0f172a' }}
        >
          {/* Fond sombre SANS labels (pas de toponymes japonais illisibles) */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png"
            subdomains="abcd"
          />

          {routeCoords.length > 1 && (
            <Polyline
              positions={routeCoords}
              pathOptions={{ color: '#60a5fa', weight: 2.5, opacity: 0.45, dashArray: '6 8' }}
            />
          )}

          <FitBounds points={points} />

          {cityLabels.map((c) => (
            <Marker key={`city-${c.name}`} position={c.coords} icon={cityLabelIcon(c.name, c.major)} interactive={false} />
          ))}

          {markers.map((m) => (
            <Marker
              key={m.mapUrl}
              position={m.coords}
              icon={makeIcon(m.visited ? '#10b981' : '#3b82f6', m.order)}
            >
              <Tooltip permanent={showNames} direction="top" offset={[0, -14]} className="carte-tip">
                {m.order}. {m.title}
              </Tooltip>
              <Popup>
                <div className="min-w-[200px]">
                  <PlaceImage
                    mapUrl={m.mapUrl}
                    title={m.title}
                    className="w-full h-28 object-cover rounded-lg mb-2"
                  />
                  <p className="font-black text-slate-900 text-sm mb-1">
                    {m.order}. {m.title}
                  </p>
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
        Astuce : sélectionne une région pour afficher les noms des lieux ; les zones déjà consultées restent dispo hors-ligne.
      </p>
    </div>
  );
};

export default Carte;
