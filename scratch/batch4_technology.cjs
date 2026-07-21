const fs = require('fs');
const DATA_PATH = 'src/data.json';

function run() {
  let data = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));

  // ============================================================
  // PART 1: NEW CITIES
  // ============================================================
  const newCities = [
    {
      id: "bianjing",
      name: "汴京 (開封)",
      coordinates: [114.341, 34.797],
      description: "北宋首都，11世紀全球最大、最繁華的都市。這裡是中國古代四大發明中『活字印刷』與『指南針』首次被大規模記載與應用的地方，代表了中國古代科技與商業的最高峰。",
      people: ["畢昇 (Bi Sheng)", "沈括 (Shen Kuo)"],
      tech: ["活字印刷術 (Movable Type Printing)", "指南針 (Magnetic Compass)"],
      religion: [],
      infrastructure: ["清明上河圖描繪的繁華市集"],
      events: [
        { year: "A.D. 1040s", title: "活字印刷術發明", description: "畢昇發明了膠泥活字印刷，這是人類印刷史上一次偉大的技術革命。", numericYear: 1040 }
      ],
      numericYear: 1000
    },
    {
      id: "venice",
      name: "威尼斯",
      coordinates: [12.315, 45.440],
      description: "中世紀晚期與文藝復興時期的地中海貿易霸主。為了管理龐大的海上貿易與金融帝國，這裡誕生了『複式簿記』與現代銀行業的雛形，同時也是玻璃製造與光學鏡片的高科技中心。",
      people: ["盧卡·帕西奧利 (Luca Pacioli)", "馬可·波羅 (Marco Polo)"],
      tech: ["複式簿記 (Double-entry Bookkeeping)", "玻璃鏡片製造 (Glass Lens Manufacturing)"],
      religion: [],
      infrastructure: ["威尼斯兵工廠 (Venetian Arsenal)"],
      events: [
        { year: "A.D. 1494", title: "複式簿記的系統化", description: "帕西奧利出版了《算術、幾何、比及比例概要》，系統化總結了威尼斯商人的複式簿記法，為現代資本主義奠定了會計基礎。", numericYear: 1494 }
      ],
      numericYear: 1200
    },
    {
      id: "lisbon",
      name: "里斯本",
      coordinates: [-9.139, 38.722],
      description: "15至16世紀大航海時代的先驅城市。在恩里克王子的推動下，葡萄牙匯集了歐洲與阿拉伯的航海技術、地圖學與造船術，開啟了人類歷史上第一次真正的全球化進程。",
      people: ["恩里克王子 (Prince Henry the Navigator)", "瓦斯科·達伽馬 (Vasco da Gama)"],
      tech: ["大航海時代 (Age of Discovery)", "卡拉維爾帆船 (Caravel)"],
      religion: [],
      infrastructure: ["薩格里什航海學校 (Sagres School)"],
      events: [
        { year: "A.D. 1498", title: "達伽馬抵達印度", description: "葡萄牙船隊繞過好望角抵達印度，徹底打破了阿拉伯人與威尼斯人對香料貿易的壟斷，全球貿易重心從地中海轉向大西洋。", numericYear: 1498 }
      ],
      numericYear: 1400
    },
    {
      id: "mainz",
      name: "美因茲",
      coordinates: [8.277, 49.992],
      description: "神聖羅馬帝國城市，西方活字印刷術的誕生地。古騰堡在此發明了金屬活字印刷機，徹底改變了知識在歐洲的傳播方式，直接催生了宗教改革與科學革命。",
      people: ["古騰堡 (Johannes Gutenberg)"],
      tech: ["古騰堡印刷機 (Gutenberg Press)"],
      religion: [],
      infrastructure: [],
      events: [
        { year: "A.D. 1455", title: "古騰堡聖經出版", description: "第一批使用金屬活字印刷的《四十二行聖經》在美因茲問世，標誌著歐洲進入了大眾傳播時代。", numericYear: 1455 }
      ],
      numericYear: 1450
    }
  ];

  newCities.forEach(nc => {
    if (!data.cities.find(c => c.id === nc.id)) {
      data.cities.push(nc);
    }
  });

  // ============================================================
  // PART 2: EXPAND EXISTING CITIES' tech & people
  // ============================================================
  const expansions = {
    "luoyang": {
      tech: ["造紙術 (Papermaking)", "候風地動儀 (Seismoscope)"],
      people: ["蔡倫 (Cai Lun)", "張衡 (Zhang Heng)"]
    },
    "changan": {
      tech: ["雕版印刷 (Woodblock printing)", "黑火藥 (Black Gunpowder)"],
      people: ["孫思邈 (Sun Simiao)"]
    },
    "baghdad": {
      tech: ["印度-阿拉伯數字 (Hindu-Arabic numerals)", "代數學 (Algebra)", "伊斯蘭光學 (Islamic Optics)"],
      people: ["花剌子米 (Al-Khwarizmi)"] // Alhazen usually associated with Cairo, but Baghdad is fine for translation movement
    },
    "cairo": { // Let's add Alhazen to Cairo or create Cairo if not exist, wait Cairo doesn't exist. I'll just add Alhazen to Baghdad for simplicity or Alexandria. Alexandria exists.
      id: "alexandria"
    },
    "florence": {
      tech: ["透視法 (Linear perspective)", "天文望遠鏡 (Astronomical Telescope)"],
      people: ["伽利略 (Galileo Galilei)"]
    },
    "london": {
      tech: ["科學革命 (Scientific Revolution)", "微積分 (Calculus)", "經典力學 (Classical Mechanics)", "工業革命 (Industrial Revolution)", "蒸汽機 (Steam Engine)"],
      people: ["牛頓 (Isaac Newton)", "瓦特 (James Watt)", "法拉第 (Michael Faraday)"]
    },
    "paris": {
      tech: ["解析幾何 (Analytic Geometry)", "啟蒙科學 (Enlightenment Science)", "化學革命 (Chemical Revolution)"],
      people: ["拉瓦節 (Antoine Lavoisier)"]
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
      if (exp.people) {
        if (!city.people) city.people = [];
        exp.people.forEach(p => {
          if (!city.people.includes(p)) city.people.push(p);
        });
      }
    }
  });

  // Adding Alhazen to Alexandria
  const alexandria = data.cities.find(c => c.id === "alexandria");
  if (alexandria) {
    if (!alexandria.tech) alexandria.tech = [];
    alexandria.tech.push("伊斯蘭光學 (Islamic Optics)");
    if (!alexandria.people) alexandria.people = [];
    alexandria.people.push("海什木 (Ibn al-Haytham)");
  }

  // ============================================================
  // PART 3: NEW ROUTES (Physical transmission of tech)
  // ============================================================
  const newRoutes = [
    // Mathematics & Science
    { source: "baghdad", target: "florence", label: "巴格達→佛羅倫斯 數字與代數傳入歐洲", year: "A.D. 12-13世紀", type: "tech", numericYear: 1202, description: "斐波那契在北非學習了阿拉伯數字與花剌子米的代數，透過《算盤書》將其引入義大利，奠定了歐洲商業與科學計算的基礎。" },
    { source: "alexandria", target: "florence", label: "亞歷山大港→義大利 光學與透視法", year: "A.D. 14世紀", type: "tech", numericYear: 1350, description: "海什木的《光學》被翻譯成拉丁文，啟發了義大利文藝復興時期的透視法，以及後來伽利略等人的望遠鏡發明。" },
    { source: "florence", target: "london", label: "義大利→倫敦 科學革命的轉移", year: "A.D. 17世紀", type: "tech", numericYear: 1687, description: "伽利略奠定的實驗物理學與運動學基礎，被牛頓在英國集大成，發表《自然哲學的數學原理》，標誌著科學革命的最高潮。" },
    
    // Printing & Information
    { source: "luoyang", target: "changan", label: "洛陽→長安 造紙與雕版", year: "A.D. 7-8世紀", type: "tech", numericYear: 700, description: "蔡倫改進的造紙術在唐代長安與雕版技術結合，促成了佛教經卷與世俗文學的大規模複製。" },
    { source: "changan", target: "bianjing", label: "長安→汴京 活字印刷的發明", year: "A.D. 11世紀", type: "tech", numericYear: 1040, description: "北宋時期，畢昇發明了膠泥活字，進一步提高了印刷效率，知識開始在平民階層普及。" },
    { source: "bianjing", target: "mainz", label: "東方→美因茲 印刷術的全球化", year: "A.D. 13-15世紀", type: "tech", numericYear: 1450, description: "東方的紙張與印刷概念經由蒙古帝國傳入歐洲，古騰堡結合歐洲的螺旋壓榨機與冶金技術，發明了金屬活字印刷機。" },

    // Navigation & Globalization
    { source: "bianjing", target: "venice", label: "汴京→威尼斯 指南針與貿易網絡", year: "A.D. 12-13世紀", type: "tech", numericYear: 1250, description: "中國的指南針技術經由阿拉伯人傳入地中海。威尼斯人利用它與複式簿記，建立起橫跨地中海的龐大商業帝國。" },
    { source: "venice", target: "lisbon", label: "威尼斯→里斯本 航海霸權的轉移", year: "A.D. 15世紀", type: "tech", numericYear: 1490, description: "為了打破威尼斯與鄂圖曼對東方貿易的壟斷，葡萄牙里斯本匯集了最新的航海技術（卡拉維爾帆船、星盤），開啟了大航海時代。" },
    
    // Industrial Revolution
    { source: "london", target: "paris", label: "倫敦→巴黎 工業革命的擴散", year: "A.D. 18-19世紀", type: "tech", numericYear: 1800, description: "起源於英國的蒸汽機與機械化生產模式，在拿破崙戰爭後迅速擴散到法國與歐洲大陸，改變了全球的生產與軍事格局。" }
  ];

  newRoutes.forEach(nr => {
    const exists = data.routes.find(r => r.source === nr.source && r.target === nr.target && r.label === nr.label);
    if (!exists) {
      data.routes.push(nr);
    }
  });

  // ============================================================
  // PART 4: GLOSSARY — Tech concepts (EPIC depth)
  // ============================================================
  const newGlossary = {
    // === Math & Science ===
    "印度-阿拉伯數字 (Hindu-Arabic numerals)": { type: "tech", description: "源於古印度（包含至關重要的『零』的概念），經由阿拉伯帝國（如花剌子米）傳入歐洲的十進位記數系統。相較於繁瑣的羅馬數字，它極大地簡化了計算過程，是現代數學、商業會計與科學計算不可或缺的基礎工具。" },
    "代數學 (Algebra)": { type: "tech", description: "由9世紀巴格達學者花剌子米在其著作《代數學》中系統化的數學分支。它將計算從具體的數字抽象為符號運算，允許人們透過解方程式來尋找未知數。這標誌著數學從實用幾何向高度抽象邏輯的歷史性跨越。" },
    "伊斯蘭光學 (Islamic Optics)": { type: "tech", description: "11世紀海什木（Ibn al-Haytham）在《光學》一書中建立的科學體系。他打破了古希臘人認為『眼睛發出光線去看東西』的錯誤觀點，利用暗室實驗證明了光線是從物體反射進入眼睛的。他建立了早期實驗科學的標準，為現代光學奠定了基礎。" },
    "科學革命 (Scientific Revolution)": { type: "tech", description: "16至18世紀歐洲在數學、物理、天文學與生物學領域發生的根本性思想變革。以哥白尼的日心說為起點，經過伽利略的實驗物理，最終在牛頓那裡完成。它徹底摧毀了中世紀基於亞里斯多德與教會的神學宇宙觀，確立了以『數學化』與『實驗』為核心的現代科學方法。" },
    "經典力學 (Classical Mechanics)": { type: "tech", description: "由牛頓在1687年《自然哲學的數學原理》中建立的物理學體系。透過三大運動定律與萬有引力定律，牛頓證明了天上行星的運行與地上蘋果的掉落遵循著完全相同的數學規律。這建立了一個像鐘錶一樣精確運作的機械宇宙觀。" },
    "微積分 (Calculus)": { type: "tech", description: "由牛頓與萊布尼茲在17世紀末各自獨立發明的數學工具。它是研究『變化』的數學，能夠精確計算曲線下的面積（積分）與運動物體的瞬時速度（微分）。沒有微積分，就不可能發展出現代物理學與工程學。" },
    "啟蒙科學 (Enlightenment Science)": { type: "tech", description: "18世紀法國啟蒙運動時期，科學被視為驅散愚昧、推動人類進步的最高理性。如拉瓦節推翻了『燃素說』建立現代化學；百科全書派則致力於將所有科學知識普及給大眾。科學不再只是學者的專利，而成為社會改革的推動力。" },

    // === Printing & Information ===
    "造紙術 (Papermaking)": { type: "tech", description: "西元105年由東漢蔡倫改進的技術，使用樹皮、破布等廉價植物纖維製造紙張。它取代了笨重的竹簡與昂貴的羊皮紙，使得知識的載體變得輕便且極為廉價，是人類文化史上第一次資訊儲存革命。" },
    "雕版印刷 (Woodblock printing)": { type: "tech", description: "發源於唐代中國，將整版文字或圖像反刻在木板上，塗墨後印於紙上。這項技術最初被大量用於印製佛教經文（如《金剛經》）與曆法，標誌著人類從『手抄時代』進入了『批量複製時代』。" },
    "活字印刷術 (Movable Type Printing)": { type: "tech", description: "11世紀北宋畢昇發明的技術。將單個漢字刻在膠泥上，燒硬後排版印刷，印完可拆解重組。這極大地節省了雕版的時間與木材。雖然在漢字體系中推廣較慢，但其『模塊化組合』的理念是人類工程學的偉大創舉。" },
    "古騰堡印刷機 (Gutenberg Press)": { type: "tech", description: "15世紀中期德國古騰堡發明的印刷系統。他使用銻鉛合金鑄造字母活字，並結合了葡萄酒壓榨機的機械結構。這項技術在字母文字體系中引發了資訊爆炸，直接推動了宗教改革（人人皆可閱讀聖經）與科學革命。" },

    // === Navigation & Industrial ===
    "指南針 (Magnetic Compass)": { type: "tech", description: "利用磁石指示南北方向的儀器。北宋沈括在《夢溪筆談》中首次詳細記載了人工磁化與磁偏角現象。指南針的應用使得船隻在陰雨天或深海中也能確定航向，是開啟大航海時代與全球貿易網絡的關鍵技術鑰匙。" },
    "複式簿記 (Double-entry Bookkeeping)": { type: "tech", description: "起源於中世紀義大利（如威尼斯），由帕西奧利系統化的會計方法。每一筆交易都必須在『借方』與『貸方』同時記錄，確保帳目平衡。這不僅是一種記帳技術，更是現代資本主義企業計算利潤、評估風險與擴張規模的數學基礎。" },
    "大航海時代 (Age of Discovery)": { type: "tech", description: "15至17世紀，歐洲船隊突破地中海，跨越大西洋與太平洋尋找新航線的歷史時期。它將孤立的各大洲（歐、亞、非、美）首次緊密地連結在一個全球性的貿易與殖民網絡中，徹底改變了人類歷史的軌跡與生態系（哥倫布大交換）。" },
    "工業革命 (Industrial Revolution)": { type: "tech", description: "18世紀末發源於英國的生產方式大變革。人類首次大規模利用化石燃料（煤炭）驅動機器，取代了人力與畜力。從紡織業的機械化到鐵路與輪船的出現，工業革命創造了前所未有的物質財富，但也帶來了深刻的社會階級衝突與環境問題。" },
    "蒸汽機 (Steam Engine)": { type: "tech", description: "工業革命的心臟。1760年代，瓦特改良了早期的紐科門蒸汽機，使其熱效率大幅提升，並能輸出連續的旋轉動力。蒸汽機打破了工廠必須建在河流旁邊的限制，為所有現代工業與交通運輸（火車、輪船）提供了無限的人造動力。" },

    // === People ===
    "蔡倫 (Cai Lun)": { type: "person", description: "東漢宦官，於西元105年向漢和帝獻上改進後的紙張。他利用樹皮、麻頭、破布與舊漁網為原料，極大地降低了造紙成本，被視為現代造紙術的發明者，深刻改變了世界文明的進程。" },
    "畢昇 (Bi Sheng)": { type: "person", description: "北宋平民發明家（約990-1051），發明了膠泥活字印刷術。沈括在《夢溪筆談》中詳細記載了他的工藝。畢昇的發明是人類歷史上最早的活字印刷技術，比歐洲古騰堡早了四百年。" },
    "花剌子米 (Al-Khwarizmi)": { type: "person", description: "9世紀巴格達『智慧之家』的波斯數學家與天文學家。他的著作將印度數字引入伊斯蘭世界與歐洲；他的名字演變為『演算法 (Algorithm)』，而他的書名演變為『代數 (Algebra)』。" },
    "海什木 (Ibn al-Haytham)": { type: "person", description: "11世紀的阿拉伯博學家，被尊為『現代光學之父』。他嚴格區分了理論假說與實驗驗證，其《光學》一書對後世的羅吉爾·培根、克卜勒與伽利略產生了深遠影響。" },
    "盧卡·帕西奧利 (Luca Pacioli)": { type: "person", description: "15世紀義大利數學家與方濟各會修士，達文西的數學老師。他被譽為『會計學之父』，出版了第一部系統介紹威尼斯複式簿記法的著作，為現代會計制度奠定了基礎。" },
    "哥倫布 (Christopher Columbus)": { type: "person", description: "義大利航海家，在西班牙王室贊助下，於1492年試圖向西航行尋找亞洲，卻意外抵達美洲大陸。他的航行引發了『哥倫布大交換』，永久性地改變了全球的人口、物種與文化版圖。" },
    "伽利略 (Galileo Galilei)": { type: "person", description: "義大利物理學家與天文學家（1564-1642）。他製造了天文望遠鏡，發現了木星衛星與月球環形山，證明了哥白尼的日心說。他確立了以數學為語言、以實驗為檢驗標準的現代科學方法。" },
    "牛頓 (Isaac Newton)": { type: "person", description: "英國物理學家與數學家（1643-1727）。他發明了微積分，發現了萬有引力定律，並在《自然哲學的數學原理》中統一了天體與地球的運動規律。他是科學革命的最高峰，其理論統治了物理學達兩百年之久。" },
    "瓦特 (James Watt)": { type: "person", description: "蘇格蘭發明家與機械工程師（1736-1819）。他發明了帶有分離冷凝器的改良蒸汽機，使其成為工業革命中最高效、最普及的動力來源。國際單位制中的功率單位『瓦特 (W)』即以他的名字命名。" }
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
  console.log(`✅ Batch 4 Complete!`);
  console.log(`   New cities: ${addedCities}`);
  console.log(`   New routes: ${addedRoutes}`);
  console.log(`   New/updated glossary entries: ${addedGlossary}`);
  console.log(`   Expanded cities: ${Object.keys(expansions).length}`);
}

run();
