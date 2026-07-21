const fs = require('fs');
const DATA_PATH = 'src/data.json';

function run() {
  let data = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));

  const newGlossary = {
    // Books & Documents
    "幾何原本 (Elements)": {
      type: "tech",
      description: "古希臘數學家歐幾里得於西元前300年左右在亞歷山大港編寫的數學巨著。它首次將幾何學公理化，用少數不證自明的公理推導出龐大的幾何定理體系。這是人類歷史上最成功的教科書，深刻影響了西方兩千年的科學與邏輯思維。"
    },
    "史記 (Records of the Grand Historian)": {
      type: "tech",
      description: "西漢司馬遷編寫的中國第一部紀傳體通史。記載了從黃帝到漢武帝時期的歷史。其「究天人之際，通古今之變，成一家之言」的宏大視野，奠定了中國兩千年史學寫作的基本範式。"
    },
    "天文學大成 (Almagest)": {
      type: "tech",
      description: "西元2世紀由托勒密在亞歷山大港編寫的天文學著作。它總結了古希臘的天文知識，確立了以地球為宇宙中心的「地心說」數學模型。這套模型主宰了西方與伊斯蘭世界的天文學長達一千四百年，直到哥白尼提出日心說。"
    },
    "天體運行論 (On the Revolutions of the Heavenly Spheres)": {
      type: "tech",
      description: "波蘭天文學家哥白尼於1543年臨終前出版的著作。書中正式提出了「日心說」，將地球從宇宙中心降格為一顆普通行星。這本書引發了科學革命，徹底顛覆了人類的宇宙觀與神學基礎。"
    },
    "自然哲學的數學原理 (Principia Mathematica)": {
      type: "tech",
      description: "牛頓於1687年出版的劃時代巨著（常簡稱為《原理》）。書中提出了運動三大定律與萬有引力定律，用嚴密的數學語言統一了天體運行與地面物體的力學法則。它標誌著科學革命的最高峰與古典力學體系的建立。"
    },
    "人類理解論 (An Essay Concerning Human Understanding)": {
      type: "religion",
      description: "英國哲學家約翰·洛克於1690年出版的哲學名著。書中反對笛卡兒的「天賦觀念」，主張人的心靈初生時是一塊「白板」（Tabula rasa），所有知識都來自後天經驗。這確立了英國經驗主義傳統。"
    },
    "論法的精神 (The Spirit of the Laws)": {
      type: "religion",
      description: "法國啟蒙思想家孟德斯鳩於1748年出版的政治哲學著作。書中系統地提出了行政、立法、司法「三權分立」與制衡的理論，成為後來美國憲法與現代民主制度的基石。"
    },
    "國富論 (The Wealth of Nations)": {
      type: "religion",
      description: "蘇格蘭經濟學家亞當·斯密於1776年出版的著作。書中提出了「看不見的手」引導市場資源配置，並強調勞動分工與自由貿易的重要性。它標誌著古典經濟學的誕生，為資本主義奠定了理論基礎。"
    },
    "獨立宣言 (Declaration of Independence)": {
      type: "religion",
      description: "1776年北美十三州宣告脫離英國統治的政治文件。起草人傑佛遜深受洛克啟蒙思想影響，在文中宣稱「人人生而平等，享有生命、自由與追求幸福的不可剝奪之權利」。它成為了全球民主革命的精神燈塔。"
    },
    "純粹理性批判 (Critique of Pure Reason)": {
      type: "religion",
      description: "德國哲學家康德於1781年出版的哲學巨著。書中對人類理性的認識能力進行了徹底的審查，指出我們只能認識「現象」而無法認識「物自體」。這場「哥白尼式革命」統合了理性主義與經驗主義，開啟了德國古典哲學。"
    },
    "物種起源 (On the Origin of Species)": {
      type: "tech",
      description: "英國生物學家達爾文於1859年出版的科學鉅著。書中提出了「物競天擇」的演化論，證明所有生物都源自共同祖先。這徹底顛覆了神創論，是人類思想史上一次巨大的範式轉移。"
    },
    "資本論 (Das Kapital)": {
      type: "religion",
      description: "卡爾·馬克思對資本主義進行政治經濟學批判的巨著（第一卷於1867年出版）。書中提出了「剩餘價值理論」，揭示了資本家剝削工人的秘密與資本主義的內在矛盾。這本書深刻影響了20世紀的全球政治格局。"
    },
    "夢的解析 (The Interpretation of Dreams)": {
      type: "religion",
      description: "奧地利心理學家佛洛伊德於1899年出版的著作。書中提出夢是「通往潛意識的皇家大道」，並揭示了被壓抑的慾望與心理防衛機制。這本書創立了精神分析學派，深遠地影響了現代心理學、文學與藝術。"
    },
    "聖經 (Bible)": {
      type: "religion",
      description: "猶太教與基督教的神聖文本。古騰堡在1455年使用活字印刷術印製了第一批《四十二行聖經》，這不僅是西方印刷史的里程碑，也打破了教會對經典解釋的壟斷，直接促成了後來的宗教改革。"
    },
    "馬可·波羅遊記 (Travels of Marco Polo)": {
      type: "tech",
      description: "13世紀末威尼斯商人馬可·波羅口述的東方見聞錄。書中描繪了元朝中國的繁華富庶，極大地刺激了歐洲人的想像力。這本書成為了後來哥倫布等航海家尋找東方新航路的精神動力。"
    },
    "夢溪筆談 (Dream Pool Essays)": {
      type: "tech",
      description: "北宋科學家沈括撰寫的百科全書式筆記。書中詳細記載了畢昇的膠泥活字印刷術，以及指南針的磁偏角現象。它是了解中國古代科學技術（特別是宋代科技高峰）最珍貴的文獻。"
    },
    "四書章句集注 (Collected Commentaries on the Four Books)": {
      type: "religion",
      description: "南宋哲學家朱熹對《大學》、《中庸》、《論語》、《孟子》所作的詳細注釋。這部書將儒家思想系統化、哲學化（即「理學」），並在元明清三代成為科舉考試的絕對標準，統治中國思想界達數百年之久。"
    },
    "九十五條論綱 (Ninety-five Theses)": {
      type: "religion",
      description: "1517年馬丁·路德在維騰堡張貼的神學辯論提綱，強烈抨擊教廷販賣贖罪券的腐敗。這份文件藉由新興的印刷術迅速傳遍歐洲，成為引爆宗教改革的導火線。"
    }
  };

  for (const [key, value] of Object.entries(newGlossary)) {
    if (!data.glossary[key]) {
      data.glossary[key] = value;
    }
  }

  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), 'utf8');
  console.log(`Added ${Object.keys(newGlossary).length} books/documents to glossary.`);
}

run();
