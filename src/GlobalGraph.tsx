import { useMemo, useEffect, useState, useRef } from 'react';
import ForceGraph2D from 'react-force-graph-2d';

interface GlobalGraphProps {
  data: any;
  type: 'thoughts' | 'tech' | 'people';
  currentYear: number;
  onEntityClick: (entityName: string) => void;
}

// 承先啟後的繼承關係對照表
const successions: Record<string, string[]> = {
  // ===== 西方哲學完整鏈 =====
  "米利都自然哲學 (Milesian Naturalism)": ["畢達哥拉斯學派 (Pythagoreanism)", "原子論 (Atomism)"],
  "畢達哥拉斯學派 (Pythagoreanism)": ["理型論 (Platonic Idealism)"],
  "蘇格拉底方法 (Socratic Method)": ["理型論 (Platonic Idealism)", "犬儒主義 (Cynicism)"],
  "理型論 (Platonic Idealism)": ["新柏拉圖主義 (Neoplatonism)", "新柏拉圖主義復興 (Neoplatonic Revival)"],
  "原子論 (Atomism)": ["伊壁鳩魯主義 (Epicureanism)", "經驗主義 (Empiricism)"],
  "斯多葛主義 (Stoicism)": ["斯多葛倫理學 (Stoic Ethics)", "自然法傳統 (Natural Law Tradition)"],
  "自然法傳統 (Natural Law Tradition)": ["自然權利論 (Natural Rights Theory)"],
  "新柏拉圖主義 (Neoplatonism)": ["教父哲學 (Patristic Philosophy)", "奧古斯丁神學 (Augustinian Theology)"],
  "奧古斯丁神學 (Augustinian Theology)": ["經院哲學 (Scholasticism)"],
  "伊斯蘭哲學 (Islamic Philosophy/Falsafa)": ["阿威羅伊主義 (Averroism)"],
  "穆塔齊賴派 (Mu'tazila Rationalism)": ["伊斯蘭哲學 (Islamic Philosophy/Falsafa)"],
  "阿威羅伊主義 (Averroism)": ["經院哲學 (Scholasticism)", "托馬斯主義 (Thomism)"],
  "經院哲學 (Scholasticism)": ["托馬斯主義 (Thomism)"],
  "新柏拉圖主義復興 (Neoplatonic Revival)": ["人文主義 (Humanism)"],
  "人文主義 (Humanism)": ["文藝復興自然哲學 (Renaissance Natural Philosophy)", "文藝復興 (Renaissance)"],
  "心物二元論 (Mind-Body Dualism)": ["理性主義 (Rationalism)", "德國觀念論 (German Idealism)"],
  "理性主義 (Rationalism)": ["泛神論 (Pantheism)", "德國觀念論 (German Idealism)"],
  "經驗主義 (Empiricism)": ["懷疑論 (Skepticism)", "蘇格蘭啟蒙運動 (Scottish Enlightenment)"],
  "懷疑論 (Skepticism)": ["德國觀念論 (German Idealism)"],
  "泛神論 (Pantheism)": ["啟蒙運動 (The Enlightenment)"],
  "蘇格蘭啟蒙運動 (Scottish Enlightenment)": ["功利主義 (Utilitarianism)", "自由主義 (Liberalism)"],
  "啟蒙運動 (The Enlightenment)": ["社會契約論 (Social Contract Theory)", "百科全書派 (Encyclopédistes)", "浪漫主義 (Romanticism)", "實證主義社會學 (Positivist Sociology)"],
  "社會契約論 (Social Contract Theory)": ["自由主義 (Liberalism)"],
  "自由主義 (Liberalism)": ["古典經濟學 (Classical Economics)"],
  "古典經濟學 (Classical Economics)": ["馬克思主義政治經濟學 (Marxist Political Economy)"],
  "道德情感論 (Moral Sentimentalism)": ["功利主義 (Utilitarianism)"],
  "德國觀念論 (German Idealism)": ["黑格爾辯證法 (Hegelian Dialectics)"],
  "黑格爾辯證法 (Hegelian Dialectics)": ["青年黑格爾派 (Young Hegelians)", "存在主義 (Existentialism)", "辯證唯物主義 (Dialectical Materialism)"],
  "青年黑格爾派 (Young Hegelians)": ["費爾巴哈唯物主義 (Feuerbachian Materialism)"],
  "費爾巴哈唯物主義 (Feuerbachian Materialism)": ["辯證唯物主義 (Dialectical Materialism)"],
  "辯證唯物主義 (Dialectical Materialism)": ["馬克思主義政治經濟學 (Marxist Political Economy)"],
  "存在主義 (Existentialism)": ["信仰之躍 (Leap of Faith)", "現象學 (Phenomenology)", "後現代主義 (Postmodernism)"],
  "實證主義社會學 (Positivist Sociology)": ["實驗心理學 (Experimental Psychology)"],
  "實驗心理學 (Experimental Psychology)": ["精神分析學 (Psychoanalysis)"],
  "浪漫主義 (Romanticism)": ["印象派 (Impressionism)"],
  "現象學 (Phenomenology)": ["結構主義 (Structuralism)"],
  "結構主義 (Structuralism)": ["後現代主義 (Postmodernism)"],
  "邏輯實證主義 (Logical Positivism)": ["分析哲學 (Analytic Philosophy)"],
  "印象派 (Impressionism)": ["抽象表現主義 (Abstract Expressionism)"],

  // ===== 東方思想與宗教 =====
  "易經哲學 (Philosophy of I Ching)": ["陰陽五行 (Yin-Yang and Five Elements)", "道家自然觀 (Daoist Naturalism)", "儒家 (Confucianism)"],
  "道家自然觀 (Daoist Naturalism)": ["黃老之學 (Huang-Lao Daoism)", "魏晉玄學 (Wei-Jin Xuanxue)", "禪宗 (Zen Buddhism)"],
  "儒家 (Confucianism)": ["天人感應 (Telepathy between Heaven and Man)", "宋明理學 (Neo-Confucianism)"],
  "法家 (Legalism)": ["儒家 (Confucianism)"],
  "陰陽五行 (Yin-Yang and Five Elements)": ["天人感應 (Telepathy between Heaven and Man)", "讖緯學 (Chenwei/Theology of Texts)"],
  "黃老之學 (Huang-Lao Daoism)": ["道教內丹術 (Daoist Internal Alchemy)"],
  "天人感應 (Telepathy between Heaven and Man)": ["魏晉玄學 (Wei-Jin Xuanxue)"],
  "魏晉玄學 (Wei-Jin Xuanxue)": ["般若學 (Prajna)"],
  "般若學 (Prajna)": ["唯識宗 (Yogacara/Consciousness-Only)", "華嚴宗 (Huayan School)", "禪宗 (Zen Buddhism)", "中國化佛教 (Sinicized Buddhism)"],
  "中國化佛教 (Sinicized Buddhism)": ["宋明理學 (Neo-Confucianism)"],
  "佛教 (Buddhism)": ["大乘佛教 (Mahayana Buddhism)", "般若學 (Prajna)"],
  "大乘佛教 (Mahayana Buddhism)": ["宗教融合 (Religious syncretism)"],
  "宋明理學 (Neo-Confucianism)": ["陸王心學 (School of Mind)", "日本朱子學 (Japanese Neo-Confucianism)"],
  "陸王心學 (School of Mind)": ["考據學/清代樸學 (Evidential Research/Han Learning)", "日本陽明學 (Japanese Yangmingism)"],
  "日本陽明學 (Japanese Yangmingism)": ["中體西用 (Chinese Learning as Substance, Western Learning for Application)"],
  
  "奧義書哲學 (Upanishadic Philosophy)": ["早期佛教 (Early Buddhism)", "耆那教 (Jainism)", "數論派 (Samkhya)", "不二論 (Advaita Vedanta)"],
  "早期佛教 (Early Buddhism)": ["大乘佛教 (Mahayana Buddhism)", "龍樹中觀學 (Madhyamaka)"],
  "數論派 (Samkhya)": ["無著唯識學 (Yogacara)"],
  "龍樹中觀學 (Madhyamaka)": ["無著唯識學 (Yogacara)", "密教 (Vajrayana)", "不二論 (Advaita Vedanta)"],
  "無著唯識學 (Yogacara)": ["唯識宗 (Yogacara/Consciousness-Only)"],
  "不二論 (Advaita Vedanta)": ["限定不二論 (Vishishtadvaita)"],
  "限定不二論 (Vishishtadvaita)": ["巴克提運動 (Bhakti Movement)"],
  "伊斯蘭教 (Islam)": ["蘇菲主義 (Sufism)", "伊斯蘭法學 (Islamic jurisprudence)"],
  "印度教 (Hinduism)": ["巴克提運動 (Bhakti Movement)"],
  "巴克提運動 (Bhakti Movement)": ["蘇菲與巴克提融合 (Sufi-Bhakti Synthesis)"],
  "蘇菲主義 (Sufism)": ["蘇菲與巴克提融合 (Sufi-Bhakti Synthesis)"],
  "蘇菲與巴克提融合 (Sufi-Bhakti Synthesis)": ["錫克教 (Sikhism)"],
  "天主教 (Catholicism)": ["天主教傳教 (Catholic Missions)", "天主教外交 (Papal diplomacy)", "羅馬教廷 (Papal Court)"],
  "景教 (Nestorian Christianity)": ["景教宗主教座堂 (Patriarchate of the Church of the East)", "景教教堂 (Nestorian Church)"],
  "東正教 (Eastern Orthodoxy)": ["俄羅斯東正教 (Russian Orthodoxy)", "喬治亞正教 (Georgian Orthodoxy)"],
  "跨信仰神學辯論 (Interfaith debate)": ["跨信仰神學交流 (Interfaith dialogue)"],

  // ===== 蒙古帝國與技術 =====
  "交鈔 (Jiaochao)": ["紙幣 (Paper money/Čāv)"],
  "紙幣 (Paper money/Čāv)": ["印鈔局 (Čāv-Khāna)", "印鈔局"],
  "百年翻譯運動 (Translation Movement)": ["伊斯蘭哲學 (Islamic Philosophy/Falsafa)", "伊斯蘭光學 (Islamic Optics)"],
  "伊兒汗星表 (Ilkhanic Tables)": ["回回曆法 (Islamic Astronomy in China)"],
  "圖西雙圓 (Tusi couple)": ["波斯計算方法"],
  "波斯計算方法": ["哥白尼日心說", "科學革命 (Scientific Revolution)"],
  "高表測影 (Gnomon shadow measurement)": ["球面三角學 (Spherical trigonometry)", "觀星台 (Gaocheng Astronomical Observatory)"],
  "球面三角學 (Spherical trigonometry)": ["授時曆 (Shoushi calendar)"],
  "回回曆法 (Islamic Astronomy in China)": ["回回司天台 (Islamic Astronomical Bureau)", "授時曆 (Shoushi calendar)"],
  "牌符驛政改革 (Paiza reform)": ["驛站網絡 (Yam network)", "牌符憑證 (Paiza/Maktub)"],
  "驛站網絡 (Yam network)": ["站赤/驛站中樞 (Yam Hub)", "驛站總樞紐 (Yam Hub)", "驛站 (Yam)", "中亞驛站 (Central Asian yam)", "呼羅珊驛站 (Khurasan yam)", "綠洲驛站 (Oasis yam)", "邊防驛站 (Frontier Yam)", "供水驛棚 (Wooden sheds/wells for travelers)", "驛道起點 (Yam terminal)"],
  "驛站 (Yam)": ["驛站網絡 (Yam/Örtöö)", "皇家大道 (Royal Road/Shahrah)", "古城防禦與驛路 (City fortifications and routes)"],
  "黑火藥 (Black Gunpowder)": ["火器廣泛應用"],
  "火器廣泛應用": ["工業革命 (Industrial Revolution)", "科學革命 (Scientific Revolution)"],
  "黑死病傳播 (Spread of Black Death)": ["文藝復興 (Renaissance)"],

  // ===== 數學、科學與印刷 =====
  "印度-阿拉伯數字 (Hindu-Arabic numerals)": ["代數學 (Algebra)", "複式簿記 (Double-entry Bookkeeping)"],
  "代數學 (Algebra)": ["解析幾何 (Analytic Geometry)"],
  "伊斯蘭光學 (Islamic Optics)": ["透視法 (Linear perspective)", "天文望遠鏡 (Astronomical Telescope)", "光學儀器 (Optical instruments)"],
  "歐幾里得幾何 (Euclidean geometry)": ["伊斯蘭建築 (Islamic Architecture)", "透視法 (Linear perspective)"],
  "解析幾何 (Analytic Geometry)": ["微積分 (Calculus)"],
  "微積分 (Calculus)": ["經典力學 (Classical Mechanics)"],
  "科學革命 (Scientific Revolution)": ["啟蒙科學 (Enlightenment Science)", "經典力學 (Classical Mechanics)", "演化論 (Evolutionary Biology)", "化學革命 (Chemical Revolution)"],
  "經典力學 (Classical Mechanics)": ["工業革命 (Industrial Revolution)", "熱力學 (Thermodynamics)", "電磁學 (Electromagnetism)"],
  "熱力學 (Thermodynamics)": ["統計力學 (Statistical Mechanics)"],
  "演化論 (Evolutionary Biology)": ["DNA雙螺旋結構 (DNA Double Helix)"],
  "電磁學 (Electromagnetism)": ["相對論 (Theory of Relativity)", "量子力學 (Quantum Mechanics)"],
  "相對論 (Theory of Relativity)": ["原子能與核物理 (Nuclear Physics)"],
  "量子力學 (Quantum Mechanics)": ["原子能與核物理 (Nuclear Physics)", "電腦科學 (Computer Science)"],
  "電腦科學 (Computer Science)": ["資訊理論 (Information Theory)", "網際網路 (Internet)", "人工智慧 (Artificial Intelligence)"],
  "資訊理論 (Information Theory)": ["網際網路 (Internet)"],
  
  "造紙術 (Papermaking)": ["雕版印刷 (Woodblock printing)"],
  "雕版印刷 (Woodblock printing)": ["活字印刷術 (Movable Type Printing)"],
  "活字印刷術 (Movable Type Printing)": ["古騰堡印刷機 (Gutenberg Press)"],
  "古騰堡印刷機 (Gutenberg Press)": ["科學革命 (Scientific Revolution)", "文藝復興 (Renaissance)"],
  
  // ===== 航海與工業 =====
  "指南針 (Magnetic Compass)": ["磁羅盤 (Magnetic compass)", "大航海時代 (Age of Discovery)"],
  "卡拉維爾帆船 (Caravel)": ["大航海時代 (Age of Discovery)"],
  "大航海時代 (Age of Discovery)": ["科學革命 (Scientific Revolution)"],
  "蒸汽機 (Steam Engine)": ["工業革命 (Industrial Revolution)"],
  "造船技術 (Shipbuilding)": ["水密隔艙 (Watertight compartments)", "航海術 (Navigation)"],
  "航海術 (Navigation)": ["大航海時代 (Age of Discovery)", "海上貿易 (Maritime trade)", "卡拉維爾帆船 (Caravel)", "薩格里什航海學校 (Sagres School)"],
  "海上貿易 (Maritime trade)": ["市舶稅收 (Maritime customs)", "海上絲路 (Maritime Silk Road)", "香料貿易 (Spice trade)", "商埠 (Trading port)", "海運港口 (Seaport)", "商港 (Trading port)", "商埠海港 (Seaport)", "市舶司 (Maritime Trade Office)"],
  "驛傳物流 (Express logistics)": ["急遞制度 (Express courier/Binchik)", "驛馬管理 (Postal horse management)"],
  "驛馬管理 (Postal horse management)": ["驛站預算管理 (Yam budget management)"],
  "絲綢紡織 (Silk weaving)": ["跨國貿易 (Transnational trade)"],
  "庭院提銀法 (Patio process)": ["白銀帝國 (Silver Empire)", "跨國貿易 (Transnational trade)"],
  "地理時差計算 (Longitude time difference)": ["航海術 (Navigation)"],
  "敘利亞文字 (Syriac script)": ["八思巴字 ('Phags-pa script)"],
  "手抄本製作 (Manuscript illumination)": ["天文翻譯 (Astronomical translation)", "廷巴克圖手抄本 (Timbuktu manuscripts)"],
  "天文翻譯 (Astronomical translation)": ["回回曆法 (Islamic Astronomy in China)", "百年翻譯運動 (Translation Movement)"],
  "游牧軍事 (Nomadic warfare)": ["跨國貿易 (Transnational trade)", "跨文化治理 (Cross-cultural administration)"],
  "跨國貿易 (Transnational trade)": ["綠洲商路 (Oasis trade route)"],
  "跨文化治理 (Cross-cultural administration)": ["宗教融合藝術 (Syncretic art)", "潛在突厥化", "戶賦/包稅制 (Qubchur tax)", "里甲制"],

  // ===== 歷史人物 =====
  "泰勒斯 (Thales)": ["畢達哥拉斯 (Pythagoras)"],
  "蘇格拉底 (Socrates)": ["柏拉圖 (Plato)", "第歐根尼 (Diogenes)"],
  "柏拉圖 (Plato)": ["亞里斯多德 (Aristotle)"],
  "亞里斯多德 (Aristotle)": ["伊本·西那 (Avicenna/Ibn Sina)"],
  "伊本·西那 (Avicenna/Ibn Sina)": ["伊本·魯世德 (Averroes/Ibn Rushd)", "法拉比 (Al-Farabi)", "花剌子米 (Al-Khwarizmi)"],
  "肯迪 (Al-Kindi)": ["法拉比 (Al-Farabi)"],
  "法拉比 (Al-Farabi)": ["伊本·西那 (Avicenna/Ibn Sina)"],
  "伊本·魯世德 (Averroes/Ibn Rushd)": ["托馬斯·阿奎那 (Thomas Aquinas)"],
  "笛卡兒 (René Descartes)": ["斯賓諾莎 (Baruch Spinoza)"],
  "斯賓諾莎 (Baruch Spinoza)": ["大衛·休謨 (David Hume)"],
  "洛克 (John Locke)": ["大衛·休謨 (David Hume)"],
  "大衛·休謨 (David Hume)": ["康德 (Immanuel Kant)"],
  "黑格爾 (Georg Wilhelm Friedrich Hegel)": ["費爾巴哈 (Ludwig Feuerbach)", "齊克果 (Søren Kierkegaard)"],
  "費爾巴哈 (Ludwig Feuerbach)": ["馬克思 (Karl Marx)"],
  "老子 (Laozi)": ["莊子 (Zhuangzi)"],
  "莊子 (Zhuangzi)": ["王弼 (Wang Bi)"],
  "孔子 (Confucius)": ["孟子 (Mencius)"],
  "孟子 (Mencius)": ["董仲舒 (Dong Zhongshu)"],
  "釋迦牟尼 (Gautama Buddha)": ["達摩 (Bodhidharma)", "龍樹 (Nagarjuna)"],
  "玄奘 (Xuanzang)": ["法藏 (Fazang)"],
  "朱熹 (Zhu Xi)": ["王陽明 (Wang Yangming)"],
  "王陽明 (Wang Yangming)": ["顧炎武 (Gu Yanwu)", "吉田松陰 (Yoshida Shoin)"],
  "龍樹 (Nagarjuna)": ["無著 (Asanga)"],
  "商羯羅 (Adi Shankara)": ["羅摩努闍 (Ramanuja)"],
  "羅摩努闍 (Ramanuja)": ["迦比爾 (Kabir)"],
  "迦比爾 (Kabir)": ["納納克 (Guru Nanak)"],
  
  // 蒙古與帝國人物
  "成吉思汗 (Genghis Khan)": ["窩闊台汗 (Ogedei Khan)", "拔都汗 (Batu Khan)", "海都 (Qaidu Khan)"],
  "窩闊台汗 (Ogedei Khan)": ["蒙哥汗 (Mongke Khan)"],
  "蒙哥汗 (Mongke Khan)": ["忽必烈汗 (Kublai Khan)", "旭烈兀 (Hulegu Khan)", "威廉·魯不魯乞 (William of Rubruck)"],
  "忽必烈汗 (Kublai Khan)": ["八思巴 (Drogön Chögyal Phagpa)", "札馬魯丁 (Zhamaluding)", "馬可·波羅 (Marco Polo)", "郭守敬 (Guo Shoujing)"],
  "旭烈兀 (Hulegu Khan)": ["阿八哈汗", "納西爾丁·圖西 (Nasir al-Din al-Tusi)"],
  "阿八哈汗": ["拜都汗", "蓋海圖汗 (Gaykhatu)"],
  "拜都汗": ["合贊汗 (Ghazan Khan)"],
  "合贊汗 (Ghazan Khan)": ["合贊汗", "孛羅丞相 (Bolad Chingsang)", "完者都 (Öljaitü)"],
  "孛羅丞相 (Bolad Chingsang)": ["拉施特 (Rashid al-Din Hamadani)"],
  "卻俄尼亞底斯 (Gregory Chioniades)": ["拜占庭天文學"],
  "威廉·魯不魯乞 (William of Rubruck)": ["拉班·掃馬 (Rabban Bar Sauma)"],
  "拉班·掃馬 (Rabban Bar Sauma)": ["雅巴拉哈三世 (Yahballaha III)", "腓力四世 (Philip IV of France)"],
  "拔都汗 (Batu Khan)": ["月即別汗 (Ozbeg Khan)", "那海"],
  "那海": ["脫脫汗", "歐芙洛緒涅"],
  "脫脫汗": ["札尼別 (Jani Beg)", "瑪麗亞 (巴亞倫)"],
  "月即別汗 (Ozbeg Khan)": ["伊本·巴圖塔 (Ibn Battuta)"],
  "闊里吉思 (Körgüz)": ["阿魯渾·阿加 (Arghun Aqa)"],

  // 科技人物
  "蔡倫 (Cai Lun)": ["畢昇 (Bi Sheng)"],
  "畢昇 (Bi Sheng)": ["古騰堡 (Johannes Gutenberg)"],
  "海什木 (Ibn al-Haytham)": ["伽利略 (Galileo Galilei)"],
  "伽利略 (Galileo Galilei)": ["牛頓 (Isaac Newton)"],
  "牛頓 (Isaac Newton)": ["瓦特 (James Watt)", "拉瓦節 (Antoine Lavoisier)", "詹姆斯·馬克士威 (James Clerk Maxwell)"],
  "拉瓦節 (Antoine Lavoisier)": ["查爾斯·達爾文 (Charles Darwin)"],
  "詹姆斯·馬克士威 (James Clerk Maxwell)": ["路德維希·波茲曼 (Ludwig Boltzmann)", "阿爾伯特·愛因斯坦 (Albert Einstein)"],
  "路德維希·波茲曼 (Ludwig Boltzmann)": ["尼爾斯·波耳 (Niels Bohr)"],
  "阿爾伯特·愛因斯坦 (Albert Einstein)": ["尼爾斯·波耳 (Niels Bohr)", "約翰·馮·紐曼 (John von Neumann)"],
  "查爾斯·達爾文 (Charles Darwin)": ["詹姆斯·華生 (James Watson)"],
  "艾倫·圖靈 (Alan Turing)": ["約翰·馮·紐曼 (John von Neumann)"],
  
  // 近代思潮人物
  "亞當·斯密 (Adam Smith)": ["卡爾·馬克思 (Karl Marx)"],
  "卡爾·馬克思 (Karl Marx)": ["弗里德里希·恩格斯 (Friedrich Engels)"],
  "奧古斯特·孔德 (Auguste Comte)": ["威廉·馮特 (Wilhelm Wundt)"],
  "威廉·馮特 (Wilhelm Wundt)": ["西格蒙德·佛洛伊德 (Sigmund Freud)"],
  "西格蒙德·佛洛伊德 (Sigmund Freud)": ["讓-保羅·沙特 (Jean-Paul Sartre)"],
  "讓-保羅·沙特 (Jean-Paul Sartre)": ["米歇爾·傅柯 (Michel Foucault)"],
  "伏爾泰 (Voltaire)": ["盧梭 (Jean-Jacques Rousseau)"]
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
      } else if (type === 'tech') {
        items = [...(city.tech || []), ...(city.infrastructure || [])];
      } else if (type === 'people') {
        items = city.people || [];
      }

      items.forEach((item: string) => {
        if (!nodesMap.has(item)) {
          nodesMap.set(item, { id: item, name: item, group: type, val: 20 });
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
    if (fgRef.current) {
      fgRef.current.d3Force('charge').strength(-800);
      fgRef.current.d3Force('link').distance(80);
      fgRef.current.d3ReheatSimulation();
    }
  }, [type, graphData]);

  const getThemeColor = () => {
    switch (type) {
      case 'thoughts': return '#9333ea';
      case 'tech': return '#0284c7';
      case 'people': return '#ea580c';
      default: return '#94a3b8';
    }
  };

  const getThemeTitle = () => {
    switch (type) {
      case 'thoughts': return '思想與宗教因果知識圖譜';
      case 'tech': return '技術與科學因果知識圖譜';
      case 'people': return '歷史人物因果知識圖譜';
      default: return '';
    }
  };

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', background: '#f1f5f9', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 20, left: 20, zIndex: 10, color: '#334155', textShadow: '0 1px 2px rgba(255,255,255,0.8)', pointerEvents: 'none' }}>
        <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold' }}>{getThemeTitle()}</h2>
        <p style={{ margin: '8px 0 0 0', opacity: 0.8 }}>
          {type === 'thoughts' 
            ? '思想因果流：節點連線代表思想演進與歷史承先啟後關係' 
            : type === 'tech'
            ? '技術演進流：節點連線代表技術發展與歷史承先啟後關係'
            : '人物師承流：節點連線代表人物傳承與歷史承先啟後關係'}
          <br/>
          （截至 {currentYear < 0 ? `B.C. ${Math.abs(currentYear)}` : `A.D. ${currentYear}`} 年）
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

          ctx.strokeStyle = getThemeColor();
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
        linkColor={(link: any) => link.isSuccession ? getThemeColor() : 'rgba(148, 163, 184, 0.5)'}
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
      
      <div style={{ position: 'absolute', bottom: 20, right: 20, zIndex: 10, background: 'rgba(255, 255, 255, 0.9)', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', color: '#334155', pointerEvents: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ position: 'relative', width: 24, height: 2, background: getThemeColor(), marginRight: '8px' }}>
             <div style={{ position: 'absolute', right: 0, top: -4, width: 0, height: 0, borderTop: '5px solid transparent', borderBottom: '5px solid transparent', borderLeft: `8px solid ${getThemeColor()}` }}></div>
          </div>
          <span style={{ fontSize: '14px', fontWeight: 'bold' }}>承先啟後連線 (歷史傳承)</span>
        </div>
      </div>
    </div>
  );
}
