// Lexique de survie, classé par situation. Chaque phrase : français, romaji
// (à lire tel quel) et japonais (utilisé pour la synthèse vocale ja-JP).
export const lexiqueData = [
  {
    category: 'Bases & politesse',
    emoji: '🙇',
    items: [
      { fr: 'Bonjour', romaji: 'Konnichiwa', jp: 'こんにちは' },
      { fr: 'Merci beaucoup', romaji: 'Arigatou gozaimasu', jp: 'ありがとうございます' },
      { fr: 'Pardon / Excusez-moi', romaji: 'Sumimasen', jp: 'すみません' },
      { fr: 'Oui / Non', romaji: 'Hai / Iie', jp: 'はい / いいえ' },
      { fr: "S'il vous plaît", romaji: 'Onegaishimasu', jp: 'お願いします' },
      { fr: 'Je ne comprends pas', romaji: 'Wakarimasen', jp: 'わかりません' },
      { fr: 'Parlez-vous anglais ?', romaji: 'Eigo o hanasemasu ka ?', jp: '英語を話せますか？' },
      { fr: 'Je ne parle pas japonais', romaji: 'Nihongo ga hanasemasen', jp: '日本語が話せません' },
    ],
  },
  {
    category: 'Au restaurant',
    emoji: '🍜',
    items: [
      { fr: "Est-ce que c'est à volonté ?", romaji: 'Tabehoudai desu ka ?', jp: '食べ放題ですか？' },
      { fr: 'Une table pour deux', romaji: 'Futari desu', jp: '二人です' },
      { fr: 'Le menu, s\'il vous plaît', romaji: 'Menyuu o onegaishimasu', jp: 'メニューをお願いします' },
      { fr: "Qu'est-ce que vous recommandez ?", romaji: 'Osusume wa nan desu ka ?', jp: 'おすすめは何ですか？' },
      { fr: "Sans fruits de mer s'il vous plaît", romaji: 'Kaisanbutsu nashi de onegaishimasu', jp: '海産物なしでお願いします' },
      { fr: 'Sans porc', romaji: 'Butaniku nashi de', jp: '豚肉なしで' },
      { fr: 'Je suis végétarien(ne)', romaji: 'Bejitarian desu', jp: 'ベジタリアンです' },
      { fr: 'Est-ce épicé ?', romaji: 'Karai desu ka ?', jp: '辛いですか？' },
      { fr: "Un verre d'eau s'il vous plaît", romaji: 'Omizu o kudasai', jp: 'お水をください' },
      { fr: "L'addition s'il vous plaît", romaji: 'Okaikei onegaishimasu', jp: 'お会計お願いします' },
      { fr: "C'était délicieux", romaji: 'Gochisousama deshita', jp: 'ごちそうさまでした' },
    ],
  },
  {
    category: 'Transports & orientation',
    emoji: '🚆',
    items: [
      { fr: 'Où est la gare ?', romaji: 'Eki wa doko desu ka ?', jp: '駅はどこですか？' },
      { fr: 'Où sont les toilettes ?', romaji: 'Toire wa doko desu ka ?', jp: 'トイレはどこですか？' },
      { fr: 'Combien ça coûte ?', romaji: 'Ikura desu ka ?', jp: 'いくらですか？' },
      { fr: 'Un billet pour… s\'il vous plaît', romaji: '… made no kippu o kudasai', jp: '〜までの切符をください' },
      { fr: 'Quel quai ?', romaji: 'Nanbansen desu ka ?', jp: '何番線ですか？' },
      { fr: 'Est-ce le bon train pour… ?', romaji: 'Kore wa … yuki desu ka ?', jp: 'これは〜行きですか？' },
      { fr: 'Je suis perdu(e)', romaji: 'Michi ni mayoimashita', jp: '道に迷いました' },
      { fr: 'Tout droit / Gauche / Droite', romaji: 'Massugu / Hidari / Migi', jp: 'まっすぐ / 左 / 右' },
    ],
  },
  {
    category: 'Shopping & argent',
    emoji: '🛍️',
    items: [
      { fr: 'Je peux payer par carte ?', romaji: 'Kaado de haraemasu ka ?', jp: 'カードで払えますか？' },
      { fr: 'Je regarde juste', romaji: 'Miteiru dake desu', jp: '見ているだけです' },
      { fr: 'Vous avez ça dans ma taille ?', romaji: 'Watashi no saizu wa arimasu ka ?', jp: '私のサイズはありますか？' },
      { fr: 'Détaxe possible ?', romaji: 'Menzei dekimasu ka ?', jp: '免税できますか？' },
      { fr: 'Un sac, s\'il vous plaît', romaji: 'Fukuro o kudasai', jp: '袋をください' },
    ],
  },
  {
    category: 'Hôtel',
    emoji: '🏨',
    items: [
      { fr: "J'ai une réservation", romaji: 'Yoyaku ga arimasu', jp: '予約があります' },
      { fr: 'Le check-out est à quelle heure ?', romaji: 'Chekkuauto wa nanji desu ka ?', jp: 'チェックアウトは何時ですか？' },
      { fr: 'Y a-t-il le wifi ?', romaji: 'Wai-fai wa arimasu ka ?', jp: 'Wi-Fiはありますか？' },
      { fr: 'Pouvez-vous garder mes bagages ?', romaji: 'Nimotsu o azukaremasu ka ?', jp: '荷物を預かれますか？' },
    ],
  },
  {
    category: 'Urgences & santé',
    emoji: '🚨',
    items: [
      { fr: "À l'aide !", romaji: 'Tasukete !', jp: '助けて！' },
      { fr: 'Appelez une ambulance', romaji: 'Kyuukyuusha o yonde kudasai', jp: '救急車を呼んでください' },
      { fr: 'Appelez la police', romaji: 'Keisatsu o yonde kudasai', jp: '警察を呼んでください' },
      { fr: 'Je me sens mal', romaji: 'Kibun ga warui desu', jp: '気分が悪いです' },
      { fr: 'Où est l\'hôpital / la pharmacie ?', romaji: 'Byouin / Yakkyoku wa doko desu ka ?', jp: '病院 / 薬局はどこですか？' },
      { fr: "J'ai mal ici", romaji: 'Koko ga itai desu', jp: 'ここが痛いです' },
    ],
  },
];
