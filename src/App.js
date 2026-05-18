import React, { useState } from 'react';
import {
  ShieldCheck,
  Map,
  Calendar,
  Plane,
  PlaneTakeoff,
  Hotel,
  Train,
  TrainFront,
  Wallet,
  ListChecks,
  CheckCircle2,
  AlertCircle,
  AlertOctagon,
  ArrowRight,
  Utensils,
  Zap,
  Ticket,
  Landmark,
  Receipt,
  Banknote,
  ArrowDownCircle,
  ShoppingBag,
  Dumbbell,
  CreditCard,
  Info,
  Navigation,
  BookOpen,
  Coffee,
  Sun,
  Leaf,
  Flame,
  MapPin,
  Gamepad2,
  Camera,
  Mountain,
  Waves,
  Sparkles,
  Loader2,
  MessageSquare,
  Send,
  Clock,
  Castle,
  Activity,
  Moon,
  Bell,
  CalendarPlus,
  ExternalLink,
  Globe,
  Calculator,
  ArrowRightLeft,
  Check,
  CloudRain,
  Umbrella,
  CheckSquare,
  Languages,
  MapPinned,
} from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('finance');
  const [activeRegion, setActiveRegion] = useState('tokyo1');

  // States Météo (Plan B)
  const [isRaining, setIsRaining] = useState(false);

  // States IA
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiError, setAiError] = useState(null);

  // States Convertisseur
  const [convAmount, setConvAmount] = useState('1000');
  const [isJpyToEur, setIsJpyToEur] = useState(true);
  const [quickYen, setQuickYen] = useState('3500');
  const EXCHANGE_RATE = 185;

  // States Checklist
  const [checkedItems, setCheckedItems] = useState({});

  const toggleCheck = (id) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // --- DATA : VÉRITÉ MATHÉMATIQUE CORRIGÉE ---
  const startingBalance = 971;
  const surplusFinal = 2701;
  const summerTourCost = 280;

  const cashflowTimeline = [
    {
      month: 'Mars 2026',
      in: 160,
      out: 0,
      textIn: '+160€ (Fact. Tekinova)',
      textOut: '-',
      balance: 1131,
      detail: 'Le 1er quart du vol et ton virement de 350€ sont inclus.',
    },
    {
      month: 'Avril 2026',
      in: 350,
      out: 163,
      textIn: '+350€ (Épargne)',
      textOut: '-163€ (PayPal 2/4)',
      balance: 1318,
      detail: "L'épargne classique absorbe la 2ème échéance de l'avion.",
    },
    {
      month: 'Mai 2026',
      in: 416,
      out: 306,
      textIn: '+416€ (Augmentation)',
      textOut: '-306€ (Vol + Van)',
      balance: 1422,
      detail:
        "L'augmentation n'a pris effet que le 22 avril 2026 suite à la mise à jour de mon Cerfa. Acompte de 143 € pour le van inclus.",
    },
    {
      month: 'Juin 2026',
      in: 500,
      out: 163,
      textIn: '+500€ (Épargne capée)',
      textOut: '-163€ (PayPal 4/4)',
      balance: 1759,
      detail:
        'God Mode désactivé. Recours CAF en cours. Épargne capée à 500 € pour budget Aix à 1 025 €.',
    },
    {
      month: 'Juillet 2026',
      in: 750,
      out: 280,
      textIn: '+500€ (Fixe) +250€ (BTS)',
      textOut: '-280€ (Summer Tour)',
      balance: 2229,
      detail:
        "Revente de la place BTS et paiement des excursions d'été. Prime d'activité toujours en attente.",
    },
    {
      month: 'Août 2026',
      in: 750,
      out: 0,
      textIn: '+750€ (Épargne)',
      textOut: '-',
      balance: 2979,
      detail:
        'Farming pur. La nouvelle déclaration CAF aura débloqué la situation (reprise du God Mode).',
    },
    {
      month: 'Sept 2026',
      in: 750,
      out: 225,
      textIn: '+750€ (Épargne)',
      textOut: '-225€ (Parcs)',
      balance: 3504,
      detail: 'Achat de ton USJ Express Pass 7 (200€) et TeamLab (25€).',
    },
    {
      month: 'Oct 2026',
      in: 750,
      out: 325,
      textIn: '+750€ (Épargne)',
      textOut: '-325€ (Trains + TGV)',
      balance: 3929,
      detail:
        'Shinkansen (85€), Kansai Pass (105€) ET ton TGV Aix-Paris (120€) déduit.',
    },
    {
      month: 'Départ (Nov)',
      in: 0,
      out: 1228,
      textIn: '-',
      textOut: '-1228€ (Hôtels + Reste Infra)',
      balance: 2701,
      detail:
        'Paiement hôtels (783€), reste Transports/Suica (270€) et reste Parcs/Temples (175€).',
    },
  ];

  const budgetData = [
    {
      label: 'Reste Vol A/R (Air China)',
      cost: 488,
      icon: <Plane size={16} />,
      color: 'blue',
      type: 'epargne',
      desc: '3 x 163€ via PayPal 4x',
    },
    {
      label: 'TGV Aix-Paris A/R',
      cost: 120,
      icon: <TrainFront size={16} />,
      color: 'red',
      type: 'epargne',
      desc: 'Navette aéroport (déduit en Oct)',
    },
    {
      label: 'Hébergement (21 nuits)',
      cost: 783,
      icon: <Hotel size={16} />,
      color: 'emerald',
      type: 'epargne',
      desc: 'Ta part (50%) - Payé sur place',
    },
    {
      label: 'Transports Japon (+ Pass)',
      cost: 475,
      icon: <Train size={16} />,
      color: 'orange',
      type: 'epargne',
      desc: 'Shinkansen, Pass & Suica',
    },
    {
      label: 'Grands Parcs & Temples',
      cost: 400,
      icon: <Ticket size={16} />,
      color: 'pink',
      type: 'epargne',
      desc: 'USJ, TeamLab, Himeji, etc.',
    },
    {
      label: 'Nourriture & Vie (22j)',
      cost: 770,
      icon: <Utensils size={16} />,
      color: 'purple',
      type: 'salaire',
      desc: 'Ajusté à 35€/j (Tabehoudai)',
    },
    {
      label: 'Shopping & Goodies',
      cost: 330,
      icon: <ShoppingBag size={16} />,
      color: 'amber',
      type: 'salaire',
      desc: 'Maillot Volley, OP Gym, Figurines',
    },
    {
      label: 'Buffer France (5-9 Nov & 30-5 Déc)',
      cost: 146,
      icon: <Wallet size={16} />,
      color: 'slate',
      type: 'salaire',
      desc: 'Survie FR avant départ et au retour',
    },
  ];

  const totalEpargneUsed = budgetData
    .filter((i) => i.type === 'epargne')
    .reduce((acc, curr) => acc + curr.cost, 0);

  // --- DATA : MOIS BLANC (NOVEMBRE) ---
  const salaireNov = 1786;
  const chargesFrance = 540;

  // --- DATA : DEPLOYMENT RUNBOOK ---
  const runbook = [
    { id: 1, title: 'Achat Vol (Air China)', desc: 'Billets achetés (9 au 30 nov). 650€/pers via PayPal 4x. 1ère échéance réglée le 3 mars.', status: 'done' },
    { id: 2, title: 'Hébergements Sécurisés', desc: '100% du circuit validé avec annulation gratuite. 0€ engagés.', status: 'done' },
    { id: 3, title: 'Hardware (Passeports)', desc: 'Mathias : OK. Vérane : Passeport reçu et validé !', status: 'done' },
    { id: 4, title: 'Mise à jour Passagers', desc: 'Passeport de Vérane ajouté dans l\'espace client du vol Air China.', status: 'done' }
  ];


  const reminders = [
    {
      id: 1,
      title: 'TeamLab Borderless (Tokyo)',
      targetDate: 'Visite : Sam 14 Nov 2026',
      reminderDate: '🗓️ Alerte : 14 Septembre 2026',
      desc: "Les billets ouvrent exactement 2 mois à l'avance. Indispensable pour éviter le sold-out le week-end.",
      url: 'https://calendar.google.com/calendar/u/0/r/eventedit?text=R%C3%A9servation+TeamLab+Borderless&dates=20260914T070000Z/20260914T073000Z',
      color: 'purple',
    },
    {
      id: 2,
      title: 'USJ + Express Pass 7',
      targetDate: 'Visite : Mar 24 Nov 2026',
      reminderDate: '🗓️ Alerte : 24 Septembre 2026',
      desc: "L'Express Pass (obligatoire pour Nintendo World) part en quelques heures. À prendre 2 mois pile avant.",
      url: 'https://calendar.google.com/calendar/u/0/r/eventedit?text=Achat+Billets+USJ+%2B+Express+Pass&dates=20260924T070000Z/20260924T073000Z',
      color: 'red',
    },
    {
      id: 3,
      title: 'Train Express Spacia (Nikko)',
      targetDate: 'Trajet : Jeu 12 Nov 2026',
      reminderDate: '🗓️ Alerte : 12 Octobre 2026',
      desc: "Ouverture des billets pile 1 mois avant. Indispensable car c'est le pic de l'automne (sur réservation).",
      url: 'https://calendar.google.com/calendar/u/0/r/eventedit?text=R%C3%A9servation+Train+Spacia+Nikko&dates=20261012T070000Z/20261012T073000Z',
      color: 'orange',
    },
    {
      id: 4,
      title: 'Shibuya Sky (Coucher soleil)',
      targetDate: 'Visite : Mar 10 Nov 2026',
      reminderDate: '🗓️ Alerte : 13 Octobre 2026',
      desc: "La billetterie ouvre 4 semaines à l'avance. Le créneau de 16h30 part en quelques heures !",
      url: 'https://calendar.google.com/calendar/u/0/r/eventedit?text=R%C3%A9servation+Shibuya+Sky&dates=20261013T070000Z/20261013T073000Z',
      color: 'blue',
    },
  ];

  const transports = [
    {
      from: 'Aéroport Haneda',
      to: 'Shinjuku (Hôtel)',
      type: 'Tokyo Monorail + JR Yamanote',
      cost: '~4€',
      desc: 'Validation rapide avec ta carte Suica digitale sur Apple Pay rechargée via Revolut. Aucun billet papier.',
    },
    {
      from: 'Tokyo',
      to: 'Kyoto',
      type: 'Shinkansen Nozomi (TGV)',
      cost: '~85€',
      desc: "Le train le plus rapide (2h15). Achat sur l'app SmartEX 1 mois avant. Réservation des places 'bagages hors format' obligatoire.",
    },
    {
      from: 'Kyoto',
      to: 'Osaka',
      type: 'JR Special Rapid Service',
      cost: '~4€',
      desc: 'Train de banlieue classique (30min). Paiement direct en bipant la carte Suica.',
    },
    {
      from: 'Kansai',
      to: 'Ouest Japon',
      type: 'Kansai-Hiroshima Area Pass',
      cost: '105€',
      desc: 'Pass illimité de 5 jours. Couvre tes trajets vers Himeji, Kobe, Nara, le Shinkansen vers Hiroshima et le ferry de Miyajima.',
    },
    {
      from: 'Hiroshima',
      to: 'Tokyo Ueno',
      type: 'Shinkansen Nozomi',
      cost: '~115€',
      desc: "La grande remontée (4h). À réserver sur l'application SmartEX à l'avance pour sécuriser des places côte à côte.",
    },
    {
      from: 'Tokyo Ueno',
      to: 'Aéroport Haneda',
      type: 'Keisei Skyliner + Monorail',
      cost: '~15€',
      desc: "Trajet retour le dernier matin. Ligne express qui t'emmène à l'aéroport en 45 minutes chrono.",
    },
  ];

  const checklistData = [
    { id: 'c1', label: 'Passeport valide (+ 6 mois)', category: 'Documents' },
    {
      id: 'c2',
      label: 'QR Code "Visit Japan Web" généré',
      category: 'Documents',
    },
    {
      id: 'c3',
      label: 'Adaptateur de prise japonaise (Type A)',
      category: 'Tech',
    },
    {
      id: 'c4',
      label: 'eSIM activée ou Pocket WiFi réservé',
      category: 'Tech',
    },
    {
      id: 'c5',
      label: 'Chaussures de salle (Propres pour les gymnases !)',
      category: 'Sport',
    },
    { id: 'c6', label: 'Genouillères & Tenue de volley', category: 'Sport' },
    {
      id: 'c7',
      label: 'Vérification poids valises (Max 2x23kg)',
      category: 'Logistique',
    },
    {
      id: 'c8',
      label: 'Comptes Revolut / BoursoBank approvisionnés',
      category: 'Finance',
    },
  ];

  const lexiqueData = [
    {
      fr: "Est-ce que c'est à volonté ?",
      romaji: 'Tabehoudai desu ka ?',
      jp: '食べ放題ですか？',
    },
    {
      fr: "Sans fruits de mer s'il vous plaît",
      romaji: 'Kaisanbutsu nashi de onegaishimasu',
      jp: '海産物なしでお願いします',
    },
    {
      fr: "L'addition s'il vous plaît",
      romaji: 'Okaikei onegaishimasu',
      jp: 'お会計お願いします',
    },
    {
      fr: "C'était délicieux",
      romaji: 'Gochisousama deshita',
      jp: 'ごちそうさまでした',
    },
    {
      fr: 'Où sont les toilettes ?',
      romaji: 'Toire wa doko desu ka ?',
      jp: 'トイレはどこですか？',
    },
    {
      fr: 'Où est la gare ?',
      romaji: 'Eki wa doko desu ka ?',
      jp: '駅はどこですか？',
    },
    {
      fr: 'Je voudrais payer par carte',
      romaji: 'Kaado de haraemasu ka ?',
      jp: 'カードで払えますか？',
    },
    { fr: 'Pardon / Excusez-moi', romaji: 'Sumimasen', jp: 'すみません' },
  ];

  const planBData = {
    tokyo1:
      "🌧️ Plan B Activé : Ciblez les centres commerciaux d'Ikebukuro (Sunshine City), le musée TeamLab Borderless (intérieur), les immenses salles d'arcades GiGO ou Nakano Broadway pour l'Otaku culture au sec.",
    kyoto:
      '🌧️ Plan B Activé : Réfugiez-vous dans les galeries couvertes de Teramachi, le marché de Nishiki (entièrement couvert), ou visitez le Musée International du Manga de Kyoto.',
    osaka:
      '🌧️ Plan B Activé : Fuyez dans le complexe SPO-CHA (Round One) pour 3h de sport couvert, puis direction Spa World pour les bains chauds thermaux (intérieur).',
    hiroshima:
      "🌧️ Plan B Activé : La visite du Musée du Mémorial de la Paix prend facilement 3 heures en intérieur, suivi d'un déjeuner dans l'immeuble couvert d'Okonomimura.",
    tokyo2:
      "🌧️ Plan B Activé : L'île d'Odaiba avec Joypolis (Parc d'attraction SEGA en intérieur) et DiverCity, ou les grands magasins d'électronique Yodobashi Camera à Akihabara.",
  };

  const regions = [
    { id: 'tokyo1', name: 'Tokyo Ouest', icon: <Zap size={16} /> },
    { id: 'kyoto', name: 'Kyoto', icon: <Leaf size={16} /> },
    { id: 'osaka', name: 'Osaka & Kansai', icon: <Flame size={16} /> },
    { id: 'hiroshima', name: 'Hiroshima', icon: <MapPin size={16} /> },
    { id: 'tokyo2', name: 'Tokyo Est', icon: <ShoppingBag size={16} /> },
  ];

  const itineraryData = {
    tokyo1: {
      chapter: "Chapitre 1 : L'Essentiel (Tokyo Ouest)",
      desc: "Ta base est à Shinjuku. On découpe l'Ouest de Tokyo heure par heure. Zéro temps mort, focus sur la Pop-Culture et la mise en place de ta routine sportive.",
      days: [
        {
          date: 'Lun 9 Nov',
          title: 'Atterrissage & Kabukicho',
          simplissime:
            'Ne dors pas avant 22h locale pour écraser le jetlag direct.',
          steps: [
            {
              time: '16h20',
              icon: <PlaneTakeoff size={20} className="text-blue-400" />,
              title: 'Atterrissage Tokyo Haneda',
              desc: 'Passage douane express avec le QR Code Visit Japan Web. Achat de la carte Suica.',
              mapUrl: '',
              isOutdoor: false,
            },
            {
              time: '18h00',
              icon: <Hotel size={20} className="text-emerald-400" />,
              title: 'Check-in Toyoko Inn',
              desc: "Trajet vers Shinjuku. Dépôt des valises de 23kg. L'infrastructure est posée.",
              mapUrl:
                'https://maps.google.com/?q=Toyoko+Inn+Shinjuku+Kabukicho',
              isOutdoor: false,
            },
            {
              time: '20h00',
              icon: <Utensils size={20} className="text-red-400" />,
              title: 'Le Choc Visuel',
              desc: 'Balade dans les néons sous la tête de Godzilla. Repas très lourd et rapide chez Matsuya (Gyudon) pour se caler.',
              mapUrl: '',
              isOutdoor: true,
            },
          ],
        },
        {
          date: 'Mar 10 Nov',
          title: 'Shibuya Crossing & One Piece Gym',
          simplissime:
            'Grosse journée de marche et de sport. Tu vas gagner ton "Avis de Recherche" à la salle de muscu !',
          steps: [
            {
              time: '09h00',
              icon: <Leaf size={20} className="text-green-400" />,
              title: 'Meiji Jingu & Takeshita',
              desc: 'Parc Yoyogi et Sanctuaire Meiji. Descente de la rue folle de Harajuku (Takeshita-dori) pour les crêpes géantes.',
              mapUrl: 'https://maps.google.com/?q=Meiji+Jingu',
              isOutdoor: true,
            },
            {
              time: '14h00',
              icon: <Gamepad2 size={20} className="text-purple-400" />,
              title: 'Shibuya Crossing & Parco',
              desc: 'Traversée du carrefour. Achats au Nintendo Store et Jump Shop.',
              mapUrl: '',
              isOutdoor: false,
            },
            {
              time: '16h30',
              icon: <Sun size={20} className="text-amber-400" />,
              title: 'Shibuya Sky',
              desc: "Ascension à l'air libre (réservée à l'avance) pour le coucher de soleil sur le Mont Fuji.",
              mapUrl: 'https://maps.google.com/?q=Shibuya+Sky',
              isOutdoor: true,
            },
            {
              time: '18h00',
              icon: <Dumbbell size={20} className="text-blue-500" />,
              title: 'One Piece Fitness BragMen',
              desc: "🏴‍☠️ Va t'entraîner dans la salle de sport officielle One Piece à Shibuya !",
              mapUrl: '',
              isOutdoor: false,
            },
            {
              time: '19h30',
              icon: <Flame size={20} className="text-red-500" />,
              title: 'Yakiniku Tabehoudai',
              desc: 'BBQ japonais à volonté (ex: Gyukaku). Protéines illimitées sur tablette.',
              mapUrl: '',
              isOutdoor: false,
            },
          ],
        },
        {
          date: 'Mer 11 Nov',
          title: 'Densité Max : Volley & Anime',
          simplissime:
            'Concentre tous tes achats vestimentaires/sportifs ce jour-là pour ne plus y penser ensuite.',
          steps: [
            {
              time: '09h00',
              icon: <ShoppingBag size={20} className="text-pink-400" />,
              title: 'Asics Flagship Harajuku',
              desc: 'Achat du maillot officiel Ryujin Nippon (Volley) + Genouillères pro.',
              mapUrl: 'https://maps.google.com/?q=Asics+Harajuku',
              isOutdoor: false,
            },
            {
              time: '10h30',
              icon: <Camera size={20} className="text-indigo-400" />,
              title: 'Tokyo Metropolitan Gym',
              desc: 'Station Sendagaya. Le vrai stade des Nationales de Haikyuu!!.',
              mapUrl: 'https://maps.google.com/?q=Tokyo+Metropolitan+Gymnasium',
              isOutdoor: true,
            },
            {
              time: '13h30',
              icon: <Gamepad2 size={20} className="text-blue-400" />,
              title: 'Ikebukuro & Mega Pokémon',
              desc: 'Direction Ikebukuro (Mega Centre Pokémon / Gachapons géants / Arcades).',
              mapUrl: '',
              isOutdoor: false,
            },
            {
              time: '18h00',
              icon: <Dumbbell size={20} className="text-slate-400" />,
              title: 'Anytime Fitness',
              desc: "Maintien athlétique avec une bonne séance près de l'hôtel.",
              mapUrl: '',
              isOutdoor: false,
            },
            {
              time: '20h30',
              icon: <Utensils size={20} className="text-orange-400" />,
              title: 'Sushi Tournant',
              desc: 'Sushiro ou Kura Sushi. 20 assiettes à engloutir avec mini-jeux.',
              mapUrl: '',
              isOutdoor: false,
            },
          ],
        },
        {
          date: 'Jeu 12 Nov',
          title: 'Day-Trip : Nikko',
          simplissime:
            "Nikko est en altitude. On y va dès le début du voyage pour garantir le pic des couleurs d'automne !",
          steps: [
            {
              time: '07h30',
              icon: <Train size={20} className="text-orange-400" />,
              title: 'Départ Express',
              desc: 'Train Spacia direct depuis Shinjuku (2h). On y va tôt pour chopper la lumière !',
              mapUrl: '',
              isOutdoor: false,
            },
            {
              time: '10h00',
              icon: <Castle size={20} className="text-yellow-500" />,
              title: 'Sanctuaire Toshogu',
              desc: "Explosion d'or et de sculptures au milieu de la forêt de cèdres (les 3 singes).",
              mapUrl: 'https://maps.google.com/?q=Toshogu+Shrine+Nikko',
              isOutdoor: true,
            },
            {
              time: '13h30',
              icon: <Mountain size={20} className="text-emerald-500" />,
              title: 'Lac Chuzenji & Kegon',
              desc: "Bus en lacet pour atteindre la cascade géante (97m). L'apogée de l'automne.",
              mapUrl: 'https://maps.google.com/?q=Kegon+Falls',
              isOutdoor: true,
            },
            {
              time: '19h00',
              icon: <Utensils size={20} className="text-red-500" />,
              title: 'Omoide Yokocho',
              desc: 'Retour Shinjuku. Dîner dans la ruelle des yakitoris, ambiance cyberpunk et fumée.',
              mapUrl: '',
              isOutdoor: false,
            },
          ],
        },
        {
          date: 'Ven 13 Nov',
          title: 'Day-Trip : Hakone',
          simplissime:
            'Si la météo annonce des nuages ou de la pluie, inverse cette journée avec les activités couvertes.',
          steps: [
            {
              time: '08h00',
              icon: <Ticket size={20} className="text-orange-400" />,
              title: 'Hakone Free Pass',
              desc: 'Train Romancecar vers la montagne depuis Shinjuku.',
              mapUrl: '',
              isOutdoor: false,
            },
            {
              time: '11h00',
              icon: <Mountain size={20} className="text-slate-400" />,
              title: "Vallée d'Owakudani",
              desc: "Survol en téléphérique des sources volcaniques. Dégustation d'œufs noirs.",
              mapUrl: '',
              isOutdoor: true,
            },
            {
              time: '14h00',
              icon: <Waves size={20} className="text-cyan-400" />,
              title: 'Lac Ashi',
              desc: 'Bateau pirate sur le lac avec vue monumentale sur le Mont Fuji !',
              mapUrl: '',
              isOutdoor: true,
            },
            {
              time: '17h00',
              icon: <Coffee size={20} className="text-emerald-400" />,
              title: 'Détente Onsen',
              desc: 'Bain thermal chaud privatif ou public avant le retour.',
              mapUrl: '',
              isOutdoor: false,
            },
          ],
        },
        {
          date: 'Sam 14 Nov',
          title: 'Asakusa & Art Digital',
          simplissime:
            'Tu envoies tes valises ce soir. Demain, tu prends le Shinkansen les mains dans les poches !',
          steps: [
            {
              time: '08h30',
              icon: <MapPin size={20} className="text-red-400" />,
              title: 'Temple Senso-ji',
              desc: "Y aller tôt. Grande lanterne rouge et street food dans l'allée Nakamise.",
              mapUrl: '',
              isOutdoor: true,
            },
            {
              time: '14h00',
              icon: <Sparkles size={20} className="text-purple-400" />,
              title: 'TeamLab Borderless',
              desc: "Musée d'art numérique immersif à Azabudai Hills (Prévoir 3h, sans plan).",
              mapUrl: '',
              isOutdoor: false,
            },
            {
              time: '19h00',
              icon: <Moon size={20} className="text-indigo-400" />,
              title: 'Mairie de Shinjuku',
              desc: 'Ascension gratuite au 45ème étage pour voir Tokyo de nuit.',
              mapUrl: '',
              isOutdoor: false,
            },
            {
              time: '21h00',
              icon: <ShoppingBag size={20} className="text-emerald-400" />,
              title: 'Logistique Takkyubin',
              desc: 'Envoi des grosses valises 23kg vers Osaka (Takkyubin). Garde un petit sac.',
              mapUrl: '',
              isOutdoor: false,
            },
          ],
        },
      ],
    },
    kyoto: {
      chapter: 'Chapitre 2 : La Tradition (Kyoto)',
      desc: "L'ancienne capitale. On change d'échelle : des bus au lieu des métros, des temples en bois au lieu des buildings. On la visite par zones sans jamais croiser l'itinéraire.",
      days: [
        {
          date: 'Dim 15 Nov',
          title: 'Shinkansen & Fushimi Inari',
          simplissime:
            'La plupart des touristes ne font que le bas du Fushimi. En grimpant au sommet à 15h30, tu auras la paix et la Golden Hour.',
          steps: [
            {
              time: '09h00',
              icon: <Train size={20} className="text-blue-400" />,
              title: 'Shinkansen Nozomi',
              desc: 'Trajet à 300km/h. Mange ton bento (Ekiben) dans le train.',
              mapUrl: '',
              isOutdoor: false,
            },
            {
              time: '11h30',
              icon: <MapPin size={20} className="text-emerald-400" />,
              title: 'Guest Center',
              desc: "Dépose tes sacs près de la gare (livraison automatique à l'hôtel Stay SAKURA).",
              mapUrl: '',
              isOutdoor: false,
            },
            {
              time: '15h30',
              icon: <Mountain size={20} className="text-red-500" />,
              title: 'Fushimi Inari (Golden Hour)',
              desc: 'On esquive la foule ! Ascension sportive des 10 000 torii. Redescente poétique de nuit.',
              mapUrl: 'https://maps.google.com/?q=Fushimi+Inari+Taisha',
              isOutdoor: true,
            },
            {
              time: '19h30',
              icon: <Utensils size={20} className="text-purple-400" />,
              title: 'Kyoto Ramen Koji',
              desc: "Au 10e étage de la gare, l'allée des meilleurs ramens du Japon.",
              mapUrl: '',
              isOutdoor: false,
            },
          ],
        },
        {
          date: 'Lun 16 Nov',
          title: "L'Ouest (Or & Singes)",
          simplissime:
            'Louer des vélos (électriques) à Arashiyama permet de faire cette zone de manière hyper agréable.',
          steps: [
            {
              time: '07h30',
              icon: <Leaf size={20} className="text-green-500" />,
              title: 'Arashiyama',
              desc: "Réveil piquant obligatoire. Forêt de bambous vide. Ascension raide vers le parc aux singes d'Iwatayama.",
              mapUrl: 'https://maps.google.com/?q=Arashiyama+Bamboo+Grove',
              isOutdoor: true,
            },
            {
              time: '13h30',
              icon: <Sparkles size={20} className="text-yellow-400" />,
              title: "Pavillon d'Or & Ryoan-ji",
              desc: "Kinkaku-ji recouvert d'or pur étincelant, puis le célèbre jardin de pierres zen.",
              mapUrl: 'https://maps.google.com/?q=Kinkaku-ji',
              isOutdoor: true,
            },
            {
              time: '18h30',
              icon: <Utensils size={20} className="text-orange-500" />,
              title: 'Gion & Okonomiyaki',
              desc: 'Balade nocturne (quartier Geishas) et dîner Okonomiyaki dans la ruelle Pontocho.',
              mapUrl: '',
              isOutdoor: true,
            },
          ],
        },
        {
          date: 'Mar 17 Nov',
          title: "L'Est (Kimonos & Ruelles)",
          simplissime:
            "Une journée lente, centrée sur l'esthétique, la nourriture de rue et les photos mémorables.",
          steps: [
            {
              time: '09h00',
              icon: <Camera size={20} className="text-pink-400" />,
              title: 'Kiyomizu-dera & Ninenzaka',
              desc: 'Location de kimono (optionnel). Le grand temple en bois sur pilotis. Descente des ruelles historiques.',
              mapUrl: 'https://maps.google.com/?q=Kiyomizu-dera',
              isOutdoor: true,
            },
            {
              time: '13h30',
              icon: <ShoppingBag size={20} className="text-orange-400" />,
              title: 'Marché de Nishiki',
              desc: 'Le garde-manger de Kyoto. Enchaîne les stands de street-food (Brochettes wagyu).',
              mapUrl: 'https://maps.google.com/?q=Nishiki+Market',
              isOutdoor: false,
            },
            {
              time: '18h00',
              icon: <Moon size={20} className="text-purple-400" />,
              title: 'Yasaka Jinja Nuit',
              desc: 'Le sanctuaire aux centaines de lanternes allumées. Repas Izakaya.',
              mapUrl: '',
              isOutdoor: true,
            },
          ],
        },
        {
          date: 'Mer 18 Nov',
          title: "Le Pic de l'Automne (Momiji)",
          simplissime:
            "Le temple Eikando éclairé de nuit est l'image exacte que tu as en tête quand tu penses à l'automne japonais.",
          steps: [
            {
              time: '09h30',
              icon: <Leaf size={20} className="text-emerald-500" />,
              title: 'Ginkaku-ji & Philosophes',
              desc: "Le Pavillon d'Argent. Puis 2km de marche le long du canal bordé d'érables rouges.",
              mapUrl: '',
              isOutdoor: true,
            },
            {
              time: '13h00',
              icon: <Castle size={20} className="text-slate-400" />,
              title: 'Nanzen-ji',
              desc: "Grimpe en haut de l'immense porte Sanmon en bois. Photographie le vieil aqueduc romain.",
              mapUrl: '',
              isOutdoor: true,
            },
            {
              time: '17h30',
              icon: <Sun size={20} className="text-amber-500" />,
              title: 'Illuminations Eikando',
              desc: 'Le sommet visuel. Les projecteurs éclairent les érables rouges de nuit.',
              mapUrl: '',
              isOutdoor: true,
            },
          ],
        },
      ],
    },
    osaka: {
      chapter: "Chapitre 3 : La Folie d'Osaka & Kansai",
      desc: 'La ville qui ne dort pas. Ta base idéale (Toyoko Inn) pour rayonner avec ton Pass Régional. USJ est optimisé pour le mardi !',
      days: [
        {
          date: 'Jeu 19 Nov',
          title: 'Drop & Néons (Dotonbori)',
          simplissime:
            "À Osaka, les gens parlent fort et mangent énormément. C'est la ville parfaite pour toi.",
          steps: [
            {
              time: '10h00',
              icon: <Train size={20} className="text-blue-400" />,
              title: 'Train vers Osaka',
              desc: 'Ligne locale (30 min). Check-in Toyoko Inn Honmachi et retrouvailles avec tes valises !',
              mapUrl: '',
              isOutdoor: false,
            },
            {
              time: '14h00',
              icon: <ShoppingBag size={20} className="text-purple-400" />,
              title: 'Umeda & Amerikamura',
              desc: 'Centres commerciaux géants, puis le quartier jeune streetwear.',
              mapUrl: '',
              isOutdoor: true,
            },
            {
              time: '18h30',
              icon: <Camera size={20} className="text-red-400" />,
              title: 'Le Choc Dotonbori',
              desc: 'Néons géants, crabe mécanique, Glico Man.',
              mapUrl: 'https://maps.google.com/?q=Dotonbori',
              isOutdoor: true,
            },
            {
              time: '20h00',
              icon: <Utensils size={20} className="text-orange-400" />,
              title: 'Takoyaki',
              desc: 'Boulettes de poulpe brûlantes mangées debout dans la rue.',
              mapUrl: '',
              isOutdoor: true,
            },
          ],
        },
        {
          date: 'Ven 20 Nov',
          title: 'Otaku Kansai & Hauteurs',
          simplissime:
            "On garde USJ pour le mardi (moins de foule). Aujourd'hui on profite des quartiers geeks d'Osaka.",
          steps: [
            {
              time: '10h00',
              icon: <Gamepad2 size={20} className="text-pink-400" />,
              title: 'Den Den Town',
              desc: "L'équivalent d'Akihabara à Osaka. Moins cher pour chasser les figurines One Piece.",
              mapUrl: '',
              isOutdoor: false,
            },
            {
              time: '15h00',
              icon: <MapPin size={20} className="text-red-500" />,
              title: 'Namba Yasaka',
              desc: "Sanctuaire très photogénique où l'entrée est une énorme tête de lion.",
              mapUrl: '',
              isOutdoor: true,
            },
            {
              time: '17h00',
              icon: <Sun size={20} className="text-blue-400" />,
              title: 'Umeda Sky Building',
              desc: 'Escalators de verre suspendus dans le vide au coucher du soleil.',
              mapUrl: '',
              isOutdoor: false,
            },
            {
              time: '19h30',
              icon: <Flame size={20} className="text-orange-500" />,
              title: 'Banquet du Vendredi',
              desc: 'Dîner Tabehoudai géant pour clore la journée.',
              mapUrl: '',
              isOutdoor: false,
            },
          ],
        },
        {
          date: 'Sam 21 Nov',
          title: 'Sport, Arcade & Bains',
          simplissime:
            "C'est ta journée hybride : découverte de la fun-culture locale et dépense physique.",
          steps: [
            {
              time: '10h00',
              icon: <Castle size={20} className="text-slate-400" />,
              title: "Château d'Osaka",
              desc: 'Extérieurs et parcs massifs.',
              mapUrl: 'https://maps.google.com/?q=Osaka+Castle',
              isOutdoor: true,
            },
            {
              time: '12h30',
              icon: <Utensils size={20} className="text-amber-500" />,
              title: 'Shinsekai',
              desc: 'Le vieux quartier rétro. Dégustation de Kushikatsu (brochettes frites).',
              mapUrl: '',
              isOutdoor: true,
            },
            {
              time: '14h30',
              icon: <Dumbbell size={20} className="text-red-400" />,
              title: 'SPO-CHA (Round One)',
              desc: 'Immeuble de sport (3h illimitées) : Volley, cages de Baseball, basket, arcades.',
              mapUrl:
                'https://maps.google.com/?q=Round+One+Stadium+Sennichimae',
              isOutdoor: false,
            },
            {
              time: '18h00',
              icon: <Waves size={20} className="text-blue-500" />,
              title: 'Spa World',
              desc: 'Immenses bains chauds thématiques pour détendre les muscles.',
              mapUrl: '',
              isOutdoor: false,
            },
          ],
        },
        {
          date: 'Dim 22 Nov',
          title: "L'Épopée de Nara",
          simplissime:
            'En partant très tôt et en ajoutant le Mont Wakakusa, Nara devient une vraie randonnée urbaine massive.',
          steps: [
            {
              time: '07h30',
              icon: <Train size={20} className="text-orange-400" />,
              title: 'Départ Tôt (Kintetsu)',
              desc: 'On bat la foule ! Train direct vers Nara (40 min).',
              mapUrl: '',
              isOutdoor: false,
            },
            {
              time: '08h30',
              icon: <Leaf size={20} className="text-green-500" />,
              title: 'Kofuku-ji & Parc',
              desc: "Le grand parc. Les daims sauvages viendront s'incliner devant toi.",
              mapUrl: '',
              isOutdoor: true,
            },
            {
              time: '11h00',
              icon: <Castle size={20} className="text-slate-500" />,
              title: 'Todai-ji',
              desc: "L'immense temple en bois abritant le Bouddha colossal de 15 mètres.",
              mapUrl: 'https://maps.google.com/?q=Nara+Park',
              isOutdoor: true,
            },
            {
              time: '13h30',
              icon: <Utensils size={20} className="text-red-400" />,
              title: 'Mochi Artisans',
              desc: 'Spectacle des artisans qui frappent la pâte de Mochi (Nakatanidou).',
              mapUrl: '',
              isOutdoor: true,
            },
            {
              time: '15h00',
              icon: <Mountain size={20} className="text-emerald-600" />,
              title: 'Kasuga Taisha & Wakakusa',
              desc: 'Sanctuaire aux lanternes dans la forêt, puis ascension douce du Mont Wakakusa.',
              mapUrl: '',
              isOutdoor: true,
            },
          ],
        },
        {
          date: 'Lun 23 Nov',
          title: 'Day-Trip : Himeji & Kobe',
          simplissime:
            "Cette seule journée de Shinkansen gratuits rentabilise l'achat de ton Pass régional.",
          steps: [
            {
              time: '08h30',
              icon: <Ticket size={20} className="text-emerald-400" />,
              title: 'Pass & Himeji',
              desc: 'Activation du Pass JR. Shinkansen gratuit vers le "Héron Blanc", le plus beau château du Japon.',
              mapUrl: '',
              isOutdoor: true,
            },
            {
              time: '14h30',
              icon: <Utensils size={20} className="text-red-500" />,
              title: 'Bœuf de Kobe',
              desc: 'Teppanyaki gastronomique : le chef cuit la viande persillée devant toi.',
              mapUrl: '',
              isOutdoor: false,
            },
            {
              time: '18h00',
              icon: <Mountain size={20} className="text-indigo-400" />,
              title: 'Mont Rokko',
              desc: 'Téléphérique au crépuscule. La vue panoramique sur la baie illuminée.',
              mapUrl: '',
              isOutdoor: true,
            },
          ],
        },
        {
          date: 'Mar 24 Nov',
          title: 'Universal Studios Japan (USJ)',
          simplissime:
            "Faire USJ un mardi est le meilleur Hack pour diviser par deux le temps d'attente aux attractions !",
          steps: [
            {
              time: '07h30',
              icon: <Ticket size={20} className="text-emerald-500" />,
              title: 'Accès au Parc',
              desc: 'Arrivée en avance. Sprint vers les zones avec ton Express Pass 7.',
              mapUrl: '',
              isOutdoor: true,
            },
            {
              time: '09h00',
              icon: <Gamepad2 size={20} className="text-red-500" />,
              title: 'Super Nintendo World',
              desc: 'Mario Kart en Réalité Augmentée et la zone Donkey Kong Country.',
              mapUrl: 'https://maps.google.com/?q=Universal+Studios+Japan',
              isOutdoor: true,
            },
            {
              time: '15h00',
              icon: <Zap size={20} className="text-purple-400" />,
              title: 'Sensation Fortes',
              desc: 'Montagne russe "The Flying Dinosaur" (suspendu face au sol) et Harry Potter.',
              mapUrl: '',
              isOutdoor: true,
            },
            {
              time: '22h30',
              icon: <ShoppingBag size={20} className="text-slate-400" />,
              title: 'Setup Valises',
              desc: 'Envoi des gros bagages 23kg à Tokyo (Takkyubin). Préparation sac à dos pour Hiroshima.',
              mapUrl: '',
              isOutdoor: false,
            },
          ],
        },
      ],
    },
    hiroshima: {
      chapter: 'Chapitre 4 : Histoire & Océan',
      desc: "Une parenthèse émotionnelle et mystique. L'histoire lourde de la guerre fait place à l'une des vues les plus sacrées du Japon sur l'île de Miyajima.",
      days: [
        {
          date: 'Mer 25 Nov',
          title: 'Histoire & Samouraïs',
          simplissime:
            'La ville a été entièrement reconstruite. Elle possède un château magnifique et des jardins zen sublimes.',
          steps: [
            {
              time: '08h30',
              icon: <Train size={20} className="text-blue-400" />,
              title: 'Shinkansen Direct',
              desc: 'Osaka ➔ Hiroshima (1h30). Trajet 100% couvert. Drop des sacs légers au Comfort Hotel.',
              mapUrl: '',
              isOutdoor: false,
            },
            {
              time: '11h30',
              icon: <Castle size={20} className="text-purple-400" />,
              title: "Château d'Hiroshima",
              desc: 'Visite du magnifique Château de la Carpe et de ses douves.',
              mapUrl: '',
              isOutdoor: true,
            },
            {
              time: '13h30',
              icon: <MapPin size={20} className="text-slate-400" />,
              title: 'Dôme & Musée Paix',
              desc: 'Le bâtiment en ruine (Genbaku), puis le musée de la paix (émouvant mais indispensable).',
              mapUrl:
                'https://maps.google.com/?q=Hiroshima+Peace+Memorial+Museum',
              isOutdoor: false,
            },
            {
              time: '17h00',
              icon: <Leaf size={20} className="text-green-500" />,
              title: 'Jardin Shukkei-en',
              desc: 'Jardin paysager japonais traditionnel pour retrouver de la sérénité après le musée.',
              mapUrl: '',
              isOutdoor: true,
            },
            {
              time: '19h00',
              icon: <Utensils size={20} className="text-amber-500" />,
              title: 'Okonomimura',
              desc: "Un immeuble dédié à l'Okonomiyaki d'Hiroshima (nouilles, porc, chou). Hyper lourd, hyper bon !",
              mapUrl: '',
              isOutdoor: false,
            },
          ],
        },
        {
          date: 'Jeu 26 Nov',
          title: "Miyajima, l'Île des Dieux",
          simplissime:
            "Dormir sur l'île est un luxe rare qui permet de voir le Torii illuminé la nuit, sans l'ombre d'un touriste.",
          steps: [
            {
              time: '09h00',
              icon: <Waves size={20} className="text-cyan-400" />,
              title: 'Ferry JR',
              desc: "Inclus dans le Pass. Traversée courte vers l'île.",
              mapUrl: '',
              isOutdoor: false,
            },
            {
              time: '10h00',
              icon: <Camera size={20} className="text-red-400" />,
              title: 'Le Torii Flottant',
              desc: "La porte rouge géante dans l'eau. Cerfs sauvages sur la plage.",
              mapUrl:
                'https://maps.google.com/?q=Itsukushima+Floating+Torii+Gate',
              isOutdoor: true,
            },
            {
              time: '14h00',
              icon: <Mountain size={20} className="text-green-500" />,
              title: 'Mont Misen',
              desc: 'Rando athlétique dans la forêt primaire (ou téléphérique). Vue panoramique.',
              mapUrl: '',
              isOutdoor: true,
            },
            {
              time: '17h30',
              icon: <Moon size={20} className="text-indigo-400" />,
              title: 'Nuit en Ryokan',
              desc: 'Les touristes partent. Seuls au monde en Yukata au Ryokan Sakuraya.',
              mapUrl: '',
              isOutdoor: false,
            },
          ],
        },
      ],
    },
    tokyo2: {
      chapter: 'Chapitre 5 : La Boucle est Bouclée',
      desc: "Retour à Tokyo par l'Est. Kamakura intensifiée, et Ueno est parfait pour finaliser les achats Geek.",
      days: [
        {
          date: 'Ven 27 Nov',
          title: 'La Remontée & Odaiba',
          simplissime:
            "C'est la plus grosse journée de train. La soirée à Odaiba est juste du fun pur pour relâcher la pression.",
          steps: [
            {
              time: '08h30',
              icon: <Train size={20} className="text-blue-500" />,
              title: 'Shinkansen Retour',
              desc: 'Hiroshima ➔ Tokyo Ueno (4h). Repos & Ekiben.',
              mapUrl: '',
              isOutdoor: false,
            },
            {
              time: '13h30',
              icon: <Hotel size={20} className="text-emerald-400" />,
              title: 'Check-in Grids Ueno',
              desc: "Tu récupères tes grosses valises envoyées d'Osaka à la réception.",
              mapUrl: '',
              isOutdoor: false,
            },
            {
              time: '16h30',
              icon: <Camera size={20} className="text-blue-400" />,
              title: 'Odaiba & Gundam',
              desc: "Métro aérien Yurikamome. L'immense statue de robot qui s'anime.",
              mapUrl: 'https://maps.google.com/?q=Unicorn+Gundam+Statue',
              isOutdoor: true,
            },
            {
              time: '19h30',
              icon: <Gamepad2 size={20} className="text-purple-400" />,
              title: 'Joypolis',
              desc: "Parc d'attraction SEGA en intérieur avec VR et grand huit.",
              mapUrl: '',
              isOutdoor: false,
            },
          ],
        },
        {
          date: 'Sam 28 Nov',
          title: "L'Aventure : Kamakura",
          simplissime:
            "Coupler Kamakura et l'île d'Enoshima fait de cette journée une véritable aventure côtière très complète.",
          steps: [
            {
              time: '08h00',
              icon: <Train size={20} className="text-blue-400" />,
              title: 'Train Océan',
              desc: "Ligne directe vers la côte. On respire l'air marin.",
              mapUrl: '',
              isOutdoor: false,
            },
            {
              time: '09h30',
              icon: <Castle size={20} className="text-red-500" />,
              title: 'Tsurugaoka Hachimangu',
              desc: 'Le plus grand et majestueux sanctuaire shinto de Kamakura.',
              mapUrl: '',
              isOutdoor: true,
            },
            {
              time: '11h30',
              icon: <Leaf size={20} className="text-green-400" />,
              title: 'Hokoku-ji',
              desc: "Thé matcha assis au milieu d'une petite forêt de bambous.",
              mapUrl: '',
              isOutdoor: true,
            },
            {
              time: '14h00',
              icon: <MapPin size={20} className="text-slate-400" />,
              title: 'Daibutsu & Enoden',
              desc: 'Grand Bouddha de bronze. Puis train vintage (Enoden) le long de la plage.',
              mapUrl: 'https://maps.google.com/?q=Kotoku-in',
              isOutdoor: true,
            },
            {
              time: '15h30',
              icon: <Waves size={20} className="text-cyan-400" />,
              title: "Île d'Enoshima",
              desc: "Traversée du pont vers l'île. Montée à la Sea Candle pour une vue sur le Pacifique.",
              mapUrl: '',
              isOutdoor: true,
            },
            {
              time: '19h30',
              icon: <Utensils size={20} className="text-amber-500" />,
              title: 'Ameyoko Street',
              desc: "Retour à Ueno. Dîner sous les rails du métro dans l'ambiance chaotique.",
              mapUrl: '',
              isOutdoor: false,
            },
          ],
        },
        {
          date: 'Dim 29 Nov',
          title: 'Derniers Yens & Akihabara',
          simplissime:
            "C'est le dernier jour, on ne compte plus. Fais-toi plaisir sur les achats souvenirs et la bonne viande.",
          steps: [
            {
              time: '10h00',
              icon: <Leaf size={20} className="text-green-500" />,
              title: 'Ueno & Yanaka',
              desc: 'Balade matinale dans le "vieux Tokyo", Yanaka Ginza (ambiance chill et chats).',
              mapUrl: '',
              isOutdoor: true,
            },
            {
              time: '14h00',
              icon: <ShoppingBag size={20} className="text-pink-400" />,
              title: "L'Assaut Final Akihabara",
              desc: "Achats des goodies ratés, mangas, cartes. (N'oublie pas la détaxe !)",
              mapUrl: 'https://maps.google.com/?q=Akihabara',
              isOutdoor: true,
            },
            {
              time: '17h00',
              icon: <Hotel size={20} className="text-slate-400" />,
              title: 'Mission Valises',
              desc: 'Jouer à Tetris pour tout faire rentrer dans les 2x23kg.',
              mapUrl: '',
              isOutdoor: false,
            },
            {
              time: '19h30',
              icon: <Flame size={20} className="text-red-500" />,
              title: 'Wagyu Yakiniku',
              desc: "Le repas de l'Empereur. Viande d'exception pour clore le voyage.",
              mapUrl: '',
              isOutdoor: false,
            },
          ],
        },
        {
          date: 'Lun 30 Nov',
          title: 'Extraction & Game Over',
          simplissime:
            'Grâce au Hack du Mois Blanc, ton budget a survécu et tu rentres avec ton épargne intacte.',
          steps: [
            {
              time: '05h30',
              icon: <Clock size={20} className="text-slate-400" />,
              title: 'Check-out',
              desc: "C'est l'heure de dire adieu.",
              mapUrl: '',
              isOutdoor: false,
            },
            {
              time: '06h15',
              icon: <Train size={20} className="text-blue-500" />,
              title: 'Keisei Skyliner',
              desc: "Train express d'Ueno à l'aéroport d'Haneda en ~45 min.",
              mapUrl: '',
              isOutdoor: false,
            },
            {
              time: '08h30',
              icon: <PlaneTakeoff size={20} className="text-indigo-400" />,
              title: 'Décollage Haneda',
              desc: 'Vol Air China CA876. Game Over, You Win.',
              mapUrl: '',
              isOutdoor: false,
            },
          ],
        },
      ],
    },
  };

  const fetchWithRetry = async (url, options, retries = 5, delay = 1000) => {
    for (let i = 0; i < retries; i++) {
      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          const errorMessage =
            errorData?.error?.message || (await response.text());
          throw new Error(`Erreur HTTP: ${response.status} - ${errorMessage}`);
        }
        return await response.json();
      } catch (error) {
        if (i === retries - 1) throw error;
        await new Promise((res) => setTimeout(res, delay));
        delay *= 2;
      }
    }
  };

  const askGemini = async (customQuery = null) => {
    const queryToUse = customQuery || aiQuery;
    if (!queryToUse.trim()) return;

    setIsAiLoading(true);
    setAiError(null);
    setAiResponse('');

    const apiKey = '';

    const currentDays = itineraryData[activeRegion]?.days || [];
    const sanitizedContext = currentDays.map((day) => ({
      date: day.date,
      title: day.title,
      simplissime: day.simplissime,
      steps: day.steps.map((step) => ({
        time: step.time,
        title: step.title,
        desc: step.desc,
      })),
    }));

    const regionContext = JSON.stringify(sanitizedContext);

    const systemInstruction = `Tu es un guide local au Japon, expert, amical et très direct. 
Tu t'adresses à Mathias, un grand sportif (Volley) qui a très faim (Niveau 0 en cuisine, il adore la viande et les formules à volonté 'Tabehoudai').
Utilise ce programme pour contextualiser tes réponses : ${regionContext}. 
Ne mentionne pas le JSON. Réponds en français de manière hyper concise et pertinente. Formate le texte avec des astérisques pour le gras.`;

    const payload = {
      contents: [{ parts: [{ text: queryToUse }] }],
      systemInstruction: { parts: [{ text: systemInstruction }] },
    };

    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
      const data = await fetchWithRetry(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      setAiResponse(text || "Je n'ai pas pu générer de réponse.");
    } catch (err) {
      setAiError(
        "L'IA est actuellement indisponible ou non configurée dans cet environnement."
      );
    } finally {
      setIsAiLoading(false);
      if (!customQuery) setAiQuery('');
    }
  };

  const formatText = (text) =>
    text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>');

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-200 pb-24 selection:bg-blue-500/30">
      {/* HEADER MASTER */}
      <header className="bg-slate-900 border-b border-slate-800 p-6 sticky top-0 z-50 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
            <div>
              <h1 className="text-2xl font-black italic tracking-tighter flex items-center gap-2 text-white">
                <Globe className="text-blue-500" /> CARNET DE VOYAGE DIGITAL
              </h1>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1 flex items-center gap-1">
                <Activity size={12} className="text-emerald-400" /> Release :
                Japon 2026
              </p>
            </div>
            <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-xl">
              <CheckCircle2 size={16} className="text-emerald-500" />
              <div>
                <p className="text-[10px] font-black text-emerald-500 uppercase">
                  Vol Garanti
                </p>
                <p className="text-xs font-bold text-emerald-100">
                  3/4 Payé ✅
                </p>
              </div>
            </div>
          </div>

          {/* TABS NAVIGATION */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 pt-2">
            {[
              { id: 'overview', icon: <Map size={16} />, label: 'Dashboard' },
              {
                id: 'finance',
                icon: <Wallet size={16} />,
                label: 'Finance & Budget',
              },
              {
                id: 'roadbook',
                icon: <Calendar size={16} />,
                label: 'Roadbook V_MAX',
              },
              {
                id: 'transport',
                icon: <TrainFront size={16} />,
                label: 'Trajets & Transports',
              },
              {
                id: 'conversion',
                icon: <Calculator size={16} />,
                label: 'Convertisseur',
              },
              {
                id: 'checklist',
                icon: <CheckSquare size={16} />,
                label: 'Logistique & Départ',
              },
              {
                id: 'lexique',
                icon: <Languages size={16} />,
                label: 'Lexique Survie',
              },
              {
                id: 'runbook',
                icon: <ListChecks size={16} />,
                label: 'Alertes & Runbook',
              },
              { id: 'ai', icon: <Sparkles size={16} />, label: 'Coach IA' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40 border border-blue-500'
                    : 'bg-slate-900 border border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-4 md:p-6 mt-4">
        {/* --- TAB 1: OVERVIEW --- */}
        {activeTab === 'overview' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 bg-gradient-to-br from-slate-900 to-slate-950 p-6 rounded-[2rem] border border-slate-800 shadow-xl relative overflow-hidden">
                <div className="relative z-10">
                  <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-1 flex items-center gap-2">
                    <CheckCircle2 size={12} /> Surplus Garanti (Fin 2026)
                  </p>
                  <p className="text-4xl font-black italic text-white">
                    + {surplusFinal} €
                  </p>
                  <p className="text-xs text-slate-400 mt-2 font-medium max-w-lg">
                    Calcul strict : 0 freelance futur, frais de Summer Tour
                    inclus. Solde pur et sécurisé au retour du voyage.
                  </p>
                </div>
                <Landmark className="absolute -right-4 -bottom-4 w-32 h-32 text-emerald-500 opacity-5" />
              </div>
              <div className="bg-slate-900 p-6 rounded-[2rem] border border-slate-800 flex flex-col justify-center">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">
                  Hardware Status
                </p>
                <div className="flex items-center gap-3 bg-blue-950/30 p-3 rounded-xl border border-blue-900/50">
                  <Plane size={18} className="text-blue-500" />
                  <div>
                    <p className="text-xs font-bold text-slate-200">
                      Vol Air China
                    </p>
                    <p className="text-[10px] text-blue-400">
                      3/4 Payé (Avance Majeure)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 p-6 rounded-[2rem] border border-slate-800 space-y-4">
              <h3 className="font-black italic text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                <Activity className="text-emerald-500" /> Profiling Voyageur
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-start gap-4">
                  <Coffee className="text-orange-500 w-8 h-8 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-slate-200 uppercase mb-1">
                      Niveau 0 Cuisine
                    </p>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      100% repas extérieurs (budget de 35€/jour garanti).
                      Petits-déj inclus à l'hôtel pour optimiser l'apport
                      calorique gratuit.
                    </p>
                  </div>
                </div>
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-start gap-4">
                  <Dumbbell className="text-purple-500 w-8 h-8 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-slate-200 uppercase mb-1">
                      Sportif / Muscu
                    </p>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Apport protéiné massif (Tabehoudai, Yakiniku). Grosse
                      marche quotidienne (20k pas). Pass One Piece Gym inclus.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- TAB 2: FINANCE (Double Poche) --- */}
        {activeTab === 'finance' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 p-6 rounded-[2rem] border border-slate-800 shadow-xl text-center relative overflow-hidden">
              <div className="relative z-10 flex flex-col justify-center items-center">
                <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-1">
                  Marge de Sécurité Absolue (Au Retour)
                </p>
                <p className="text-5xl font-black italic text-white">
                  + {surplusFinal} €
                </p>
                <p className="text-xs text-slate-400 mt-3 font-medium max-w-lg">
                  Calculé <strong>sans aucun revenu freelance futur</strong> et
                  en déduisant intégralement le coût des vacances d'été.
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
                    <p className="text-[10px] text-slate-400 uppercase font-bold">
                      L'infrastructure du voyage
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-red-400 uppercase font-bold">
                      À Payer
                    </p>
                    <p className="text-lg font-black text-red-400 italic">
                      - {totalEpargneUsed} €
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {budgetData
                    .filter((i) => i.type === 'epargne')
                    .map((item, i) => (
                      <div
                        key={i}
                        className="flex justify-between items-center bg-slate-950 p-3 rounded-xl border border-slate-800"
                      >
                        <div>
                          <p className="text-xs font-bold text-slate-300 flex items-center gap-2">
                            <span className={`text-${item.color}-500`}>
                              {item.icon}
                            </span>{' '}
                            {item.label}
                          </p>
                          <p className="text-[10px] text-slate-500 mt-1">
                            {item.desc}
                          </p>
                        </div>
                        <p className="text-sm font-black text-white">
                          {item.cost} €
                        </p>
                      </div>
                    ))}
                </div>
              </div>

              {/* POCHE MOIS BLANC */}
              <div className="bg-indigo-950/30 p-6 rounded-[2rem] border border-indigo-900/50">
                <h3 className="font-black italic text-white mb-4 flex items-center gap-2">
                  <Zap className="text-indigo-400" /> Poche 2 : Le Mois Blanc
                </h3>
                <p className="text-[10px] text-indigo-300 uppercase mb-4 font-bold">
                  Le salaire de Nov paie la vie sur place
                </p>
                <div className="space-y-3">
                  <div className="flex justify-between items-center bg-indigo-900/30 p-3 rounded-xl">
                    <p className="text-xs font-bold text-indigo-100 flex items-center gap-2">
                      <ArrowDownCircle size={14} className="text-emerald-400" />{' '}
                      Salaire Nov + CAF
                    </p>
                    <p className="text-sm font-black text-emerald-400">
                      + 1 786 €
                    </p>
                  </div>
                  <div className="flex justify-between items-center bg-indigo-900/30 p-3 rounded-xl">
                    <p className="text-xs font-bold text-indigo-100 flex items-center gap-2">
                      <ArrowDownCircle
                        size={14}
                        className="text-red-400 rotate-180"
                      />{' '}
                      Loyer & Tél France
                    </p>
                    <p className="text-sm font-black text-red-400">- 540 €</p>
                  </div>

                  <div className="pt-2 border-t border-indigo-500/30 mt-3">
                    {budgetData
                      .filter((i) => i.type === 'salaire')
                      .map((item, i) => (
                        <div
                          key={i}
                          className="flex justify-between items-center py-2"
                        >
                          <div>
                            <span className="text-[11px] font-bold text-indigo-200 flex items-center gap-2">
                              <span className={`text-${item.color}-400`}>
                                {item.icon}
                              </span>{' '}
                              {item.label}
                            </span>
                            <p className="text-[9px] text-indigo-300/70 mt-1">
                              {item.desc}
                            </p>
                          </div>
                          <span className="text-sm font-black text-red-300">
                            - {item.cost} €
                          </span>
                        </div>
                      ))}
                  </div>
                  <div className="flex justify-between items-center text-sm mt-2 pt-3 border-t border-indigo-400">
                    <span className="font-black text-indigo-100">
                      Solde fin de mois
                    </span>
                    <span className="font-black text-emerald-400">
                      0 € (Zéro dette)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* TIMELINE DES FLUX */}
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
                        <h4 className="font-bold text-white text-sm">
                          {item.month}
                        </h4>
                        <span className="text-lg font-black text-emerald-400 italic">
                          Solde : {item.balance} €
                        </span>
                      </div>

                      <div className="flex justify-between items-center bg-slate-900/50 p-2 rounded-lg mb-2">
                        <span className="text-xs text-emerald-400">
                          {item.textIn}
                        </span>
                        <span className="text-xs font-bold text-red-400">
                          {item.textOut}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* --- TAB 3: ROADBOOK VISUEL --- */}
        {activeTab === 'roadbook' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 shadow-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CloudRain className="text-blue-400 w-6 h-6" />
                <div>
                  <h3 className="font-bold text-white text-sm">
                    Bouton Panique Météo
                  </h3>
                  <p className="text-[10px] text-slate-400">
                    Masque les activités en extérieur s'il pleut.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsRaining(!isRaining)}
                className={`px-4 py-2 rounded-xl flex items-center gap-2 font-bold text-xs transition-colors shadow-lg ${
                  isRaining
                    ? 'bg-red-600 hover:bg-red-500 text-white'
                    : 'bg-blue-600 hover:bg-blue-500 text-white'
                }`}
              >
                <Umbrella size={16} />{' '}
                {isRaining ? 'Désactiver Plan B' : 'Activer Plan B (Pluie)'}
              </button>
            </div>

            {isRaining && (
              <div className="bg-blue-900/40 border border-blue-500/50 p-5 rounded-[2rem] flex items-start gap-4 animate-in zoom-in-95">
                <AlertCircle className="text-blue-400 w-6 h-6 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-black text-blue-400 uppercase tracking-widest mb-1">
                    Alerte Météo -{' '}
                    {regions.find((r) => r.id === activeRegion)?.name}
                  </p>
                  <p className="text-sm text-blue-200/80 leading-relaxed italic">
                    {planBData[activeRegion]}
                  </p>
                </div>
              </div>
            )}

            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 pt-2">
              {regions.map((region) => (
                <button
                  key={region.id}
                  onClick={() => setActiveRegion(region.id)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-bold transition-all whitespace-nowrap border ${
                    activeRegion === region.id
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40 border-blue-500'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  }`}
                >
                  {region.icon} {region.name}
                </button>
              ))}
            </div>

            <div className="bg-blue-950/20 border border-blue-900/50 p-6 rounded-[2rem] flex items-start gap-4">
              <BookOpen className="text-blue-400 w-8 h-8 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-[12px] font-black text-blue-400 uppercase tracking-widest mb-2">
                  {itineraryData[activeRegion].chapter}
                </p>
                <p className="text-sm text-blue-100/80 leading-relaxed italic border-l-2 border-blue-500/50 pl-4">
                  "{itineraryData[activeRegion].desc}"
                </p>
              </div>
            </div>

            <div className="space-y-12">
              {itineraryData[activeRegion].days.map((day, idx) => {
                const visibleSteps = day.steps.filter(
                  (step) => !(isRaining && step.isOutdoor)
                );
                if (visibleSteps.length === 0) return null;

                return (
                  <div
                    key={idx}
                    className="bg-slate-900 rounded-[2.5rem] border border-slate-800 shadow-xl overflow-hidden relative group hover:border-slate-700 transition-colors"
                  >
                    <div className="bg-slate-800/80 p-5 border-b border-slate-700/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <span className="bg-blue-600 text-white text-[11px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest shadow-md">
                          {day.date}
                        </span>
                        <h3 className="font-black text-white italic text-xl">
                          {day.title}
                        </h3>
                      </div>
                    </div>

                    <div className="p-6 md:p-8">
                      <div className="relative pl-8 space-y-8 before:absolute before:inset-0 before:left-[15px] before:w-0.5 before:bg-slate-800">
                        {visibleSteps.map((step, sIdx) => (
                          <div key={sIdx} className="relative">
                            <div className="absolute -left-[37px] w-5 h-5 rounded-full border-[5px] border-slate-900 bg-blue-500 mt-1 z-10 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>

                            <div className="flex flex-col md:flex-row gap-4 items-start">
                              <div className="pt-1 shrink-0 w-20">
                                <span className="text-[11px] font-black text-slate-400 bg-slate-950 px-3 py-1.5 rounded-md border border-slate-800 shadow-inner inline-block w-full text-center">
                                  {step.time}
                                </span>
                              </div>

                              <div className="flex-1 p-5 rounded-3xl border border-slate-800/80 bg-slate-950/80 flex flex-col md:flex-row gap-5 items-start transition-colors w-full relative">
                                {step.mapUrl && (
                                  <a
                                    href={step.mapUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="absolute top-4 right-4 bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white p-2 rounded-xl transition-colors border border-blue-500/30 flex items-center gap-1 text-[10px] font-bold"
                                  >
                                    <MapPinned size={14} /> G-Maps
                                  </a>
                                )}

                                <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-xl flex-shrink-0 border border-slate-800 shadow-sm text-blue-400">
                                  {step.icon}
                                </div>
                                <div className="flex-1 pr-12">
                                  <h4 className="text-base font-bold text-slate-100 mb-2 flex items-center gap-2">
                                    {step.title}
                                    {step.isOutdoor && (
                                      <CloudRain
                                        size={12}
                                        className="text-slate-500"
                                        title="Activité en extérieur"
                                      />
                                    )}
                                  </h4>
                                  <p className="text-[13px] text-slate-400 leading-relaxed font-medium">
                                    {step.desc}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {day.simplissime && (
                        <div className="mt-8 p-4 rounded-2xl bg-emerald-950/20 border border-emerald-900/30 flex items-start gap-3">
                          <CheckCircle2
                            size={20}
                            className="text-emerald-500 shrink-0 mt-0.5"
                          />
                          <div>
                            <p className="text-[10px] font-black uppercase text-emerald-600 mb-1 tracking-widest">
                              Le Hack Simplissime
                            </p>
                            <p className="text-xs text-slate-400 font-medium italic">
                              {day.simplissime}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* --- TAB 4: TRANSPORTS & DEVISES --- */}
        {activeTab === 'transport' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="bg-slate-900 p-6 rounded-[2rem] border border-slate-800 shadow-xl">
              <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
                <TrainFront className="text-orange-400 w-6 h-6" />
                <div>
                  <h3 className="font-black italic text-white text-lg">
                    Logistique des Transports
                  </h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                    Liaisons inter-villes & aéroports
                  </p>
                </div>
              </div>

              <div className="space-y-4 relative before:absolute before:inset-0 before:ml-[28px] before:-translate-x-px before:w-0.5 before:bg-slate-800">
                {transports.map((route, i) => (
                  <div key={i} className="relative flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full border-4 border-slate-900 bg-slate-800 flex flex-col items-center justify-center text-[10px] font-black text-slate-400 shrink-0 z-10">
                      <Train
                        size={16}
                        className={
                          route.cost.includes('105')
                            ? 'text-emerald-400'
                            : 'text-orange-400'
                        }
                      />
                    </div>
                    <div className="flex-1 bg-slate-950 p-4 rounded-2xl border border-slate-800/80 hover:border-slate-700 transition-colors">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2 gap-2">
                        <h4 className="font-bold text-white text-sm">
                          {route.from} ➔ {route.to}
                        </h4>
                        <span
                          className={`text-xs font-black px-2 py-1 rounded-md w-fit ${
                            route.cost.includes('105')
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : 'bg-slate-800 text-slate-300'
                          }`}
                        >
                          {route.cost}
                        </span>
                      </div>
                      <p className="text-[11px] font-bold text-orange-400 mb-1">
                        {route.type}
                      </p>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        {route.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* --- TAB 7: CONVERTISSEUR --- */}
        {activeTab === 'conversion' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="bg-slate-900 p-6 md:p-8 rounded-[2rem] border border-slate-800 shadow-xl max-w-lg mx-auto">
              <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
                <Calculator className="text-blue-400 w-6 h-6" />
                <div>
                  <h3 className="font-black italic text-white text-lg">
                    Convertisseur Rapide
                  </h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                    Taux estimé : 1€ = {EXCHANGE_RATE}¥
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center gap-4">
                <div className="w-full bg-slate-950 p-4 rounded-2xl border border-slate-800 flex justify-between items-center">
                  <span className="text-xl font-black text-slate-400">
                    {isJpyToEur ? '¥ (JPY)' : '€ (EUR)'}
                  </span>
                  <input
                    type="number"
                    value={convAmount}
                    onChange={(e) => setConvAmount(e.target.value)}
                    className="bg-transparent text-right text-3xl font-black text-white outline-none w-1/2"
                  />
                </div>

                <button
                  onClick={() => setIsJpyToEur(!isJpyToEur)}
                  className="bg-slate-800 p-3 rounded-full hover:bg-blue-600 transition-colors border border-slate-700 hover:border-blue-500 text-white shadow-lg"
                >
                  <ArrowRightLeft size={20} />
                </button>

                <div className="w-full bg-blue-900/20 p-4 rounded-2xl border border-blue-900/50 flex justify-between items-center">
                  <span className="text-xl font-black text-blue-400">
                    {isJpyToEur ? '€ (EUR)' : '¥ (JPY)'}
                  </span>
                  <span className="text-3xl font-black text-white">
                    {isJpyToEur
                      ? (parseFloat(convAmount || 0) / EXCHANGE_RATE).toFixed(2)
                      : (parseFloat(convAmount || 0) * EXCHANGE_RATE).toFixed(
                          0
                        )}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 mt-6">
                {[1000, 5000, 10000].map((val) => (
                  <button
                    key={val}
                    onClick={() => {
                      setConvAmount(val.toString());
                      setIsJpyToEur(true);
                    }}
                    className="bg-slate-800 hover:bg-slate-700 py-2 rounded-xl text-xs font-bold text-slate-300 transition-colors border border-slate-700"
                  >
                    {val} ¥
                  </button>
                ))}
              </div>
              <div className="mt-4 text-center">
                <p className="text-[10px] text-slate-400">
                  Transactions sécurisées sans frais via{' '}
                  <strong>Revolut</strong>.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* --- TAB 8: CHECKLIST & LEXIQUE --- */}
        {activeTab === 'checklist' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="bg-slate-900 p-6 rounded-[2rem] border border-slate-800 shadow-xl relative overflow-hidden mb-6">
              <CheckSquare className="absolute -right-4 -top-4 w-32 h-32 text-emerald-800 opacity-20" />
              <div className="relative z-10">
                <h2 className="text-xl font-black italic text-white mb-2">
                  Checklist Matérielle
                </h2>
                <p className="text-xs text-slate-400 max-w-lg leading-relaxed">
                  L'équipement indispensable pour éviter tout blocage logistique
                  au Japon.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {checklistData.map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleCheck(item.id)}
                  className={`p-5 rounded-2xl border flex gap-4 items-center cursor-pointer transition-all shadow-sm ${
                    checkedItems[item.id]
                      ? 'bg-emerald-950/20 border-emerald-900/50'
                      : 'bg-slate-900 border-slate-700 hover:border-blue-500/50'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 transition-colors ${
                      checkedItems[item.id]
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-800 border border-slate-600'
                    }`}
                  >
                    {checkedItems[item.id] && <Check size={16} />}
                  </div>
                  <div>
                    <p
                      className={`text-sm font-bold ${
                        checkedItems[item.id]
                          ? 'text-emerald-400 line-through opacity-70'
                          : 'text-slate-200'
                      }`}
                    >
                      {item.label}
                    </p>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">
                      {item.category}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- TAB 9: LEXIQUE DE SURVIE --- */}
        {activeTab === 'lexique' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="bg-slate-900 p-6 rounded-[2rem] border border-slate-800 shadow-xl relative overflow-hidden mb-6">
              <Languages className="absolute -right-4 -top-4 w-32 h-32 text-blue-800 opacity-20" />
              <div className="relative z-10">
                <h2 className="text-xl font-black italic text-white mb-2">
                  Lexique de Survie Hors-Ligne
                </h2>
                <p className="text-xs text-slate-400 max-w-lg leading-relaxed">
                  Si tu perds le réseau dans les sous-sols d'Osaka ou les
                  restaurants blindés, ces phrases magiques te sauveront la vie.
                  Lis la colonne "Phonétique" tel que c'est écrit.
                </p>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-lg">
              <div className="grid grid-cols-1 divide-y divide-slate-800">
                {lexiqueData.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-5 hover:bg-slate-800/50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-black text-white mb-1 flex items-center gap-2">
                        <MessageSquare size={14} className="text-blue-500" />{' '}
                        {item.fr}
                      </p>
                      <p className="text-lg font-bold text-emerald-400 italic">
                        « {item.romaji} »
                      </p>
                    </div>
                    <div className="md:text-right flex-shrink-0">
                      <span className="text-2xl text-slate-500 font-medium tracking-widest">
                        {item.jp}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-4 bg-blue-900/20 border border-blue-800/50 rounded-xl flex gap-3 items-start">
              <AlertCircle className="text-blue-400 w-5 h-5 flex-shrink-0" />
              <p className="text-[11px] text-blue-200 leading-relaxed">
                <strong>Hack Prononciation :</strong> Le "u" à la fin de "desu"
                ou "masu" est presque muet. Dis "dess" et "mass". Le "e" se
                prononce "é". "Tabehoudai" = "Tabé-ho-daï".
              </p>
            </div>
          </div>
        )}

        {/* --- TAB 5: RUNBOOK --- */}
        {activeTab === 'runbook' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="bg-slate-900 p-6 rounded-[2rem] border border-slate-800 shadow-xl relative overflow-hidden mb-6">
              <Bell className="absolute -right-4 -top-4 w-32 h-32 text-slate-800 opacity-20" />
              <div className="relative z-10">
                <h2 className="text-xl font-black italic text-white mb-2">
                  Les "Cron Jobs" du Voyage
                </h2>
                <p className="text-xs text-slate-400 max-w-lg leading-relaxed">
                  Le Japon demande une rigueur d'ingénieur. Les places partent
                  souvent le jour même de l'ouverture des ventes. Ajoute ces
                  événements à ton Google Agenda pour être notifié.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reminders.map((r) => (
                <div
                  key={r.id}
                  className={`bg-slate-900 p-5 rounded-[2rem] border border-${r.color}-500/30 transition-colors flex flex-col justify-between shadow-lg hover:border-${r.color}-500/50`}
                >
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-black text-white text-base">
                        {r.title}
                      </h3>
                      <span
                        className={`bg-${r.color}-500/20 text-${r.color}-400 text-[9px] font-black px-2 py-1 rounded uppercase text-center`}
                      >
                        {r.targetDate}
                      </span>
                    </div>
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 mb-3">
                      <p className="text-xs font-bold text-slate-200">
                        {r.reminderDate}
                      </p>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed mb-6">
                      {r.desc}
                    </p>
                  </div>

                  <a
                    href={r.url}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20"
                  >
                    <CalendarPlus size={16} /> Ajouter à Google Agenda{' '}
                    <ExternalLink size={14} className="opacity-70" />
                  </a>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-slate-800 mt-8">
              <h3 className="font-black italic text-white text-lg mb-4">
                Statut Matériel
              </h3>
              <div className="space-y-3">
                {runbook.map((step) => (
                  <div
                    key={step.id}
                    className={`p-5 rounded-2xl border flex gap-4 items-start ${
                      step.status === 'done'
                        ? 'bg-emerald-950/20 border-emerald-900/50'
                        : step.status === 'active'
                        ? 'bg-blue-900/20 border-blue-800'
                        : 'bg-slate-900 border-slate-700'
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        step.status === 'done'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : step.status === 'active'
                          ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50'
                          : 'bg-slate-800 text-slate-500'
                      }`}
                    >
                      {step.status === 'done' ? (
                        <CheckCircle2 size={14} />
                      ) : (
                        step.id
                      )}
                    </div>
                    <div>
                      <p
                        className={`text-sm font-bold ${
                          step.status === 'done'
                            ? 'text-emerald-400'
                            : step.status === 'active'
                            ? 'text-blue-400'
                            : 'text-slate-300'
                        }`}
                      >
                        {step.title}
                      </p>
                      <p className="text-[11px] mt-1 text-slate-400 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* --- TAB 6: AI COACH --- */}
        {activeTab === 'ai' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="bg-slate-900 p-6 rounded-[2rem] border border-slate-800">
              <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
                <Sparkles className="text-emerald-400 w-6 h-6" />
                <div>
                  <h3 className="font-black italic text-white text-lg">
                    Assistant IA (Context-Aware)
                  </h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                    Alimenté par Gemini API
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 mb-4 relative z-10">
                  <button
                    onClick={() => {
                      setAiQuery(
                        'Quelles sont les meilleures adresses de viande à volonté (Tabehoudai) près de ces étapes ?'
                      );
                    }}
                    className="bg-slate-950 hover:bg-slate-800 border border-slate-700 text-xs text-slate-300 py-2 px-3 rounded-lg transition-colors flex items-center gap-1"
                  >
                    🥩 Adresses Protéines
                  </button>
                  <button
                    onClick={() => {
                      setAiQuery(
                        'Génère-moi 3 phrases de survie en japonais très simples, avec la prononciation.'
                      );
                    }}
                    className="bg-slate-950 hover:bg-slate-800 border border-slate-700 text-xs text-slate-300 py-2 px-3 rounded-lg transition-colors flex items-center gap-1"
                  >
                    🗣️ Phrases de survie
                  </button>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={aiQuery}
                    onChange={(e) => setAiQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') askGemini();
                    }}
                    placeholder="Pose ta question ici..."
                    className="flex-1 bg-slate-900/80 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-500"
                    disabled={isAiLoading}
                  />
                  <button
                    onClick={() => askGemini()}
                    disabled={isAiLoading || !aiQuery.trim()}
                    className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white p-3 rounded-xl transition-colors shadow-lg shadow-blue-900/30 flex items-center justify-center"
                  >
                    {isAiLoading ? (
                      <Loader2 size={20} className="animate-spin" />
                    ) : (
                      <Send size={20} />
                    )}
                  </button>
                </div>

                {aiError && (
                  <div className="mt-4 p-4 bg-red-950/30 border border-red-900/50 rounded-xl flex items-start gap-3 text-red-400 text-sm">
                    <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
                    <p>{aiError}</p>
                  </div>
                )}

                {aiResponse && !aiError && (
                  <div className="mt-6 p-5 bg-slate-950/50 rounded-2xl border border-blue-900/30 relative overflow-hidden">
                    <MessageSquare
                      className="absolute -top-2 -right-2 text-blue-900/20"
                      size={80}
                    />
                    <div
                      className="text-sm text-slate-200 leading-relaxed relative z-10 space-y-4 whitespace-pre-wrap"
                      dangerouslySetInnerHTML={{
                        __html: aiResponse.replace(
                          /\*\*(.*?)\*\*/g,
                          '<strong class="text-white">$1</strong>'
                        ),
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* FOOTER WIDGET : CONVERTISSEUR FLASH */}
      <div className="fixed bottom-6 right-4 md:right-8 bg-slate-900/90 backdrop-blur-md border border-slate-700 p-4 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] z-50 w-56 transform transition-transform hover:scale-105 hidden md:block">
        <div className="flex justify-between items-center mb-3">
          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 flex items-center gap-1">
            <Calculator size={12} /> Convertisseur
          </span>
          <span className="text-[8px] text-slate-500">
            1€ = {EXCHANGE_RATE}¥
          </span>
        </div>
        <div className="flex items-center gap-2 bg-slate-950 p-2 rounded-xl border border-slate-800 mb-2">
          <span className="text-sm font-black text-slate-500">¥</span>
          <input
            type="number"
            value={quickYen}
            onChange={(e) => setQuickYen(e.target.value)}
            className="bg-transparent text-white font-bold w-full outline-none text-right text-lg"
          />
        </div>
        <div className="text-right">
          <span className="text-2xl font-black text-emerald-400">
            {(parseFloat(quickYen || '0') / EXCHANGE_RATE).toFixed(2)} €
          </span>
        </div>
      </div>

      {/* GLOBAL FOOTER */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl bg-slate-900 text-white p-4 rounded-3xl shadow-2xl flex justify-between items-center border border-slate-800 hidden md:flex">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-600 rounded-lg">
            <Globe size={16} />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase opacity-60 leading-none mb-1">
              Carnet de Voyage Digital
            </p>
            <p className="text-xs font-bold leading-none italic underline">
              Release Candidate V_FINAL
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
