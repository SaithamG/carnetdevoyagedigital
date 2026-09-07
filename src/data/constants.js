export const EXCHANGE_RATE = 185;
export const salaireNov = 1786;
export const chargesFrance = 540;

// ── Trésorerie ───────────────────────────────────────────────────────────────
// Ancre RÉELLE relevée sur le compte épargne, pas une projection.
export const soldeReel = 1957;
export const soldeReelDate = '17 juillet 2026';

// Marge au retour, en fourchette. La variable qui décide, c'est la CAF :
//  · prudent  = épargne capée à 500 €/mois (août→oct), CAF toujours bloquée
//  · godMode  = 750 €/mois, si le déblocage CAF arrive comme espéré
// La prime d'activité n'est comptée dans AUCUN des deux : c'est du pur bonus.
export const surplusPrudent = 1420;
export const surplusGodMode = 2170;

// ── Dates du voyage — SOURCE DE VÉRITÉ UNIQUE ────────────────────────────────
// Enchaînement réel : TGV Aix→Paris le 7, nuit à Villepinte (EasyHotel CDG),
// décollage CDG le 8 à 11h30, atterrissage Haneda le 9 à 16h20 (escale Pékin).
// Numéros de vol réels (itinéraire Trip.com 1306267025321236 — un SEUL billet,
// 4 coupons, T3→T3 à Pékin : les bagages vont jusqu'à Tokyo, aucune immigration
// chinoise). ALLER : CA876 CDG 8 nov 11h30 → Pékin 9 nov 04h25, puis CA167
// Pékin 11h40 → Haneda 16h20. RETOUR : CA184 Haneda 30 nov 08h30 → Pékin
// 11h40, puis CA933 Pékin 13h25 → CDG 17h40 — TERMINAL 1, Air China n'opère
// qu'au T1 à CDG. L'escale RETOUR ne fait que 1h45.
// ⚠️ HORAIRES MODIFIÉS PAR AIR CHINA le 03/09/2026 (PNR QHVETL) : l'aller part
// 55 min PLUS TÔT qu'au billet d'origine (11h30 et non 12h25). Toute la
// logistique du 8 nov a été recalée en conséquence dans reminders.js (id 13). Nuit près de CDG,
// puis OUIGO du 1er déc, 11h00 CDG2 TGV → Aix 14h10.
// Ne pas redéclarer ces dates ailleurs : le compte à rebours a déjà affiché
// deux valeurs différentes (113 vs 116) parce qu'elles vivaient en 3 endroits.
export const TGV_ALLER = new Date(2026, 10, 7);            // 7 nov — départ Aix
export const FLIGHT_OUT = new Date(2026, 10, 8, 11, 30);   // 8 nov 11h30 — décollage CDG (recalé Air China 03/09/2026)
export const TRIP_START = new Date(2026, 10, 9);           // 9 nov — 1er jour d'itinéraire
export const TRIP_END = new Date(2026, 10, 30);            // 30 nov — décollage Haneda 08h30
