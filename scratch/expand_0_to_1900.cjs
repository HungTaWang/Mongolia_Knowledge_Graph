const fs = require('fs');

const DATA_JSON_PATH = 'src/data.json';

function run() {
    let dataJson = JSON.parse(fs.readFileSync(DATA_JSON_PATH, 'utf8'));

    // 1. Remove all 'trade' routes
    dataJson.routes = dataJson.routes.filter(r => r.type !== 'trade');

    // 2. Add new cities for 0-1000 & 1500-1900 if they don't exist
    const newCities = [
        { id: "changan", name: "長安", coordinates: [108.9398, 34.3416], description: "漢唐時期的絲綢之路起點，見證了佛教傳入與西域文化的交融。", numericYear: 100 },
        { id: "alexandria", name: "亞歷山大港", coordinates: [29.9187, 31.2001], description: "希臘化時代與羅馬帝國的知識中心，托勒密天文學的發源地。", numericYear: 100 },
        { id: "london", name: "倫敦", coordinates: [-0.1276, 51.5072], description: "大英帝國首都，工業革命的發源地，推動了現代科學與技術的全球傳播。", numericYear: 1750 },
        { id: "kyoto", name: "京都", coordinates: [135.7681, 35.0116], description: "日本遣唐使帶回佛教與律令制的文化熔爐。", numericYear: 700 }
    ];

    newCities.forEach(nc => {
        if (!dataJson.cities.find(c => c.id === nc.id)) {
            dataJson.cities.push(nc);
        }
    });

    // 3. Add new Tour events for 0-1000
    const earlyEvents = [
        { cityId: "changan", title: "張騫出使西域", year: "前138年-前126年", content: "漢朝使節張騫開闢絲綢之路，首次建立中國與中亞、羅馬的間接文化交流。", numericYear: 0 },
        { cityId: "changan", title: "佛教傳入中國", year: "公元1世紀", content: "東漢時期，佛教經由西域傳入洛陽與長安，開啟了長達千年的中印哲學思想大融合。", numericYear: 68 },
        { cityId: "alexandria", title: "托勒密《天文學大成》", year: "150年", content: "托勒密在亞歷山大港完成《天文學大成》，其地心說模型深刻影響了伊斯蘭與歐洲天文學達千年之久。", "numericYear": 150 },
        { cityId: "kyoto", title: "遣唐使與文化輸入", year: "7世紀-9世紀", content: "日本派遣大量遣唐使前往長安，帶回了佛教、漢字、建築與政治制度，深刻形塑了日本文化。", "numericYear": 700 },
        { cityId: "baghdad", title: "百年翻譯運動", year: "8世紀-10世紀", content: "阿拔斯王朝在巴格達設立「智慧之家」，將大量古希臘科學與哲學文獻翻譯為阿拉伯文。", "numericYear": 800 }
    ];

    // 4. Add new Tour events for 1500-1900
    const lateEvents = [
        { cityId: "global", title: "哥白尼《天體運行論》", year: "1543年", content: "哥白尼發表日心說，挑戰了教會傳統宇宙觀，開啟了科學革命的序幕。", "numericYear": 1543 },
        { cityId: "rome", title: "利瑪竇來華", year: "1582年", content: "耶穌會士利瑪竇抵達中國，帶來了歐洲的幾何學（歐幾里得幾何）與世界地圖，促進了中西科學思想的第一次深度碰撞。", "numericYear": 1582 },
        { cityId: "london", title: "牛頓《自然哲學的數學原理》", year: "1687年", content: "牛頓發表萬有引力定律，奠定了古典物理學的基礎，理性主義與啟蒙思想開始席捲歐洲。", "numericYear": 1687 },
        { cityId: "london", title: "工業革命爆發", year: "1760年代", content: "蒸汽機的發明與應用在英國引發工業革命，現代鐵路與機械科技開始向全球擴散。", "numericYear": 1760 },
        { cityId: "global", title: "達爾文發表《物種起源》", year: "1859年", content: "演化論的提出徹底顛覆了傳統神學的創造論，對哲學、宗教與人類自我認知產生了深遠影響。", "numericYear": 1859 }
    ];

    // Merge and sort tour events by numericYear
    dataJson.tour = [...earlyEvents, ...dataJson.tour, ...lateEvents];
    dataJson.tour.sort((a, b) => a.numericYear - b.numericYear);

    // 5. Optionally add some routes for the new cross-country interactions (tech, religion, people)
    dataJson.routes.push(
        { source: "changan", target: "kashgar", label: "絲路使團與佛教東傳", type: "religion", numericYear: 100 },
        { source: "changan", target: "kyoto", label: "遣唐使", type: "people", numericYear: 700 },
        { source: "rome", target: "dadu", label: "耶穌會傳教", type: "religion", numericYear: 1582 }
    );

    fs.writeFileSync(DATA_JSON_PATH, JSON.stringify(dataJson, null, 2), 'utf8');
    console.log('Successfully expanded timeline to 0-1900, added missing nodes, and removed Trade routes.');
}

run();
