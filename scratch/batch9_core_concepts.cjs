const fs = require('fs');
const DATA_PATH = 'src/data.json';

function run() {
  let data = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));

  const newGlossary = {
    // Missing people from GlobalGraph
    "孔子 (Confucius)": { type: "person", description: "春秋時期魯國的思想家、教育家，儒家學派的創始人。他提倡「仁」與「禮」，主張以德治國、有教無類。其言行被弟子記錄在《論語》中，深刻塑造了東亞兩千年的政治倫理與文化性格。" },
    "孟子 (Mencius)": { type: "person", description: "戰國時期儒家代表人物，有「亞聖」之稱。他提出「性善論」，主張「民為貴，社稷次之，君為輕」的民本思想，將儒家倫理推向了更具理想主義與批判性的高度。" },
    "董仲舒 (Dong Zhongshu)": { type: "person", description: "西漢思想家。他將陰陽五行學說融入儒學，提出「天人感應」與「大一統」理論，說服漢武帝「罷黜百家，獨尊儒術」，使儒家正式成為中國兩千年帝制社會的正統意識形態。" },
    "蘇格拉底 (Socrates)": { type: "person", description: "古希臘哲學的奠基者之一。他沒有留下任何著作，但透過在雅典街頭與人進行無休止的「詰問」（蘇格拉底方法），迫使人們反思自己的無知與美德的本質。最終他因「腐蝕青年」的罪名被雅典民主法庭判處死刑。" },
    "柏拉圖 (Plato)": { type: "person", description: "古希臘哲學家，蘇格拉底的學生，亞里斯多德的老師。他創立了雅典學院，並提出了著名的「理型論」（Theory of Forms）與《理想國》的哲學王統治理念。他的思想奠定了整個西方唯心主義哲學的基礎。" },
    "亞里斯多德 (Aristotle)": { type: "person", description: "古希臘哲學的集大成者，柏拉圖的學生，亞歷山大大帝的老師。他對邏輯學、物理學、生物學、倫理學與政治學進行了系統性的分類與研究，被譽為「百科全書式」的學者。他的思想統治了西方與伊斯蘭世界學術界達近兩千年。" },
    "笛卡兒 (René Descartes)": { type: "person", description: "17世紀法國哲學家、數學家與科學家，被譽為「現代哲學之父」。他發明了解析幾何，並在哲學上提出「我思故我在」的心物二元論，開創了歐洲近代哲學的理性主義傳統。" },
    "洛克 (John Locke)": { type: "person", description: "17世紀英國哲學家，經驗主義的奠基者。他主張人心如「白板」，知識源於後天經驗。在政治上，他提出生命、自由、財產的「自然權利」與社會契約論，深刻影響了美國獨立與現代民主制度。" },
    "康德 (Immanuel Kant)": { type: "person", description: "18世紀德國哲學家，啟蒙運動的巔峰人物。他的《純粹理性批判》調和了理性主義與經驗主義，指出人類只能認識現象界，而無法觸及物自體。這場「哥白尼式革命」深刻改變了西方哲學的軌跡。" },
    "達摩 (Bodhidharma)": { type: "person", description: "南印度僧人，傳說於西元6世紀航海抵達中國，成為中國佛教禪宗的初祖。他提倡「不立文字，教外別傳，直指人心，見性成佛」，深刻塑造了東亞佛教的修行面貌。" },
    "法藏 (Fazang)": { type: "person", description: "唐代高僧，中國佛教華嚴宗的實際創立者。他以「金獅子」為喻向武則天講解華嚴深奧的「事事無礙、重重無盡」法界觀，將中國佛教哲學推向了最高峰。" },
    
    // Missing thoughts/concepts from GlobalGraph
    "米利都自然哲學 (Milesian Naturalism)": { type: "religion", description: "古希臘最早的哲學流派，發源於小亞細亞的米利都城。以泰勒斯為代表，他們試圖不用神話，而是用自然物質（如水、氣）來解釋宇宙的本源，標誌著西方科學與理性的開端。" },
    "畢達哥拉斯學派 (Pythagoreanism)": { type: "religion", description: "古希臘哲學流派，認為「萬物皆數」。他們將數學、音樂與靈魂輪迴結合，對幾何學與聲學做出了早期貢獻，深刻影響了後來柏拉圖的理型論。" },
    "理型論 (Platonic Idealism)": { type: "religion", description: "柏拉圖的核心哲學理論。主張現實世界只是完美、永恆的「理型界」（World of Forms）的模糊倒影。真正的知識不能透過感官獲得，只能透過靈魂對理型的「回憶」來把握。" },
    "犬儒主義 (Cynicism)": { type: "religion", description: "古希臘哲學流派，由蘇格拉底的弟子創立（以第歐根尼最為著名）。他們主張回歸自然，蔑視財富、權力與社會習俗，過著極度簡樸、如同乞丐般的生活，以此追求真正的精神自由。" },
    "斯多葛主義 (Stoicism)": { type: "religion", description: "古希臘羅馬時期最具影響力的哲學流派之一。主張宇宙由理性的「邏各斯」統治，人類應該順應自然，控制破壞性的情緒，以達到內心的寧靜與道德的完善。" },
    "斯多葛倫理學 (Stoic Ethics)": { type: "religion", description: "強調美德是唯一的善，外在事物（如健康、財富、名譽）皆為「無關緊要之物」。這種堅忍的倫理觀深刻影響了羅馬帝國的統治階層與早期基督教。" },
    "自然法傳統 (Natural Law Tradition)": { type: "religion", description: "源自斯多葛主義與羅馬法學的理念。認為存在著超越人類立法、基於宇宙理性與人類本性的普遍正義法則。這是現代人權與國際法的哲學起源。" },
    "自然權利論 (Natural Rights Theory)": { type: "religion", description: "由洛克等近代哲學家發展的理論。主張每個人生來就擁有生命、自由與財產等不可剝奪的權利。政府的目的在於保護這些權利，若政府違背此目的，人民有權推翻它。" },
    "教父哲學 (Patristic Philosophy)": { type: "religion", description: "早期基督教神學家（教父）為辯護與系統化基督信仰而發展的哲學。他們大量吸收了希臘哲學（特別是新柏拉圖主義），將聖經啟示與希臘理性融合。" },
    "奧古斯丁神學 (Augustinian Theology)": { type: "religion", description: "由4世紀教父奧古斯丁建立的神學體系。他結合了新柏拉圖主義，提出了原罪論、神恩獨作論與「上帝之城」的概念，統治了中世紀西方教會的思想長達千年。" },
    "文藝復興自然哲學 (Renaissance Natural Philosophy)": { type: "tech", description: "15至16世紀文藝復興時期對自然界的重新探索。伴隨著對古希臘文獻的重新翻譯與人文主義的興起，學者們開始用魔法、鍊金術與初步的觀察來理解自然，為科學革命鋪平了道路。" },
    "懷疑論 (Skepticism)": { type: "religion", description: "一種對人類獲得確定知識的能力表示懷疑的哲學態度。從古希臘到近代的休謨，懷疑論不斷挑戰獨斷的信仰與形上學，迫使哲學家建立更嚴密的知識論基礎。" }
  };

  for (const [key, value] of Object.entries(newGlossary)) {
    if (!data.glossary[key]) {
      data.glossary[key] = value;
    }
  }

  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), 'utf8');
  console.log(`Added ${Object.keys(newGlossary).length} entries to glossary.`);
}

run();
