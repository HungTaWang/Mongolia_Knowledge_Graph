const fs = require('fs');

const DATA_JSON_PATH = 'src/data.json';

function run() {
    let data = JSON.parse(fs.readFileSync(DATA_JSON_PATH, 'utf8'));

    // 1. Add Berlin City
    const berlin = {
        "id": "berlin",
        "name": "柏林",
        "coordinates": [13.4050, 52.5200],
        "description": "18至19世紀德國觀念論的絕對中心，也是普魯士王國的首都。從康德的啟蒙批判到黑格爾的絕對精神，再到馬克思的唯物辯證法，這裡誕生了近代西方最宏大也最激進的哲學體系。",
        "people": ["康德 (Immanuel Kant)", "黑格爾 (Georg Wilhelm Friedrich Hegel)", "馬克思 (Karl Marx)"],
        "tech": ["德國觀念論 (German Idealism)", "辯證唯物主義 (Dialectical Materialism)"],
        "infrastructure": ["洪堡大學 (Humboldt University)"],
        "numericYear": 1800
    };

    if (!data.cities.find(c => c.id === 'berlin')) {
        data.cities.push(berlin);
    }

    // 2. Update existing cities with new philosophy tags
    const cityUpdates = {
        'athens': { tech: [], religion: ["理型論 (Platonic Idealism)", "原子論 (Atomism)"] },
        'paris': { tech: [], religion: ["心物二元論 (Mind-Body Dualism)"] },
        'london': { tech: [], religion: ["經驗主義 (Empiricism)"] }
    };

    data.cities.forEach(city => {
        if (cityUpdates[city.id]) {
            const updates = cityUpdates[city.id];
            if (!city.tech) city.tech = [];
            if (!city.religion) city.religion = [];
            
            updates.tech.forEach(t => { if (!city.tech.includes(t)) city.tech.push(t); });
            updates.religion.forEach(r => { if (!city.religion.includes(r)) city.religion.push(r); });
        }
    });

    // 3. Add Routes (Philosophy Transmission)
    const newRoutes = [
        { "source": "berlin", "target": "london", "label": "馬克思流亡倫敦寫作《資本論》", "type": "religion", "numericYear": 1849 },
        { "source": "paris", "target": "berlin", "label": "法國啟蒙理性激發德國觀念論", "type": "religion", "numericYear": 1781 }
    ];
    data.routes.push(...newRoutes);

    // 4. Add Tours
    const newTours = [
        {
            "cityId": "athens",
            "title": "柏拉圖與德謨克利特的源頭之爭",
            "year": "西元前4世紀",
            "content": "在古希臘，哲學的兩大陣營已然確立。柏拉圖提出『理型論』，認為感官世界只是虛幻的影子，唯有精神與理性構成的理型世界才是真實的；同時，德謨克利特提出了超越時代的『原子論』，認為宇宙中沒有神明與目的，一切都是物質（原子）與虛空在物理法則下的隨機碰撞。",
            "numericYear": -400
        },
        {
            "cityId": "paris",
            "title": "笛卡兒提出心物二元論",
            "year": "1641年",
            "content": "法國哲學家笛卡兒在《第一哲學沉思錄》中，透過極端的『懷疑論』推導出『我思故我在』。他將世界嚴格劃分為不佔空間的『心靈（精神）』與佔據空間的『廣延（物質）』。這不僅奠定了近代唯心論的基礎，也讓科學家得以將自然界（包含動物與人體）視為純粹的『機器』進行解剖與計算。",
            "numericYear": 1641
        },
        {
            "cityId": "london",
            "title": "洛克發表《人類理解論》",
            "year": "1690年",
            "content": "英國哲學家約翰·洛克發表《人類理解論》，強烈反對笛卡兒的『天賦觀念』。洛克提出『白板說』，認為人類出生時的心靈就像一張白紙，所有的知識與觀念都來自於後天的『感官與經驗』。這種徹底的經驗主義成為近代唯物主義與英國實驗科學的底層邏輯。",
            "numericYear": 1690
        },
        {
            "cityId": "berlin",
            "title": "德國觀念論的巔峰：康德與黑格爾",
            "year": "18世紀末至19世紀初",
            "content": "在普魯士，康德發動了哲學的『哥白尼式革命』，指出人類只能認識大腦建構的『現象』，而無法觸及『物自體』，試圖調和唯心與經驗主義。隨後，黑格爾將唯心主義推向絕對的巔峰，他認為宇宙的本體是『絕對精神』，而人類的歷史演進，就是絕對精神透過『正、反、合』的辯證法不斷自我認識的過程。",
            "numericYear": 1800
        },
        {
            "cityId": "london",
            "title": "馬克思發表《資本論》與唯物辯證法",
            "year": "1867年",
            "content": "卡爾·馬克思因參與1848年革命而流亡倫敦，在大英博物館閱覽室寫下《資本論》。他吸收了黑格爾的辯證法，但徹底顛覆了其唯心基礎。馬克思主張『物質決定意識，經濟基礎決定上層建築』，認為推動人類歷史前進的不是絕對精神，而是生產力的物質演進與階級鬥爭。這標誌著『辯證唯物主義』的誕生。",
            "numericYear": 1867
        }
    ];
    data.tour.push(...newTours);
    data.tour.sort((a, b) => a.numericYear - b.numericYear);

    // 5. Update Glossary with rich philosophy entries
    if (!data.glossary) data.glossary = {};
    const glossaryEnhancements = {
        "理型論 (Platonic Idealism)": {
            "type": "religion",
            "description": "古希臘哲學家柏拉圖提出的核心唯心主義理論。柏拉圖在『洞穴寓言』中說明：我們肉眼所見的物質世界，就像是洞穴牆上的影子，是不完美且不斷變動的；而真正完美的、永恆不變的真實，存在於超越時空的『理型世界（World of Ideas / Forms）』中。例如，世間所有的圓形都不完美，但『圓的理型』是絕對完美的。這種認為『精神與概念先於物質而存在』的思想，深刻影響了後來的基督教神學（上帝作為最高理型）與整個西方唯心哲學史。"
        },
        "原子論 (Atomism)": {
            "type": "religion",
            "description": "由古希臘哲學家留基伯與德謨克利特（Democritus）在西元前5世紀提出的唯物主義宇宙觀。他們超越時代地認為，宇宙中沒有神明、沒有目的論，萬事萬物（包含靈魂）都是由不可分割的微小實體『原子（Atom）』與『虛空（Void）』所組成。一切變化都只是原子在虛空中因物理法則進行的隨機碰撞與重新組合。這種極端機械唯物的觀點在當時雖然被柏拉圖與亞里斯多德強烈反對，但卻在兩千年後的科學革命中，成為近代物理學與化學復活的理論基石。"
        },
        "心物二元論 (Mind-Body Dualism)": {
            "type": "religion",
            "description": "17世紀法國哲學家笛卡兒（René Descartes）提出的認識論本體論。笛卡兒透過絕對的懷疑，得出唯一不可懷疑的真理『我思故我在』。在此基礎上，他將世界嚴格劃分為兩種完全獨立的實體：不佔空間、具備思想能力的『心靈實體』，以及佔據空間、完全受物理法則支配的『物質實體（廣延）』。這種二分法一方面為近代唯心論確立了主體性，另一方面卻也解放了自然科學——科學家從此可以心安理得地將自然界甚至動物與人體，視為純粹的『無靈魂機器』進行解剖與數學計算。"
        },
        "經驗主義 (Empiricism)": {
            "type": "religion",
            "description": "與歐洲大陸的『理性主義』（如笛卡兒）相對立，主要發源於英國的認識論流派。代表人物約翰·洛克（John Locke）在《人類理解論》中提出著名的『白板說（Tabula rasa）』：人類剛出生時，心靈就像一張沒有任何字跡的白紙，絕對沒有任何『天賦觀念』。人類所有的知識、概念與道德，都100%來自於後天的感官經驗與對物質世界的觀察。這種強調觀察、歸納與實驗的思想，成為近代唯物主義與英國實驗科學（如牛頓力學）不可撼動的底層邏輯。"
        },
        "德國觀念論 (German Idealism)": {
            "type": "tech",
            "description": "18世紀末至19世紀中葉，由康德開創、黑格爾集大成的哲學運動，代表了西方唯心主義的最高峰。康德發動『哥白尼式革命』，主張我們無法認識客觀的『物自體』，世界的秩序是我們大腦的先驗框架『建構』出來的。黑格爾則進一步打破了物自體，提出『絕對精神（Absolute Spirit）』的宏大體系。他認為，宇宙的本體就是絕對精神，而人類歷史、藝術、宗教與國家的演進，都是絕對精神透過『正、反、合』的辯證法則，不斷克服矛盾、最終實現自我認識的過程。"
        },
        "辯證唯物主義 (Dialectical Materialism)": {
            "type": "tech",
            "description": "由卡爾·馬克思（Karl Marx）與恩格斯創立的哲學體系，標誌著唯物主義發展的最高階段。馬克思吸收了黑格爾強大的『辯證法（事物在矛盾中演進）』，但極其敏銳地將黑格爾顛倒的唯心體系『翻轉過來』。他主張『物質決定意識』：不是絕對精神推動歷史，而是『生產力與生產關係』的物質矛盾在推動歷史。這套理論認為，人類社會的一切上層建築（法律、宗教、國家、哲學），歸根結底都是由當時的『經濟基礎』所決定的。"
        }
    };

    for (const [key, value] of Object.entries(glossaryEnhancements)) {
        data.glossary[key] = value;
    }

    fs.writeFileSync(DATA_JSON_PATH, JSON.stringify(data, null, 2), 'utf8');
    console.log(`Successfully added Berlin, injected deep philosophy tours, and expanded the glossary for Idealism and Materialism.`);
}

run();
