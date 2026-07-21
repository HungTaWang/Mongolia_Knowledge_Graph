const fs = require('fs');

const DATA_JSON_PATH = 'src/data.json';

function run() {
    let data = JSON.parse(fs.readFileSync(DATA_JSON_PATH, 'utf8'));

    // 1. Update cities to include the new tags so they render as badges
    const cityUpdates = {
        'qufu': { tech: [], religion: ["儒家 (Confucianism)", "墨家 (Mohism)"] },
        'luoyang': { tech: [], religion: ["道家 (Daoism)"] },
        'xianyang': { tech: ["法家 (Legalism)"], religion: [] },
        'quanzhou': { tech: ["水密隔艙 (Watertight compartments)", "磁羅盤 (Magnetic compass)"], religion: [] },
        'dadu': { tech: ["八思巴字 ('Phags-pa script)", "回回曆法 (Islamic Astronomy in China)"], religion: [] },
        'baghdad': { tech: ["百年翻譯運動 (Translation Movement)"], religion: [] },
        'rome': { tech: ["天主教外交 (Papal diplomacy)"], religion: [] },
        'alexandria': { tech: ["托勒密天文學 (Ptolemaic astronomy)"], religion: [] }
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

    // 2. Add rich glossary entries
    if (!data.glossary) data.glossary = {};
    const glossaryEnhancements = {
        "儒家 (Confucianism)": {
            "type": "religion",
            "description": "發源於春秋時期魯國（今曲阜）的哲學與倫理體系，由孔子創立、孟子與荀子集大成。在周朝宗法制度崩潰的『禮崩樂壞』時代，儒家試圖透過恢復『周禮』與建立以『仁』為核心的道德自覺來重建社會秩序。孟子進一步提出『民為貴，社稷次之，君為輕』的民本思想與『天命』觀念，認為君王若不施仁政，人民有權將其推翻。自漢武帝『罷黜百家，獨尊儒術』後，儒家思想成為東亞兩千年來文官制度、科舉考試與家庭倫理的最底層代碼。"
        },
        "道家 (Daoism)": {
            "type": "religion",
            "description": "與儒家相對立的春秋戰國核心哲學，代表人物為老子與莊子。老子在《道德經》中提出了『道』——這是宇宙的絕對本源與運行規律，超越了任何人格化的神明。道家主張『無為而治』，反對人為的干預、繁文縟節與戰爭，認為順應自然規律才能達到社會的和諧。莊子則進一步將其發展為追求個人絕對精神自由的哲學。道家思想不僅深刻影響了中國的藝術、中醫與養生學，其『不爭』與『辯證法』的思想至今仍極具啟發性。"
        },
        "法家 (Legalism)": {
            "type": "tech",
            "description": "戰國時期最具實用主義與權力色彩的政治思想流派。以商鞅、韓非子為代表，法家徹底摒棄了儒家的道德說教，認為人性本惡，唯有透過絕對理性的三根支柱來統治國家：嚴刑峻罰的『法』、君王駕馭臣下的隱密『術』、以及絕對君權的『勢』。在商鞅變法的推動下，法家思想幫助秦國建立了一套極度高效的軍國主義耕戰體系，最終成功吞併六國。法家雖在漢代後名義上被儒家取代，但實際上成為中國歷代帝王『外儒內法』的統治潛規則。"
        },
        "墨家 (Mohism)": {
            "type": "religion",
            "description": "春秋戰國時期由墨子創立的獨特流派，代表了底層平民與工匠的利益。墨家提出了超越時代的『兼愛』（無階級差別的博愛）與『非攻』（反對侵略戰爭）。令人驚嘆的是，這群和平主義者同時也是當代最頂尖的物理學家與工程師。為了阻止大國吞併小國，墨家發展出了極其發達的城防物理學與防禦器械（墨家防禦術），並在《墨經》中留下了關於光學（小孔成像）、力學與幾何學的精確記載。可惜在秦漢大一統後，墨家因其嚴密的準軍事組織色彩而遭到打壓至絕跡。"
        },
        "八思巴字 ('Phags-pa script)": {
            "type": "tech",
            "description": "人類文字史上極為罕見的『由上而下發明並推行』的跨語言編碼系統。1269年，元世祖忽必烈為了統一廣袤多民族帝國的書面語言，委託西藏國師八思巴（'Phags-pa）以藏文字母為基礎，創立了這套方形的拼音文字。它的野心極大，試圖精確拼寫蒙古語、漢語、藏語甚至波斯語。雖然它在元代被列為官方文字，並廣泛應用於聖旨、牌符與印章上，但因其難以書寫且民間慣用漢字，最終隨元朝滅亡而消失。"
        },
        "回回曆法 (Islamic Astronomy in China)": {
            "type": "tech",
            "description": "伊斯蘭天文學在元明兩代的統稱。1267年，波斯天文學家札馬魯丁（Jamal al-Din）向忽必烈進獻了七件先進的西域天文儀器（包含多環儀、星晷、渾天儀等），並帶來了以黃道座標系為基礎的阿拉伯星表。這打破了中國傳統沿用千年的赤道座標系，元朝因此設立了『回回司天台』，與漢人的司天監並立。這些中亞傳來的精密觀測數據，成為郭守敬編纂《授時曆》的關鍵技術支援。"
        },
        "水密隔艙 (Watertight compartments)": {
            "type": "tech",
            "description": "中國造船史上最偉大的發明之一，最早見於唐宋時期，並在元代泉州等港口廣泛應用於遠洋木帆船（福船）。工匠利用木板將船艙橫向分隔成多個互不透水的獨立艙室，若船體觸礁破裂，海水只會淹沒受損的單一艙室，極大地提高了遠洋航行的安全性。這項技術透過阿拉伯商人傳入歐洲，直到18世紀末期，西方海軍（如英國）才開始廣泛模仿並應用這項保障大航海時代的底層安全技術。"
        },
        "磁羅盤 (Magnetic compass)": {
            "type": "tech",
            "description": "源自中國的『四大發明』之一。早在北宋沈括的《夢溪筆談》中便記錄了人工磁化指南針與磁偏角的現象。到了南宋與元代，磁羅盤被廣泛應用於海上絲綢之路的商船導航。在此之前，各國水手只能依賴天氣晴朗時的『牽星術（天文導航）』；磁羅盤的普及，讓船隻能在陰雨連綿或大霧中精確定位並橫跨印度洋。這項技術經由阿拉伯人傳入歐洲，成為歐洲大航海時代發現美洲與環球航行的絕對前提。"
        },
        "托勒密天文學 (Ptolemaic astronomy)": {
            "type": "tech",
            "description": "由西元2世紀古希臘學者托勒密（Ptolemy）在亞歷山大港集大成構建的宇宙模型。其核心是『地心說』，並為了解釋行星在夜空中的『逆行』現象，發明了極其複雜的『本輪（Epicycle）』與『均輪（Deferent）』數學幾何系統。儘管基礎假設是錯誤的，但它在數學預測上極度精確，因此完美契合了後來基督教與伊斯蘭教神學的需求，統治了人類宇宙觀長達1400年，直到哥白尼與克卜勒才將其顛覆。"
        },
        "百年翻譯運動 (Translation Movement)": {
            "type": "religion",
            "description": "8世紀至10世紀，阿拔斯王朝在巴格達『智慧之家（House of Wisdom）』發起的一場史詩級的學術翻譯工程。在歷代哈里發的重金資助下，穆斯林、基督徒（景教徒）與猶太學者合作，將幾乎所有能找到的古希臘文獻（如亞里斯多德的哲學、歐幾里得的幾何學、蓋倫的醫學），以及波斯與印度的典籍，系統性地翻譯為阿拉伯文。這場運動不僅造就了伊斯蘭黃金時代，更讓古希臘文明在歐洲黑暗時代得以倖存，成為後來歐洲文藝復興的火種。"
        },
        "天主教外交 (Papal diplomacy)": {
            "type": "religion",
            "description": "13世紀中葉，面對蒙古帝國西征帶來的末日恐慌，羅馬教廷發起的一系列前所未有的地緣政治試探。教宗諾森四世派遣方濟各會修士柏郎嘉宾（John of Plano Carpini），隨後法國國王又派遣魯不魯乞（William of Rubruck），徒步騎馬橫跨數千公里的歐亞草原，抵達蒙古首都哈拉和林。雖然他們未能成功說服大汗皈依天主教，但他們帶回的《東方見聞錄》等報告，首次為歐洲人揭開了遠東的神秘面紗，打破了西方對東方的神話幻想，這是東西方世界最早的高層外交接觸。"
        },
        "天主教 (Catholicism)": {
            "type": "religion",
            "description": "基督教的三大流派之一，也是歷史最悠久、規模最大的分支。以羅馬主教（教宗）為絕對精神領袖，主張『宗徒傳承』。在中世紀歐洲，天主教不僅是宗教信仰，更是一個擁有巨大世俗權力、甚至能罷黜國王的跨國政治與經濟實體。從十字軍東征到派遣耶穌會士前往大明與美洲，天主教會在傳播歐洲文明與引發跨文化衝突中扮演了最核心的角色。"
        },
        "伊斯蘭教 (Islam)": {
            "type": "religion",
            "description": "西元7世紀初由先知穆罕默德在阿拉伯半島的麥加創立的一神教。其核心經典《古蘭經》強調對唯一真主阿拉的絕對順從。伊斯蘭教具有極強的擴張性與融合性，在極短的時間內建立了橫跨亞非歐的龐大帝國。在中世紀，伊斯蘭世界是歐亞大陸的貿易與學術樞紐，穆斯林學者在天文學、醫學、數學（代數）與哲學上的輝煌成就，深刻啟發了後來的歐洲科學革命。"
        }
    };

    for (const [key, value] of Object.entries(glossaryEnhancements)) {
        data.glossary[key] = value;
    }

    fs.writeFileSync(DATA_JSON_PATH, JSON.stringify(data, null, 2), 'utf8');
    console.log(`Successfully updated cities with new tags and injected deep historical narratives for Spring & Autumn thoughts and other techs.`);
}

run();
