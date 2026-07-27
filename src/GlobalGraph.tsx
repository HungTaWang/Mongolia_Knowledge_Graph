import { useMemo, useEffect, useState, useRef } from 'react';
import ForceGraph2D from 'react-force-graph-2d';

interface GlobalGraphProps {
  data: any;
  type: 'thoughts' | 'people';
  currentYear: number;
  onEntityClick: (entityName: string) => void;
}

const branchMapping: Record<string, string> = {
  // Western
  "米利都自然哲學 (Milesian Naturalism)": "Western", "畢達哥拉斯學派 (Pythagoreanism)": "Western", "蘇格拉底方法 (Socratic Method)": "Western", "理型論 (Platonic Idealism)": "Western", "原子論 (Atomism)": "Western", "斯多葛主義 (Stoicism)": "Western", "斯多葛倫理學 (Stoic Ethics)": "Western", "自然法傳統 (Natural Law Tradition)": "Western", "自然權利論 (Natural Rights Theory)": "Western", "新柏拉圖主義 (Neoplatonism)": "Western", "教父哲學 (Patristic Philosophy)": "Western", "奧古斯丁神學 (Augustinian Theology)": "Western", "經院哲學 (Scholasticism)": "Western", "托馬斯主義 (Thomism)": "Western", "新柏拉圖主義復興 (Neoplatonic Revival)": "Western", "人文主義 (Humanism)": "Western", "文藝復興自然哲學 (Renaissance Natural Philosophy)": "Western", "心物二元論 (Mind-Body Dualism)": "Western", "理性主義 (Rationalism)": "Western", "泛神論 (Pantheism)": "Western", "德國觀念論 (German Idealism)": "Western", "伊壁鳩魯主義 (Epicureanism)": "Western", "經驗主義 (Empiricism)": "Western", "懷疑論 (Skepticism)": "Western", "蘇格蘭啟蒙運動 (Scottish Enlightenment)": "Western", "邏輯實證主義 (Logical Positivism)": "Western", "啟蒙運動 (The Enlightenment)": "Western", "功利主義 (Utilitarianism)": "Western", "自由主義 (Liberalism)": "Western", "道德情感論 (Moral Sentimentalism)": "Western", "社會契約論 (Social Contract Theory)": "Western", "百科全書派 (Encyclopédistes)": "Western", "實證主義 (Positivism)": "Western", "古典經濟學 (Classical Economics)": "Western", "馬克思主義政治經濟學 (Marxist Political Economy)": "Western", "黑格爾辯證法 (Hegelian Dialectics)": "Western", "青年黑格爾派 (Young Hegelians)": "Western", "存在主義 (Existentialism)": "Western", "辯證唯物主義 (Dialectical Materialism)": "Western", "費爾巴哈唯物主義 (Feuerbachian Materialism)": "Western", "信仰之躍 (Leap of Faith)": "Western", "現象學 (Phenomenology)": "Western", "結構主義 (Structuralism)": "Western", "後現代主義 (Postmodernism)": "Western", "實驗心理學 (Experimental Psychology)": "Western", "精神分析學 (Psychoanalysis)": "Western", "分析哲學 (Analytic Philosophy)": "Western", "犬儒主義 (Cynicism)": "Western",
  "泰勒斯 (Thales)": "Western", "畢達哥拉斯 (Pythagoras)": "Western", "蘇格拉底 (Socrates)": "Western", "柏拉圖 (Plato)": "Western", "第歐根尼 (Diogenes)": "Western", "亞里斯多德 (Aristotle)": "Western", "托馬斯·阿奎那 (Thomas Aquinas)": "Western", "笛卡兒 (René Descartes)": "Western", "斯賓諾莎 (Baruch Spinoza)": "Western", "大衛·休謨 (David Hume)": "Western", "洛克 (John Locke)": "Western", "康德 (Immanuel Kant)": "Western", "黑格爾 (Georg Wilhelm Friedrich Hegel)": "Western", "費爾巴哈 (Ludwig Feuerbach)": "Western", "齊克果 (Søren Kierkegaard)": "Western", "卡爾·馬克思 (Karl Marx)": "Western", "伏爾泰 (Voltaire)": "Western", "盧梭 (Jean-Jacques Rousseau)": "Western", "亞當·斯密 (Adam Smith)": "Western", "弗里德里希·恩格斯 (Friedrich Engels)": "Western", "奧古斯特·孔德 (Auguste Comte)": "Western", "威廉·馮特 (Wilhelm Wundt)": "Western", "西格蒙德·佛洛伊德 (Sigmund Freud)": "Western", "讓-保羅·沙特 (Jean-Paul Sartre)": "Western", "米歇爾·傅柯 (Michel Foucault)": "Western",
  
  // Islamic
  "穆塔齊賴派 (Mu'tazila Rationalism)": "Islamic", "伊斯蘭哲學 (Islamic Philosophy/Falsafa)": "Islamic", "阿威羅伊主義 (Averroism)": "Islamic", "蘇菲主義 (Sufism)": "Islamic",
  "肯迪 (Al-Kindi)": "Islamic", "法拉比 (Al-Farabi)": "Islamic", "伊本·西那 (Avicenna/Ibn Sina)": "Islamic", "伊本·魯世德 (Averroes/Ibn Rushd)": "Islamic",

  // Eastern (Chinese/East Asian)
  "易經哲學 (Philosophy of I Ching)": "Eastern", "陰陽五行 (Yin-Yang and Five Elements)": "Eastern", "道家自然觀 (Daoist Naturalism)": "Eastern", "儒家 (Confucianism)": "Eastern", "法家 (Legalism)": "Eastern", "天人感應 (Telepathy between Heaven and Man)": "Eastern", "經學 (Classical Studies)": "Eastern", "魏晉玄學 (Wei-Jin Xuanxue)": "Eastern", "黃老之學 (Huang-Lao Daoism)": "Eastern", "般若學 (Prajna)": "Eastern", "華嚴宗 (Huayan School)": "Eastern", "禪宗 (Zen Buddhism)": "Eastern", "中國化佛教 (Sinicized Buddhism)": "Eastern", "宋明理學 (Neo-Confucianism)": "Eastern", "陸王心學 (School of Mind)": "Eastern", "日本朱子學 (Japanese Neo-Confucianism)": "Eastern", "考據學/清代樸學 (Evidential Research/Han Learning)": "Eastern", "日本陽明學 (Japanese Yangmingism)": "Eastern", "中體西用 (Chinese Learning as Substance, Western Learning for Application)": "Eastern", "墨家兼愛非攻 (Mohism)": "Eastern", "名家辯學 (School of Names)": "Eastern", "讖緯學 (Chenwei/Theology of Texts)": "Eastern", "道教內丹術 (Daoist Internal Alchemy)": "Eastern", "朝鮮朱子學 (Korean Neo-Confucianism)": "Eastern",
  "老子 (Laozi)": "Eastern", "莊子 (Zhuangzi)": "Eastern", "王弼 (Wang Bi)": "Eastern", "孔子 (Confucius)": "Eastern", "孟子 (Mencius)": "Eastern", "荀子 (Xunzi)": "Eastern", "董仲舒 (Dong Zhongshu)": "Eastern", "朱熹 (Zhu Xi)": "Eastern", "王陽明 (Wang Yangming)": "Eastern", "顧炎武 (Gu Yanwu)": "Eastern", "吉田松陰 (Yoshida Shoin)": "Eastern", "玄奘 (Xuanzang)": "Eastern", "法藏 (Fazang)": "Eastern", "慧能 (Huineng)": "Eastern", "墨子 (Mozi)": "Eastern", "惠施 (Hui Shi)": "Eastern", "公孫龍 (Gongsun Long)": "Eastern", "鄒衍 (Zou Yan)": "Eastern", "韓非子 (Han Feizi)": "Eastern", "張載 (Zhang Zai)": "Eastern", "程頤 (Cheng Yi)": "Eastern", "程顥 (Cheng Hao)": "Eastern", "陸九淵 (Lu Jiuyuan)": "Eastern", "黃宗羲 (Huang Zongxi)": "Eastern", "退溪李滉 (Yi Hwang/Toegye)": "Eastern", "栗谷李珥 (Yi I/Yulgok)": "Eastern",

  // Indian
  "奧義書哲學 (Upanishadic Philosophy)": "Indian", "早期佛教 (Early Buddhism)": "Indian", "耆那教 (Jainism)": "Indian", "數論派 (Samkhya)": "Indian", "不二論 (Advaita Vedanta)": "Indian", "大乘佛教 (Mahayana Buddhism)": "Indian", "龍樹中觀學 (Madhyamaka)": "Indian", "無著唯識學 (Yogacara)": "Indian", "唯識宗 (Yogacara/Consciousness-Only)": "Indian", "限定不二論 (Vishishtadvaita)": "Indian", "巴克提運動 (Bhakti Movement)": "Indian",
  "錫克教 (Sikhism)": "Indian",
  "釋迦牟尼 (Gautama Buddha)": "Indian", "龍樹 (Nagarjuna)": "Indian", "無著 (Asanga)": "Indian", "達摩 (Bodhidharma)": "Indian", "商羯羅 (Adi Shankara)": "Indian", "羅摩努闍 (Ramanuja)": "Indian", "迦比爾 (Kabir)": "Indian", "納納克 (Guru Nanak)": "Indian",

  // Synthesis
  "蘇菲與巴克提融合 (Sufi-Bhakti Synthesis)": "Synthesis"
};

const getBranch = (itemName: string) => branchMapping[itemName] || 'Unknown';
const getYByBranch = (branch: string) => {
  switch (branch) {
    case 'Western': return -220;
    case 'Islamic': return -70;
    case 'Synthesis': return 0;
    case 'Indian': return 70;
    case 'Eastern': return 220;
    default: return 0;
  }
};
const getColorByBranch = (branch: string) => {
  switch (branch) {
    case 'Western': return '#3b82f6'; // Blue
    case 'Islamic': return '#10b981'; // Emerald
    case 'Synthesis': return '#8b5cf6'; // Purple
    case 'Indian': return '#f59e0b'; // Amber
    case 'Eastern': return '#ef4444'; // Red
    default: return '#94a3b8'; // Slate
  }
};

// 承先啟後的繼承關係對照表
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
  "儒家 (Confucianism)": ["天人感應 (Telepathy between Heaven and Man)", "墨家兼愛非攻 (Mohism)"],
  "墨家兼愛非攻 (Mohism)": ["名家辯學 (School of Names)"],
  "法家 (Legalism)": ["儒家 (Confucianism)"],
  "陰陽五行 (Yin-Yang and Five Elements)": ["天人感應 (Telepathy between Heaven and Man)"],
  "天人感應 (Telepathy between Heaven and Man)": ["經學 (Classical Studies)"],
  "經學 (Classical Studies)": ["魏晉玄學 (Wei-Jin Xuanxue)", "讖緯學 (Chenwei/Theology of Texts)"],
  "道家自然觀 (Daoist Naturalism)": ["黃老之學 (Huang-Lao Daoism)", "魏晉玄學 (Wei-Jin Xuanxue)", "道教內丹術 (Daoist Internal Alchemy)"],
  "黃老之學 (Huang-Lao Daoism)": ["魏晉玄學 (Wei-Jin Xuanxue)"],
  "魏晉玄學 (Wei-Jin Xuanxue)": ["般若學 (Prajna)"],
  "大乘佛教 (Mahayana Buddhism)": ["般若學 (Prajna)"],
  "般若學 (Prajna)": ["唯識宗 (Yogacara/Consciousness-Only)", "華嚴宗 (Huayan School)", "禪宗 (Zen Buddhism)", "中國化佛教 (Sinicized Buddhism)"],
  "中國化佛教 (Sinicized Buddhism)": ["宋明理學 (Neo-Confucianism)"],
  "道教內丹術 (Daoist Internal Alchemy)": ["宋明理學 (Neo-Confucianism)"],
  "宋明理學 (Neo-Confucianism)": ["陸王心學 (School of Mind)", "日本朱子學 (Japanese Neo-Confucianism)", "朝鮮朱子學 (Korean Neo-Confucianism)"],
  "朝鮮朱子學 (Korean Neo-Confucianism)": ["日本朱子學 (Japanese Neo-Confucianism)"],
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
  "孔子 (Confucius)": ["孟子 (Mencius)", "墨子 (Mozi)"],
  "墨子 (Mozi)": ["惠施 (Hui Shi)"],
  "惠施 (Hui Shi)": ["公孫龍 (Gongsun Long)"],
  "孟子 (Mencius)": ["荀子 (Xunzi)"],
  "荀子 (Xunzi)": ["董仲舒 (Dong Zhongshu)", "韓非子 (Han Feizi)"],
  "鄒衍 (Zou Yan)": ["董仲舒 (Dong Zhongshu)"],
  "張載 (Zhang Zai)": ["程頤 (Cheng Yi)", "程顥 (Cheng Hao)"],
  "程頤 (Cheng Yi)": ["朱熹 (Zhu Xi)"],
  "程顥 (Cheng Hao)": ["陸九淵 (Lu Jiuyuan)"],
  "陸九淵 (Lu Jiuyuan)": ["王陽明 (Wang Yangming)"],
  "朱熹 (Zhu Xi)": ["王陽明 (Wang Yangming)", "退溪李滉 (Yi Hwang/Toegye)"],
  "退溪李滉 (Yi Hwang/Toegye)": ["栗谷李珥 (Yi I/Yulgok)"],
  "栗谷李珥 (Yi I/Yulgok)": ["吉田松陰 (Yoshida Shoin)"],
  "王陽明 (Wang Yangming)": ["顧炎武 (Gu Yanwu)", "黃宗羲 (Huang Zongxi)", "吉田松陰 (Yoshida Shoin)"],

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
};

export default function GlobalGraph({ data, type, currentYear, onEntityClick }: GlobalGraphProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const fgRef = useRef<any>();
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight
        });
      }
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [type]);

  const graphData = useMemo(() => {
    const nodesMap = new Map();
    const links: any[] = [];
    const activeCities = data.cities.filter((c: any) => !c.numericYear || c.numericYear <= currentYear);

    activeCities.forEach((city: any) => {
      let items: string[] = [];
      if (type === 'thoughts') {
        // "我思想的知識圖譜" => use religion array
        items = city.religion || [];
      } else if (type === 'people') {
        items = city.people || [];
      }

      items.forEach((item: string) => {
        if (!nodesMap.has(item)) {
          nodesMap.set(item, { id: item, name: item, branch: getBranch(item), val: 20 });
        } else {
          const existingNode = nodesMap.get(item);
          existingNode.val = Math.min(60, existingNode.val + 5);
        }
      });
    });

    Array.from(nodesMap.keys()).forEach(sourceNode => {
      if (successions[sourceNode]) {
        successions[sourceNode].forEach(targetNode => {
          if (nodesMap.has(targetNode)) {
            links.push({ source: sourceNode, target: targetNode, isSuccession: true });
          }
        });
      }
    });

    // 為求排版簡潔，移除沒有任何連線的孤立節點
    let finalNodes = Array.from(nodesMap.values());
    const connectedNodeIds = new Set();
    links.forEach(l => {
      connectedNodeIds.add(l.source);
      connectedNodeIds.add(l.target);
    });
    finalNodes = finalNodes.filter(n => connectedNodeIds.has(n.id));

    return {
      nodes: finalNodes,
      links
    };
  }, [data, type, currentYear]);

  useEffect(() => {
    if (fgRef.current && graphData.nodes) {
      fgRef.current.d3Force('charge').strength(-800);
      fgRef.current.d3Force('link').distance(80);
      
      const strength = 0.5;
      const yForce = (alpha: number) => {
        graphData.nodes.forEach((node: any) => {
          if (node.branch) {
            const targetY = getYByBranch(node.branch);
            if (node.y !== undefined) {
              node.vy += (targetY - node.y) * strength * alpha;
            }
          }
        });
      };
      fgRef.current.d3Force('yBranch', yForce);
      
      fgRef.current.d3ReheatSimulation();
    }
  }, [type, graphData]);

  const getThemeTitle = () => {
    switch (type) {
      case 'thoughts': return '思想與宗教因果知識圖譜';
      case 'people': return '歷史人物因果知識圖譜';
      default: return '';
    }
  };

  const legendItems = [
    { label: '西方 (Western)', color: getColorByBranch('Western') },
    { label: '伊斯蘭 (Islamic)', color: getColorByBranch('Islamic') },
    { label: '跨界融合 (Synthesis)', color: getColorByBranch('Synthesis') },
    { label: '印度 (Indian)', color: getColorByBranch('Indian') },
    { label: '東亞 (Eastern)', color: getColorByBranch('Eastern') }
  ];

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', background: '#f1f5f9', position: 'relative' }}>
      <div className="graph-title-container">
        <h2 style={{ margin: 0, fontWeight: 'bold' }}>{getThemeTitle()}</h2>
        <p style={{ margin: '8px 0 0 0', opacity: 0.8 }}>
          {type === 'thoughts' 
            ? '' 
            : ''}
          <br/>
          
        </p>
      </div>

      <ForceGraph2D
        ref={fgRef}
        width={dimensions.width}
        height={dimensions.height}
        graphData={graphData}
        dagMode="lr"
        dagLevelDistance={120}
        
        nodeCanvasObject={(node: any, ctx, globalScale) => {
          const label = node.name.split(' (')[0];
          const fontSize = 14 / globalScale;
          ctx.font = `bold ${fontSize}px "Inter", "Segoe UI", sans-serif`;
          
          const textWidth = ctx.measureText(label).width;
          const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.8);

          ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
          ctx.beginPath();
          ctx.roundRect(
            node.x - bckgDimensions[0] / 2,
            node.y - bckgDimensions[1] / 2,
            bckgDimensions[0],
            bckgDimensions[1],
            bckgDimensions[1] / 2
          );
          ctx.fill();

          ctx.strokeStyle = getColorByBranch(node.branch);
          ctx.lineWidth = 1.5 / globalScale;
          ctx.stroke();

          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = '#0f172a';
          ctx.fillText(label, node.x, node.y);

          node.__bckgDimensions = bckgDimensions;
        }}
        nodePointerAreaPaint={(node: any, color, ctx) => {
          ctx.fillStyle = color;
          const bckgDimensions = node.__bckgDimensions;
          bckgDimensions && ctx.fillRect(
            node.x - bckgDimensions[0] / 2,
            node.y - bckgDimensions[1] / 2,
            bckgDimensions[0],
            bckgDimensions[1]
          );
        }}
        
        // Boost link visibility
        linkColor={(link: any) => {
          if (link.isSuccession) {
            const branch = link.source.branch || getBranch(typeof link.source === 'string' ? link.source : link.source.id);
            return getColorByBranch(branch);
          }
          return 'rgba(148, 163, 184, 0.3)';
        }}
        linkWidth={(link: any) => link.isSuccession ? 3 : 1.5}
        linkDirectionalArrowLength={(link: any) => link.isSuccession ? 8 : 0}
        linkDirectionalArrowRelPos={1}
        
        d3VelocityDecay={0.15}
        d3AlphaDecay={0.02}
        cooldownTicks={200}
        
        onNodeClick={(node: any) => {
          const baseName = node.name.split('(')[0].trim();
          onEntityClick(baseName);
        }}
        enableNodeDrag={true}
        enableZoomInteraction={true}
        enablePanInteraction={true}
      />
      
      <div className="graph-legend">
        <div className="legend-container">
          <div className="legend-title">
            支線與文化圖例
          </div>
          {legendItems.map((item, index) => (
            <div className="legend-item" key={index}>
              <div className="legend-color-dot" style={{ backgroundColor: item.color }}></div>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
