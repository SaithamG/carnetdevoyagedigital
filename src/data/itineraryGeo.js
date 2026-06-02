// Géodonnées par lieu, indexées sur le mapUrl (unique par lieu, dédoublonne
// les lieux récurrents : aéroports, gares, hôtel, DisneySea...).
// coords = [latitude, longitude]. Les lieux "niche" (Airbnb, maison louée)
// utilisent les coordonnées du quartier en approximation — à affiner.
// Le champ image est ajouté dans un second temps (module Photos).

export const geoByMapUrl = {
  // --- Kyoto & Kansai ---
  'https://maps.google.com/?q=Kansai+International+Airport': { coords: [34.4342, 135.2440] },
  'https://maps.google.com/?q=First+Cabin+Kansai+Airport': { coords: [34.4329, 135.2335] },
  'https://maps.google.com/?q=Kyoto+Station': { coords: [34.9858, 135.7588] },
  'https://maps.google.com/?q=Airbnb+Kyoto+Station': { coords: [34.9870, 135.7560] },
  'https://maps.google.com/?q=Kyoto+Tower': { coords: [34.9876, 135.7592] },
  'https://maps.google.com/?q=Kyoto+Railway+Museum': { coords: [34.9875, 135.7415] },
  'https://maps.google.com/?q=Sannenzaka': { coords: [34.9963, 135.7806] },
  'https://maps.google.com/?q=Kiyomizu-dera': { coords: [34.9949, 135.7851] },
  'https://maps.google.com/?q=Nintendo+Museum': { coords: [34.9099, 135.7717] },
  'https://maps.google.com/?q=Byodo-in': { coords: [34.8893, 135.8076] },
  'https://maps.google.com/?q=Uji+Matcha+Street': { coords: [34.8910, 135.8060] },

  // --- Nagano & alentours ---
  'https://maps.google.com/?q=Umeda+Station': { coords: [34.7025, 135.4959] },
  'https://maps.google.com/?q=Nagano+Station': { coords: [36.6432, 138.1888] },
  'https://maps.google.com/?q=Zenko-ji+Guesthouse': { coords: [36.6600, 138.1885] },
  'https://maps.google.com/?q=Zenko-ji+Temple': { coords: [36.6614, 138.1872] },
  'https://maps.google.com/?q=Togakushi+Shrine+Okusha': { coords: [36.7607, 138.0790] },
  'https://maps.google.com/?q=Togakushi+Soba': { coords: [36.7438, 138.0762] },
  'https://maps.google.com/?q=Togakushi+Chusha': { coords: [36.7430, 138.0770] },
  'https://maps.google.com/?q=Obuse+Station': { coords: [36.6985, 138.3120] },
  'https://maps.google.com/?q=Hokusai+Museum+Obuse': { coords: [36.6957, 138.3106] },
  'https://maps.google.com/?q=Obuse+Town': { coords: [36.6948, 138.3098] },

  // --- Tokyo ---
  'https://maps.google.com/?q=Tokyo+Station': { coords: [35.6812, 139.7671] },
  'https://maps.google.com/?q=Hotel+Kabukicho+Shinjuku': { coords: [35.6955, 139.7027] },
  'https://maps.google.com/?q=Tokyo+Tower': { coords: [35.6586, 139.7454] },
  'https://maps.google.com/?q=Tokyo+Metropolitan+Government+Building': { coords: [35.6896, 139.6921] },
  'https://maps.google.com/?q=Yanaka+Ginza': { coords: [35.7276, 139.7660] },
  'https://maps.google.com/?q=Yotsugi+Station': { coords: [35.7333, 139.8430] },
  'https://maps.google.com/?q=Edo-Tokyo+Museum': { coords: [35.6963, 139.7960] },
  'https://maps.google.com/?q=Bandai+Headquarters': { coords: [35.7065, 139.7990] },
  'https://maps.google.com/?q=Hijiribashi+Bridge': { coords: [35.6985, 139.7650] },
  'https://maps.google.com/?q=Senso-ji': { coords: [35.7148, 139.7967] },
  'https://maps.google.com/?q=Imperial+Palace+East+Gardens': { coords: [35.6852, 139.7570] },
  'https://maps.google.com/?q=Ginza': { coords: [35.6717, 139.7650] },
  'https://maps.google.com/?q=Small+Worlds+Tokyo': { coords: [35.6360, 139.7950] },
  'https://maps.google.com/?q=Unicorn+Gundam+Statue': { coords: [35.6256, 139.7756] },
  'https://maps.google.com/?q=Shinjuku+Station': { coords: [35.6896, 139.7006] },
  'https://maps.google.com/?q=Shonan+Monorail': { coords: [35.3370, 139.5050] },
  'https://maps.google.com/?q=Benten+Bridge+Enoshima': { coords: [35.3010, 139.4815] },
  'https://maps.google.com/?q=Enoshima+Shrine': { coords: [35.2990, 139.4800] },
  'https://maps.google.com/?q=Enoshima+Iwaya+Caves': { coords: [35.2958, 139.4788] },
  'https://maps.google.com/?q=Enoshima+Sea+Candle': { coords: [35.2993, 139.4805] },
  'https://maps.google.com/?q=Katase-Enoshima+Station': { coords: [35.3092, 139.4824] },
  'https://maps.google.com/?q=Tokyo+DisneySea': { coords: [35.6267, 139.8850] },
  'https://maps.google.com/?q=Harajuku+Takeshita+Street': { coords: [35.6716, 139.7050] },
  'https://maps.google.com/?q=Shibuya+Crossing': { coords: [35.6595, 139.7004] },
  'https://maps.google.com/?q=Meiji+Jingu': { coords: [35.6764, 139.6993] },
  'https://maps.google.com/?q=Yoyogi+Park': { coords: [35.6720, 139.6950] },
  'https://maps.google.com/?q=Omotesando': { coords: [35.6660, 139.7120] },
  'https://maps.google.com/?q=Shinjuku+Shopping': { coords: [35.6915, 139.7036] },
  'https://maps.google.com/?q=Akihabara': { coords: [35.7022, 139.7745] },
  'https://maps.google.com/?q=Omoide+Yokocho': { coords: [35.6936, 139.6992] },
  'https://maps.google.com/?q=Tokyo+Haneda+Airport': { coords: [35.5494, 139.7798] },
};

export const getGeo = (mapUrl) => geoByMapUrl[mapUrl];

// Slug déterministe dérivé du mapUrl (même logique que le script de sourcing
// des images). Sert à retrouver le fichier image local d'un lieu.
export const slugForMapUrl = (mapUrl = '') => {
  const q = (mapUrl.split('q=')[1] || '').replace(/\+/g, ' ');
  return decodeURIComponent(q)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
};

export const imageForMapUrl = (mapUrl) => `/images/itinerary/${slugForMapUrl(mapUrl)}.jpg`;
