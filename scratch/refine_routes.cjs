const fs = require('fs');
const DATA_JSON_PATH = 'src/data.json';

const newRoutes = [
    // --- Theme 1: 人物與使團 (People) ---
    // 張騫出使西域
    { source: "changan", target: "kashgar", label: "張騫出使西域與鑿空", type: "people", numericYear: 0 },
    // 遣唐使
    { source: "changan", target: "kyoto", label: "遣唐使引進律令制與建築", type: "people", numericYear: 700 },
    // 馬可·波羅東行
    { source: "venice", target: "constantinople", label: "馬可波羅家族東行啟程", type: "people", numericYear: 1271 },
    { source: "constantinople", target: "tabriz", label: "穿越伊兒汗國核心區", type: "people", numericYear: 1272 },
    { source: "tabriz", target: "kashgar", label: "翻越帕米爾高原", type: "people", numericYear: 1273 },
    { source: "kashgar", target: "dadu", label: "抵達元大都覲見忽必烈", type: "people", numericYear: 1275 },
    // 拉班·掃馬西行
    { source: "dadu", target: "baghdad", label: "景教僧侶的朝聖之旅", type: "people", numericYear: 1275 },
    { source: "baghdad", target: "constantinople", label: "出使拜占庭帝國", type: "people", numericYear: 1287 },
    { source: "constantinople", target: "rome", label: "晉見教宗展開神學對話", type: "people", numericYear: 1288 },
    { source: "rome", target: "paris", label: "會見法王尋求軍事同盟", type: "people", numericYear: 1288 },
    { source: "paris", target: "bordeaux", label: "會見英王愛德華一世", type: "people", numericYear: 1289 },
    // 伊本·巴圖塔大旅行
    { source: "alexandria", target: "baghdad", label: "朝覲與探索伊斯蘭核心區", type: "people", numericYear: 1326 },
    { source: "baghdad", target: "samarqand", label: "深入中亞察合台汗國", type: "people", numericYear: 1333 },
    { source: "samarqand", target: "quanzhou", label: "橫跨印度抵達元朝泉州港", type: "people", numericYear: 1345 },
    { source: "quanzhou", target: "dadu", label: "北上元大都", type: "people", numericYear: 1346 },
    // 柏郎嘉賓出使
    { source: "rome", target: "sarai", label: "教宗使節出使金帳汗國", type: "people", numericYear: 1245 },
    { source: "sarai", target: "karakorum", label: "抵達哈拉和林見證大汗登基", type: "people", numericYear: 1246 },

    // --- Theme 2: 科技與科學的傳播 (Tech) ---
    // 造紙術西傳
    { source: "changan", target: "samarqand", label: "怛羅斯之戰與造紙匠西行", type: "tech", numericYear: 751 },
    { source: "samarqand", target: "baghdad", label: "阿拉伯帝國引進造紙術", type: "tech", numericYear: 793 },
    { source: "baghdad", target: "alexandria", label: "紙張取代莎草紙席捲北非", type: "tech", numericYear: 900 },
    { source: "alexandria", target: "paris", label: "造紙術經由西班牙傳入歐洲腹地", type: "tech", numericYear: 1150 },
    // 印刷術與金融
    { source: "dadu", target: "tabriz", label: "紙幣與雕版印刷術傳入波斯", type: "tech", numericYear: 1294 },
    // 天文學交流
    { source: "maragha", target: "tabriz", label: "觀象台儀器與數據轉移", type: "tech", numericYear: 1260 }, // 相鄰城市區域傳播
    { source: "tabriz", target: "dadu", label: "札馬魯丁進獻阿拉伯天文儀器", type: "tech", numericYear: 1267 },
    { source: "maragha", target: "constantinople", label: "圖西雙圓模型傳入拜占庭", type: "tech", numericYear: 1300 },
    { source: "constantinople", target: "rome", label: "拜占庭學者攜帶古希臘文獻與阿拉伯科學逃亡義大利", type: "tech", numericYear: 1453 },
    // 鄭和下西洋
    { source: "nanjing", target: "quanzhou", label: "寶船艦隊集結與出航", type: "tech", numericYear: 1405 },
    { source: "quanzhou", target: "quilon", label: "水密隔艙與羅盤導航橫跨印度洋", type: "tech", numericYear: 1405 },
    { source: "quilon", target: "alexandria", label: "船隊抵達紅海與天方地區", type: "tech", numericYear: 1415 },
    // 工業革命擴散
    { source: "london", target: "paris", label: "蒸汽機與工業革命技術擴散", type: "tech", numericYear: 1800 },
    { source: "paris", target: "rome", label: "鐵路網絡席捲歐洲大陸", type: "tech", numericYear: 1850 },

    // --- Theme 3: 哲學思想與宗教 (Religion) ---
    // 佛教東傳
    { source: "kashgar", target: "changan", label: "西域高僧東來與佛典翻譯", type: "religion", numericYear: 100 },
    { source: "changan", target: "kyoto", label: "大乘佛教與禪宗傳入日本", type: "religion", numericYear: 750 },
    // 景教東傳
    { source: "baghdad", target: "samarqand", label: "東方教會向中亞擴張", type: "religion", numericYear: 600 },
    { source: "samarqand", target: "changan", label: "景教碑建立：大秦景教流行中國", type: "religion", numericYear: 635 },
    // 思想翻譯運動與文藝復興
    { source: "alexandria", target: "baghdad", label: "希臘古典哲學移入伊斯蘭智慧之家", type: "religion", numericYear: 800 },
    { source: "baghdad", target: "nishapur", label: "蘇菲派神學與哲學的區域共鳴", type: "religion", numericYear: 900 }, // 相鄰城市區域傳播
    { source: "constantinople", target: "rome", label: "佛羅倫斯大公會議帶來新柏拉圖主義", type: "religion", numericYear: 1439 },
    // 基督教十字軍與神學交流
    { source: "paris", target: "constantinople", label: "魯不魯乞使團東行", type: "religion", numericYear: 1253 },
    { source: "constantinople", target: "karakorum", label: "哈拉和林跨信仰神學大辯論", type: "religion", numericYear: 1254 },
    { source: "rome", target: "paris", label: "經院哲學在大學間的交流", type: "religion", numericYear: 1200 }, // 相鄰城市區域傳播
    { source: "ani", target: "tiflis", label: "高加索東正教與亞美尼亞教會網絡", type: "religion", numericYear: 1000 }, // 相鄰城市區域傳播
    { source: "kashgar", target: "bukhara", label: "伊斯蘭教在中亞綠洲的傳播與融合", type: "religion", numericYear: 1100 }, // 相鄰城市區域傳播
    // 耶穌會士東來
    { source: "rome", target: "quanzhou", label: "耶穌會士航向遠東", type: "religion", numericYear: 1582 },
    { source: "quanzhou", target: "nanjing", label: "利瑪竇在南京的儒耶對話", type: "religion", numericYear: 1595 },
    { source: "nanjing", target: "dadu", label: "西方幾何學與世界地圖傳入北京", type: "religion", numericYear: 1601 }
];

function run() {
    let dataJson = JSON.parse(fs.readFileSync(DATA_JSON_PATH, 'utf8'));

    // Replace old routes completely with the curated new routes
    dataJson.routes = newRoutes;

    fs.writeFileSync(DATA_JSON_PATH, JSON.stringify(dataJson, null, 2), 'utf8');
    console.log(`Replaced data.routes with ${newRoutes.length} refined routes.`);
}

run();
