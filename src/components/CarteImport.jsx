import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPinned, MapPin } from 'lucide-react';
import PlaceImage from './PlaceImage';

const makeIcon = (color, n) =>
  L.divIcon({
    className: '',
    html: `<div style="display:flex;align-items:center;justify-content:center;width:26px;height:26px;border-radius:50%;background:${color};border:3px solid #ffffff;box-shadow:0 0 0 1px ${color}55,0 2px 6px rgba(0,0,0,.3);color:#fff;font:800 11px/1 system-ui">${n}</div>`,
    iconSize: [26, 26],
    iconAnchor: [13, 13],
    popupAnchor: [0, -13],
  });

const FitBounds = ({ points }) => {
  const map = useMap();
  React.useEffect(() => {
    map.invalidateSize();
    if (!points.length) return;
    if (points.length === 1) map.setView(points[0], 14);
    else map.fitBounds(points, { padding: [40, 40] });
  }, [map, points]);
  return null;
};

/* Carte des lieux du carnet importé. Les coordonnées viennent de l'IA (lat/lng).
   Les lieux sans coordonnées connues ne sont simplement pas affichés. */
const CarteImport = ({ data, brand }) => {
  const accent = brand?.accent || '#3b82f6';

  // Collecte les lieux géolocalisés (étapes + adresses), dédoublonnés par titre.
  const markers = [];
  const seen = new Set();
  let order = 0;
  const pushPlace = (title, desc, lat, lng, image) => {
    if (typeof lat !== 'number' || typeof lng !== 'number') return;
    const key = (title || '').toLowerCase();
    if (seen.has(key)) return;
    seen.add(key);
    markers.push({ order: ++order, title, desc, coords: [lat, lng], image });
  };

  Object.values(data?.itineraryData || {}).forEach((region) =>
    (region.days || []).forEach((day) =>
      (day.steps || []).forEach((s) => pushPlace(s.title, s.desc, s.lat, s.lng, s.image))));
  (data?.addresses || []).forEach((a) => pushPlace(a.name, a.desc, a.lat, a.lng, a.image));

  const points = markers.map((m) => m.coords);
  const routeCoords = markers.map((m) => m.coords);

  if (markers.length === 0) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-[2rem] p-12 text-center text-slate-400">
        <MapPin size={36} className="mx-auto text-slate-600 mb-3" />
        <p className="font-bold text-slate-300">Aucun lieu géolocalisé pour l'instant</p>
        <p className="text-sm mt-1">Les coordonnées des lieux connus sont ajoutées automatiquement à l'import.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-in fade-in duration-500">
      <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400 px-1">
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full border-2 border-slate-950" style={{ background: accent }} /> Lieux du carnet
        </span>
        <span className="ml-auto">{markers.length} lieu{markers.length > 1 ? 'x' : ''}</span>
      </div>

      <div className="relative z-0 rounded-[2rem] overflow-hidden border border-slate-800 shadow-xl" style={{ isolation: 'isolate' }}>
        <MapContainer center={points[0]} zoom={12} scrollWheelZoom style={{ height: '70vh', width: '100%', background: '#faf6f0' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            subdomains="abcd"
          />
          {routeCoords.length > 1 && (
            <Polyline positions={routeCoords} pathOptions={{ color: accent, weight: 2.5, opacity: 0.5, dashArray: '6 8' }} />
          )}
          <FitBounds points={points} />
          {markers.map((m) => (
            <Marker key={`${m.title}-${m.order}`} position={m.coords} icon={makeIcon(accent, m.order)}>
              <Tooltip direction="top" offset={[0, -14]}>{m.order}. {m.title}</Tooltip>
              <Popup>
                <div className="min-w-[200px]">
                  <PlaceImage src={m.image} title={m.title} query={m.title} className="w-full h-28 object-cover rounded-lg mb-2" />
                  <p className="font-black text-slate-900 text-sm mb-1">{m.order}. {m.title}</p>
                  {m.desc && <p className="text-[11px] text-slate-600 leading-snug mb-2">{m.desc}</p>}
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(m.title)}`}
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
    </div>
  );
};

export default CarteImport;
