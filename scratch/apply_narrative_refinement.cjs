const fs = require('fs');

const DATA_JSON_PATH = 'src/data.json';

function run() {
    let data = JSON.parse(fs.readFileSync(DATA_JSON_PATH, 'utf8'));

    // 1. Remove non-geographic routes
    const routesToRemove = [
        r => r.source === 'athens' && r.target === 'qufu',
        r => r.source === 'magadha' && r.target === 'athens',
        // Also remove abstract Axial Age connections if any
    ];
    data.routes = data.routes.filter(r => !routesToRemove.some(cond => cond(r)));

    // 2. Modify route: xianyang -> dadu to xianyang -> qufu
    const xianyangRoute = data.routes.find(r => r.source === 'xianyang' && r.target === 'dadu');
    if (xianyangRoute) {
        xianyangRoute.target = 'qufu';
        xianyangRoute.label = '秦滅六國：小篆與度量衡實體推廣至關東舊地';
    }

    // Enhance route descriptions for others
    const routeEnhancements = {
        'athens-alexandria': '亞歷山大軍事征服：希臘學者與典籍隨軍東移',
        'alexandria-magadha': '希臘化大夏王國：希臘工匠雕塑技法傳入印度',
        'athens-rome': '斯多葛學派書籍傳入羅馬：西塞羅吸收轉化為自然法',
        'madrid-cahokia': '西班牙探險隊登陸美洲：攜帶天花與麻疹重創原住民',
        'boston-philadelphia': '北美十三州代表齊聚：清教徒契約論演化為美國憲政'
    };

    data.routes.forEach(r => {
        const key = `${r.source}-${r.target}`;
        if (routeEnhancements[key]) {
            r.label = routeEnhancements[key];
        }
    });

    // 3. Deepen Tour contents
    const tourEnhancements = {
        '孔子與老子創立學派': '西元前6世紀，隨著周朝宗法制度崩解，老子於洛陽擔任守藏室史官，寫下《道德經》五千言；孔子則在魯國（曲阜）開創私人講學，周遊列國推廣「仁」與「禮」。這標誌著中國從神權宗法社會正式邁向以理性與道德為核心的人文社會。',
        '釋迦牟尼創立佛教': '西元前6世紀，迦毗羅衛國王子悉達多（釋迦牟尼）在菩提迦耶悟道。他反對婆羅門教森嚴的「瓦爾那（種姓）制度」，主張眾生平等，並提出「四聖諦」與「八正道」的修行方法，隨後在摩揭陀國得到頻婆娑羅王的支持而廣泛傳播。',
        '古希臘哲學與科學的巔峰': '西元前5至4世紀，雅典成為地中海的智慧中心。蘇格拉底將哲學從研究自然轉向研究人類道德；柏拉圖創立了「阿卡德米學園」並提出理型論；亞里斯多德則集大成，建立涵蓋邏輯、物理與倫理的龐大學科體系，為後世兩千年的西方科學奠定基礎。',
        '亞歷山大東征與希臘化時代': '西元前334年，馬其頓國王亞歷山大率領三萬大軍東征。伴隨軍隊的不僅是士兵，還有測繪員、植物學家與歷史學家。他們將希臘語與雅典的生活方式（劇場、體育館）實體移植到埃及與中亞，最東甚至在巴克特里亞（今阿富汗）建立了希臘化王國，促成了文化大融合。',
        '秦始皇統一天下與標準化': '西元前221年，秦將王賁滅齊，秦國完成統一大業。丞相李斯隨即下令廢除六國古文，以「小篆」作為唯一官方文字；同時制定統一的度量衡標準器具分發全國，並規定車軌寬距統一為六尺，使軍隊與商團能在昔日列國的馳道網上無縫通行。這是一次極度深遠的實體技術強制擴散。',
        '羅馬征服希臘與自然法建立': '西元前146年羅馬攻陷科林斯，軍事上征服了希臘，但在文化上卻被希臘反向征服。大批希臘學者與藏書作為戰利品流入羅馬。羅馬法學家西塞羅（Cicero）吸收了斯多葛學派的「邏各斯（理性）」概念，在《共和國》一書中正式提出「自然法」學說，認為存在著高於人類實定法的普世道德法則。'
    };

    data.tour.forEach(t => {
        if (tourEnhancements[t.title]) {
            t.content = tourEnhancements[t.title];
        }
    });

    // 4. Deepen Glossary terms
    if (!data.glossary) data.glossary = {};
    const glossaryEnhancements = {
        "軸心時代": {
            "type": "religion",
            "description": "德國哲學家卡爾·雅斯培（Karl Jaspers）在《歷史的起源與目標》中提出的概念。指在西元前800年至西元前200年之間，古希臘、古印度與古中國等文明在『缺乏直接地理接觸』的情況下，幾乎同時發生了飛躍式的思想突破。在中國有孔孟老莊，印度有釋迦牟尼與奧義書哲學，希臘則有蘇格拉底與柏拉圖。這些思想家不約而同地開始反思宇宙本源與人類道德的終極意義，將人類文明從神話時代推進到理性時代，至今仍是全人類精神與哲學的共同基石。"
        },
        "希臘化時代": {
            "type": "people",
            "description": "特指從西元前334年亞歷山大東征，至西元前30年羅馬吞併埃及托勒密王朝為止的三百多年歷史。亞歷山大將雅典的文化實體移植到東方，在廣袤的帝國疆域內建立了數十座『亞歷山大城』。例如，埃及的亞歷山大港建立了擁有數十萬卷莎草紙文獻的『繆斯神殿（大圖書館）』；在中亞的巴克特里亞王國，希臘工匠帶來了寫實雕塑技法，隨後與印度的佛教信仰結合，誕生了以希臘神阿波羅面容雕刻佛像的『犍陀羅藝術』，這是人類歷史上最偉大的一次實體跨國文化大融合。"
        },
        "自然法學說": {
            "type": "religion",
            "description": "源自古希臘斯多葛學派（創始人芝諾 Zeno），並在古羅馬時期由政治家兼哲學家西塞羅（Cicero）系統化的法律哲學。西塞羅在西元前50年代撰寫的《共和國》與《法律篇》中主張：宇宙間存在著一種由上帝或自然賦予、超越人類國王與議會所制定法（實定法）的普遍理性與道德法則，即『自然法』（Lex Naturalis）。這種法則對所有民族、所有時代都適用。它深刻影響了後世的《查士丁尼法典》，並在17世紀啟蒙時代由洛克等人演變為『天賦人權』的理論基礎，成為現代西方憲政、美國獨立宣言與國際法的靈魂。"
        },
        "書同文車同軌": {
            "type": "tech",
            "description": "西元前221年秦始皇統一六國後，由丞相李斯主導的極端而高效的國家級標準化工程。『書同文』強制廢除東方六國（如齊、楚、燕）各異的大篆與異體字，以秦國官方的『小篆』為唯一標準，這使得廣大疆域內的政令傳達不再有翻譯障礙，奠定了漢字文化圈長期大一統的底層代碼。『車同軌』則規定所有車輛的兩輪間距必須統一為六尺，這意味著秦國的後勤補給車隊可以直接行駛在征服地區原有的車轍軌道上，極大地降低了跨區域軍事投射與商貿運輸的摩擦成本。"
        },
        "哥倫布大交換": {
            "type": "tech",
            "description": "由歷史學家艾爾弗雷德·克羅斯比（Alfred Crosby）於1972年提出的概念，指1492年哥倫布抵達美洲後，東半球（舊大陸）與西半球（新大陸）之間發生的廣泛生物、農作物與人口的大規模實體轉移。在農業上，美洲的馬鈴薯、玉米與番薯傳入歐洲與亞洲，因其高耐寒與高產量徹底解決了舊大陸的飢荒，促成17-18世紀的全球人口大爆炸。在病理上，歐洲人帶來的天花、麻疹與流感等病菌，對缺乏抗體的美洲原住民社會造成了毀滅性的打擊，導致高達90%的原住民人口在一個世紀內消亡。"
        },
        "佛教": {
            "type": "religion",
            "description": "西元前6世紀由釋迦牟尼（Siddhartha Gautama）於古印度摩揭陀國一帶創立的宗教。佛教的核心教義『四聖諦』（苦、集、滅、道）與『八正道』，主張任何人皆可透過修行斷除煩惱，最終達到涅槃。這在當時極大地挑戰了婆羅門教嚴格且不平等的『瓦爾那（種姓）制度』。西元前3世紀，孔雀王朝的阿育王將佛教定為國教，並派出大量僧侶使團前往斯里蘭卡、中亞甚至希臘化世界傳教，使其從地方性信仰躍升為影響東亞與東南亞數千年文化的最重要跨國宗教力量。"
        },
        "景教": {
            "type": "religion",
            "description": "基督教東方亞述教會（Church of the East）在唐代中國的稱呼。該教派起源於西元5世紀的敘利亞，因聶斯脫里（Nestorius）的基督二性論被羅馬教廷判為異端，其信徒被迫沿著絲綢之路向東流亡。他們將古希臘的醫學與哲學翻譯為敘利亞文與阿拉伯文，是後來伊斯蘭黃金時代的學術啟蒙者。西元635年，阿羅本主教抵達長安覲見唐太宗，促成了『大秦景教流行中國碑』的建立。在蒙古帝國時期，景教在汪古部、克烈部等突厥蒙古部落中極度繁盛，成為連結歐洲與遠東的重要外交橋樑。"
        }
    };

    for (const [key, value] of Object.entries(glossaryEnhancements)) {
        if (data.glossary[key]) {
            data.glossary[key] = value;
        }
    }

    fs.writeFileSync(DATA_JSON_PATH, JSON.stringify(data, null, 2), 'utf8');
    console.log(`Successfully refined geographic routes and deeply expanded narrative precision for Tour and Glossary.`);
}

run();
