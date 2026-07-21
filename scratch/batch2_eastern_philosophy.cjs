const fs = require('fs');
const DATA_PATH = 'src/data.json';

function run() {
  let data = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));

  // ============================================================
  // PART 1: NEW CITIES
  // ============================================================
  const newCities = [
    {
      id: "dunhuang",
      name: "敦煌",
      coordinates: [94.662, 40.142],
      description: "絲綢之路上的咽喉重鎮與文化交匯點。西元4至11世紀，這裡是佛教從印度、中亞傳入中原的最重要樞紐。莫高窟的藏經洞保存了無數經卷，見證了中國化佛教（如禪宗、淨土宗）的發展，也是多種文化與宗教（摩尼教、景教）共存的聖地。",
      people: ["樂尊 (Lezun)", "玄奘 (Xuanzang)"],
      tech: [],
      religion: ["般若學 (Prajna)", "中國化佛教 (Sinicized Buddhism)", "宗教融合 (Religious syncretism)"],
      infrastructure: ["莫高窟 (Mogao Caves)"],
      events: [
        { year: "A.D. 366", title: "莫高窟開鑿", description: "僧人樂尊在鳴沙山東麓開鑿了第一個洞窟，隨後數百年間，敦煌成為佛教藝術與譯經的中心。", numericYear: 366 }
      ],
      numericYear: 400
    },
    {
      id: "edo",
      name: "江戶 (東京)",
      coordinates: [139.6917, 35.6895],
      description: "德川幕府時代的日本政治與文化中心。17至19世紀，宋明理學（特別是朱子學）成為幕府的官方意識形態，而陽明學則成為幕末維新志士（如吉田松陰）的思想武器，推動了明治維新的爆發。",
      people: ["林羅山 (Hayashi Razan)", "中江藤樹 (Nakae Toju)", "吉田松陰 (Yoshida Shoin)"],
      tech: [],
      religion: ["日本朱子學 (Japanese Neo-Confucianism)", "日本陽明學 (Japanese Yangmingism)"],
      infrastructure: [],
      events: [
        { year: "A.D. 1850s", title: "陽明學與幕末維新", description: "王陽明『知行合一』的思想深刻影響了幕末的下級武士，他們將心學轉化為推翻幕府、尊王攘夷的革命動力。", numericYear: 1850 }
      ],
      numericYear: 1600
    }
  ];

  newCities.forEach(nc => {
    if (!data.cities.find(c => c.id === nc.id)) {
      data.cities.push(nc);
    }
  });

  // ============================================================
  // PART 2: EXPAND EXISTING CITIES' religion & people
  // ============================================================
  const expansions = {
    "qufu": { // 曲阜 (B.C. 551)
      religion: [
        "易經哲學 (Philosophy of I Ching)",
        "陰陽五行 (Yin-Yang and Five Elements)",
        "儒家 (Confucianism)"
      ],
      people: ["孔子 (Confucius)", "孟子 (Mencius)"]
    },
    "luoyang": { // 洛陽 (B.C. 200 / A.D. 200)
      religion: [
        "道家自然觀 (Daoist Naturalism)",
        "魏晉玄學 (Wei-Jin Xuanxue)",
        "名家辯學 (School of Names)"
      ],
      people: ["老子 (Laozi)", "莊子 (Zhuangzi)", "王弼 (Wang Bi)", "公孫龍 (Gongsun Long)"]
    },
    "xianyang": { // 咸陽 (B.C. 221)
      religion: [
        "墨家兼愛非攻 (Mohism)",
        "法家 (Legalism)"
      ],
      people: ["墨子 (Mozi)", "韓非子 (Han Feizi)", "李斯 (Li Si)"]
    },
    "changan": { // 長安 (A.D. 100 / 600)
      religion: [
        "黃老之學 (Huang-Lao Daoism)",
        "天人感應 (Telepathy between Heaven and Man)",
        "讖緯學 (Chenwei/Theology of Texts)",
        "唯識宗 (Yogacara/Consciousness-Only)",
        "華嚴宗 (Huayan School)"
      ],
      people: ["董仲舒 (Dong Zhongshu)", "玄奘 (Xuanzang)", "法藏 (Fazang)"]
    },
    "hangzhou": { // 杭州/臨安 (A.D. 1200) + representing Southern Song culture
      religion: [
        "宋明理學 (Neo-Confucianism)",
        "陸王心學 (School of Mind)",
        "道教內丹術 (Daoist Internal Alchemy)",
        "禪宗 (Zen Buddhism)"
      ],
      people: ["朱熹 (Zhu Xi)", "陸九淵 (Lu Jiuyuan)", "王重陽 (Wang Chongyang)"]
    },
    "beijing": { // 大都/北京 (A.D. 1200 / 1800)
      religion: [
        "考據學/清代樸學 (Evidential Research/Han Learning)",
        "中體西用 (Chinese Learning as Substance, Western Learning for Application)"
      ],
      people: ["顧炎武 (Gu Yanwu)", "戴震 (Dai Zhen)", "曾國藩 (Zeng Guofan)", "李鴻章 (Li Hongzhang)"]
    },
    "nanjing": { // 南京 (A.D. 1356 / 1500)
      religion: [
        "陸王心學 (School of Mind)"
      ],
      people: ["王陽明 (Wang Yangming)"]
    }
  };

  data.cities.forEach(city => {
    const exp = expansions[city.id];
    if (exp) {
      if (exp.religion) {
        if (!city.religion) city.religion = [];
        exp.religion.forEach(r => {
          if (!city.religion.includes(r)) city.religion.push(r);
        });
      }
      if (exp.people) {
        if (!city.people) city.people = [];
        exp.people.forEach(p => {
          if (!city.people.includes(p)) city.people.push(p);
        });
      }
    }
  });

  // ============================================================
  // PART 3: NEW ROUTES (Physical transmission of philosophy)
  // ============================================================
  const newRoutes = [
    // Pre-Qin
    { source: "qufu", target: "luoyang", label: "曲阜→洛陽 孔子問禮於老子", year: "B.C. 6世紀", type: "religion", numericYear: -518, description: "傳說孔子曾前往周朝都城洛陽向擔任守藏史的老子請教禮制，這是中國兩大哲學傳統（儒與道）最早的交會。" },
    { source: "qufu", target: "xianyang", label: "曲阜→咸陽 儒法之爭與焚書坑儒", year: "B.C. 3世紀", type: "religion", numericYear: -213, description: "秦國統一後，以法家思想為國教，並在咸陽下令焚毀儒家經典，儒法思想發生最劇烈的物理與政治碰撞。" },
    // Han
    { source: "xianyang", target: "changan", label: "咸陽→長安 黃老轉向獨尊儒術", year: "B.C. 2世紀", type: "religion", numericYear: -134, description: "漢朝初年長安盛行休養生息的黃老之學，直到漢武帝接受董仲舒『罷黜百家，獨尊儒術』的建議，天人感應成為帝國官方意識形態。" },
    // Wei-Jin
    { source: "changan", target: "luoyang", label: "長安→洛陽 魏晉玄學興起", year: "A.D. 3世紀", type: "religion", numericYear: 240, description: "漢末戰亂後，洛陽的士大夫（如王弼、何晏）開始以老莊思想重新詮釋儒家經典，開創了重視『無』與『自然』的魏晉玄學。" },
    // Buddhism integration
    { source: "dunhuang", target: "changan", label: "敦煌→長安 佛經翻譯與宗派建立", year: "A.D. 4-7世紀", type: "religion", numericYear: 645, description: "大量佛經經由敦煌傳入長安。玄奘從印度取經歸來後，在長安大雁塔建立譯經場，創立唯識宗，標誌著佛教哲學在中國的系統化。" },
    { source: "changan", target: "hangzhou", label: "長安→杭州 佛教南渡與禪宗興起", year: "A.D. 8-12世紀", type: "religion", numericYear: 1127, description: "安史之亂與靖康之難後，大量北方僧侶與士族南遷，推動了不立文字、直指人心的禪宗在江南（如杭州）的大繁榮。" },
    // Neo-Confucianism
    { source: "qufu", target: "hangzhou", label: "曲阜→杭州 理學南宗的建立", year: "A.D. 12世紀", type: "religion", numericYear: 1190, description: "南宋時期，朱熹整合了北宋五子的學說，在江南書院講學，完成了《四書章句集注》，建立了龐大嚴密的宋明理學體系。" },
    { source: "hangzhou", target: "nanjing", label: "杭州→南京 心學的反叛", year: "A.D. 15世紀", type: "religion", numericYear: 1508, description: "王陽明在龍場悟道後，於南京等地講學，提出『心外無物，致良知』，直接挑戰了朱熹的『格物致知』，開創了陸王心學的高峰。" },
    // Qing Evidential Research
    { source: "nanjing", target: "beijing", label: "南京→北京 考據學取代空談", year: "A.D. 17-18世紀", type: "religion", numericYear: 1750, description: "明亡後，顧炎武等學者痛定思痛，認為心學『空談誤國』，提倡回到漢代經學進行嚴謹的文字考證，這種『實事求是』的考據學成為清代北京的學術主流。" },
    // Transmission to Japan
    { source: "nanjing", target: "edo", label: "南京→江戶 陽明學東傳", year: "A.D. 17-19世紀", type: "religion", numericYear: 1650, description: "明末清初，朱子學與陽明學傳入日本。朱子學成為德川幕府的官方統治哲學，而強調『知行合一』的陽明學則激發了後來的明治維新。" }
  ];

  newRoutes.forEach(nr => {
    const exists = data.routes.find(r => r.source === nr.source && r.target === nr.target && r.label === nr.label);
    if (!exists) {
      data.routes.push(nr);
    }
  });

  // ============================================================
  // PART 4: GLOSSARY — Eastern Philosophy concepts (EPIC depth)
  // ============================================================
  const newGlossary = {
    // === Pre-Qin ===
    "易經哲學 (Philosophy of I Ching)": { type: "religion", description: "《易經》是中國最古老的經典之一，最初是占卜之書，但在春秋戰國時期被賦予了深邃的哲學意義。其核心思想是『變易（Change）』——宇宙萬物都在陰陽兩種力量的消長中不斷循環轉化。『生生之謂易』，它建立了一種動態的、整體的宇宙觀，成為後來儒家與道家共同的思想源頭。" },
    "陰陽五行 (Yin-Yang and Five Elements)": { type: "religion", description: "中國古代解釋宇宙運作的基礎框架。陰陽代表事物內部對立統一的兩極（如明暗、動靜）；五行（金木水火土）則代表物質系統的五種運行狀態與生克關係。這套學說在戰國時期由鄒衍集大成，後來深刻影響了中醫（如《黃帝內經》）、天文、政治（五德終始說）以及日常生活的方方面面。" },
    "道家自然觀 (Daoist Naturalism)": { type: "religion", description: "由老子與莊子開創的思想流派。道家認為宇宙的最高法則是『道（Dao）』，它是無形、無名、不可言說的自然規律。相較於儒家強調人為的道德與禮制，道家主張『無為而治』、『順應自然』。莊子進一步將其發展為追求個人精神絕對自由的相對主義，『齊物論』主張打破一切世俗的價值階層。" },
    "墨家兼愛非攻 (Mohism)": { type: "religion", description: "由墨子創立，代表平民與工匠利益的哲學流派。核心主張『兼愛』（超越血緣等級的普遍之愛）與『非攻』（反對侵略戰爭）。墨家具有強烈的宗教色彩（明鬼、天志）以及極其嚴密的邏輯學與幾何學知識。雖然在秦漢之後絕跡，但其俠義精神與科學思維在中國思想史上獨樹一幟。" },
    "名家辯學 (School of Names)": { type: "religion", description: "戰國時期的邏輯學派，以公孫龍與惠施為代表。他們專注於概念與語言的邏輯分析，提出了『白馬非馬』、『一尺之捶，日取其半，萬世不竭』等著名的邏輯悖論。名家揭示了語言與現實之間的裂痕，雖然常被批評為『詭辯』，但這是中國古代最接近純粹邏輯學的思想嘗試。" },
    "法家 (Legalism)": { type: "religion", description: "戰國時期以富國強兵為唯一目標的實用主義政治哲學，以商鞅、韓非子為代表。法家完全拋棄了儒家的道德教化，主張統治者應依賴嚴苛的『法（法律）』、莫測的『術（權謀）』與絕對的『勢（權威）』來控制臣民。這套學說幫助秦國統一了天下，並成為歷代帝王『外儒內法』的隱秘統治邏輯。" },

    // === Han & Wei-Jin ===
    "黃老之學 (Huang-Lao Daoism)": { type: "religion", description: "西漢初年盛行的政治哲學，結合了黃帝（被視為統治術的代表）與老子（道家）的思想。主張君王應當『無為而治』、『與民休息』。在經歷了秦朝的暴政與多年戰亂後，黃老之學為漢初的經濟復甦提供了完美的意識形態，直到漢武帝時期才被儒家取代。" },
    "天人感應 (Telepathy between Heaven and Man)": { type: "religion", description: "西漢思想家董仲舒建立的神學儒家體系核心。他主張『天』是有意志的人格神，君主是天的代表（天子）。如果君主施政不仁，天就會降下災異（如地震、日食）作為警告。這套理論一方面神化了皇權（君權神授），另一方面也為士大夫限制君權提供了一個神學藉口。" },
    "讖緯學 (Chenwei/Theology of Texts)": { type: "religion", description: "漢代流行的一種結合了神學、迷信與儒家經學的神秘主義思潮。『讖』是預言未來的隱語，『緯』是以神學附會儒家經典的著作。統治者常利用讖緯來證明自己政權的合法性（如『代漢者當塗高』），這使漢代儒學充滿了濃厚的宗教預言色彩。" },
    "魏晉玄學 (Wei-Jin Xuanxue)": { type: "religion", description: "西元3世紀，面對漢代帝國崩潰與儒家禮教的僵化，王弼、何晏等士大夫轉向老莊思想，開創的一場哲學解放運動。他們探討『有與無』的本體論問題，主張『以無為本』。玄學不僅是深奧的哲學，更演變成一種追求真性情、蔑視世俗禮教的生活方式（如竹林七賢的放蕩不羈）。" },

    // === Buddhism in China ===
    "般若學 (Prajna)": { type: "religion", description: "佛教傳入中國早期的核心哲學，『般若』意為『空性智慧』。它主張萬事萬物都是因緣和合而成，沒有獨立不變的自性（自性空）。當時的中國學者常借用老莊玄學的『無』來理解般若的『空』，這種『格義』方法促進了佛教在中國知識份子中的傳播。" },
    "唯識宗 (Yogacara/Consciousness-Only)": { type: "religion", description: "由玄奘從印度那爛陀寺完整引進長安的佛教哲學體系。唯識宗主張『萬法唯識』，外在世界並非客觀存在，而是由我們內心深處的『阿賴耶識』（第八識）變現出來的。這是極度精密的心理學與認識論，但在玄奘死後因理論過於繁瑣而在中國衰落。" },
    "華嚴宗 (Huayan School)": { type: "religion", description: "中國本土創立的佛教宗派，以《華嚴經》為宗。法藏大師以『金獅子』為喻，向武則天闡釋了華嚴宗的核心哲學：『一即一切，一切即一』、『理事無礙，事事無礙』。它建立了一個無盡交涉、圓融無礙的全息宇宙觀，是中國佛教哲學思辨的最高峰。" },
    "禪宗 (Zen Buddhism)": { type: "religion", description: "最具中國本土特色的佛教宗派，相傳由達摩祖師傳入，在六祖慧能手中發揚光大。禪宗徹底拋棄了繁瑣的經文翻譯與義理分析，主張『不立文字，教外別傳，直指人心，見性成佛』。它將印度佛教的超然與中國老莊的自然主義完美結合，深刻影響了東亞的詩歌、繪畫與茶道。" },

    // === Neo-Confucianism ===
    "宋明理學 (Neo-Confucianism)": { type: "religion", description: "11至16世紀儒家的偉大復興運動。面對佛教與道教在形上學上的挑戰，北宋五子與南宋朱熹吸收了佛道的宇宙觀，重新為儒家倫理建立了本體論基礎。朱熹主張『存天理，滅人欲』，認為宇宙的本體『理』也存在於每個人的心中，必須透過『格物致知』（窮究事物的道理）來達成聖人的境界。這套體系成為元明清三代的官方科舉標準。" },
    "陸王心學 (School of Mind)": { type: "religion", description: "宋明理學的另一分支，由南宋陸九淵開創，明代王陽明集大成。反對朱熹向外『格物』的繁瑣，王陽明主張『心外無理，心外無物』。道德真理不需要向外求索，只要回歸本心（致良知）就能獲得。更重要的是『知行合一』：真正的知必然表現為行動。這套充滿實踐爆發力的哲學，後來成為明治維新志士的精神武裝。" },
    "道教內丹術 (Daoist Internal Alchemy)": { type: "religion", description: "宋元時期道教的重大轉向。早期的道士煉製化學丹藥（外丹）以求長生不老，但常導致重金屬中毒。內丹術則將人體本身視為煉丹爐，以體內的『精、氣、神』為藥物，透過靜坐、冥想與呼吸吐納來達成精神的昇華與超越。全真道的創立者王重陽是這一轉向的關鍵人物。" },

    // === Qing to Modern ===
    "考據學/清代樸學 (Evidential Research/Han Learning)": { type: "religion", description: "清代思想界的主流學風。明朝滅亡後，顧炎武等學者將亡國歸咎於陸王心學的『空談心性』。他們主張回到漢代的儒家經典，運用文字學、音韻學、訓詁學進行極其嚴謹的考證，以求得經典的真實原貌。這是一場中國內部的『文藝復興』與『科學精神』的萌芽，強調『實事求是，無徵不信』。" },
    "中體西用 (Chinese Learning as Substance, Western Learning for Application)": { type: "religion", description: "19世紀下半葉，面對西方列強的堅船利炮，清朝洋務派（如曾國藩、李鴻章）提出的文化妥協方案。主張保持中國傳統的儒家倫理與政治制度作為『體（根本）』，而引進西方的軍事、工業與科學技術作為『用（工具）』。這標誌著中國哲學第一次被迫面對現代西方科技的巨大衝擊。" },
    "日本朱子學 (Japanese Neo-Confucianism)": { type: "religion", description: "江戶時代（1603-1867），德川幕府為了鞏固嚴格的階級社會（士農工商），將強調『上下尊卑』與『大義名分』的朱子學立為官方正統學說。林羅山等儒學者為幕府建立了一套不可動搖的封建倫理秩序。" },
    "日本陽明學 (Japanese Yangmingism)": { type: "religion", description: "與作為官方意識形態的朱子學不同，強調『知行合一』與『心即理』的陽明學在日本成為一種充滿顛覆性與實踐力的哲學。幕末時期，吉田松陰等人利用陽明學激發了下級武士的革命熱情，『尊王攘夷』，直接推動了推翻幕府的明治維新。" },

    // === People ===
    "老子 (Laozi)": { type: "person", description: "相傳為春秋末期的楚國人，《道德經》的作者。他提出『道』是宇宙的最高本源，主張『反者道之動』，認為柔弱勝過剛強。他的『無為』思想深刻影響了中國的政治哲學與個人修養。" },
    "莊子 (Zhuangzi)": { type: "person", description: "戰國時期的道家代表人物。透過《莊周夢蝶》、《庖丁解牛》等寓言，莊子表達了一種超越世俗價值、追求絕對精神自由的相對主義哲學，是中國文學與美學的浪漫主義源頭。" },
    "墨子 (Mozi)": { type: "person", description: "戰國初期思想家，出身平民工匠。他創立了組織嚴密的墨者團體，提倡『兼愛』（平等的愛）與『非攻』（反對侵略），並具備高超的防禦器械製造技術與邏輯學知識。" },
    "王弼 (Wang Bi)": { type: "person", description: "三國時期魏國的少年天才哲學家（226-249），24歲即英年早逝。他用《老子》的『無』來重新注釋《周易》與《論語》，確立了魏晉玄學『以無為本』的核心，徹底改變了中國哲學的走向。" },
    "玄奘 (Xuanzang)": { type: "person", description: "唐代高僧（602-664），為求取佛經原義，孤身西行五萬里抵達印度那爛陀寺。回國後他主持了歷史上規模最大的譯經場，創立了精密繁雜的唯識宗，並寫下《大唐西域記》。" },
    "朱熹 (Zhu Xi)": { type: "person", description: "南宋哲學家（1130-1200），宋明理學的集大成者。他將宇宙本體（理）與人類心性完美結合，其《四書章句集注》成為其後七百年科舉考試的絕對標準，對東亞文化圈產生了統治性的影響。" },
    "王陽明 (Wang Yangming)": { type: "person", description: "明代思想家與軍事家（1472-1529）。在被貶謫貴州龍場時悟道，提出『致良知』與『知行合一』。他不僅是心學大師，還親自帶兵平定了寧王之亂，是中國歷史上罕見的立德、立言、立功三不朽之人。" },
    "顧炎武 (Gu Yanwu)": { type: "person", description: "明末清初思想家（1613-1682）。痛心於明朝的滅亡，他提出『天下興亡，匹夫有責』，反對空談心性，提倡『經世致用』與嚴謹的考據學，成為清代樸學的開山祖師。" },
    "吉田松陰 (Yoshida Shoin)": { type: "person", description: "日本幕末時期的思想家（1830-1859）。他深受陽明學影響，開設『松下村塾』，培養了高杉晉作、伊藤博文等一大批明治維新的核心領袖。後因策劃暗殺幕府官員而被處死。" }
  };

  for (const [key, value] of Object.entries(newGlossary)) {
    if (!data.glossary[key]) {
      data.glossary[key] = value;
    }
  }

  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), 'utf8');

  const addedCities = newCities.length;
  const addedRoutes = newRoutes.length;
  const addedGlossary = Object.keys(newGlossary).length;
  console.log(`✅ Batch 2 Complete!`);
  console.log(`   New cities: ${addedCities}`);
  console.log(`   New routes: ${addedRoutes}`);
  console.log(`   New/updated glossary entries: ${addedGlossary}`);
  console.log(`   Expanded cities: ${Object.keys(expansions).length}`);
}

run();
