const fs = require('fs');
const DATA_PATH = 'src/data.json';

function run() {
  let data = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));

  // ============================================================
  // PART 1: NEW CITIES
  // ============================================================
  const newCities = [
    {
      id: "silicon_valley",
      name: "矽谷",
      coordinates: [-122.084, 37.386],
      description: "20世紀下半葉崛起的全球科技中心。從半導體、個人電腦到網際網路與人工智慧，這裡匯集了全球最頂尖的工程師與風險資本，徹底改變了人類社會的運作方式。",
      people: [],
      tech: ["電腦科學 (Computer Science)", "網際網路 (Internet)", "人工智慧 (Artificial Intelligence)"],
      religion: [],
      infrastructure: ["史丹佛大學與無數科技園區"],
      events: [
        { year: "A.D. 1969", title: "ARPANET誕生", description: "人類史上第一個封包交換網路ARPANET（網際網路前身）在此成功傳送了第一個訊息，開啟了數位時代。", numericYear: 1969 }
      ],
      numericYear: 1950
    },
    {
      id: "new_york",
      name: "紐約",
      coordinates: [-74.006, 40.712],
      description: "20世紀的全球金融與文化首都。二戰期間與之後，大量歐洲頂尖科學家與藝術家流亡至此（或美國東岸其他城市如普林斯頓），使這裡成為現代物理學、現代藝術與聯合國總部的所在地。",
      people: ["約翰·馮·紐曼 (John von Neumann)"],
      tech: ["原子能與核物理 (Nuclear Physics)", "資訊理論 (Information Theory)"],
      religion: ["抽象表現主義 (Abstract Expressionism)"],
      infrastructure: ["聯合國總部與華爾街"],
      events: [
        { year: "A.D. 1945", title: "曼哈頓計劃成功", description: "美國主導的曼哈頓計劃成功試爆原子彈，標誌著人類掌握了足以毀滅自身的核能量，冷戰隨之展開。", numericYear: 1945 }
      ],
      numericYear: 1920
    },
    {
      id: "cambridge_uk",
      name: "劍橋 (英國)",
      coordinates: [0.121, 52.205],
      description: "英國歷史最悠久的大學城之一。在20世紀，這裡成為了現代生物學與計算機科學的聖地，見證了DNA雙螺旋結構的發現與圖靈機概念的誕生。",
      people: ["艾倫·圖靈 (Alan Turing)", "詹姆斯·華生 (James Watson)"],
      tech: ["DNA雙螺旋結構 (DNA Double Helix)"],
      religion: ["分析哲學 (Analytic Philosophy)"],
      infrastructure: ["卡文迪許實驗室 (Cavendish Laboratory)"],
      events: [
        { year: "A.D. 1953", title: "發現DNA結構", description: "華生與克里克在劍橋卡文迪許實驗室解開了生命遺傳的密碼——DNA雙螺旋結構，現代分子生物學由此誕生。", numericYear: 1953 }
      ],
      numericYear: 1900
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
    "copenhagen": {
      tech: ["量子力學 (Quantum Mechanics)"],
      people: ["尼爾斯·波耳 (Niels Bohr)"],
      events: [
        { year: "A.D. 1927", title: "哥本哈根詮釋", description: "波耳與海森堡在此確立了量子力學的『哥本哈根詮釋』，引入了不確定性原理與機率波概念，徹底顛覆了古典決定論。", numericYear: 1927 }
      ]
    },
    "berlin": {
      tech: ["相對論 (Theory of Relativity)"],
      people: ["阿爾伯特·愛因斯坦 (Albert Einstein)"]
    },
    "vienna": {
      religion: ["邏輯實證主義 (Logical Positivism)"],
      people: ["路德維希·維根斯坦 (Ludwig Wittgenstein)"]
    },
    "paris": {
      religion: ["現象學 (Phenomenology)", "結構主義 (Structuralism)", "後現代主義 (Postmodernism)"],
      people: ["讓-保羅·沙特 (Jean-Paul Sartre)", "米歇爾·傅柯 (Michel Foucault)"]
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
      if (exp.events && !city.events.find(e => e.title === exp.events[0].title)) {
        city.events.push(...exp.events);
      }
    }
  });

  // ============================================================
  // PART 3: NEW ROUTES
  // ============================================================
  const newRoutes = [
    { source: "berlin", target: "copenhagen", label: "柏林→哥本哈根 現代物理的顛覆", year: "A.D. 1920s", type: "tech", numericYear: 1925, description: "愛因斯坦在柏林提出的光量子與相對論，啟發了波耳在哥本哈根建立量子力學，兩位巨擘隨後展開了世紀物理學大辯論。" },
    { source: "cambridge_uk", target: "silicon_valley", label: "劍橋→矽谷 計算機科學的實體化", year: "A.D. 20世紀中", type: "tech", numericYear: 1970, description: "圖靈在劍橋奠定的理論計算機模型，最終在美國矽谷透過電晶體與微處理器變成了現實的個人電腦與網路。" },
    { source: "vienna", target: "cambridge_uk", label: "維也納→劍橋 語言轉向", year: "A.D. 1930s", type: "religion", numericYear: 1930, description: "維也納圈子的邏輯實證主義與維根斯坦的哲學移師英國劍橋，促成了20世紀哲學史上的『語言轉向』，建立了分析哲學。" },
    { source: "paris", target: "new_york", label: "巴黎→紐約 藝術與思潮的西進", year: "A.D. 1940s", type: "religion", numericYear: 1945, description: "二戰後，全球藝術與前衛思想的中心從巴黎（結構主義、超現實主義）轉移至紐約，誕生了抽象表現主義與後現代文化。" }
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
    // === Physics & Bio ===
    "相對論 (Theory of Relativity)": { type: "tech", description: "愛因斯坦提出的現代物理學兩大支柱之一（分為狹義與廣義）。它顛覆了牛頓的絕對時空觀，證明時間與空間是相對的，且質量與能量可以互相轉換（E=mc²）。廣義相對論更進一步將引力解釋為時空的扭曲。" },
    "量子力學 (Quantum Mechanics)": { type: "tech", description: "研究微觀世界（原子與次原子粒子）物理現象的理論。它揭示了自然界在極小尺度下呈現出的機率性、波粒二象性與量子糾纏。它顛覆了古典物理的決定論，是現代半導體、雷射與量子運算的理論基礎。" },
    "原子能與核物理 (Nuclear Physics)": { type: "tech", description: "20世紀藉由對原子核結構的研究，人類掌握了核裂變與核聚變技術。這不僅催生了具有毀滅性的核子武器（改變了冷戰的地緣政治），也提供了核能發電這種強大的新能源。" },
    "DNA雙螺旋結構 (DNA Double Helix)": { type: "tech", description: "1953年由華生、克里克與富蘭克林共同揭示的生命分子結構。這一發現證明了遺傳資訊是透過四種鹼基（A,T,C,G）的序列進行編碼與複製的，標誌著生物學進入了分子層級，為基因工程鋪平了道路。" },

    // === Computing ===
    "電腦科學 (Computer Science)": { type: "tech", description: "發源於圖靈機理論與馮紐曼架構的全新學科。它將邏輯運算與物理硬體（真空管到電晶體）結合，使人類能夠以前所未有的速度處理海量資訊，引發了第三次工業革命。" },
    "網際網路 (Internet)": { type: "tech", description: "起源於美國軍方的ARPANET計畫，隨後發展為全球互聯的TCP/IP網路。它徹底打破了地理與時間的限制，將全人類連結在一個即時的資訊共享網絡中，深刻改變了商業、媒體與社交模式。" },
    "人工智慧 (Artificial Intelligence)": { type: "tech", description: "旨在創造能夠模擬人類智慧與學習能力的機器的科學。從早期的專家系統到21世紀初基於大數據與類神經網路的深度學習，AI 正在成為推動第四次工業革命的核心引擎。" },

    // === Philosophy & Arts ===
    "現象學 (Phenomenology)": { type: "religion", description: "20世紀初由胡塞爾創立的哲學流派。主張回到事物本身（To the things themselves），嚴格分析人類意識的『意向性』與直接經驗，而不預設任何科學或形上學的前提。它深刻影響了後來的存在主義與詮釋學。" },
    "邏輯實證主義 (Logical Positivism)": { type: "religion", description: "起源於維也納學圈的哲學流派。他們主張，只有那些能夠透過經驗驗證的命題（如科學事實）或邏輯同義反覆（如數學）才是有意義的。他們試圖用嚴格的邏輯語言來淨化哲學，拒絕所有形上學探討。" },
    "分析哲學 (Analytic Philosophy)": { type: "religion", description: "20世紀英美哲學的主流。以羅素與維根斯坦為代表，主張哲學的首要任務是分析語言與邏輯的結構。他們認為許多傳統哲學問題只是因為語言的濫用而產生的『假問題』，一旦釐清了語言，問題就會自然消失。" },
    "結構主義 (Structuralism)": { type: "religion", description: "20世紀中葉興起於法國的思潮。受語言學家索緒爾啟發，結構主義者（如李維史陀）認為，人類的文化、神話、社會關係甚至無意識，都受制於某種深層的、不以個人意志為轉移的『結構』，個人只是這些結構的載體。" },
    "後現代主義 (Postmodernism)": { type: "religion", description: "20世紀下半葉對『現代性』與啟蒙理性的全面質疑與反叛。後現代主義拒絕任何宏大敘事（如進步史觀、絕對真理），強調真理的相對性、權力與論述的交織（如傅柯），並在藝術上表現為拼貼、反諷與解構。" },

    // === People ===
    "阿爾伯特·愛因斯坦 (Albert Einstein)": { type: "person", description: "德國猶太裔物理學家（1879-1955）。20世紀最偉大的科學家，憑一己之力創立了狹義與廣義相對論，並為量子力學奠定了基礎。他是現代物理學的同義詞，也是和平主義的堅定倡導者。" },
    "尼爾斯·波耳 (Niels Bohr)": { type: "person", description: "丹麥物理學家（1885-1962）。量子力學的哥本哈根學派領袖，提出了原子的波耳模型與『互補原理』。他的研究所成為了20世紀初全球頂尖物理學家朝聖的麥加。" },
    "艾倫·圖靈 (Alan Turing)": { type: "person", description: "英國數學家與邏輯學家（1912-1954），被譽為『計算機科學與人工智慧之父』。他提出了圖靈機概念，並在二戰期間破譯了德國的恩尼格瑪密碼機。後因同性戀身份遭到迫害而自殺。" },
    "約翰·馮·紐曼 (John von Neumann)": { type: "person", description: "匈牙利裔美籍數學家與博學家（1903-1957）。他在量子力學、賽局理論以及曼哈頓計劃中做出了巨大貢獻，更重要的是，他確立了現代電腦的『馮紐曼架構』，影響至今。" },
    "詹姆斯·華生 (James Watson)": { type: "person", description: "美國分子生物學家（1928-）。年僅25歲時與克里克在劍橋共同發現了DNA的雙螺旋結構，為現代基因工程打開了大門，並因此獲得諾貝爾獎。" },
    "讓-保羅·沙特 (Jean-Paul Sartre)": { type: "person", description: "法國哲學家與劇作家（1905-1980）。無神論存在主義的代表人物，提出『存在先於本質』，強調人在荒謬的宇宙中擁有絕對的自由，但也必須為自己的選擇承擔絕對的責任。" },
    "路德維希·維根斯坦 (Ludwig Wittgenstein)": { type: "person", description: "奧地利裔英國哲學家（1889-1951）。20世紀最具傳奇色彩的哲學天才，憑藉《邏輯哲學論》與《哲學研究》兩度徹底改變了西方哲學的方向，引發了語言哲學的革命。" },
    "米歇爾·傅柯 (Michel Foucault)": { type: "person", description: "法國哲學家與歷史學家（1926-1984）。後現代主義的核心人物，他深入研究了瘋狂、醫療、監獄與性，揭示了『權力』與『知識』是如何緊密勾結來控制與規訓人類身體的。" }
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
  console.log(`✅ Batch 6 Complete!`);
  console.log(`   New cities: ${addedCities}`);
  console.log(`   New routes: ${addedRoutes}`);
  console.log(`   New/updated glossary entries: ${addedGlossary}`);
  console.log(`   Expanded cities: ${Object.keys(expansions).length}`);
}

run();
