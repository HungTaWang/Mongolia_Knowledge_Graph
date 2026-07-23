const fs = require('fs');

let code = fs.readFileSync('./src/GlobalGraph.tsx', 'utf8');

// Find the successions block and replace it
const startMarker = '// 承先啟後的繼承關係對照表';
const endMarker = '};';

const startIdx = code.indexOf(startMarker);
if (startIdx === -1) { console.error('Start marker not found!'); process.exit(1); }

// Find the closing }; of the successions object
let braceCount = 0;
let endIdx = -1;
for (let i = code.indexOf('{', startIdx); i < code.length; i++) {
  if (code[i] === '{') braceCount++;
  if (code[i] === '}') braceCount--;
  if (braceCount === 0) {
    endIdx = i + 2; // include }; 
    break;
  }
}

if (endIdx === -1) { console.error('End marker not found!'); process.exit(1); }

const newSuccessions = `// 承先啟後的繼承關係對照表
const successions: Record<string, string[]> = {
  // ============================================
  // 🏛️ 西方哲學：從古希臘到後現代
  // ============================================

  // 古希臘
  "米利都自然哲學 (Milesian Naturalism)": ["畢達哥拉斯學派 (Pythagoreanism)", "原子論 (Atomism)"],
  "畢達哥拉斯學派 (Pythagoreanism)": ["理型論 (Platonic Idealism)"],
  "蘇格拉底方法 (Socratic Method)": ["理型論 (Platonic Idealism)", "犬儒主義 (Cynicism)"],
  "理型論 (Platonic Idealism)": ["新柏拉圖主義 (Neoplatonism)", "新柏拉圖主義復興 (Neoplatonic Revival)"],
  "原子論 (Atomism)": ["伊壁鳩魯主義 (Epicureanism)"],
  "斯多葛主義 (Stoicism)": ["斯多葛倫理學 (Stoic Ethics)", "自然法傳統 (Natural Law Tradition)"],
  "自然法傳統 (Natural Law Tradition)": ["自然權利論 (Natural Rights Theory)"],

  // 中世紀：教父哲學 → 經院哲學，以及伊斯蘭哲學的注入
  "新柏拉圖主義 (Neoplatonism)": ["教父哲學 (Patristic Philosophy)", "奧古斯丁神學 (Augustinian Theology)"],
  "奧古斯丁神學 (Augustinian Theology)": ["經院哲學 (Scholasticism)"],
  "穆塔齊賴派 (Mu'tazila Rationalism)": ["伊斯蘭哲學 (Islamic Philosophy/Falsafa)"],
  "伊斯蘭哲學 (Islamic Philosophy/Falsafa)": ["阿威羅伊主義 (Averroism)", "蘇菲主義 (Sufism)"],
  "阿威羅伊主義 (Averroism)": ["經院哲學 (Scholasticism)", "托馬斯主義 (Thomism)"],
  "經院哲學 (Scholasticism)": ["托馬斯主義 (Thomism)"],

  // 文藝復興 → 近代哲學
  "新柏拉圖主義復興 (Neoplatonic Revival)": ["人文主義 (Humanism)"],
  "人文主義 (Humanism)": ["文藝復興自然哲學 (Renaissance Natural Philosophy)"],
  "文藝復興自然哲學 (Renaissance Natural Philosophy)": ["心物二元論 (Mind-Body Dualism)"],
  "心物二元論 (Mind-Body Dualism)": ["理性主義 (Rationalism)"],

  // 近代：理性主義 vs 經驗主義
  "理性主義 (Rationalism)": ["泛神論 (Pantheism)", "德國觀念論 (German Idealism)"],
  "伊壁鳩魯主義 (Epicureanism)": ["經驗主義 (Empiricism)"],
  "經驗主義 (Empiricism)": ["懷疑論 (Skepticism)", "蘇格蘭啟蒙運動 (Scottish Enlightenment)", "邏輯實證主義 (Logical Positivism)"],
  "懷疑論 (Skepticism)": ["德國觀念論 (German Idealism)"],

  // 啟蒙運動及其分支
  "泛神論 (Pantheism)": ["啟蒙運動 (The Enlightenment)"],
  "蘇格蘭啟蒙運動 (Scottish Enlightenment)": ["功利主義 (Utilitarianism)", "自由主義 (Liberalism)"],
  "道德情感論 (Moral Sentimentalism)": ["功利主義 (Utilitarianism)"],
  "啟蒙運動 (The Enlightenment)": ["社會契約論 (Social Contract Theory)", "百科全書派 (Encyclopédistes)", "實證主義 (Positivism)"],
  "社會契約論 (Social Contract Theory)": ["自由主義 (Liberalism)"],
  "自由主義 (Liberalism)": ["古典經濟學 (Classical Economics)"],
  "古典經濟學 (Classical Economics)": ["馬克思主義政治經濟學 (Marxist Political Economy)"],

  // 德國觀念論 → 黑格爾 → 馬克思 / 存在主義
  "德國觀念論 (German Idealism)": ["黑格爾辯證法 (Hegelian Dialectics)"],
  "黑格爾辯證法 (Hegelian Dialectics)": ["青年黑格爾派 (Young Hegelians)", "存在主義 (Existentialism)", "辯證唯物主義 (Dialectical Materialism)"],
  "青年黑格爾派 (Young Hegelians)": ["費爾巴哈唯物主義 (Feuerbachian Materialism)"],
  "費爾巴哈唯物主義 (Feuerbachian Materialism)": ["辯證唯物主義 (Dialectical Materialism)"],
  "辯證唯物主義 (Dialectical Materialism)": ["馬克思主義政治經濟學 (Marxist Political Economy)"],

  // 存在主義 → 現象學 → 後現代
  "存在主義 (Existentialism)": ["信仰之躍 (Leap of Faith)", "現象學 (Phenomenology)"],
  "現象學 (Phenomenology)": ["結構主義 (Structuralism)"],
  "結構主義 (Structuralism)": ["後現代主義 (Postmodernism)"],

  // 實證 → 心理學；分析哲學
  "實證主義 (Positivism)": ["實驗心理學 (Experimental Psychology)"],
  "實驗心理學 (Experimental Psychology)": ["精神分析學 (Psychoanalysis)"],
  "邏輯實證主義 (Logical Positivism)": ["分析哲學 (Analytic Philosophy)"],

  // ============================================
  // ☯️ 中國哲學：從易經到近代
  // ============================================

  "易經哲學 (Philosophy of I Ching)": ["陰陽五行 (Yin-Yang and Five Elements)", "道家自然觀 (Daoist Naturalism)", "儒家 (Confucianism)"],
  "法家 (Legalism)": ["儒家 (Confucianism)"],
  "儒家 (Confucianism)": ["天人感應 (Telepathy between Heaven and Man)"],
  "陰陽五行 (Yin-Yang and Five Elements)": ["天人感應 (Telepathy between Heaven and Man)"],
  "天人感應 (Telepathy between Heaven and Man)": ["經學 (Classical Studies)"],
  "經學 (Classical Studies)": ["魏晉玄學 (Wei-Jin Xuanxue)"],
  "道家自然觀 (Daoist Naturalism)": ["黃老之學 (Huang-Lao Daoism)", "魏晉玄學 (Wei-Jin Xuanxue)"],
  "黃老之學 (Huang-Lao Daoism)": ["魏晉玄學 (Wei-Jin Xuanxue)"],
  "魏晉玄學 (Wei-Jin Xuanxue)": ["般若學 (Prajna)"],
  "大乘佛教 (Mahayana Buddhism)": ["般若學 (Prajna)"],
  "般若學 (Prajna)": ["唯識宗 (Yogacara/Consciousness-Only)", "華嚴宗 (Huayan School)", "禪宗 (Zen Buddhism)", "中國化佛教 (Sinicized Buddhism)"],
  "中國化佛教 (Sinicized Buddhism)": ["宋明理學 (Neo-Confucianism)"],
  "宋明理學 (Neo-Confucianism)": ["陸王心學 (School of Mind)", "日本朱子學 (Japanese Neo-Confucianism)"],
  "陸王心學 (School of Mind)": ["考據學/清代樸學 (Evidential Research/Han Learning)", "日本陽明學 (Japanese Yangmingism)"],
  "日本陽明學 (Japanese Yangmingism)": ["中體西用 (Chinese Learning as Substance, Western Learning for Application)"],

  // ============================================
  // 🕉️ 印度哲學：從奧義書到融合
  // ============================================

  "奧義書哲學 (Upanishadic Philosophy)": ["早期佛教 (Early Buddhism)", "耆那教 (Jainism)", "數論派 (Samkhya)", "不二論 (Advaita Vedanta)"],
  "早期佛教 (Early Buddhism)": ["大乘佛教 (Mahayana Buddhism)", "龍樹中觀學 (Madhyamaka)"],
  "數論派 (Samkhya)": ["無著唯識學 (Yogacara)"],
  "龍樹中觀學 (Madhyamaka)": ["無著唯識學 (Yogacara)", "不二論 (Advaita Vedanta)"],
  "無著唯識學 (Yogacara)": ["唯識宗 (Yogacara/Consciousness-Only)"],
  "不二論 (Advaita Vedanta)": ["限定不二論 (Vishishtadvaita)"],
  "限定不二論 (Vishishtadvaita)": ["巴克提運動 (Bhakti Movement)"],
  "蘇菲主義 (Sufism)": ["蘇菲與巴克提融合 (Sufi-Bhakti Synthesis)"],
  "巴克提運動 (Bhakti Movement)": ["蘇菲與巴克提融合 (Sufi-Bhakti Synthesis)"],
  "蘇菲與巴克提融合 (Sufi-Bhakti Synthesis)": ["錫克教 (Sikhism)"],

  // ============================================
  // 👤 西方哲學人物傳承
  // ============================================

  "泰勒斯 (Thales)": ["畢達哥拉斯 (Pythagoras)"],
  "蘇格拉底 (Socrates)": ["柏拉圖 (Plato)", "第歐根尼 (Diogenes)"],
  "柏拉圖 (Plato)": ["亞里斯多德 (Aristotle)"],
  "亞里斯多德 (Aristotle)": ["肯迪 (Al-Kindi)"],
  "肯迪 (Al-Kindi)": ["法拉比 (Al-Farabi)"],
  "法拉比 (Al-Farabi)": ["伊本·西那 (Avicenna/Ibn Sina)"],
  "伊本·西那 (Avicenna/Ibn Sina)": ["伊本·魯世德 (Averroes/Ibn Rushd)"],
  "伊本·魯世德 (Averroes/Ibn Rushd)": ["托馬斯·阿奎那 (Thomas Aquinas)"],
  "笛卡兒 (René Descartes)": ["斯賓諾莎 (Baruch Spinoza)"],
  "斯賓諾莎 (Baruch Spinoza)": ["大衛·休謨 (David Hume)"],
  "洛克 (John Locke)": ["大衛·休謨 (David Hume)"],
  "大衛·休謨 (David Hume)": ["康德 (Immanuel Kant)"],
  "康德 (Immanuel Kant)": ["黑格爾 (Georg Wilhelm Friedrich Hegel)"],
  "黑格爾 (Georg Wilhelm Friedrich Hegel)": ["費爾巴哈 (Ludwig Feuerbach)", "齊克果 (Søren Kierkegaard)"],
  "費爾巴哈 (Ludwig Feuerbach)": ["卡爾·馬克思 (Karl Marx)"],
  "伏爾泰 (Voltaire)": ["盧梭 (Jean-Jacques Rousseau)"],
  "亞當·斯密 (Adam Smith)": ["卡爾·馬克思 (Karl Marx)"],
  "卡爾·馬克思 (Karl Marx)": ["弗里德里希·恩格斯 (Friedrich Engels)"],
  "奧古斯特·孔德 (Auguste Comte)": ["威廉·馮特 (Wilhelm Wundt)"],
  "威廉·馮特 (Wilhelm Wundt)": ["西格蒙德·佛洛伊德 (Sigmund Freud)"],
  "西格蒙德·佛洛伊德 (Sigmund Freud)": ["讓-保羅·沙特 (Jean-Paul Sartre)"],
  "讓-保羅·沙特 (Jean-Paul Sartre)": ["米歇爾·傅柯 (Michel Foucault)"],

  // ============================================
  // 👤 東方哲學人物傳承
  // ============================================

  "老子 (Laozi)": ["莊子 (Zhuangzi)"],
  "莊子 (Zhuangzi)": ["王弼 (Wang Bi)"],
  "孔子 (Confucius)": ["孟子 (Mencius)"],
  "孟子 (Mencius)": ["荀子 (Xunzi)"],
  "荀子 (Xunzi)": ["董仲舒 (Dong Zhongshu)"],
  "朱熹 (Zhu Xi)": ["王陽明 (Wang Yangming)"],
  "王陽明 (Wang Yangming)": ["顧炎武 (Gu Yanwu)", "吉田松陰 (Yoshida Shoin)"],

  // ============================================
  // 👤 印度哲學人物傳承
  // ============================================

  "釋迦牟尼 (Gautama Buddha)": ["龍樹 (Nagarjuna)"],
  "龍樹 (Nagarjuna)": ["無著 (Asanga)"],
  "無著 (Asanga)": ["玄奘 (Xuanzang)"],
  "玄奘 (Xuanzang)": ["法藏 (Fazang)"],
  "達摩 (Bodhidharma)": ["慧能 (Huineng)"],
  "商羯羅 (Adi Shankara)": ["羅摩努闍 (Ramanuja)"],
  "羅摩努闍 (Ramanuja)": ["迦比爾 (Kabir)"],
  "迦比爾 (Kabir)": ["納納克 (Guru Nanak)"]
};`;

code = code.substring(0, startIdx) + newSuccessions + code.substring(endIdx);
fs.writeFileSync('./src/GlobalGraph.tsx', code, 'utf8');
console.log('GlobalGraph.tsx successions rewritten successfully!');
