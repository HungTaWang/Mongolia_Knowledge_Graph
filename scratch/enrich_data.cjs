const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../src/data.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

// 1. Enrich Glossary Definitions
const enrichedDefs = {
  "成吉思汗": "蒙古帝國的奠基者與首任大汗，透過連年征戰統一了蒙古高原，並建立橫跨歐亞的龐大帝國，促進了東西方的大規模互動。",
  "郭守敬": "元朝著名天文學家、數學家與水利專家，主持編製了精確度極高的《授時曆》，並在登封告成建立巨大的觀星台。",
  "忽必烈": "成吉思汗之孫，建立元朝。他將統治中心東移至大都，並對各種宗教與外來科技採取包容態度。",
  "馬可波羅": "威尼斯商人，據傳曾在元朝為官多年，其口述的《馬可波羅遊記》極大地激發了歐洲對東方的探索興趣。",
  "拖雷": "成吉思汗的幼子，曾統領蒙古主力軍隊，並在西征花剌子模期間攻克並毀滅了呼羅珊的多座重鎮（如內沙布爾）。",
  "拔都": "成吉思汗之孫，發動「長子西征」並建立了統治東歐與羅斯地區的金帳汗國。",
  "柏朗嘉賓": "義大利方濟各會修士，受教宗派遣前往蒙古帝國，是已知最早抵達哈拉和林並留下詳細紀錄的歐洲使節。",
  "拉班·掃馬": "出生於大都的汪古部景教修士，受伊兒汗國派遣出使歐洲，曾會見教宗與英法君主，被稱為「東方的馬可波羅」。",
  "扎馬魯丁": "波斯天文學家，在元大都設立了回回司天臺，並引進了多種阿拉伯天文儀器，對元代天文學影響深遠。",
  "旭烈兀": "成吉思汗之孫，率軍發動第三次西征，攻陷巴格達並建立了伊兒汗國，推動了波斯與中國之間的文化交流。",
  
  "高表測影": "一種天文測量技術。郭守敬在登封觀星台建造了高達數丈的「表」，藉以精確測量冬至、夏至的日影長度，其設計深受中亞巨型觀象台啟發。",
  "授時曆": "元朝頒布的曆法，其計算的一年長度為 365.2425 日，與現代公曆完全相同，代表了當時世界天文學的最高水準。",
  "活字印刷": "源於中國的印刷技術，在蒙古和平時期隨著物資與人員的流動向西傳播，可能對歐洲古騰堡的活字印刷產生了啟發。",
  "紙幣": "中國宋元時期廣泛使用的貨幣。伊兒汗國曾在波斯地區強行推廣紙幣（Čāv），雖遭遇經濟崩潰，但促進了造紙與印刷術的西傳。",
  "站赤": "蒙古帝國龐大的驛站系統。依靠大汗核發的牌符 (Paiza)，使節與商人得以安全且快速地橫跨整個歐亞大陸。",
  "牌符": "蒙古帝國頒發給使節或官員的憑證（又稱乘驛牌），持有者可沿途在驛站獲得馬匹與物資補給。"
};

for (const [key, desc] of Object.entries(enrichedDefs)) {
  if (data.glossary[key]) {
    data.glossary[key].description = desc;
  }
}

// 2. Add connections for Gaocheng (登封)
const gaochengRoutes = [
  {
    "source": "dadu",
    "target": "gaocheng",
    "label": "四海測驗：郭守敬在大都設立太史院後，推動全國規模的天文觀測，而登封告成的觀星台是其觀測網的核心樞紐。",
    "type": "tech",
    "numericYear": 1276
  },
  {
    "source": "maragha",
    "target": "gaocheng",
    "label": "天文建築的啟發：中亞馬拉蓋天文台的巨型觀測儀器概念，透過波斯學者傳入，啟發了登封觀星台「高表」的巨大化設計。",
    "type": "tech",
    "numericYear": 1276
  }
];

data.routes.push(...gaochengRoutes);

fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf-8');
console.log('Enriched glossary definitions and added Gaocheng routes.');
