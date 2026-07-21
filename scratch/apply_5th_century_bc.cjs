const fs = require('fs');

const DATA_JSON_PATH = 'src/data.json';

function run() {
    let data = JSON.parse(fs.readFileSync(DATA_JSON_PATH, 'utf8'));

    // 1. Add Persepolis City
    const persepolis = {
        "id": "persepolis",
        "name": "波斯波利斯",
        "coordinates": [52.8916, 29.9360],
        "description": "阿契美尼德王朝（波斯第一帝國）的禮儀性首都。在西元前五世紀，這裡是橫跨亞非歐三大洲的權力與思想中心，統治著極具多樣性的帝國疆域，也是瑣羅亞斯德教（祆教）的信仰核心。",
        "people": ["大流士一世 (Darius I)", "薛西斯一世 (Xerxes I)"],
        "tech": ["波斯御道 (Royal Road)", "行省制度 (Satrap system)"],
        "religion": ["瑣羅亞斯德教 (Zoroastrianism)"],
        "numericYear": -500
    };

    if (!data.cities.find(c => c.id === 'persepolis')) {
        data.cities.push(persepolis);
    }

    // 2. Add Routes for Thought and Tech Transmission
    const newRoutes = [
        { "source": "persepolis", "target": "athens", "label": "波希戰爭文化衝擊：西方客觀歷史學誕生", "type": "religion", "numericYear": -490 },
        { "source": "persepolis", "target": "athens", "label": "標準金屬貨幣制度與經濟模式西傳", "type": "tech", "numericYear": -500 },
        { "source": "persepolis", "target": "magadha", "label": "波斯行省制度與石柱雕刻藝術東傳", "type": "tech", "numericYear": -500 }
    ];
    data.routes.push(...newRoutes);

    // 3. Add Tours
    const newTours = [
        {
            "cityId": "persepolis",
            "title": "瑣羅亞斯德教的善惡二元論",
            "year": "西元前6至5世紀",
            "content": "波斯帝國將瑣羅亞斯德教（拜火教）奉為國教。其核心教義極具革命性：宇宙是光明之神（阿胡拉·馬茲達）與黑暗之神（安格拉·曼紐）進行無休止鬥爭的戰場。這種『善惡二元論』、以及最後的『末日審判』與『救世主』概念，隨著波斯帝國的擴張，深刻地啟發了後來的猶太教、基督教，甚至是東方的大乘佛教思想。",
            "numericYear": -500
        },
        {
            "cityId": "athens",
            "title": "波希戰爭與西方歷史學的誕生",
            "year": "西元前5世紀",
            "content": "波希戰爭（如馬拉松與溫泉關戰役）不僅是希臘城邦與波斯帝國的軍事大戰，更是劇烈的思想大碰撞。為了探究『為何這兩個龐大文明會發生衝突』，希臘學者希羅多德（Herodotus）四處遊歷並寫下《歷史》。他擯棄了神話與傳說，試圖用理性與客觀的調查來記錄人類的行為，這標誌著西方客觀『歷史學』作為一門科學思想的正式誕生。",
            "numericYear": -490
        }
    ];
    data.tour.push(...newTours);
    data.tour.sort((a, b) => a.numericYear - b.numericYear);

    // 4. Update Glossary
    if (!data.glossary) data.glossary = {};
    const glossaryEnhancements = {
        "瑣羅亞斯德教 (Zoroastrianism)": {
            "type": "religion",
            "description": "古代波斯帝國（阿契美尼德、薩珊王朝）的國教，中文古稱『祆教』或『拜火教』。這是一門對人類思想史影響深遠的宗教。它打破了古代多神教的混沌，提出極其強烈的『善惡二元論』：宇宙是至善的光明之神與極惡的黑暗之神對決的戰場，而人類必須用自由意志選擇加入善的陣營。其教義中關於『末日審判』、『天堂與地獄』以及『救世主降臨』的底層邏輯，在西元前五世紀的跨國交流中，強烈地滲透並形塑了後來的猶太教、基督教與伊斯蘭教神學。"
        },
        "波斯御道 (Royal Road)": {
            "type": "tech",
            "description": "由波斯國王大流士一世在西元前五世紀修築的古代『信息與物流高速公路』。這條從蘇薩直達小亞細亞薩迪斯、長達近2700公里的道路，沿途每隔約20公里就設有一座驛站。信使透過接力換馬的方式，能在7天內走完普通人需要3個月的路程。這項頂尖的跨國治理技術，比蒙古帝國的驛站系統早了一千五百多年，是維繫龐大波斯帝國政令傳達與思想交流的物理底座。"
        },
        "行省制度 (Satrap system)": {
            "type": "tech",
            "description": "波斯帝國發明的高效地方分權與中央集權平衡系統。帝國被劃分為二十多個行省（Satrapy），由國王指派的總督（Satrap）統治。總督掌握行政與司法大權，但軍權與稅收則由中央另派官員獨立負責以相互牽制。這套極度成熟的國家治理思想，不僅被亞歷山大大帝完全繼承，更隨著波斯的東擴傳入印度河流域，深深啟發了後來印度孔雀王朝的行政管理架構。"
        },
        "西方客觀歷史學誕生": {
            "type": "religion",
            "description": "西元前五世紀波希戰爭帶來的最偉大思想副產品。在希羅多德（Herodotus）之前，人類對過去的紀錄多半充斥著神話、諸神干預與宮廷讚歌。希羅多德為了探究希臘與波斯大戰的『真正原因』，首創了『Historia（古希臘語意為「調查、探究」）』的治學方法，親自遊歷埃及與巴比倫進行田野調查，用理性的因果邏輯取代神明干預，奠定了歷史學作為一門獨立人文科學的基礎。"
        }
    };

    for (const [key, value] of Object.entries(glossaryEnhancements)) {
        data.glossary[key] = value;
    }

    fs.writeFileSync(DATA_JSON_PATH, JSON.stringify(data, null, 2), 'utf8');
    console.log(`Successfully added Persepolis and 5th Century BC thought/tech transmissions.`);
}

run();
