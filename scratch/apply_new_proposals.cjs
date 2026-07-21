const fs = require('fs');

const DATA_JSON_PATH = 'src/data.json';

function run() {
    let data = JSON.parse(fs.readFileSync(DATA_JSON_PATH, 'utf8'));

    // 1. Add Florence City
    const florence = {
        "id": "florence",
        "name": "佛羅倫斯",
        "coordinates": [11.2558, 43.7696],
        "description": "文藝復興的搖籃。在麥地奇家族的資助下，這裡匯聚了從拜占庭逃亡而來的學者與未被神學篡改的古希臘典籍，重新燃起了『人文主義』的火種。",
        "people": ["科西莫·德·麥地奇 (Cosimo de' Medici)", "達文西 (Leonardo da Vinci)", "馬基維利 (Machiavelli)"],
        "tech": ["文藝復興 (Renaissance)", "人文主義 (Humanism)", "透視法 (Linear perspective)"],
        "infrastructure": ["聖母百花大教堂 (Florence Cathedral)"],
        "numericYear": 1400
    };

    if (!data.cities.find(c => c.id === 'florence')) {
        data.cities.push(florence);
    }

    // 2. Add Routes
    const newRoutes = [
        { "source": "magadha", "target": "baghdad", "label": "印度數字與『零』傳入伊斯蘭智慧之家", "type": "tech", "numericYear": 773 },
        { "source": "baghdad", "target": "rome", "label": "花拉子米《代數學》被翻譯為拉丁文傳入歐洲", "type": "tech", "numericYear": 1145 },
        { "source": "constantinople", "target": "florence", "label": "拜占庭滅亡：學者攜帶古希臘原稿引爆文藝復興", "type": "people", "numericYear": 1453 },
        { "source": "bukhara", "target": "paris", "label": "伊本·西那《醫學典範》成為歐洲中世紀大學標準教材", "type": "tech", "numericYear": 1150 },
        { "source": "london", "target": "boston", "label": "《大憲章》限制君權思想跨越大西洋成為美國獨立基石", "type": "religion", "numericYear": 1776 }
    ];

    data.routes.push(...newRoutes);

    // 3. Add Tours
    const newTours = [
        {
            "cityId": "baghdad",
            "title": "印度數字與零的西傳",
            "year": "8世紀末",
            "content": "西元773年，印度學者帶著梵文天文學與數學著作抵達阿拔斯王朝首都巴格達的『智慧之家』。波斯數學家花拉子米（Al-Khwarizmi）吸收了印度的十進位制與『零』的概念，這套極大簡化計算的系統後來被歐洲人稱為『阿拉伯數字』，徹底淘汰了笨重的羅馬數字。",
            "numericYear": 773
        },
        {
            "cityId": "baghdad",
            "title": "花拉子米創立代數學",
            "year": "9世紀",
            "content": "波斯數學家花拉子米在巴格達寫成了《還原與對消計算捷要》（即代數學 Algebra），將幾何問題轉化為系統化的代數方程式。這部著作在12世紀被切斯特的羅伯特翻譯成拉丁文傳入歐洲，成為歐洲文藝復興與科學革命的數學基石。",
            "numericYear": 820
        },
        {
            "cityId": "bukhara",
            "title": "伊本·西那完成《醫學典範》",
            "year": "1025年",
            "content": "波斯醫學家兼哲學家伊本·西那（Avicenna）在布哈拉一帶完成了史詩級巨著《醫學典範》。他系統化整合了古希臘的蓋倫醫學與伊斯蘭的臨床經驗，提出了隔離傳染病與臨床藥物試驗的概念。這本書隨後傳入歐洲，統治了歐洲醫學院長達五百年之久。",
            "numericYear": 1025
        },
        {
            "cityId": "london",
            "title": "約翰王簽署《大憲章》",
            "year": "1215年",
            "content": "英格蘭國王約翰在貴族的武力脅迫下，於蘭尼米德草地簽署了《大憲章》（Magna Carta）。這是人類歷史上首次以書面法律形式確立『王在法下』（Rule of Law），明定國王未經貴族議會同意不得徵稅，並保障自由民的正當法律程序，成為現代憲政的濫觴。",
            "numericYear": 1215
        },
        {
            "cityId": "florence",
            "title": "拜占庭滅亡與文藝復興爆發",
            "year": "1453年",
            "content": "鄂圖曼土耳其攻陷君士坦丁堡，拜占庭帝國滅亡。大批東正教學者帶著未被天主教會審查、篡改的古希臘文獻原稿逃往義大利。在佛羅倫斯麥地奇家族的資助下，這些文獻引爆了『人文主義』狂潮，歐洲人開始將目光從『神』轉移到『人』本身，文藝復興由此走向巔峰。",
            "numericYear": 1453
        }
    ];

    data.tour.push(...newTours);
    data.tour.sort((a, b) => a.numericYear - b.numericYear);

    // 4. Update Glossary
    if (!data.glossary) data.glossary = {};
    const glossaryEnhancements = {
        "阿拉伯數字 (Hindu-Arabic numerals)": {
            "type": "tech",
            "description": "現代世界通用的十進位記數系統，其本質應該稱為『印度-阿拉伯數字』。它由古印度數學家發明，最偉大的突破在於引入了『零（0）』的概念與『位值制』（同一個數字在不同位置代表不同大小）。8世紀時，這套系統傳入巴格達的『智慧之家』，被花拉子米等伊斯蘭學者廣泛使用。隨後在13世紀，義大利數學家斐波那契（Fibonacci）透過《算盤書》將其推廣至歐洲，徹底淘汰了無法進行複雜運算的羅馬數字，為現代數學與會計學奠定了基礎。"
        },
        "代數學 (Algebra)": {
            "type": "tech",
            "description": "數學的兩大基礎分支之一。其名稱『Algebra』直接音譯自9世紀波斯數學家花拉子米（Al-Khwarizmi）的阿拉伯文巨著《還原與對消計算捷要》（Al-Jabr）。在這本書中，他首次將代數從幾何學中獨立出來，用系統化的方程式來解決土地分配、遺產繼承與商業貿易問題。這本書在12世紀被翻譯為拉丁文傳入歐洲，成為所有歐洲大學的標準數學教材，為後續微積分與物理學的誕生提供了必備的數學工具。"
        },
        "人文主義 (Humanism)": {
            "type": "religion",
            "description": "14至16世紀文藝復興時期的核心哲學思潮。與中世紀經院哲學『以神為中心』、『強調原罪與禁慾』不同，人文主義者主張『以人為本』，強調人類的尊嚴、理智與創造力。他們透過重新發掘與翻譯古希臘羅馬的古典文獻（如柏拉圖、西塞羅的原稿），來尋找世俗生活的意義與道德指引。這種思想徹底解放了歐洲的思想禁錮，直接催生了近代科學革命與後來的啟蒙運動。"
        },
        "文藝復興 (Renaissance)": {
            "type": "tech",
            "description": "法文意為『重生』，指14世紀至17世紀在歐洲發生的一場深刻的文化運動。它發源於義大利的佛羅倫斯，核心特徵是復興古希臘羅馬的古典文化。拜占庭帝國衰亡時逃亡至義大利的學者，帶來的古籍原稿成為這場運動的催化劑。在藝術上，發展出了基於光學與幾何學的『透視法』（Linear perspective），讓繪畫與雕塑達到了前所未有的解剖學精確度；在思想上，人文主義取代了神權統治，標誌著歐洲從中世紀邁向現代社會的轉折點。"
        },
        "大憲章 (Magna Carta)": {
            "type": "religion",
            "description": "1215年英格蘭國王約翰在面臨貴族全面叛亂的壓力下，於蘭尼米德簽署的和平條約。這是人類歷史上最具標誌性的法律文件之一，其核心精神是『王在法下』（Rule of Law），即便是君主也必須遵守法律。其中最著名的第39條確立了『正當法律程序』（人身保護令的基礎），而第12條則確立了『未經貴族會議同意不得徵收免役稅』。這些思想在五百年後跨越大西洋，成為美國獨立戰爭中『無代表不納稅』的直接法理依據，並深植於美國憲法與權利法案之中。"
        },
        "醫學典範 (The Canon of Medicine)": {
            "type": "tech",
            "description": "11世紀波斯通才學者伊本·西那（Avicenna）所著的一部醫學百科全書。他將古希臘蓋倫（Galen）的醫學理論與印度、波斯的臨床實踐進行了前所未有的大規模整合。書中提出了疾病傳染性的概念，並制定了測試新藥的臨床七大基本原則。這部巨著被翻譯為拉丁文後，從12世紀到17世紀一直是歐洲各大學醫學院的標準與絕對權威教材，是伊斯蘭黃金時代對西方醫學最巨大的實體貢獻。"
        }
    };

    for (const [key, value] of Object.entries(glossaryEnhancements)) {
        data.glossary[key] = value;
    }

    fs.writeFileSync(DATA_JSON_PATH, JSON.stringify(data, null, 2), 'utf8');
    console.log(`Successfully added Florence, new routes, tours, and detailed glossaries for new proposals.`);
}

run();
