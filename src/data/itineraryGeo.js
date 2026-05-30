// Géodonnées par lieu, indexées sur le mapUrl (unique par lieu, dédoublonne
// les lieux récurrents : Haneda, Dotonbori, USJ, gares...).
// coords = [latitude, longitude]. Les lieux "niche" (salles de sport, restos
// précis) utilisent les coordonnées du quartier en approximation — à affiner.
// Le champ image est ajouté dans un second temps (module Photos).

export const geoByMapUrl = {
  // --- Tokyo Ouest ---
  'https://maps.google.com/?q=Tokyo+Haneda+Airport': { coords: [35.5494, 139.7798] },
  'https://maps.google.com/?q=Toyoko+Inn+Shinjuku+Kabukicho': { coords: [35.6955, 139.7027] },
  'https://maps.google.com/?q=Godzilla+Head+Shinjuku': { coords: [35.6948, 139.7016] },
  'https://maps.google.com/?q=Meiji+Jingu': { coords: [35.6764, 139.6993] },
  'https://maps.google.com/?q=Shibuya+Crossing': { coords: [35.6595, 139.7004] },
  'https://maps.google.com/?q=Shibuya+Sky': { coords: [35.6580, 139.7016] },
  'https://maps.google.com/?q=ONE+PIECE+FITNESS+BragMen': { coords: [35.6585, 139.6982] },
  'https://maps.google.com/?q=Gyu-Kaku+Shibuya': { coords: [35.6592, 139.6985] },
  'https://maps.google.com/?q=Asics+Harajuku': { coords: [35.6702, 139.7026] },
  'https://maps.google.com/?q=Tokyo+Metropolitan+Gymnasium': { coords: [35.6814, 139.7144] },
  'https://maps.google.com/?q=Pokemon+Center+Mega+Tokyo': { coords: [35.7295, 139.7191] },
  'https://maps.google.com/?q=Anytime+Fitness+Shinjuku': { coords: [35.6938, 139.7036] },
  'https://maps.google.com/?q=Sushiro+Shinjuku': { coords: [35.6930, 139.7005] },
  'https://maps.google.com/?q=Shinjuku+Station': { coords: [35.6896, 139.7006] },
  'https://maps.google.com/?q=Toshogu+Shrine+Nikko': { coords: [36.7580, 139.5990] },
  'https://maps.google.com/?q=Kegon+Falls': { coords: [36.7389, 139.5028] },
  'https://maps.google.com/?q=Omoide+Yokocho': { coords: [35.6936, 139.6992] },
  'https://maps.google.com/?q=Owakudani': { coords: [35.2445, 139.0193] },
  'https://maps.google.com/?q=Lake+Ashi': { coords: [35.2017, 139.0247] },
  'https://maps.google.com/?q=Hakone+Yuryo': { coords: [35.2389, 139.0531] },
  'https://maps.google.com/?q=Senso-ji': { coords: [35.7148, 139.7967] },
  'https://maps.google.com/?q=teamLab+Borderless+Azabudai+Hills': { coords: [35.6604, 139.7415] },
  'https://maps.google.com/?q=Tokyo+Metropolitan+Government+Building': { coords: [35.6896, 139.6921] },

  // --- Kyoto ---
  'https://maps.google.com/?q=Tokyo+Station': { coords: [35.6812, 139.7671] },
  'https://maps.google.com/?q=Kyoto+Station': { coords: [34.9858, 135.7588] },
  'https://maps.google.com/?q=Fushimi+Inari+Taisha': { coords: [34.9671, 135.7727] },
  'https://maps.google.com/?q=Kyoto+Ramen+Koji': { coords: [34.9858, 135.7590] },
  'https://maps.google.com/?q=Arashiyama+Bamboo+Grove': { coords: [35.0094, 135.6717] },
  'https://maps.google.com/?q=Kinkaku-ji': { coords: [35.0394, 135.7292] },
  'https://maps.google.com/?q=Pontocho+Alley': { coords: [35.0049, 135.7707] },
  'https://maps.google.com/?q=Kiyomizu-dera': { coords: [34.9949, 135.7851] },
  'https://maps.google.com/?q=Nishiki+Market': { coords: [35.0050, 135.7649] },
  'https://maps.google.com/?q=Yasaka+Shrine': { coords: [35.0036, 135.7785] },
  'https://maps.google.com/?q=Ginkaku-ji': { coords: [35.0270, 135.7982] },
  'https://maps.google.com/?q=Nanzen-ji': { coords: [35.0113, 135.7937] },
  'https://maps.google.com/?q=Eikando+Zenrinji+Temple': { coords: [35.0150, 135.7948] },

  // --- Osaka & Kansai ---
  'https://maps.google.com/?q=Stay+SAKURA+Kyoto': { coords: [34.9880, 135.7580] },
  'https://maps.google.com/?q=Amerikamura': { coords: [34.6720, 135.4983] },
  'https://maps.google.com/?q=Dotonbori': { coords: [34.6687, 135.5013] },
  'https://maps.google.com/?q=Dotonbori+Takoyaki': { coords: [34.6686, 135.5010] },
  'https://maps.google.com/?q=Denden+Town': { coords: [34.6620, 135.5040] },
  'https://maps.google.com/?q=Namba+Yasaka+Shrine': { coords: [34.6595, 135.4990] },
  'https://maps.google.com/?q=Umeda+Sky+Building': { coords: [34.7052, 135.4897] },
  'https://maps.google.com/?q=Osaka+Castle': { coords: [34.6873, 135.5259] },
  'https://maps.google.com/?q=Shinsekai': { coords: [34.6524, 135.5063] },
  'https://maps.google.com/?q=Round+One+Stadium+Sennichimae': { coords: [34.6648, 135.5028] },
  'https://maps.google.com/?q=Spa+World+Osaka': { coords: [34.6494, 135.5060] },
  'https://maps.google.com/?q=Osaka+Namba+Station': { coords: [34.6661, 135.5020] },
  'https://maps.google.com/?q=Kofukuji': { coords: [34.6818, 135.8390] },
  'https://maps.google.com/?q=Nara+Park': { coords: [34.6851, 135.8430] },
  'https://maps.google.com/?q=Nakatanidou+Mochi': { coords: [34.6829, 135.8275] },
  'https://maps.google.com/?q=Kasuga+Taisha': { coords: [34.6815, 135.8480] },
  'https://maps.google.com/?q=Himeji+Castle': { coords: [34.8394, 134.6939] },
  'https://maps.google.com/?q=Kobe+Steakland': { coords: [34.6960, 135.1955] },
  'https://maps.google.com/?q=Mount+Rokko+Cable+Car': { coords: [34.7370, 135.2370] },
  'https://maps.google.com/?q=Universal+Studios+Japan': { coords: [34.6655, 135.4323] },
  'https://maps.google.com/?q=Toyoko+Inn+Osaka+Honmachi': { coords: [34.6840, 135.5000] },

  // --- Hiroshima & Miyajima ---
  'https://maps.google.com/?q=Shin-Osaka+Station': { coords: [34.7335, 135.5003] },
  'https://maps.google.com/?q=Hiroshima+Castle': { coords: [34.4026, 132.4594] },
  'https://maps.google.com/?q=Hiroshima+Peace+Memorial+Museum': { coords: [34.3914, 132.4525] },
  'https://maps.google.com/?q=Shukkei-en': { coords: [34.4015, 132.4675] },
  'https://maps.google.com/?q=Okonomimura': { coords: [34.3920, 132.4590] },
  'https://maps.google.com/?q=Miyajimaguchi+Station': { coords: [34.3110, 132.3030] },
  'https://maps.google.com/?q=Itsukushima+Floating+Torii+Gate': { coords: [34.2960, 132.3197] },
  'https://maps.google.com/?q=Mount+Misen': { coords: [34.2790, 132.3190] },
  'https://maps.google.com/?q=Ryokan+Sakuraya+Miyajima': { coords: [34.2965, 132.3200] },

  // --- Tokyo Est ---
  'https://maps.google.com/?q=Hiroshima+Station': { coords: [34.3977, 132.4757] },
  'https://maps.google.com/?q=Grids+Tokyo+Ueno+Hotel+Hostel': { coords: [35.7115, 139.7745] },
  'https://maps.google.com/?q=Unicorn+Gundam+Statue': { coords: [35.6256, 139.7756] },
  'https://maps.google.com/?q=Tokyo+Joypolis': { coords: [35.6275, 139.7793] },
  'https://maps.google.com/?q=Ueno+Station': { coords: [35.7138, 139.7770] },
  'https://maps.google.com/?q=Tsurugaoka+Hachimangu': { coords: [35.3258, 139.5563] },
  'https://maps.google.com/?q=Hokokuji+Temple': { coords: [35.3186, 139.5710] },
  'https://maps.google.com/?q=Kotoku-in': { coords: [35.3169, 139.5358] },
  'https://maps.google.com/?q=Enoshima+Island': { coords: [35.2993, 139.4805] },
  'https://maps.google.com/?q=Ameyoko': { coords: [35.7100, 139.7745] },
  'https://maps.google.com/?q=Yanaka+Ginza': { coords: [35.7276, 139.7660] },
  'https://maps.google.com/?q=Akihabara': { coords: [35.7022, 139.7745] },
  'https://maps.google.com/?q=Akihabara+Yakiniku': { coords: [35.7010, 139.7730] },
  'https://maps.google.com/?q=Keisei-Ueno+Station': { coords: [35.7110, 139.7740] },
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
