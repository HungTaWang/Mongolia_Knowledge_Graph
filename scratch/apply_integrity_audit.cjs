const fs = require('fs');

const DATA_JSON_PATH = 'src/data.json';

function run() {
    let data = JSON.parse(fs.readFileSync(DATA_JSON_PATH, 'utf8'));

    // 1. Add missing city: Moscow
    const moscow = {
        "id": "moscow",
        "name": "莫斯科",
        "coordinates": [37.6173, 55.7558],
        "description": "東歐平原的心臟。在金帳汗國的統治下崛起，並在拜占庭帝國滅亡後，以『第三羅馬』自居，成為俄羅斯東正教的絕對中心。",
        "people": ["伊凡三世 (Ivan III)"],
        "tech": [],
        "religion": ["俄羅斯東正教 (Russian Orthodoxy)"],
        "numericYear": 1480
    };

    if (!data.cities.find(c => c.id === 'moscow')) {
        data.cities.push(moscow);
    }

    // 2. Fix 'global' city references in tour
    data.tour.forEach(t => {
        if (t.cityId === 'global') {
            t.cityId = 'rome'; // Default fallback for generic global events, or we could use 'dadu'
        }
    });

    // 3. Fix Glossary Key Mismatches in Cities
    data.cities.forEach(city => {
        if (city.tech) {
            city.tech = city.tech.map(t => {
                if (t === '回回曆法 (Islamic Astronomy)') return '回回曆法 (Islamic Astronomy in China)';
                if (t === '伊斯蘭曆法 (Islamic Astronomy)') return '回回曆法 (Islamic Astronomy in China)';
                return t;
            });
        }
        if (city.religion) {
            city.religion = city.religion.map(r => {
                if (r === '天主教外交 (Catholic diplomacy)') return '天主教外交 (Papal diplomacy)';
                if (r === '佛教') return '佛教 (Buddhism)';
                if (r === '伊斯蘭教') return '伊斯蘭教 (Islam)';
                if (r === '天主教') return '天主教 (Catholicism)';
                return r;
            });
        }
    });

    // 4. Fill Missing Glossaries
    if (!data.glossary) data.glossary = {};
    const missingGlossaries = {
        "天文翻譯 (Astronomical translation)": { type: "tech", description: "跨越語言與文明的天文學典籍轉譯工作。例如中世紀巴格達百年翻譯運動中對希臘《天文學大成》的翻譯，或是元代回回司天台對阿拉伯星表的翻譯，是推動人類宇宙觀演進的關鍵機制。" },
        "歐幾里得幾何 (Euclidean geometry)": { type: "tech", description: "源自古希臘數學家歐幾里得的《幾何原本》。這套基於公理與演繹推理的數學體系，不僅奠定了西方數學的基礎，更隨著伊斯蘭學者的翻譯傳入中東與東亞，深刻影響了各國的建築與科學發展。" },
        "授時曆 (Shoushi calendar)": { type: "tech", description: "由元代天文學家郭守敬主導編纂的曆法。透過參考阿拉伯天文觀測數據，並進行全國大規模的緯度測量，《授時曆》計算出的一年長度與現代只差26秒，是中國古代曆法最高峰，甚至傳入高麗與日本。" },
        "跨信仰神學辯論 (Interfaith debate)": { type: "religion", description: "在極度寬容的宮廷中進行的不同宗教學者的對話。如蒙古大汗蒙哥在哈拉和林舉辦的佛教、基督教與伊斯蘭教大辯論，或是莫臥兒帝國阿克巴大帝在真理之屋舉辦的跨教派探討。" },
        "跨信仰神學交流 (Interfaith dialogue)": { type: "religion", description: "同『跨信仰神學辯論』。代表了人類在特定歷史時期，試圖以理性與哲學來溝通不同絕對信仰的嘗試。" },
        "毛筆書法觀察 (Observation of brush writing)": { type: "tech", description: "西方傳教士或使節首次接觸東亞書寫系統的震撼。他們對東亞人使用毛筆而非羽毛筆、以及表意文字的複雜性留下了深刻的記錄，開啟了西方對漢字文化圈的初步認識。" },
        "俄羅斯東正教 (Russian Orthodoxy)": { type: "religion", description: "東正教的分支。在君士坦丁堡陷落後，莫斯科公國以『第三羅馬』自居，繼承了拜占庭的宗教正統。這成為俄羅斯民族認同的核心，也為其後續的領土擴張提供了神學依據。" },
        "海上貿易 (Maritime trade)": { type: "tech", description: "依賴海洋航線進行的物資與技術交換。從羅馬到印度的香料航線，到宋元的泉州-馬六甲航線，海上貿易促成了比陸地更龐大、更快速的文化基因重組。" },
        "伊斯蘭建築 (Islamic Architecture)": { type: "tech", description: "以穹頂、拱門、幾何圖案與阿拉伯書法為特徵的建築風格。它嚴格遵守『禁止偶像崇拜』的教義，將裝飾藝術的重心轉向純粹的幾何與數學之美，並深刻影響了伊比利亞與印度的建築。" },
        "驛傳物流 (Express logistics)": { type: "tech", description: "古代國家為統治廣闊疆域而建立的通訊系統。從波斯御道到蒙古『站赤』，這些系統透過接力換馬，確保了軍事情報與政令能以超越時代的速度橫跨大陸。" },
        "戶賦/包稅制 (Qubchur tax)": { type: "tech", description: "蒙古帝國等游牧政權為維持龐大開銷而建立的稅收系統。透過向定居農耕區或商人徵收固定的白銀或實物，並將稅收權力承包給穆斯林商人（斡脫），這套系統極大地推動了歐亞大陸的白銀流通。" },
        "驛站預算管理 (Yam budget management)": { type: "tech", description: "為了維持龐大的驛站系統運作，帝國必須進行精密的資源調度。這包括沿途驛馬的草料分配、使節食宿的補給，以及防止牌符濫用的審計制度，是古代最高等級的國家物流管理。" },
        "外交 (Diplomacy)": { type: "tech", description: "不同主權實體之間的談判與交涉。在沒有全球規則的古代，從羅馬教宗派遣修士見蒙古大汗，到各國聯姻，外交是除了戰爭外唯一能建立跨國秩序的技術。" },
        "佛教 (Buddhism)": { type: "religion", description: "西元前5世紀由釋迦牟尼在印度創立的宗教。主張透過修行消除無明與慾望以達到涅槃。隨著絲綢之路傳入中國、日本，並成為東亞與東南亞的底層信仰之一。" },
        "宗教融合 (Religious syncretism)": { type: "religion", description: "兩種或多種不同宗教在長期接觸後產生的教義或儀式混合。如印度的錫克教（蘇菲派與印度教的融合），或是中南美洲天主教與阿茲特克信仰的結合。" },
        "天主教傳教 (Catholic Missions)": { type: "religion", description: "由天主教會（如方濟各會、耶穌會）推動的跨國信仰擴張。傳教士往往不僅帶來了神學，也成為西方科學（如幾何、曆法）東傳與東方文化西傳的關鍵載體。" },
        "喬治亞正教 (Georgian Orthodoxy)": { type: "religion", description: "高加索地區最古老的基督教分支之一。在夾在伊斯蘭帝國與蒙古帝國之間的地緣政治中，它成為維持喬治亞民族認同的最堅實堡壘。" },
        "手抄本製作 (Manuscript illumination)": { type: "tech", description: "在活字印刷術普及前，僧侶或學者在羊皮紙上以手工抄寫並繪製精美插圖的技術。這不僅是知識傳承的唯一方式，也是中世紀歐洲與伊斯蘭世界最高級的視覺藝術。" },
        "金屬工藝 (Metalwork)": { type: "tech", description: "將金、銀、銅、鐵等金屬進行冶煉與鍛造的技術。從斯基泰人的動物紋金飾，到大馬士革鋼劍，金屬工藝的傳播直接決定了古代文明的軍事與經濟實力。" },
        "跨文化治理 (Cross-cultural administration)": { type: "tech", description: "如蒙古帝國或波斯帝國般，為了統治多語言、多宗教的龐大疆域，而發展出的包容性行政技術（如八思巴字或宗教寬容政策）。" },
        "地理時差計算 (Longitude time difference)": { type: "tech", description: "隨著天文觀測精度的提高與航海需求的增加，古代學者開始透過觀測月食等天文現象，推算出不同城市之間的經度差異。這代表了人類對地球空間感知的科學覺醒。" },
        "宗教融合藝術 (Syncretic art)": { type: "religion", description: "如『瓜達盧佩聖母』，在中南美洲，天主教神職人員為了讓原住民接受信仰，將聖母的形象與阿茲特克的母神形象融合，創造出兼具兩種文化符號的藝術風格。" },
        "敘利亞文字 (Syriac script)": { type: "tech", description: "中東地區廣泛使用的古老文字。隨著景教徒的東傳，它深刻影響了中亞游牧民族的文字發展，例如回鶻文與後來的蒙古文字皆起源於此。" },
        "絲綢紡織 (Silk weaving)": { type: "tech", description: "起源於中國的極度複雜生物學與織造技術。這項技術的西傳，直接催生了歐亞大陸最重要的一條陸上經濟動脈——絲綢之路。" },
        "急遞制度 (Express courier/Binchik)": { type: "tech", description: "同『驛傳物流』，特指用於傳遞緊急軍事情報的快速信使系統，騎手身上往往配有響鈴或特殊徽章以獲得絕對的路權。" },
        "驛馬管理 (Postal horse management)": { type: "tech", description: "維持驛站運作的底層基礎設施管理，涉及馬匹的畜牧、品種選育以及沿途草料的後勤供應。" },
        "牌符憑證 (Paiza/Maktub)": { type: "tech", description: "蒙古帝國發行的金、銀或銅製通行證。持有者可以合法徵用沿途驛站的所有資源，這是古代確保跨國指令執行的最高等級『實體授權憑證』。" },
        "造船技術 (Shipbuilding)": { type: "tech", description: "從阿拉伯三角帆到中國水密隔艙，造船工程學的進步是人類打破海洋地理隔閡的絕對前提。" },
        "航海術 (Navigation)": { type: "tech", description: "從觀星術、季風規律到磁羅盤的使用。航海術是天文學與地理學的實踐，讓人類能夠在浩瀚無標記的海洋中精確定位。" },
        "市舶稅收 (Maritime customs)": { type: "tech", description: "中國宋元時期建立的海關管理制度。透過向進出口商船抽解稅收，這套制度讓海洋貿易成為國家財政的重要支柱，並推動了港口城市的繁榮。" },
        "海上絲路 (Maritime Silk Road)": { type: "tech", description: "連接中國、東南亞、印度與中東的海上貿易網絡。比起陸路，它能以更低的成本運輸瓷器與香料等大宗物資，是古代全球化的主動脈。" },
        "香料貿易 (Spice trade)": { type: "tech", description: "為了獲取印尼與印度的胡椒、丁香等香料而引發的全球貿易網絡。這種對特定植物化學成分的渴望，直接引爆了歐洲的大航海時代。" },
        "跨國貿易 (Transnational trade)": { type: "tech", description: "跨越政治邊界的商業活動。它不僅傳遞了商品，更是宗教、瘟疫與科學技術散播的最佳載體。" },
        "游牧軍事 (Nomadic warfare)": { type: "tech", description: "以馬匹、反曲弓與高度機動性為核心的軍事工程學。從匈奴到蒙古，這種軍事技術屢次打破歐亞大陸農業帝國的平衡。" },
        "過境外交 (Transit diplomacy)": { type: "tech", description: "使節在前往最終目的地的途中，與沿途各國進行交涉以獲取通行權與補給的政治技術。" },
        "透視法 (Linear perspective)": { type: "tech", description: "文藝復興時期由佛羅倫斯藝術家發明的幾何繪畫技術。透過設定消失點，讓二維平面能精確呈現三維空間的深度，代表了西方藝術與數學幾何的完美結合。" },
        "伊斯蘭法學 (Islamic jurisprudence)": { type: "religion", description: "基於《古蘭經》與聖訓發展出的極度嚴密法律體系（沙里亞法）。它不僅規範宗教儀式，更涵蓋了商業契約、婚姻與刑法，是中世紀伊斯蘭世界運作的軟體底層。" }
    };

    for (const [key, value] of Object.entries(missingGlossaries)) {
        if (!data.glossary[key]) {
            data.glossary[key] = value;
        }
    }

    fs.writeFileSync(DATA_JSON_PATH, JSON.stringify(data, null, 2), 'utf8');
    console.log(`Successfully completed Data Integrity Fix: Added Moscow, remapped generic tours, unified keys, and filled 37 missing glossary entries.`);
}

run();
