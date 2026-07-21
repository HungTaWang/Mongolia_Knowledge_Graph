const fs = require('fs');

const DATA_JSON_PATH = 'src/data.json';

function run() {
    let data = JSON.parse(fs.readFileSync(DATA_JSON_PATH, 'utf8'));

    // 1. Add New Cities (Focusing on Culture & Science)
    const newCities = [
        {
            "id": "mexico_city",
            "name": "墨西哥城",
            "coordinates": [-99.1332, 19.4326],
            "description": "建於阿茲特克首都特諾奇提特蘭廢墟之上的美洲核心。這裡是前哥倫布時期『美洲農學』的精華所在，也是西班牙統治後『庭院提銀法』化學冶煉技術與『宗教融合藝術』的誕生地。",
            "people": ["蒙特祖馬二世 (Moctezuma II)", "巴托洛梅·德拉斯·卡薩斯 (Bartolomé de las Casas)"],
            "tech": ["庭院提銀法 (Patio process)", "美洲農學 (Mesoamerican agriculture)"],
            "religion": ["宗教融合藝術 (Syncretic art)"],
            "numericYear": 1521
        },
        {
            "id": "timbuktu",
            "name": "廷巴克圖",
            "coordinates": [-3.0026, 16.7666],
            "description": "西非馬里帝國的學術燈塔。這裡不僅是黃金交易站，更是保存了數十萬卷伊斯蘭天文學、法學與數學手稿的知識庫，代表了伊斯蘭學術體系在撒哈拉以南非洲的深度扎根。",
            "people": ["曼薩·穆薩 (Mansa Musa)", "艾哈邁德·巴巴 (Ahmad Baba)"],
            "tech": ["廷巴克圖手抄本 (Timbuktu manuscripts)"],
            "religion": ["伊斯蘭法學 (Islamic jurisprudence)"],
            "numericYear": 1324
        },
        {
            "id": "delhi",
            "name": "德里",
            "coordinates": [77.2090, 28.6139],
            "description": "印度次大陸的文化大熔爐。莫臥兒帝國在此將波斯的精緻宮廷文化、伊斯蘭的蘇菲派神學，與印度本土的巴克提運動完美融合，催生了人類建築史上的奇蹟——印斯蘭建築。",
            "people": ["巴布爾 (Babur)", "阿克巴大帝 (Akbar the Great)"],
            "tech": ["印斯蘭建築 (Indo-Islamic Architecture)"],
            "religion": ["蘇菲與巴克提融合 (Sufi-Bhakti syncretism)"],
            "numericYear": 1526
        },
        {
            "id": "malacca",
            "name": "馬六甲",
            "coordinates": [102.2501, 2.1896],
            "description": "東南亞季風交匯的咽喉。阿拉伯學者在此傳授『沙斐儀派法學』，而華人移民則與當地馬來人通婚，孕育出結合了中國儒家倫理與東南亞生活方式的『峇峇娘惹文化』。",
            "people": ["拜里米蘇拉 (Parameswara)", "鄭和 (Zheng He)"],
            "tech": ["峇峇娘惹文化 (Peranakan culture)"],
            "religion": ["沙斐儀派法學 (Shafi'i jurisprudence)"],
            "numericYear": 1400
        }
    ];

    newCities.forEach(nc => {
        if (!data.cities.find(c => c.id === nc.id)) {
            data.cities.push(nc);
        }
    });

    // 2. Add Routes (Strictly Cultural & Scientific Transmission)
    const newRoutes = [
        { "source": "mexico_city", "target": "madrid", "label": "美洲農學西傳：玉米與馬鈴薯的植物學轉移", "type": "tech", "numericYear": 1550 },
        { "source": "madrid", "target": "mexico_city", "label": "化學冶金技術輸入：水銀齊化法（庭院提銀法）", "type": "tech", "numericYear": 1554 },
        { "source": "mecca", "target": "timbuktu", "label": "伊斯蘭學術與法學體系傳入西非", "type": "religion", "numericYear": 1324 },
        { "source": "samarqand", "target": "delhi", "label": "波斯-突厥文化與幾何建築學傳入南亞", "type": "tech", "numericYear": 1526 },
        { "source": "baghdad", "target": "malacca", "label": "沙斐儀派法學隨季風傳入東南亞", "type": "religion", "numericYear": 1414 },
        { "source": "quanzhou", "target": "malacca", "label": "中國儒家倫理與海洋技術的南遷大融合", "type": "tech", "numericYear": 1405 }
    ];
    data.routes.push(...newRoutes);

    // 3. Add Tours (Deep historical events focusing on culture/science)
    const newTours = [
        {
            "cityId": "mexico_city",
            "title": "庭院提銀法與化學冶煉革命",
            "year": "1554年",
            "content": "在墨西哥的帕丘卡礦區，西班牙商人巴托洛梅·德·梅迪納發明了『庭院提銀法（Patio process）』。這是一項極其先進的化學冶金技術，利用水銀在常溫下與低品位銀礦石發生『汞齊化反應』來提取純銀。這項科學技術突破了傳統冶煉的高溫限制，讓美洲白銀產量呈幾何級數暴增，直接提供了推動全球化與科學革命的物質資本。",
            "numericYear": 1554
        },
        {
            "cityId": "timbuktu",
            "title": "曼薩·穆薩引進伊斯蘭學術體系",
            "year": "1324年",
            "content": "馬里帝國皇帝曼薩·穆薩在完成震驚世界的麥加朝聖後，不僅帶回了建築師，更帶回了大量的阿拉伯數學家、天文學家與法學家。他們在廷巴克圖建立了桑科雷大學（Sankore Madrasah），並積累了數十萬卷關於光學、醫學與伊斯蘭法學的手抄本（廷巴克圖手抄本），使西非成為中世紀全球最頂尖的學術研究中心之一。",
            "numericYear": 1324
        },
        {
            "cityId": "delhi",
            "title": "阿克巴大帝的文化與宗教大融合",
            "year": "16世紀中葉",
            "content": "莫臥兒帝國第三代皇帝阿克巴在德里與阿格拉一帶，推動了史無前例的思想大融合。他廢除了對非穆斯林的吉茲亞稅，並在宮廷內建立『真理之屋（Ibadat Khana）』，邀請伊斯蘭蘇菲派、印度教巴克提派、天主教耶穌會士與瑣羅亞斯德教徒進行跨信仰的神學辯論。這種對絕對寬容與理性探討的追求，甚至早於歐洲的啟蒙運動。",
            "numericYear": 1575
        },
        {
            "cityId": "malacca",
            "title": "峇峇娘惹：跨國度文化基因的完美編碼",
            "year": "15世紀",
            "content": "隨著鄭和下西洋與海上絲路的繁榮，大量來自福建泉州等地的華人定居馬六甲。他們與當地的馬來女性通婚，孕育出獨特的『峇峇娘惹（Peranakan）』文化。這並非簡單的混血，而是一次深刻的文化基因重組：他們保留了中國最底層的儒家祭祖倫理與道教信仰，卻在語言、香料飲食與服飾美學上完全吸收了馬來與伊斯蘭的熱帶元素，是東南亞最具代表性的文化融合奇蹟。",
            "numericYear": 1405
        }
    ];
    data.tour.push(...newTours);
    data.tour.sort((a, b) => a.numericYear - b.numericYear);

    // 4. Update Glossary with EXTREME focus on science and thought
    if (!data.glossary) data.glossary = {};
    const glossaryEnhancements = {
        "庭院提銀法 (Patio process)": {
            "type": "tech",
            "description": "16世紀中葉在墨西哥發明的革命性化學冶金技術。傳統的熔煉法需要大量木材燃料，且無法處理低品位礦石。庭院提銀法利用『汞齊化（Amalgamation）』的化學原理：將粉碎的銀礦石鋪在巨大的石砌庭院中，加入食鹽、硫酸銅與大量水銀，透過騾馬長達數週的踩踏讓化學反應在常溫下進行，最後將形成的『銀汞齊』加熱，使水銀揮發留下純銀。這項化學工程技術極大地降低了提煉成本，是推動近代早期全球貿易網絡成型的核心技術底座。"
        },
        "美洲農學 (Mesoamerican agriculture)": {
            "type": "tech",
            "description": "前哥倫布時期美洲原住民經過數千年獨立發展出的高度發達植物馴化科學。與歐亞大陸依賴小麥與水稻不同，美洲原住民透過極為複雜的基因選擇，馴化了玉米、馬鈴薯、番茄、辣椒與可可。特別是玉米的馴化（從雜草『類蜀黍』改良而來），被現代基因學家視為人類歷史上最偉大的植物學工程。這些高熱量、高耐寒的農作物在16世紀傳入舊大陸後，徹底解決了歐洲與亞洲（如明清中國）的飢荒問題，引發了全球人口大爆炸。"
        },
        "廷巴克圖手抄本 (Timbuktu manuscripts)": {
            "type": "tech",
            "description": "13至16世紀保存在西非廷巴克圖的數十萬卷學術文獻的總稱。這些手抄本不僅包含《古蘭經》與伊斯蘭法學（Fiqh），更涵蓋了從中東傳入並在當地發展的天文學、光學、數學、醫學與植物學。書寫語言多為阿拉伯文或以阿拉伯字母拼寫的當地非洲語言（Ajami）。這項龐大的文本保存工程，徹底打破了『非洲沒有文字與學術歷史』的西方殖民者偏見，證明了漠南非洲曾深刻參與了伊斯蘭黃金時代的全球知識網絡。"
        },
        "印斯蘭建築 (Indo-Islamic Architecture)": {
            "type": "tech",
            "description": "南亞次大陸上一種將中亞/波斯幾何美學與印度本土工匠技藝完美融合的建築科學。波斯建築帶來了精確的數學幾何計算、巨大的圓頂、尖頂拱門以及象徵伊斯蘭宇宙觀的對稱幾何圖案。而印度本土工匠則注入了精湛的紅砂岩雕刻技術、蓮花圖案與懸挑式陽台（Jharokha）。這種跨文化的建築工程學在莫臥兒帝國時期達到巔峰，最著名的代表作『泰姬陵』便是精確幾何與光學設計的極致體現。"
        },
        "蘇菲與巴克提融合 (Sufi-Bhakti syncretism)": {
            "type": "religion",
            "description": "中世紀印度次大陸上發生的一場深刻的精神與哲學交融。伊斯蘭教的『蘇菲派（Sufism）』強調透過神秘主義的冥想與愛來直接體驗真主；而印度教的『巴克提運動（Bhakti movement）』同樣反對僵化的種姓制度，主張信徒能透過純粹的奉獻與神合一。這兩種來自不同文明底層的思想在德里與旁遮普一帶產生了強烈的哲學共鳴。這種思想的融合不僅促進了社會的寬容，更直接催生了強調人人平等、融合兩教教義的新興宗教——錫克教（Sikhism）。"
        },
        "沙斐儀派法學 (Shafi'i jurisprudence)": {
            "type": "religion",
            "description": "伊斯蘭遜尼派四大法學派別之一。該學派由9世紀學者沙斐儀創立，在法律演繹上極度重視聖訓（先知的言行），並建立了一套嚴謹的法理學方法論（Usool al-Fiqh）。這套法學體系隨著來自葉門與阿拉伯南部的海洋商人，沿著季風航線傳入印度洋與東南亞。在馬六甲蘇丹國的推行下，沙斐儀派法學成為東南亞（今印尼、馬來西亞）穆斯林社會規範、商業契約與婚姻繼承的最底層法律作業系統，延續至今。"
        },
        "峇峇娘惹文化 (Peranakan culture)": {
            "type": "tech",
            "description": "15世紀以來，華人移民（主要來自福建）在馬六甲海峽沿岸與當地馬來人通婚後，經過數百年演化出的一種高度複雜的『文化基因重組』現象。這是一種極具適應性的社會生存技術：他們在最核心的價值觀上嚴格堅守中國的儒家孝道、祖先崇拜與宗族網絡；但在外在的生活方式（如語言、服飾、香料運用與建築裝飾）上，則完全吸收了馬來與伊斯蘭文化，甚至融入了後來荷蘭與英國的殖民元素。這是人類學上關於『核心認同保存與外圍文化適應』最成功的跨國度文化融合案例。"
        }
    };

    for (const [key, value] of Object.entries(glossaryEnhancements)) {
        data.glossary[key] = value;
    }

    fs.writeFileSync(DATA_JSON_PATH, JSON.stringify(data, null, 2), 'utf8');
    console.log(`Successfully added global nodes with STRICT focus on culture and scientific transmissions.`);
}

run();
