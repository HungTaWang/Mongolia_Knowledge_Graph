const fs = require('fs');
const DATA_PATH = 'src/data.json';

function run() {
  let data = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));

  // ============================================================
  // PART 1: NEW CITIES
  // ============================================================
  const newCities = [
    {
      id: "miletus",
      name: "米利都",
      coordinates: [27.278, 37.530],
      description: "愛奧尼亞海岸的希臘殖民城邦。西元前6世紀，泰勒斯、阿那克西曼德與阿那克西美尼在此開創了人類史上第一次以『自然原因』而非『神話』來解釋宇宙的嘗試，被譽為西方哲學與科學的絕對起點。",
      people: ["泰勒斯 (Thales)", "阿那克西曼德 (Anaximander)", "阿那克西美尼 (Anaximenes)"],
      tech: [],
      religion: ["米利都自然哲學 (Milesian Naturalism)", "萬物有靈論批判 (Hylozoism)"],
      infrastructure: [],
      events: [
        { year: "約B.C. 585", title: "泰勒斯預測日食", description: "泰勒斯成功預測了一次日蝕，這被認為是人類運用自然規律（而非神諭）預測天象的第一個有記錄的案例，標誌著科學思維的誕生。", numericYear: -585 }
      ],
      numericYear: -600
    },
    {
      id: "cordoba",
      name: "科爾多瓦",
      coordinates: [-4.779, 37.879],
      description: "安達盧斯（伊斯蘭統治下的伊比利亞半島）的文化首都。10-12世紀，這裡是歐洲最開明的城市之一，擁有歐洲最大的圖書館。伊本·魯世德（阿威羅伊）在此重新詮釋亞里斯多德，直接點燃了基督教歐洲的經院哲學革命。",
      people: ["伊本·魯世德 (Averroes/Ibn Rushd)", "邁蒙尼德 (Maimonides)", "伊本·哈茲姆 (Ibn Hazm)"],
      tech: [],
      religion: ["阿威羅伊主義 (Averroism)", "安達盧斯跨教共存 (Convivencia)", "伊斯蘭教 (Islam)"],
      infrastructure: [],
      events: [
        { year: "約A.D. 1150-1198", title: "伊本·魯世德的亞里斯多德大注疏", description: "伊本·魯世德為亞里斯多德的幾乎所有著作撰寫了極其詳盡的注釋，主張哲學與宗教可以並存。這些注釋被翻譯成拉丁文後傳入巴黎，直接引爆了經院哲學的大辯論。", numericYear: 1180 }
      ],
      numericYear: 1150
    },
    {
      id: "edinburgh",
      name: "愛丁堡",
      coordinates: [-3.1883, 55.9533],
      description: "蘇格蘭的知識之都。18世紀的蘇格蘭啟蒙運動使愛丁堡成為歐洲最耀眼的思想中心之一。大衛·休謨在此將經驗主義推向極致的懷疑論，亞當·斯密則在此奠定了現代經濟學的基礎。",
      people: ["大衛·休謨 (David Hume)", "亞當·斯密 (Adam Smith)", "弗朗西斯·哈奇森 (Francis Hutcheson)"],
      tech: [],
      religion: ["蘇格蘭啟蒙運動 (Scottish Enlightenment)", "懷疑論 (Skepticism)", "道德情感論 (Moral Sentimentalism)"],
      infrastructure: [],
      events: [
        { year: "A.D. 1739", title: "休謨出版《人性論》", description: "休謨在28歲時出版了這部劃時代巨著，徹底否定了因果律的必然性，宣稱人類所有知識都只是『習慣性聯想』而非客觀真理。這部著作『從印刷機上生下來就死了』，但後來震醒了康德。", numericYear: 1739 }
      ],
      numericYear: 1700
    },
    {
      id: "amsterdam",
      name: "阿姆斯特丹",
      coordinates: [4.9041, 52.3676],
      description: "17世紀荷蘭黃金時代的中心，歐洲宗教寬容的燈塔。因為宗教審查極少，笛卡兒、斯賓諾莎與洛克都曾在此出版他們在其他國家無法出版的激進哲學著作。阿姆斯特丹是近代歐洲思想自由的物理溫床。",
      people: ["斯賓諾莎 (Baruch Spinoza)", "笛卡兒 (René Descartes)", "格勞秀斯 (Hugo Grotius)"],
      tech: ["光學儀器 (Optical instruments)"],
      religion: ["泛神論 (Pantheism)", "理性主義 (Rationalism)", "自然權利論 (Natural Rights Theory)"],
      infrastructure: [],
      events: [
        { year: "A.D. 1670", title: "斯賓諾莎出版《神學政治論》", description: "斯賓諾莎匿名在阿姆斯特丹出版此書，主張聖經應以歷史批判方法來閱讀，且國家權力不應干涉個人信仰。這本書在全歐洲被禁，但卻深刻影響了啟蒙運動的政教分離思想。", numericYear: 1670 }
      ],
      numericYear: 1600
    },
    {
      id: "copenhagen",
      name: "哥本哈根",
      coordinates: [12.5683, 55.6761],
      description: "北歐的文化首都。19世紀的齊克果在此以極度個人化的存在焦慮，對黑格爾的龐大理性體系發起了孤獨的反叛，成為存在主義的先驅。20世紀的尼爾斯·波耳也在此建立了量子力學的哥本哈根詮釋。",
      people: ["齊克果 (Søren Kierkegaard)", "尼爾斯·波耳 (Niels Bohr)"],
      tech: [],
      religion: ["存在主義 (Existentialism)", "信仰之躍 (Leap of Faith)"],
      infrastructure: [],
      events: [
        { year: "A.D. 1843", title: "齊克果出版《非此即彼》", description: "齊克果以筆名出版此書，主張人類的存在不能被黑格爾的理性體系所消解。真正的存在是個人面對上帝時的絕對孤獨與焦慮。這成為20世紀存在主義（沙特、海德格）的直接源頭。", numericYear: 1843 }
      ],
      numericYear: 1840
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
    "athens": {
      religion: [
        "畢達哥拉斯學派 (Pythagoreanism)",
        "斯多葛主義 (Stoicism)",
        "伊壁鳩魯主義 (Epicureanism)",
        "犬儒主義 (Cynicism)",
        "蘇格拉底方法 (Socratic Method)"
      ],
      people: [
        "畢達哥拉斯 (Pythagoras)",
        "芝諾 (Zeno of Citium)",
        "伊壁鳩魯 (Epicurus)",
        "第歐根尼 (Diogenes)"
      ]
    },
    "alexandria": {
      religion: [
        "教父哲學 (Patristic Philosophy)",
        "諾斯底主義 (Gnosticism)"
      ],
      people: [
        "普羅提諾 (Plotinus)",
        "克萊門特 (Clement of Alexandria)",
        "奧利金 (Origen)"
      ]
    },
    "rome": {
      religion: [
        "奧古斯丁神學 (Augustinian Theology)",
        "自然法傳統 (Natural Law Tradition)",
        "斯多葛倫理學 (Stoic Ethics)"
      ],
      people: [
        "奧古斯丁 (Augustine of Hippo)",
        "塞內卡 (Seneca)",
        "馬可·奧勒留 (Marcus Aurelius)"
      ]
    },
    "baghdad": {
      religion: [
        "伊斯蘭哲學 (Islamic Philosophy/Falsafa)",
        "穆塔齊賴派 (Mu'tazila Rationalism)"
      ],
      people: [
        "伊本·西那 (Avicenna/Ibn Sina)",
        "肯迪 (Al-Kindi)",
        "法拉比 (Al-Farabi)"
      ]
    },
    "paris": {
      religion: [
        "經院哲學 (Scholasticism)",
        "托馬斯主義 (Thomism)",
        "啟蒙運動 (The Enlightenment)",
        "實證主義 (Positivism)",
        "社會契約論 (Social Contract Theory)",
        "百科全書派 (Encyclopédistes)"
      ],
      people: [
        "托馬斯·阿奎那 (Thomas Aquinas)",
        "伏爾泰 (Voltaire)",
        "盧梭 (Jean-Jacques Rousseau)",
        "孔德 (Auguste Comte)",
        "狄德羅 (Denis Diderot)"
      ]
    },
    "florence": {
      religion: [
        "人文主義 (Humanism)",
        "文藝復興自然哲學 (Renaissance Natural Philosophy)",
        "新柏拉圖主義復興 (Neoplatonic Revival)"
      ],
      people: [
        "馬基維利 (Niccolò Machiavelli)",
        "馬爾西利奧·費奇諾 (Marsilio Ficino)",
        "皮科·德拉·米蘭多拉 (Pico della Mirandola)"
      ]
    },
    "london": {
      religion: [
        "功利主義 (Utilitarianism)",
        "自由主義 (Liberalism)",
        "演化論的哲學衝擊 (Darwinian Philosophy)"
      ],
      people: [
        "傑里米·邊沁 (Jeremy Bentham)",
        "約翰·斯圖亞特·密爾 (John Stuart Mill)",
        "查爾斯·達爾文 (Charles Darwin)",
        "赫伯特·斯賓塞 (Herbert Spencer)"
      ]
    },
    "berlin": {
      religion: [
        "黑格爾辯證法 (Hegelian Dialectics)",
        "青年黑格爾派 (Young Hegelians)",
        "費爾巴哈唯物主義 (Feuerbachian Materialism)"
      ],
      people: [
        "黑格爾 (Georg Wilhelm Friedrich Hegel)",
        "費爾巴哈 (Ludwig Feuerbach)",
        "費希特 (Johann Gottlieb Fichte)"
      ]
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
    // Pre-Socratic → Classical
    { source: "miletus", target: "athens", label: "愛奧尼亞→雅典 自然哲學西傳", year: "B.C. 5世紀", type: "religion", numericYear: -480, description: "米利都被波斯毀滅後，愛奧尼亞學者遷往雅典，將自然哲學傳統帶入古典時代。" },
    // Classical Greek → Hellenistic
    { source: "athens", target: "alexandria", label: "雅典→亞歷山大港 希臘哲學東傳", year: "B.C. 3世紀", type: "religion", numericYear: -280, description: "亞歷山大大帝征服後，雅典學者前往新建的亞歷山大城，在此將柏拉圖哲學與東方神秘主義融合為新柏拉圖主義。" },
    // Hellenistic → Rome
    { source: "athens", target: "rome", label: "雅典→羅馬 斯多葛主義傳入", year: "B.C. 2世紀", type: "religion", numericYear: -150, description: "羅馬征服希臘後，大量希臘哲學家被帶往羅馬，斯多葛主義成為羅馬精英的核心倫理信仰。" },
    // Late Antiquity
    { source: "alexandria", target: "rome", label: "亞歷山大港→羅馬 教父哲學整合", year: "A.D. 4世紀", type: "religion", numericYear: 400, description: "奧古斯丁吸收了普羅提諾的新柏拉圖主義，在北非與羅馬世界建立了基督教神學的哲學根基。" },
    // Greek → Islamic
    { source: "athens", target: "baghdad", label: "雅典→巴格達 百年翻譯運動", year: "A.D. 8-10世紀", type: "religion", numericYear: 830, description: "阿拔斯王朝的百年翻譯運動，將亞里斯多德、柏拉圖等希臘典籍系統性翻譯為阿拉伯文，催生了伊斯蘭哲學。" },
    // Islamic → Andalusia
    { source: "baghdad", target: "cordoba", label: "巴格達→科爾多瓦 伊斯蘭哲學西傳", year: "A.D. 10世紀", type: "religion", numericYear: 950, description: "伊斯蘭帝國的東方學術中心經北非傳入伊比利亞半島，使科爾多瓦成為歐洲接觸亞里斯多德的窗口。" },
    // Andalusia → Paris (the critical bridge)
    { source: "cordoba", target: "paris", label: "科爾多瓦→巴黎 阿威羅伊主義引爆經院哲學", year: "A.D. 12-13世紀", type: "religion", numericYear: 1220, description: "伊本·魯世德的亞里斯多德注疏被翻譯為拉丁文，傳入巴黎大學，引爆了信仰與理性的大辯論，催生了托馬斯·阿奎那的經院哲學綜合。" },
    // Renaissance
    { source: "rome", target: "florence", label: "羅馬→佛羅倫斯 拜占庭學者攜帶柏拉圖手稿", year: "A.D. 15世紀", type: "religion", numericYear: 1450, description: "1453年君士坦丁堡陷落後，大量拜占庭學者攜帶希臘原典逃往義大利，在佛羅倫斯引爆了柏拉圖主義的復興與人文主義運動。" },
    // Early Modern: Rationalism
    { source: "paris", target: "amsterdam", label: "巴黎→阿姆斯特丹 笛卡兒流亡出版", year: "A.D. 17世紀", type: "religion", numericYear: 1640, description: "笛卡兒為逃避法國宗教審查，移居荷蘭共和國，在阿姆斯特丹的出版自由環境中發表了他最重要的哲學著作。" },
    // Empiricism
    { source: "london", target: "edinburgh", label: "倫敦→愛丁堡 經驗主義北傳蘇格蘭", year: "A.D. 18世紀", type: "religion", numericYear: 1730, description: "洛克的經驗主義思想從英格蘭北傳蘇格蘭，在愛丁堡被休謨推向懷疑論的極致，並催生了蘇格蘭啟蒙運動。" },
    // Hume → Kant
    { source: "edinburgh", target: "berlin", label: "愛丁堡→柏林 休謨震醒康德", year: "A.D. 18世紀", type: "religion", numericYear: 1770, description: "休謨的懷疑論著作傳入普魯士，將康德從『獨斷的沉睡中喚醒』，促使康德撰寫了《純粹理性批判》，試圖調和理性主義與經驗主義。" },
    // Hegel → Marx
    { source: "berlin", target: "london", label: "柏林→倫敦 馬克思流亡倫敦", year: "A.D. 1849", type: "religion", numericYear: 1849, description: "馬克思在柏林吸收了黑格爾辯證法與費爾巴哈唯物主義後，因革命失敗流亡倫敦，在大英博物館圖書室撰寫了《資本論》。" },
    // Paris → Copenhagen
    { source: "paris", target: "copenhagen", label: "巴黎→哥本哈根 黑格爾主義的反叛", year: "A.D. 19世紀", type: "religion", numericYear: 1840, description: "黑格爾哲學席捲歐洲學術界，齊克果在哥本哈根以極度個人化的信仰體驗對抗這套龐大的理性體系，開創了存在主義先聲。" },
    // Enlightenment network
    { source: "amsterdam", target: "paris", label: "阿姆斯特丹→巴黎 斯賓諾莎影響啟蒙", year: "A.D. 18世紀", type: "religion", numericYear: 1720, description: "斯賓諾莎的泛神論與聖經批判著作從荷蘭流入法國，深刻影響了伏爾泰、狄德羅等啟蒙思想家。" },
    // Florence → Paris (Humanism)
    { source: "florence", target: "paris", label: "佛羅倫斯→巴黎 人文主義北傳", year: "A.D. 16世紀", type: "religion", numericYear: 1530, description: "義大利戰爭期間，法國國王邀請了大量佛羅倫斯人文主義學者與藝術家，將文藝復興思想帶入法國。" }
  ];

  newRoutes.forEach(nr => {
    const exists = data.routes.find(r => r.source === nr.source && r.target === nr.target && r.label === nr.label);
    if (!exists) {
      data.routes.push(nr);
    }
  });

  // ============================================================
  // PART 4: GLOSSARY — Philosophy concepts (EPIC depth)
  // ============================================================
  const newGlossary = {
    // === Pre-Socratic ===
    "米利都自然哲學 (Milesian Naturalism)": { type: "religion", description: "西元前6世紀，在愛奧尼亞的米利都城，泰勒斯、阿那克西曼德與阿那克西美尼開創了人類思想史的第一個革命：他們拒絕以神話來解釋自然現象，轉而尋找萬物背後的『物質性第一原理（arché）』。泰勒斯主張萬物源於水，阿那克西曼德提出更抽象的『無限者（apeiron）』，阿那克西美尼則認為是氣。這三位被統稱為『米利都學派』，他們開啟了西方哲學與自然科學的傳統——用理性觀察而非超自然力量來理解世界。" },
    "萬物有靈論批判 (Hylozoism)": { type: "religion", description: "米利都學派的一個重要哲學立場。他們認為物質本身就蘊含著運動與生命的潛能，不需要外在的神靈來推動。這直接挑戰了古希臘傳統宗教中『眾神操控自然』的世界觀，是人類走向自然主義與唯物主義的最早一步。" },

    // === Classical Greek ===
    "畢達哥拉斯學派 (Pythagoreanism)": { type: "religion", description: "由畢達哥拉斯在南義大利克羅頓建立的半宗教半哲學團體。他們發現了弦的長度比與音高之間的數學關係，由此得出一個驚人的結論：『萬物皆數（All is number）』。宇宙的本質不是水或氣，而是數學比例與和諧。這個洞見不僅影響了柏拉圖的理型論，更為兩千年後伽利略所說的『自然之書是用數學語言寫成的』埋下了種子。" },
    "蘇格拉底方法 (Socratic Method)": { type: "religion", description: "由蘇格拉底開創的對話式哲學方法。他不直接給出答案，而是透過不斷追問來暴露對話者思想中的矛盾與預設。這種『助產術（maieutics）』迫使對方在邏輯的壓力下重新審視自己以為理所當然的信念。蘇格拉底方法成為西方批判性思維的源頭，至今仍是法學院教學的核心方法。" },
    "斯多葛主義 (Stoicism)": { type: "religion", description: "由芝諾（Zeno of Citium）在雅典創立的哲學流派。斯多葛主義主張宇宙由一種理性的火焰（Logos）所貫穿，人類應當順應自然、克制激情，專注於自己能控制的事物（德性），而對不能控制的事物（財富、名聲、死亡）保持超然。這套哲學傳入羅馬後，成為帝國精英的核心倫理信仰，塞內卡與馬可·奧勒留是其最著名的實踐者。" },
    "伊壁鳩魯主義 (Epicureanism)": { type: "religion", description: "由伊壁鳩魯在雅典創立的哲學流派。與斯多葛主義對立，伊壁鳩魯主張宇宙由原子構成（繼承了德謨克利特的原子論），靈魂會隨肉體一同消散，因此『死亡與我們無關』。人生的最高目標是追求適度的快樂（ataraxia，寧靜無擾），而非痛苦的禁欲。伊壁鳩魯的原子論物理學在文藝復興時期被重新發現，深刻影響了近代科學的機械論世界觀。" },
    "犬儒主義 (Cynicism)": { type: "religion", description: "由蘇格拉底的學生安提斯泰尼開創、以第歐根尼為最著名代表的激進哲學流派。犬儒主義者認為文明社會的一切習俗（財產、禮儀、社會地位）都是虛偽的枷鎖，人只有回歸最原始的自然狀態才能獲得真正的自由與德性。第歐根尼住在木桶裡、白天提著燈籠在雅典街頭尋找『真正的人』，成為西方反建制思想的永恆象徵。" },

    // === Hellenistic / Late Antiquity ===
    "教父哲學 (Patristic Philosophy)": { type: "religion", description: "西元2至8世紀，早期基督教神學家（教父們）為了回應希臘哲學的挑戰，將柏拉圖主義和新柏拉圖主義融入基督教神學的偉大嘗試。亞歷山大港的克萊門特與奧利金率先嘗試用希臘哲學語言來解釋基督教信仰，而奧古斯丁則在北非完成了最偉大的綜合——他用新柏拉圖主義的『光照說』來解釋上帝如何讓人類認識真理，奠定了中世紀基督教哲學的基礎。" },
    "諾斯底主義 (Gnosticism)": { type: "religion", description: "西元1至3世紀流行於地中海世界的一系列神秘主義宗教運動。諾斯底主義者認為物質世界是邪惡的『造物主（Demiurge）』所創造的監牢，而人類靈魂中蘊含著來自真正至高神的『靈知（gnosis）』火花。只有透過秘密的知識啟蒙，才能逃脫物質的束縛。這套思想深刻影響了基督教早期的神學辯論，並被正統教會視為最危險的異端。" },
    "奧古斯丁神學 (Augustinian Theology)": { type: "religion", description: "由北非主教奧古斯丁（354-430）建立的基督教神學體系。奧古斯丁融合了新柏拉圖主義與基督教信仰，提出了『原罪論』（人類因亞當的墮落而天生有罪）、『神恩論』（人類無法靠自身得救，只能依賴上帝的恩典）與『上帝之城』（歷史的最終目的是天國的實現）。這套神學統治了西方基督教世界長達千年，直到托馬斯·阿奎那引入亞里斯多德主義才產生根本性的轉變。" },
    "自然法傳統 (Natural Law Tradition)": { type: "religion", description: "源自斯多葛主義的哲學信念：存在一套超越人為律法的、由宇宙理性（Logos）所規定的永恆法則。這套法則適用於所有人類，不分種族與國界。西塞羅將它引入羅馬法學，奧古斯丁將它基督教化，托馬斯·阿奎那在中世紀賦予它最系統性的論述，最終它成為近代『天賦人權』與國際法的哲學根基。" },
    "斯多葛倫理學 (Stoic Ethics)": { type: "religion", description: "斯多葛主義的倫理核心。主張唯一真正的善是『德性（arete）』，唯一真正的惡是『邪惡（kakia）』，而健康、財富、死亡等外在事物都是『無關緊要的（adiaphora）』。這意味著即使在最極端的苦難中（如被暴君迫害），一個有德之人仍然可以是幸福的。塞內卡在被尼祿賜死時的從容，馬可·奧勒留在軍營中寫下的《沉思錄》，都是這套倫理學的活證。" },

    // === Islamic Philosophy ===
    "伊斯蘭哲學 (Islamic Philosophy/Falsafa)": { type: "religion", description: "西元8至12世紀，阿拉伯語世界的學者在翻譯與吸收了希臘哲學（特別是亞里斯多德與新柏拉圖主義）後，發展出的一套極度精密的哲學傳統。肯迪被稱為『阿拉伯人的哲學家』，法拉比試圖調和柏拉圖的理想國與伊斯蘭政治，伊本·西那（阿維森納）建立了一套將亞里斯多德形上學與伊斯蘭神學完美融合的龐大體系。這套傳統是連接古希臘哲學與中世紀歐洲經院哲學的關鍵橋樑。" },
    "穆塔齊賴派 (Mu'tazila Rationalism)": { type: "religion", description: "伊斯蘭思想史上最重要的理性主義神學流派。穆塔齊賴派主張《古蘭經》是『被創造的』（而非永恆的），人類擁有自由意志，且理性是理解上帝旨意的最高工具。他們在阿拔斯王朝初期獲得官方支持，但後來被以艾什阿里為首的傳統主義者擊敗。然而，他們對理性的強調深刻影響了後世的伊斯蘭哲學家。" },
    "阿威羅伊主義 (Averroism)": { type: "religion", description: "基於伊本·魯世德（拉丁名阿威羅伊）對亞里斯多德注疏發展而來的哲學立場。阿威羅伊主義最激進的主張是『雙重真理論』：哲學可以得出與宗教不同的結論，且兩者都可以是真的（各自在自己的領域有效）。這個觀點在13世紀傳入巴黎大學後引爆了巨大爭議，教會曾於1270年與1277年兩次譴責阿威羅伊主義，但它實際上為哲學爭取到了獨立於神學的自主空間。" },
    "安達盧斯跨教共存 (Convivencia)": { type: "religion", description: "10至12世紀伊斯蘭統治下的伊比利亞半島（安達盧斯），穆斯林、基督徒與猶太人在相對寬容的政治環境下共同生活、交流學術的獨特文化現象。猶太哲學家邁蒙尼德在此用阿拉伯語撰寫了《迷途指津》，伊斯蘭學者與基督教修士在翻譯學校裡合作將阿拉伯語典籍翻譯為拉丁文。這種跨教共存是人類歷史上罕見的文明對話實驗。" },

    // === Scholasticism / Medieval ===
    "經院哲學 (Scholasticism)": { type: "religion", description: "11至14世紀歐洲中世紀大學中發展出的哲學方法。經院哲學的核心是用亞里斯多德的邏輯工具來系統性地處理基督教神學問題。其方法論是『辯論式教學（disputatio）』：先提出問題，再列舉正反意見，最後用嚴密的邏輯推演得出結論。安瑟倫的本體論證明、阿伯拉爾的唯名論與托馬斯·阿奎那的《神學大全》都是經院哲學的巔峰之作。" },
    "托馬斯主義 (Thomism)": { type: "religion", description: "托馬斯·阿奎那（1225-1274）在巴黎大學建立的哲學神學體系。面對阿威羅伊主義對基督教信仰的挑戰，阿奎那沒有選擇排斥亞里斯多德，而是進行了一次偉大的調和：他論證理性與信仰並不矛盾，理性可以證明上帝的存在（如五路論證），而信仰則揭示了理性無法觸及的奧秘（如三位一體）。托馬斯主義至今仍是天主教的官方哲學。" },

    // === Renaissance ===
    "人文主義 (Humanism)": { type: "religion", description: "14至16世紀義大利文藝復興的核心思想運動。人文主義者（如彼特拉克、費奇諾、皮科）主張回歸古希臘羅馬的經典文本，以人的尊嚴、自由意志與創造力為核心價值。皮科·德拉·米蘭多拉的《論人的尊嚴》宣稱人類是宇宙中唯一擁有自我塑造能力的存在。人文主義打破了中世紀以上帝為絕對中心的世界觀，為近代個人主義與世俗文化奠定了基礎。" },
    "文藝復興自然哲學 (Renaissance Natural Philosophy)": { type: "religion", description: "15至16世紀，在人文主義與新柏拉圖主義的刺激下，歐洲學者開始重新以觀察與實驗來研究自然世界。達文西的解剖學素描、哥白尼的日心說假說、伽利略的落體實驗，都是這場運動的產物。文藝復興自然哲學是連接中世紀經院哲學與近代科學革命的關鍵轉折點。" },
    "新柏拉圖主義復興 (Neoplatonic Revival)": { type: "religion", description: "15世紀佛羅倫斯的梅迪奇家族資助學者費奇諾將柏拉圖全集翻譯為拉丁文，引爆了一場對柏拉圖思想的重新狂熱。這次復興的核心信念是：宇宙是一個由美與愛所貫穿的和諧整體，藝術與哲學是靈魂上升至神性的階梯。這直接影響了波提切利的繪畫（如《維納斯的誕生》）與米開朗基羅的雕塑。" },

    // === Early Modern ===
    "泛神論 (Pantheism)": { type: "religion", description: "由斯賓諾莎在《倫理學》中系統化的形上學立場。斯賓諾莎主張上帝與自然是同一回事（Deus sive Natura），不存在超越自然的人格化上帝。宇宙本身就是唯一的實體，萬物是它的模式。這個觀點在17世紀被視為無神論的等價物而遭到全面禁止，但卻深刻影響了歐洲啟蒙運動、浪漫主義以及愛因斯坦的宇宙觀。" },
    "自然權利論 (Natural Rights Theory)": { type: "religion", description: "由格勞秀斯在阿姆斯特丹開創、洛克在倫敦系統化的政治哲學。主張每個人生來就擁有不可剝奪的自然權利（生命、自由、財產），政府的唯一目的是保護這些權利。如果政府侵犯了這些權利，人民有權起義推翻它。這套理論直接成為美國獨立宣言與法國人權宣言的哲學基礎。" },
    "蘇格蘭啟蒙運動 (Scottish Enlightenment)": { type: "religion", description: "18世紀中葉在愛丁堡爆發的思想運動。與法國啟蒙運動的激進理性主義不同，蘇格蘭啟蒙更注重經驗觀察與社會科學。休謨以懷疑論顛覆了因果律，亞當·斯密以《國富論》奠定了古典經濟學，弗朗西斯·哈奇森發展了道德情感論。蘇格蘭啟蒙運動對美國建國之父（如富蘭克林、傑佛遜）產生了直接影響。" },
    "懷疑論 (Skepticism)": { type: "religion", description: "主張人類無法獲得絕對確定知識的哲學傳統。古典懷疑論由皮浪與塞克斯圖斯·恩披里柯在希臘創立，主張對一切判斷保持『懸擱（epoché）』。近代懷疑論由休謨推向極致，他論證即使是最基本的因果律也只是心理習慣而非客觀真理。休謨的懷疑論成為康德哲學的直接刺激源。" },
    "道德情感論 (Moral Sentimentalism)": { type: "religion", description: "由哈奇森開創、休謨與亞當·斯密發展的倫理學立場。反對理性主義倫理學（如康德），主張道德判斷的基礎不是理性計算，而是人類天生的同情心與道德情感。亞當·斯密在《道德情操論》中提出了『公正旁觀者（impartial spectator）』的概念，認為我們透過想像自己站在他人立場來做出道德判斷。" },

    // === Enlightenment ===
    "啟蒙運動 (The Enlightenment)": { type: "religion", description: "18世紀席捲歐洲的知識運動，其核心信念是：人類理性是改善社會的最高工具。啟蒙思想家們挑戰了宗教權威、專制王權與傳統迷信，主張宗教寬容、言論自由與科學進步。康德用一句話定義了啟蒙：『Sapere aude! 敢於運用你自己的理性！』啟蒙運動直接催生了美國獨立革命與法國大革命。" },
    "社會契約論 (Social Contract Theory)": { type: "religion", description: "由霍布斯、洛克與盧梭發展的政治哲學理論。主張國家並非神授，而是人民為了擺脫『自然狀態』中的混亂而自願訂立的契約。霍布斯認為人們讓渡全部權利給絕對君主；洛克認為人們只讓渡有限權利且保留反抗權；盧梭則提出『公意（volonté générale）』——人民的共同意志高於一切。這三種版本分別影響了專制主義、自由主義與民主主義。" },
    "百科全書派 (Encyclopédistes)": { type: "religion", description: "以狄德羅與達朗貝爾為首的法國啟蒙學者群體。他們編纂的《百科全書》（1751-1772）是人類史上第一次試圖將所有人類知識系統化地彙編成冊的偉大工程。這部巨著不僅是知識的集大成，更是一個政治武器——它透過理性的光芒暴露了封建制度與教會權威的荒謬。" },

    // === 19th Century ===
    "功利主義 (Utilitarianism)": { type: "religion", description: "由傑里米·邊沁創立、約翰·斯圖亞特·密爾修正的倫理學理論。功利主義主張行為的對錯取決於它產生的『最大多數人的最大幸福』。邊沁試圖建立一套『快樂計算法（felicific calculus）』來量化快樂與痛苦；密爾則區分了快樂的質與量，著名地宣稱『做一個不滿足的蘇格拉底，勝過做一隻滿足的豬』。功利主義至今仍是公共政策分析的核心倫理框架。" },
    "自由主義 (Liberalism)": { type: "religion", description: "以個人自由與權利為最高價值的政治哲學傳統。從洛克的財產權、密爾的言論自由到20世紀羅爾斯的正義論，自由主義主張政府的權力必須受到限制，個人的思想、信仰與生活方式不應受到國家干涉。作為一種政治哲學，自由主義直接塑造了現代西方民主國家的憲政架構。" },
    "演化論的哲學衝擊 (Darwinian Philosophy)": { type: "religion", description: "1859年達爾文出版《物種起源》後，對歐洲哲學與神學產生的核心衝擊。達爾文的自然選擇理論不僅挑戰了上帝造人的神學信條，更根本性地瓦解了亞里斯多德以來『目的論（teleology）』的世界觀——自然界的複雜設計不需要一個智慧設計者，只需要盲目的變異與篩選。斯賓塞將演化論推廣為『社會達爾文主義』，雖然這是對達爾文的嚴重誤讀，但卻深刻影響了19世紀的政治與倫理。" },
    "黑格爾辯證法 (Hegelian Dialectics)": { type: "religion", description: "黑格爾（1770-1831）建立的哲學方法與歷史觀。他主張一切事物的發展都遵循『正題→反題→合題』的辯證運動：每一個觀念或制度都會在自身內部產生矛盾（反題），而矛盾的解決（合題）會產生更高層次的統一。黑格爾將這套邏輯應用於世界歷史，主張歷史是『絕對精神』逐步實現自我意識的過程。馬克思保留了辯證法的形式，但將『精神』替換為『物質生產關係』，創造了歷史唯物主義。" },
    "青年黑格爾派 (Young Hegelians)": { type: "religion", description: "1830-1840年代柏林大學中一群以黑格爾哲學為出發點、但走向激進批判的年輕學者。費爾巴哈將黑格爾的『絕對精神』還原為人類本質的自我投射（上帝是人創造的，不是反過來），馬克思則進一步主張『重要的不是解釋世界，而是改變世界』。青年黑格爾派是從觀念論走向唯物主義、從哲學走向革命的關鍵轉折。" },
    "費爾巴哈唯物主義 (Feuerbachian Materialism)": { type: "religion", description: "路德維希·費爾巴哈在《基督教的本質》（1841）中提出的革命性論點：不是上帝按自己的形象創造了人，而是人按自己的形象創造了上帝。宗教是人類將自己最美好的品質（愛、智慧、力量）投射到一個虛構實體上的結果。這種『投射論』直接影響了馬克思（宗教是人民的鴉片）和佛洛伊德（上帝是父親形象的投射）。" },
    "實證主義 (Positivism)": { type: "religion", description: "由法國哲學家奧古斯特·孔德在19世紀上半葉創立的哲學立場。孔德提出人類知識發展的『三階段法則』：神學階段（以神解釋）→形上學階段（以抽象概念解釋）→實證階段（以科學觀察與數據解釋）。實證主義主張只有能被觀察與實驗驗證的命題才是有意義的知識，所有超驗的形上學問題都應被拋棄。這套思想深刻影響了20世紀的邏輯實證主義與社會科學方法論。" },
    "存在主義 (Existentialism)": { type: "religion", description: "由齊克果在19世紀中葉哥本哈根開啟、20世紀由海德格與沙特在德法發揚光大的哲學運動。存在主義的核心主張是『存在先於本質』：人類沒有預設的目的或本質，每個人都被『拋擲』到這個荒謬的世界中，必須透過自己的選擇來創造意義。齊克果強調的是面對上帝時的個人焦慮與『信仰之躍』，沙特則走向無神論版本，強調絕對自由與絕對責任。" },
    "信仰之躍 (Leap of Faith)": { type: "religion", description: "齊克果的核心哲學概念。他認為理性永遠無法證明上帝的存在（這點他同意休謨與康德），但真正的信仰恰恰需要一種超越理性的、充滿焦慮的『躍入』。就像站在懸崖邊，你無法用邏輯證明對面是安全的，你只能選擇跳或不跳。齊克果認為，正是這種冒險的個人決斷，而非教會的教條或黑格爾的邏輯體系，才構成了真正的宗教生命。" },
    "理性主義 (Rationalism)": { type: "religion", description: "17世紀歐洲大陸由笛卡兒、斯賓諾莎與萊布尼茲為代表的哲學流派。理性主義者主張人類心靈天生擁有某些先於經驗的觀念（如數學公理、上帝觀念），而真正可靠的知識只能透過理性的演繹推理——而非感官經驗——來獲得。笛卡兒的『我思故我在（Cogito ergo sum）』是理性主義最著名的命題：即使懷疑一切，正在懷疑的那個『我』的存在是不可懷疑的。" },
    "光學儀器 (Optical instruments)": { type: "tech", description: "17世紀荷蘭的鏡片研磨技術達到了前所未有的精度。斯賓諾莎本人就是一位技藝精湛的鏡片研磨師，以此為生。荷蘭工匠製造的顯微鏡（列文虎克）與望遠鏡（惠更斯）不僅改變了人類觀察微觀與宏觀世界的能力，更催生了實驗科學的蓬勃發展。" },

    // === People glossary ===
    "泰勒斯 (Thales)": { type: "person", description: "西元前6世紀米利都的哲學家，被亞里斯多德譽為『第一位哲學家』。泰勒斯主張萬物的本原（arché）是水，並成功預測了一次日蝕。他代表了人類從神話思維走向理性思維的第一步。" },
    "阿那克西曼德 (Anaximander)": { type: "person", description: "泰勒斯的學生，提出萬物的本原不是任何具體的物質，而是一種不可限定的『無限者（apeiron）』。他還繪製了已知最早的世界地圖，並提出了一種原始的演化論——人類最初是從魚演化而來的。" },
    "阿那克西美尼 (Anaximenes)": { type: "person", description: "米利都學派的第三位哲學家，主張萬物的本原是氣（aer）。他透過氣的稀薄化與濃縮來解釋火、風、雲、水與土的生成，建立了第一個系統性的物質變化理論。" },
    "畢達哥拉斯 (Pythagoras)": { type: "person", description: "西元前6世紀的希臘哲學家與數學家。他發現了弦長與音高的數學比例關係，由此主張『萬物皆數』。畢達哥拉斯定理以他命名，但他的影響遠超數學——他的數學神秘主義深刻影響了柏拉圖的理型論。" },
    "芝諾 (Zeno of Citium)": { type: "person", description: "斯多葛學派的創始人。約西元前300年，他在雅典的『彩繪柱廊（Stoa Poikile）』授課，因此其學派得名『斯多葛（Stoa）』。他主張宇宙由理性的Logos所貫穿，人類應順應自然、克制激情。" },
    "伊壁鳩魯 (Epicurus)": { type: "person", description: "西元前341-270年的希臘哲學家。他在雅典城外建立了『花園學校』，主張人生的最高目標是ataraxia（寧靜無擾）。他認為宇宙由原子構成，神靈存在但不干預人間，死亡只是原子的解散因而不值得恐懼。" },
    "第歐根尼 (Diogenes)": { type: "person", description: "犬儒主義最著名的實踐者。他住在木桶裡，白天提著燈籠在雅典尋找『真正的人』。據說亞歷山大大帝曾問他想要什麼，他回答：『請你閃到一邊，不要擋住我的陽光。』他以行為藝術般的生活方式，徹底嘲諷了文明社會的虛偽。" },
    "普羅提諾 (Plotinus)": { type: "person", description: "新柏拉圖主義的創始人（204-270）。他在亞歷山大港學習後前往羅馬授課，建立了一套宇宙從『太一（The One）』逐層流溢而出的精密形上學體系。他的思想成為基督教神學、猶太神秘主義與伊斯蘭蘇菲主義的共同哲學源泉。" },
    "伊本·西那 (Avicenna/Ibn Sina)": { type: "person", description: "波斯哲學家與醫學家（980-1037），被稱為『醫學之王』。他的《醫典》是歐洲醫學院的標準教科書長達五百年，而他的哲學體系將亞里斯多德的形上學與伊斯蘭神學融合，對托馬斯·阿奎那產生了直接影響。" },
    "伊本·魯世德 (Averroes/Ibn Rushd)": { type: "person", description: "安達盧斯的伊斯蘭哲學家（1126-1198），被歐洲學者尊稱為『注釋者（The Commentator）』。他為亞里斯多德的幾乎所有著作撰寫了三層注釋（簡要、中級、大注疏），其拉丁文譯本在巴黎大學引爆了信仰與理性的世紀大辯論。" },
    "托馬斯·阿奎那 (Thomas Aquinas)": { type: "person", description: "中世紀最偉大的基督教哲學家（1225-1274）。他在巴黎大學面對阿威羅伊主義的挑戰，完成了基督教信仰與亞里斯多德理性的偉大綜合——《神學大全》。他的『五路論證』（用理性證明上帝存在）至今仍是天主教哲學的基石。" },
    "斯賓諾莎 (Baruch Spinoza)": { type: "person", description: "阿姆斯特丹的猶太裔哲學家（1632-1677）。因其泛神論觀點被猶太社區驅逐後，他以研磨鏡片為生，同時撰寫了西方哲學史上最嚴密的形上學著作《倫理學》，用幾何證明的方式推導出『上帝即自然』。" },
    "大衛·休謨 (David Hume)": { type: "person", description: "蘇格蘭哲學家（1711-1776），經驗主義的極致推手。他論證因果律只是心理習慣而非客觀真理，歸納法永遠無法獲得邏輯上的確定性。康德說是休謨將他從『獨斷的沉睡中喚醒』，促使他撰寫了《純粹理性批判》。" },
    "齊克果 (Søren Kierkegaard)": { type: "person", description: "丹麥哲學家（1813-1855），存在主義的先驅。他以極度個人化的筆觸，對抗黑格爾將一切納入理性體系的野心。他認為真正的存在是個人面對上帝時的焦慮與顫慄，而非學術討論中的抽象概念。" },
    "黑格爾 (Georg Wilhelm Friedrich Hegel)": { type: "person", description: "德國哲學家（1770-1831），德國觀念論的集大成者。他的辯證法（正題→反題→合題）與歷史哲學（歷史是絕對精神的自我實現）構成了19世紀最龐大的哲學體系，直接催生了馬克思主義與存在主義兩大反叛運動。" },
    "費爾巴哈 (Ludwig Feuerbach)": { type: "person", description: "德國哲學家（1804-1872），青年黑格爾派的核心人物。他主張不是上帝創造了人，而是人將自己最美好的品質投射到一個想像的實體上創造了上帝。這種『投射論』成為馬克思宗教批判的直接源頭。" }
  };

  for (const [key, value] of Object.entries(newGlossary)) {
    if (!data.glossary[key]) {
      data.glossary[key] = value;
    }
  }

  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), 'utf8');

  // Statistics
  const addedCities = newCities.length;
  const addedRoutes = newRoutes.length;
  const addedGlossary = Object.keys(newGlossary).length;
  console.log(`✅ Batch 1 Complete!`);
  console.log(`   New cities: ${addedCities}`);
  console.log(`   New routes: ${addedRoutes}`);
  console.log(`   New/updated glossary entries: ${addedGlossary}`);
  console.log(`   Expanded cities: ${Object.keys(expansions).length}`);
}

run();
