const fs = require('fs');
const DATA_PATH = 'src/data.json';

function run() {
  let data = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));

  // ============================================================
  // PART 1: NEW CITIES
  // ============================================================
  const newCities = [
    {
      id: "leipzig",
      name: "萊比錫",
      coordinates: [12.373, 51.339],
      description: "19世紀德國的學術與出版中心。這裡是現代實驗心理學的誕生地，威廉·馮特在此建立了世界上第一個心理學實驗室，將心理學從哲學中獨立出來成為一門科學。",
      people: ["威廉·馮特 (Wilhelm Wundt)"],
      tech: [],
      religion: ["實驗心理學 (Experimental Psychology)"],
      infrastructure: ["萊比錫大學心理學實驗室"],
      events: [
        { year: "A.D. 1879", title: "建立首個心理學實驗室", description: "馮特在萊比錫大學建立了第一個正式的心理學實驗室，標誌著科學心理學的正式誕生。", numericYear: 1879 }
      ],
      numericYear: 1850
    },
    {
      id: "vienna",
      name: "維也納",
      coordinates: [16.373, 48.208],
      description: "19世紀末歐洲的文化與音樂之都，也是精神分析學派的發源地。同時，在物理學與經濟學領域（維也納學派），這裡也孕育了深刻影響20世紀的現代思想。",
      people: ["西格蒙德·佛洛伊德 (Sigmund Freud)", "路德維希·波茲曼 (Ludwig Boltzmann)"],
      tech: ["統計力學 (Statistical Mechanics)"],
      religion: ["精神分析學 (Psychoanalysis)"],
      infrastructure: ["維也納環城大道 (Ringstraße)"],
      events: [
        { year: "A.D. 1899", title: "《夢的解析》出版", description: "佛洛伊德出版了《夢的解析》，揭示了人類潛意識的運作機制，震撼了整個西方的思想界與藝術界。", numericYear: 1899 }
      ],
      numericYear: 1880
    },
    {
      id: "manchester",
      name: "曼徹斯特",
      coordinates: [-2.242, 53.480],
      description: "世界上第一座工業化城市，被稱為『棉都』。這裡見證了工業革命帶來的巨大生產力，也暴露出極端的貧富差距，促使恩格斯與馬克思在此進行了深入的工人階級調查。",
      people: ["弗里德里希·恩格斯 (Friedrich Engels)"],
      tech: ["鐵路運輸系統 (Railway System)"],
      religion: ["馬克思主義政治經濟學 (Marxist Political Economy)"],
      infrastructure: ["利物浦至曼徹斯特鐵路 (Liverpool and Manchester Railway)"],
      events: [
        { year: "A.D. 1830", title: "首條客運鐵路通車", description: "利物浦至曼徹斯特鐵路通車，標誌著人類進入了鐵道時代，徹底改變了物流與時間空間的概念。", numericYear: 1830 }
      ],
      numericYear: 1800
    }
  ];

  newCities.forEach(nc => {
    if (!data.cities.find(c => c.id === nc.id)) {
      data.cities.push(nc);
    }
  });

  // ============================================================
  // PART 2: EXPAND EXISTING CITIES
  // ============================================================
  const expansions = {
    "london": {
      tech: ["演化論 (Evolutionary Biology)", "電磁學 (Electromagnetism)"],
      people: ["查爾斯·達爾文 (Charles Darwin)", "詹姆斯·馬克士威 (James Clerk Maxwell)"],
      religion: ["古典經濟學 (Classical Economics)"]
    },
    "paris": {
      tech: ["熱力學 (Thermodynamics)"],
      people: ["奧古斯特·孔德 (Auguste Comte)", "克勞德·莫內 (Claude Monet)"],
      religion: ["實證主義社會學 (Positivist Sociology)", "浪漫主義 (Romanticism)", "印象派 (Impressionism)"]
    },
    "edinburgh": {
      religion: ["古典經濟學 (Classical Economics)"],
      people: ["亞當·斯密 (Adam Smith)"]
    },
    "berlin": {
      people: ["卡爾·馬克思 (Karl Marx)"]
    }
  };

  data.cities.forEach(city => {
    const exp = expansions[city.id];
    if (exp) {
      if (exp.tech) {
        if (!city.tech) city.tech = [];
        exp.tech.forEach(t => {
          if (!city.tech.includes(t)) city.tech.push(t);
        });
      }
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
  // PART 3: NEW ROUTES
  // ============================================================
  const newRoutes = [
    { source: "edinburgh", target: "london", label: "愛丁堡→倫敦 國富論與自由市場", year: "A.D. 18世紀末", type: "religion", numericYear: 1776, description: "亞當·斯密在蘇格蘭提出的自由市場與『看不見的手』理論，為正在經歷工業革命的大英帝國提供了完美的經濟學基石。" },
    { source: "london", target: "manchester", label: "倫敦→曼徹斯特 工業資本主義的擴張", year: "A.D. 19世紀", type: "tech", numericYear: 1830, description: "倫敦的金融資本與曼徹斯特的棉紡織工業結合，並透過新修建的鐵路網絡，將英國推上了『世界工廠』的寶座。" },
    { source: "berlin", target: "manchester", label: "柏林→曼徹斯特 馬克思主義的社會調查", year: "A.D. 19世紀中", type: "religion", numericYear: 1845, description: "源於德國哲學的馬克思主義，在曼徹斯特殘酷的工人貧民窟中獲得了現實的經濟學依據，催生了《資本論》。" },
    { source: "paris", target: "vienna", label: "巴黎→維也納 從實證社會學到精神分析", year: "A.D. 19世紀末", type: "religion", numericYear: 1890, description: "19世紀初巴黎的實證主義試圖用物理學的方法研究社會，到了19世紀末，維也納的佛洛伊德則轉向人類非理性的潛意識深淵進行探索。" }
  ];

  newRoutes.forEach(nr => {
    const exists = data.routes.find(r => r.source === nr.source && r.target === nr.target && r.label === nr.label);
    if (!exists) {
      data.routes.push(nr);
    }
  });

  // ============================================================
  // PART 4: GLOSSARY 
  // ============================================================
  const newGlossary = {
    // === Sciences ===
    "演化論 (Evolutionary Biology)": { type: "tech", description: "1859年由達爾文在《物種起源》中提出的偉大科學理論。它指出地球上所有的生物都來自共同的祖先，並透過『物競天擇、適者生存』的自然選擇過程不斷演化。演化論徹底推翻了神創論，是人類對自身在自然界位置的最深刻覺醒。" },
    "電磁學 (Electromagnetism)": { type: "tech", description: "19世紀物理學的最高成就。法拉第發現了電磁感應現象，而馬克士威則用一組優美的偏微分方程（馬克士威方程組）將電、磁與光統一起來，證明光也是一種電磁波。這為20世紀的電氣化時代與愛因斯坦的相對論鋪平了道路。" },
    "熱力學 (Thermodynamics)": { type: "tech", description: "起源於對蒸汽機效率研究的物理學分支。它確立了能量守恆定律（第一定律）與熵增原理（第二定律），揭示了時間的不可逆性以及宇宙最終將走向『熱寂』的悲觀命運。" },
    "統計力學 (Statistical Mechanics)": { type: "tech", description: "由波茲曼等人建立的物理學分支。它將微觀粒子的無序熱運動透過機率統計的方法，與宏觀的熱力學現象連結起來，第一次從原子尺度解釋了『熵』的物理意義。" },

    // === Social Sciences & Humanities ===
    "古典經濟學 (Classical Economics)": { type: "religion", description: "18世紀末由亞當·斯密創立的現代經濟學體系。主張『看不見的手』會引導追求私利的個人無意中促進社會整體的財富增長。它提倡自由貿易與勞動分工，成為大英帝國與全球資本主義的理論基礎。" },
    "馬克思主義政治經濟學 (Marxist Political Economy)": { type: "religion", description: "馬克思與恩格斯對資本主義進行的毀滅性批判。在《資本論》中，他們提出了『剩餘價值理論』，論證了資本家剝削工人的本質，並預言資本主義的內在矛盾必將導致其崩潰，最終走向無產階級革命與共產主義。" },
    "實證主義社會學 (Positivist Sociology)": { type: "religion", description: "19世紀法國哲學家孔德創立的思潮。他認為人類社會的發展必須像物理學一樣，建立在可觀察、可驗證的經驗事實之上，拒絕任何神學與形上學的空想。這是社會學作為一門獨立科學的開端。" },
    "實驗心理學 (Experimental Psychology)": { type: "religion", description: "1879年馮特在萊比錫創立的學科。在此之前，靈魂與心智是哲學家的專利；馮特則透過嚴格的實驗室儀器與『內省法』，試圖量化測量人類的感知與意識速度，讓心理學正式成為科學家族的一員。" },
    "精神分析學 (Psychoanalysis)": { type: "religion", description: "19世紀末維也納醫生佛洛伊德創立的心理學派。他提出人類的思想與行為很大程度上受制於被壓抑的『潛意識』與『性本能 (Libido)』。透過夢的解析與自由聯想，精神分析不僅是臨床療法，更成為20世紀西方文學、藝術與電影的靈感源泉。" },
    "浪漫主義 (Romanticism)": { type: "religion", description: "18世紀末至19世紀中葉席捲歐洲的藝術與文學思潮。作為對啟蒙運動『絕對理性』與工業革命『機械化』的反叛，浪漫主義強烈推崇個人的情感、直覺、對大自然的敬畏以及對中世紀神秘主義的嚮往。" },
    "印象派 (Impressionism)": { type: "religion", description: "19世紀下半葉發源於法國巴黎的繪畫運動。印象派畫家（如莫內）走出畫室，放棄了傳統的清晰輪廓與透視法，轉而捕捉光線與色彩在瞬間的動態變化。這是現代藝術反叛學院派傳統的開端。" },

    // === People ===
    "威廉·馮特 (Wilhelm Wundt)": { type: "person", description: "德國心理學家（1832-1920），被譽為『現代心理學之父』。他在萊比錫大學建立了第一個心理學實驗室，將心理學與哲學分家，開啟了用科學實驗研究人類意識的時代。" },
    "西格蒙德·佛洛伊德 (Sigmund Freud)": { type: "person", description: "奧地利神經學家（1856-1939），精神分析學派的創始人。他發現了『潛意識』這片人類心智的廣大暗大陸，其《夢的解析》徹底改變了現代人對自身理性的認知。" },
    "路德維希·波茲曼 (Ludwig Boltzmann)": { type: "person", description: "奧地利物理學家（1844-1906）。在原子論還未被完全接受的年代，他堅定地用統計方法解釋了熱力學第二定律。因其理論不被當時主流理解，最終患抑鬱症自盡。如今他的熵公式 S=k log W 被刻在他的墓碑上。" },
    "弗里德里希·恩格斯 (Friedrich Engels)": { type: "person", description: "德國思想家與革命家（1820-1895）。馬克思最親密的戰友，曾根據自己在曼徹斯特紡織廠的觀察寫下《英國工人階級狀況》。在馬克思逝世後，他整理並出版了《資本論》的後兩卷。" },
    "查爾斯·達爾文 (Charles Darwin)": { type: "person", description: "英國生物學家（1809-1882）。經過五年的小獵犬號環球航行與二十年的謹慎研究，他發表了《物種起源》，提出的『物競天擇』演化論成為了整個現代生物學的基石。" },
    "詹姆斯·馬克士威 (James Clerk Maxwell)": { type: "person", description: "蘇格蘭物理學家（1831-1879）。他用四條簡潔的方程式（馬克士威方程組）完美統一了電學與磁學，並預言了電磁波的存在，是牛頓與愛因斯坦之間最偉大的物理學家。" },
    "奧古斯特·孔德 (Auguste Comte)": { type: "person", description: "法國哲學家（1798-1857）。實證主義與現代社會學的奠基人，他提出人類思想發展的『三階段定律』（神學、形上學、實證科學），深刻影響了19世紀的社會科學走向。" },
    "亞當·斯密 (Adam Smith)": { type: "person", description: "蘇格蘭哲學家與經濟學家（1723-1790）。其1776年出版的《國富論》標誌著古典經濟學的誕生，他提出的『看不見的手』與勞動分工理論，至今仍是自由市場資本主義的聖經。" },
    "克勞德·莫內 (Claude Monet)": { type: "person", description: "法國畫家（1840-1926），印象派的代表人物與創始人之一。其畫作《印象·日出》為該流派命了名。他畢生致力於捕捉光與色的瞬間視覺印象，晚年的《睡蓮》系列更是達到了半抽象的藝術高峰。" }
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
  console.log(`✅ Batch 5 Complete!`);
  console.log(`   New cities: ${addedCities}`);
  console.log(`   New routes: ${addedRoutes}`);
  console.log(`   New/updated glossary entries: ${addedGlossary}`);
  console.log(`   Expanded cities: ${Object.keys(expansions).length}`);
}

run();
