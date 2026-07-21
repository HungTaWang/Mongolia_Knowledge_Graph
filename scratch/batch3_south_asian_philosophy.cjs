const fs = require('fs');
const DATA_PATH = 'src/data.json';

function run() {
  let data = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));

  // ============================================================
  // PART 1: NEW CITIES
  // ============================================================
  const newCities = [
    {
      id: "varanasi",
      name: "瓦拉納西",
      coordinates: [82.9739, 25.3176],
      description: "印度教最神聖的城市，位於恆河畔。自西元前一千年起，這裡是婆羅門教與《奧義書》哲學的核心發源地。商羯羅等大哲學家都曾在此進行辯論，奠定了印度教吠檀多哲學的正統地位。",
      people: ["商羯羅 (Adi Shankara)", "迦比爾 (Kabir)"],
      tech: [],
      religion: ["奧義書哲學 (Upanishadic Philosophy)", "不二論 (Advaita Vedanta)", "蘇菲與巴克提融合 (Sufi-Bhakti Synthesis)", "印度教 (Hinduism)"],
      infrastructure: ["鹿野苑 (Sarnath)"],
      events: [
        { year: "B.C. 8-6世紀", title: "奧義書的編纂", description: "婆羅門學者在森林與聖城中探討宇宙的終極真實（梵）與個人靈魂（我）的關係，標誌著印度從祭祀宗教轉向深刻的哲學思辨。", numericYear: -700 }
      ],
      numericYear: -800
    },
    {
      id: "nalanda",
      name: "那爛陀",
      coordinates: [85.444, 25.136],
      description: "古代印度規模最宏大、學術水平最高的佛教最高學府（西元5-12世紀）。大乘佛教的中觀派（龍樹）與唯識派（無著）在此發展出極度複雜的認識論體系。玄奘與義淨等中國高僧皆曾在此留學。",
      people: ["龍樹 (Nagarjuna)", "無著 (Asanga)", "世親 (Vasubandhu)"],
      tech: [],
      religion: ["龍樹中觀學 (Madhyamaka)", "無著唯識學 (Yogacara)", "大乘佛教 (Mahayana Buddhism)", "密教 (Vajrayana)"],
      infrastructure: ["那爛陀寺 (Nalanda Mahavihara)"],
      events: [
        { year: "A.D. 2-4世紀", title: "大乘佛教哲學的系統化", description: "龍樹與無著將早期佛教的空性思想與心理學發展為嚴密的哲學體系（中觀與唯識），成為後來整個東亞佛教的理論基石。", numericYear: 300 }
      ],
      numericYear: 300
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
    "magadha": { // 摩揭陀 (B.C. 563)
      religion: [
        "早期佛教 (Early Buddhism)",
        "耆那教 (Jainism)",
        "數論派 (Samkhya)",
        "順世論 (Charvaka/Materialism)"
      ],
      people: ["伐達摩那/大雄 (Mahavira)"] // Buddha is already there? (Gautama Buddha)
    },
    "delhi": { // 德里 (A.D. 1526 -> extend back to Sultanate)
      religion: [
        "限定不二論 (Vishishtadvaita)",
        "蘇菲與巴克提融合 (Sufi-Bhakti Synthesis)",
        "錫克教 (Sikhism)"
      ],
      people: ["羅摩努闍 (Ramanuja)", "納納克 (Guru Nanak)"]
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

  // Check if Buddha is in magadha
  const magadha = data.cities.find(c => c.id === "magadha");
  if (magadha && !magadha.people.includes("釋迦牟尼 (Gautama Buddha)")) {
    magadha.people.push("釋迦牟尼 (Gautama Buddha)");
  }

  // ============================================================
  // PART 3: NEW ROUTES (Physical transmission of philosophy)
  // ============================================================
  const newRoutes = [
    // Upanishads & Shramana
    { source: "varanasi", target: "magadha", label: "瓦拉納西→摩揭陀 沙門思潮的崛起", year: "B.C. 6世紀", type: "religion", numericYear: -500, description: "針對正統婆羅門教祭祀的僵化，摩揭陀地區興起了反叛的『沙門思潮』，佛教與耆那教由此誕生，挑戰了吠陀權威。" },
    // Mahayana integration
    { source: "magadha", target: "nalanda", label: "摩揭陀→那爛陀 大乘哲學學術化", year: "A.D. 2-5世紀", type: "religion", numericYear: 300, description: "早期佛教的修行體驗，在那爛陀寺被龍樹與無著轉化為極度複雜的經院哲學（中觀與唯識），標誌著佛教哲學的最高峰。" },
    // Nalanda -> Dunhuang
    { source: "nalanda", target: "dunhuang", label: "那爛陀→敦煌 唯識學東傳", year: "A.D. 7世紀", type: "religion", numericYear: 645, description: "玄奘在那爛陀寺留學多年，將最完整的唯識學經典帶回中國，經由敦煌傳入長安。" },
    // Vedanta revival
    { source: "nalanda", target: "varanasi", label: "那爛陀→瓦拉納西 不二論的復興", year: "A.D. 8世紀", type: "religion", numericYear: 800, description: "面對佛教哲學的挑戰，商羯羅在瓦拉納西等地吸收了中觀學的邏輯，建立了『不二論』，成功復興了印度教正統地位，導致佛教在印度本土衰落。" },
    // Bhakti & Sufi
    { source: "varanasi", target: "delhi", label: "瓦拉納西→德里 巴克提與蘇菲的交匯", year: "A.D. 12-15世紀", type: "religion", numericYear: 1400, description: "伊斯蘭教進入印度後，強調神與人之間充滿愛的直接溝通的『巴克提運動』（來自印度教）與『蘇菲主義』（來自伊斯蘭）在北印度的德里與旁遮普地區產生了深刻的思想融合。" }
  ];

  newRoutes.forEach(nr => {
    const exists = data.routes.find(r => r.source === nr.source && r.target === nr.target && r.label === nr.label);
    if (!exists) {
      data.routes.push(nr);
    }
  });

  // ============================================================
  // PART 4: GLOSSARY — South Asian Philosophy concepts (EPIC depth)
  // ============================================================
  const newGlossary = {
    // === Vedic / Heterodox ===
    "奧義書哲學 (Upanishadic Philosophy)": { type: "religion", description: "西元前8-6世紀印度古老文獻《奧義書》中的哲學思想。它將早期吠陀宗教繁瑣的外在祭祀，內化為對宇宙終極真實的思辨。其核心命題是『梵我合一（Tat Tvam Asi）』：宇宙的最高實體（梵, Brahman）與個人靈魂的本質（我, Atman）在根本上是同一的。這是印度形上學的基石，影響了後世所有的印度思想。" },
    "早期佛教 (Early Buddhism)": { type: "religion", description: "西元前6世紀由釋迦牟尼創立。針對婆羅門教的種姓制度與實體宇宙觀，早期佛教提出了『四聖諦』（苦集滅道）與『緣起論』。它主張『諸行無常，諸法無我』——世界上沒有永恆不變的靈魂（神我），一切都是因緣條件的生滅。這是一種極度清醒的心理分析與解脫實踐，拒絕形上學的玄想。" },
    "耆那教 (Jainism)": { type: "religion", description: "與佛教同時代興起的沙門宗教，由大雄（伐達摩那）集大成。耆那教將『非暴力（Ahimsa）』推向極致，認為萬物（包括植物與微小生物）皆有靈魂（命我）。為了停止業力的積累並達成解脫，耆那教徒奉行極度嚴格的苦行與素食主義。其『相對論（Anekantavada）』主張真理是多面的，深刻影響了印度的寬容思想。" },
    "數論派 (Samkhya)": { type: "religion", description: "印度教正統六派哲學中最古老的一派。它建立了一套嚴密的二元論：宇宙由『原質（Prakriti，物質與能量的基質）』與『神我（Purusha，純粹的意識）』組成。當神我被原質的演化所迷惑時就會產生痛苦，解脫在於辨明兩者的絕對區別。這套宇宙發生論深刻影響了佛教與瑜伽派。" },
    "順世論 (Charvaka/Materialism)": { type: "religion", description: "古印度激進的唯物主義與無神論學派。他們拒絕吠陀權威，否定靈魂、輪迴與業力，主張世界僅由地、水、火、風四大元素構成。意識只是物質結合產生的副產品（就像酒發酵產生醉人的力量）。順世論主張人生的唯一目標就是在現世追求快樂，是印度思想史中一抹極度世俗化的色彩。" },

    // === Mahayana / Tantra ===
    "龍樹中觀學 (Madhyamaka)": { type: "religion", description: "大乘佛教最重要的哲學基礎，由2世紀的龍樹創立。中觀學以『八不中道』（不生不滅，不常不斷，不一不異，不來不出）破除一切對實體（自性）的執著。龍樹認為『空』不是虛無，而是『緣起』的同義詞——正因為萬物沒有絕對獨立的實體，萬物才可能發生聯繫。這套極度銳利的辯證法徹底改變了東方哲學的邏輯框架。" },
    "無著唯識學 (Yogacara)": { type: "religion", description: "大乘佛教的另一大支柱，由4世紀的無著與世親創立。針對中觀學可能導致的虛無主義誤解，唯識學主張『境空心有』：外在的客觀世界是空的，但我們認識世界的主觀意識作用（識）是存在的。他們將人類心理劃分為極度精密的八識系統，特別是潛意識的『阿賴耶識』。這可以被視為古代世界最深刻的現象學與精神分析。" },
    "密教 (Vajrayana)": { type: "religion", description: "大乘佛教在7世紀後與印度教怛特羅（Tantra）思想融合產生的晚期形態。密教不再單純依賴漫長的理性思辨與禁慾，而是主張透過咒語（真言）、手印與曼荼羅，甚至利用人類的慾望與身體能量，來達成『即身成佛』的頓悟。密教在那爛陀寺晚期極度興盛，隨後傳入西藏與日本（真言宗）。" },

    // === Vedanta & Syncretism ===
    "不二論 (Advaita Vedanta)": { type: "religion", description: "8世紀由商羯羅（Adi Shankara）建立的印度教哲學體系。他吸收了佛教中觀學的邏輯（常被稱為『暗中的佛教徒』），嚴格論證了『奧義書』的終極真理：宇宙中唯一的真實是沒有屬性的『梵』。我們所看到的多樣化世界只是一種宇宙級的幻象（摩耶, Maya）。靈魂與梵絕對不二。這套哲學成功擊敗了佛教，確立了印度教的正統地位。" },
    "限定不二論 (Vishishtadvaita)": { type: "religion", description: "11世紀由羅摩努闍（Ramanuja）提出的吠檀多哲學。反對商羯羅將世界視為幻象的冷酷觀點，羅摩努闍主張梵是有位格的上帝（通常指毗濕奴），而世界與個別靈魂是上帝真實的『身體』或屬性。兩者既一又異。這為對神充滿感情的敬愛（巴克提）提供了堅實的哲學基礎。" },
    "蘇菲與巴克提融合 (Sufi-Bhakti Synthesis)": { type: "religion", description: "中世紀晚期印度次大陸最動人的文化現象。伊斯蘭教的蘇菲派（強調透過愛與神秘體驗與真主合一）與印度教的巴克提運動（強調對特定神祇的狂熱敬愛）在底層社會產生了強烈的共鳴。迦比爾等詩人嘲笑婆羅門與毛拉的虛偽教條，宣唱『神在我們每個人的心裡』。這種融合打破了宗教藩籬，成為印度平民最深層的信仰底色。" },
    "錫克教 (Sikhism)": { type: "religion", description: "15世紀末由納納克（Guru Nanak）在旁遮普地區創立的宗教。錫克教直接吸收了蘇菲派與巴克提運動的精華，主張一神論，但徹底廢除了印度教的種姓制度與繁瑣祭祀。錫克教徒強調人人平等、誠實勞動與佩劍保衛正義。這是一個從純粹的精神融合走向社會與軍事改革的獨特宗教實踐。" },

    // === People ===
    "伐達摩那/大雄 (Mahavira)": { type: "person", description: "耆那教的第24代祖師（尊稱為大雄，西元前599-527），與釋迦牟尼同時代。他放棄了王子的地位，進行了長達12年的極度苦行，最終獲得完全的覺悟。他確立了耆那教『不殺生』、『不妄語』等五誓戒，其教導至今仍指引著印度數百萬耆那教徒。" },
    "龍樹 (Nagarjuna)": { type: "person", description: "西元2世紀的南印度佛教哲學家，被大乘佛教尊為『八宗共祖』。他運用極其銳利的反證法邏輯，在《中論》中徹底摧毀了任何對『實體自性』的執著，建立了『空性』的哲學框架。他的思想深度足以與西方的康德比肩。" },
    "無著 (Asanga)": { type: "person", description: "西元4世紀的佛教大乘論師，唯識宗的共同創立者。傳說他在禪定中上升至兜率天聽彌勒菩薩講法。他與弟弟世親共同將人類的意識結構進行了極其細密的解剖，將大乘佛教從中觀的『破』轉向唯識的『立』。" },
    "商羯羅 (Adi Shankara)": { type: "person", description: "西元8世紀的印度教偉大改革家與哲學家。雖然年僅32歲便逝世，但他遊歷全印度，在無數次哲學辯論中擊敗佛教與其他學派，建立了『不二論（Advaita）』的絕對統治地位，並建立了四大修道院，被視為印度教復興的關鍵人物。" },
    "羅摩努闍 (Ramanuja)": { type: "person", description: "西元11世紀的印度教哲學家。他對商羯羅冷峻的『幻象論』提出強烈批評，認為神對人類充滿了愛，人類也應該以虔誠（巴克提）來回應神。他的『限定不二論』為印度教的信神運動提供了完美的理論支撐。" },
    "迦比爾 (Kabir)": { type: "person", description: "15世紀印度最偉大的神秘主義詩人。他出身穆斯林織工家庭，卻深受印度教巴克提運動影響。他的詩歌尖銳地嘲諷印度教與伊斯蘭教的教條主義，主張超越宗教形式去尋找內心的神。至今印度教徒與穆斯林都將他視為聖人。" },
    "納納克 (Guru Nanak)": { type: "person", description: "錫克教的第一代祖師（1469-1539）。他在一次神秘體驗中獲得啟示：『沒有印度教徒，也沒有穆斯林，只有神的路。』他畢生遊歷南亞甚至遠赴麥加，傳播平等、友愛與真理的教導，奠定了錫克教的基礎。" }
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
  console.log(`✅ Batch 3 Complete!`);
  console.log(`   New cities: ${addedCities}`);
  console.log(`   New routes: ${addedRoutes}`);
  console.log(`   New/updated glossary entries: ${addedGlossary}`);
  console.log(`   Expanded cities: ${Object.keys(expansions).length}`);
}

run();
