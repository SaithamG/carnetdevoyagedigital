// Source les photos des lieux de l'itinéraire depuis Wikimedia (licence propre)
// et les télécharge en local dans public/images/itinerary/<slug>.jpg.
// Lieux précis -> article exact ; lieux niche -> article thématique réel.
// Usage : node scripts/fetch-itinerary-images.mjs
import { writeFile, mkdir, access } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, '..', 'public', 'images', 'itinerary');
const UA = 'CarnetVoyageDigital/1.0 (https://github.com/SaithamG/carnetdevoyagedigital; hamelmathias@gmail.com)';
const WIDTH = 800;

const slug = (mapUrl) => {
  const q = (mapUrl.split('q=')[1] || '').replace(/\+/g, ' ');
  return decodeURIComponent(q)
    .toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
};

// [ mapUrl, article Wikipédia, fallback (ville/thème) ]
const PLACES = [
  ['https://maps.google.com/?q=Tokyo+Haneda+Airport', 'Haneda Airport', 'Tokyo'],
  ['https://maps.google.com/?q=Toyoko+Inn+Shinjuku+Kabukicho', 'Kabukichō', 'Shinjuku'],
  ['https://maps.google.com/?q=Godzilla+Head+Shinjuku', 'Shinjuku Toho Building', 'Kabukichō'],
  ['https://maps.google.com/?q=Meiji+Jingu', 'Meiji Shrine', 'Tokyo'],
  ['https://maps.google.com/?q=Shibuya+Crossing', 'Shibuya Crossing', 'Shibuya'],
  ['https://maps.google.com/?q=Shibuya+Sky', 'Shibuya Scramble Square', 'Shibuya'],
  ['https://maps.google.com/?q=ONE+PIECE+FITNESS+BragMen', 'Shibuya', 'Tokyo'],
  ['https://maps.google.com/?q=Gyu-Kaku+Shibuya', 'Yakiniku', 'Japanese cuisine'],
  ['https://maps.google.com/?q=Asics+Harajuku', 'Harajuku', 'Tokyo'],
  ['https://maps.google.com/?q=Tokyo+Metropolitan+Gymnasium', 'Tokyo Metropolitan Gymnasium', 'Tokyo'],
  ['https://maps.google.com/?q=Pokemon+Center+Mega+Tokyo', 'Sunshine City', 'Ikebukuro'],
  ['https://maps.google.com/?q=Anytime+Fitness+Shinjuku', 'Gym', 'Shinjuku'],
  ['https://maps.google.com/?q=Sushiro+Shinjuku', 'Conveyor belt sushi', 'Sushi'],
  ['https://maps.google.com/?q=Shinjuku+Station', 'Shinjuku Station', 'Tokyo'],
  ['https://maps.google.com/?q=Toshogu+Shrine+Nikko', 'Nikkō Tōshō-gū', 'Nikkō, Tochigi'],
  ['https://maps.google.com/?q=Kegon+Falls', 'Kegon Falls', 'Nikkō, Tochigi'],
  ['https://maps.google.com/?q=Omoide+Yokocho', 'Izakaya', 'Shinjuku'],
  ['https://maps.google.com/?q=Owakudani', 'Ōwakudani', 'Hakone'],
  ['https://maps.google.com/?q=Lake+Ashi', 'Lake Ashi', 'Hakone'],
  ['https://maps.google.com/?q=Hakone+Yuryo', 'Onsen', 'Hakone'],
  ['https://maps.google.com/?q=Senso-ji', 'Sensō-ji', 'Asakusa'],
  ['https://maps.google.com/?q=teamLab+Borderless+Azabudai+Hills', 'Azabudai Hills', 'Tokyo'],
  ['https://maps.google.com/?q=Tokyo+Metropolitan+Government+Building', 'Tokyo Metropolitan Government Building', 'Shinjuku'],

  ['https://maps.google.com/?q=Tokyo+Station', 'Tokyo Station', 'Tokyo'],
  ['https://maps.google.com/?q=Kyoto+Station', 'Kyoto Station', 'Kyoto'],
  ['https://maps.google.com/?q=Fushimi+Inari+Taisha', 'Fushimi Inari-taisha', 'Kyoto'],
  ['https://maps.google.com/?q=Kyoto+Ramen+Koji', 'Ramen', 'Kyoto'],
  ['https://maps.google.com/?q=Arashiyama+Bamboo+Grove', 'Arashiyama', 'Kyoto'],
  ['https://maps.google.com/?q=Kinkaku-ji', 'Kinkaku-ji', 'Kyoto'],
  ['https://maps.google.com/?q=Pontocho+Alley', 'Pontocho', 'Kyoto'],
  ['https://maps.google.com/?q=Kiyomizu-dera', 'Kiyomizu-dera', 'Kyoto'],
  ['https://maps.google.com/?q=Nishiki+Market', 'Nishiki Market', 'Kyoto'],
  ['https://maps.google.com/?q=Yasaka+Shrine', 'Yasaka Shrine', 'Kyoto'],
  ['https://maps.google.com/?q=Ginkaku-ji', 'Ginkaku-ji', 'Kyoto'],
  ['https://maps.google.com/?q=Nanzen-ji', 'Nanzen-ji', 'Kyoto'],
  ['https://maps.google.com/?q=Eikando+Zenrinji+Temple', 'Eikan-dō Zenrin-ji', 'Kyoto'],

  ['https://maps.google.com/?q=Stay+SAKURA+Kyoto', 'Kyoto Tower', 'Kyoto'],
  ['https://maps.google.com/?q=Amerikamura', 'Amerikamura', 'Osaka'],
  ['https://maps.google.com/?q=Dotonbori', 'Dōtonbori', 'Osaka'],
  ['https://maps.google.com/?q=Dotonbori+Takoyaki', 'Takoyaki', 'Osaka'],
  ['https://maps.google.com/?q=Denden+Town', 'Den Den Town', 'Osaka'],
  ['https://maps.google.com/?q=Namba+Yasaka+Shrine', 'Shinto', 'Torii'],
  ['https://maps.google.com/?q=Umeda+Sky+Building', 'Umeda Sky Building', 'Osaka'],
  ['https://maps.google.com/?q=Osaka+Castle', 'Osaka Castle', 'Osaka'],
  ['https://maps.google.com/?q=Shinsekai', 'Shinsekai', 'Osaka'],
  ['https://maps.google.com/?q=Round+One+Stadium+Sennichimae', 'Amusement arcade', 'Osaka'],
  ['https://maps.google.com/?q=Spa+World+Osaka', 'Sentō', 'Onsen'],
  ['https://maps.google.com/?q=Osaka+Namba+Station', 'Namba', 'Osaka'],
  ['https://maps.google.com/?q=Kofukuji', 'Kōfuku-ji', 'Nara'],
  ['https://maps.google.com/?q=Nara+Park', 'Nara Park', 'Nara'],
  ['https://maps.google.com/?q=Nakatanidou+Mochi', 'Mochi', 'Nara'],
  ['https://maps.google.com/?q=Kasuga+Taisha', 'Kasuga-taisha', 'Nara'],
  ['https://maps.google.com/?q=Himeji+Castle', 'Himeji Castle', 'Himeji'],
  ['https://maps.google.com/?q=Kobe+Steakland', 'Kobe beef', 'Kobe'],
  ['https://maps.google.com/?q=Mount+Rokko+Cable+Car', 'Mount Rokkō', 'Kobe'],
  ['https://maps.google.com/?q=Universal+Studios+Japan', 'Universal Studios Japan', 'Osaka'],
  ['https://maps.google.com/?q=Toyoko+Inn+Osaka+Honmachi', 'Shinsaibashi', 'Osaka'],

  ['https://maps.google.com/?q=Shin-Osaka+Station', 'Shin-Ōsaka Station', 'Osaka'],
  ['https://maps.google.com/?q=Hiroshima+Castle', 'Hiroshima Castle', 'Hiroshima'],
  ['https://maps.google.com/?q=Hiroshima+Peace+Memorial+Museum', 'Hiroshima Peace Memorial Museum', 'Hiroshima'],
  ['https://maps.google.com/?q=Shukkei-en', 'Shukkei-en', 'Hiroshima'],
  ['https://maps.google.com/?q=Okonomimura', 'Okonomiyaki', 'Hiroshima'],
  ['https://maps.google.com/?q=Miyajimaguchi+Station', 'Itsukushima', 'Hiroshima'],
  ['https://maps.google.com/?q=Itsukushima+Floating+Torii+Gate', 'Itsukushima Shrine', 'Hiroshima'],
  ['https://maps.google.com/?q=Mount+Misen', 'Mount Misen', 'Itsukushima'],
  ['https://maps.google.com/?q=Ryokan+Sakuraya+Miyajima', 'Ryokan', 'Itsukushima'],

  ['https://maps.google.com/?q=Hiroshima+Station', 'Hiroshima Station', 'Hiroshima'],
  ['https://maps.google.com/?q=Grids+Tokyo+Ueno+Hotel+Hostel', 'Ueno', 'Tokyo'],
  ['https://maps.google.com/?q=Unicorn+Gundam+Statue', 'DiverCity Tokyo Plaza', 'Odaiba'],
  ['https://maps.google.com/?q=Tokyo+Joypolis', 'Tokyo Joypolis', 'Odaiba'],
  ['https://maps.google.com/?q=Ueno+Station', 'Ueno Station', 'Tokyo'],
  ['https://maps.google.com/?q=Tsurugaoka+Hachimangu', 'Tsurugaoka Hachimangū', 'Kamakura'],
  ['https://maps.google.com/?q=Hokokuji+Temple', 'Hōkoku-ji', 'Kamakura'],
  ['https://maps.google.com/?q=Kotoku-in', 'Kōtoku-in', 'Kamakura'],
  ['https://maps.google.com/?q=Enoshima+Island', 'Enoshima', 'Kamakura'],
  ['https://maps.google.com/?q=Ameyoko', 'Ameyoko', 'Ueno'],
  ['https://maps.google.com/?q=Yanaka+Ginza', 'Yanaka, Tokyo', 'Tokyo'],
  ['https://maps.google.com/?q=Akihabara', 'Akihabara', 'Tokyo'],
  ['https://maps.google.com/?q=Akihabara+Yakiniku', 'Wagyu', 'Yakiniku'],
  ['https://maps.google.com/?q=Keisei-Ueno+Station', 'Keisei Ueno Station', 'Ueno'],
];

const headers = { 'User-Agent': UA, Accept: 'application/json' };

// Wikimedia ne sert à la volée que via Special:FilePath?width= (les largeurs
// arbitraires sur upload.wikimedia.org renvoient 400 si non pré-générées).
async function imageFor(title) {
  const r = await fetch(
    `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`,
    { headers }
  );
  if (!r.ok) return null;
  const j = await r.json();
  const src = j?.originalimage?.source || j?.thumbnail?.source;
  if (!src) return null;

  let fname;
  if (src.includes('/thumb/')) {
    const parts = src.split('/');
    fname = parts[parts.length - 2]; // .../thumb/x/xx/File.ext/NNNpx-File.ext
  } else {
    fname = src.split('/').pop();
  }
  const host = src.includes('/wikipedia/commons/')
    ? 'https://commons.wikimedia.org'
    : 'https://en.wikipedia.org';
  return `${host}/wiki/Special:FilePath/${fname}?width=${WIDTH}`;
}

async function download(url, dest) {
  const r = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!r.ok) return false;
  if (!(r.headers.get('content-type') || '').startsWith('image/')) return false;
  const buf = Buffer.from(await r.arrayBuffer());
  if (buf.length < 1500) return false;
  await writeFile(dest, buf);
  return true;
}

async function run() {
  await mkdir(OUT, { recursive: true });
  let ok = 0, fb = 0, fail = 0;
  const failures = [];

  for (const [mapUrl, wiki, fallback] of PLACES) {
    const name = slug(mapUrl);
    const dest = join(OUT, `${name}.jpg`);

    // Idempotent : ne retélécharge pas ce qui existe déjà.
    if (await access(dest).then(() => true, () => false)) {
      ok++; console.log(`· ${name} (déjà présent)`);
      continue;
    }

    let url = await imageFor(wiki).catch(() => null);
    let usedFallback = false;
    if (!url && fallback) {
      url = await imageFor(fallback).catch(() => null);
      usedFallback = true;
    }

    let saved = false;
    if (url) {
      saved = await download(url, dest).catch(() => false);
      if (!saved) { // 1 retry après pause (throttling Wikimedia)
        await new Promise((res) => setTimeout(res, 800));
        saved = await download(url, dest).catch(() => false);
      }
    }

    if (saved) {
      if (usedFallback) { fb++; console.log(`~ ${name}  (fallback: ${fallback})`); }
      else { ok++; console.log(`✓ ${name}`); }
    } else {
      fail++; failures.push(name); console.log(`✗ ${name}  (${wiki})`);
    }
    await new Promise((res) => setTimeout(res, 300)); // courtoisie API
  }

  console.log(`\nExact: ${ok}  |  Fallback: ${fb}  |  Échecs: ${fail}`);
  if (failures.length) console.log('Échecs:', failures.join(', '));
}

run();
