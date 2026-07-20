const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../src/data.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

const newRoutes = [
  {
    source: "karakorum",
    target: "kashgar",
    label: "成吉思汗西征：大軍從哈拉和林出發，途經喀什噶爾，開啟對中亞的征服。",
    type: "people",
    numericYear: 1219
  },
  {
    source: "kashgar",
    target: "talas",
    label: "西征軍隊集結：蒙古大軍在塔拉斯一帶匯合，準備攻打花剌子模。",
    type: "people",
    numericYear: 1219
  },
  {
    source: "talas",
    target: "bukhara",
    label: "攻陷布哈拉：成吉思汗穿過克孜勒庫姆沙漠，突襲並攻克布哈拉。",
    type: "people",
    numericYear: 1220
  },
  {
    source: "bukhara",
    target: "samarqand",
    label: "撒馬爾罕之戰：蒙古軍隊攻克花剌子模都城撒馬爾罕，並將大量工匠遷往東方。",
    type: "tech",
    numericYear: 1220
  },
  {
    source: "samarqand",
    target: "nishapur",
    label: "拖雷平定呼羅珊：拖雷率軍攻克內沙布爾，當地遭遇嚴重破壞，人口流失。",
    type: "people",
    numericYear: 1221
  },
  {
    source: "karakorum",
    target: "dadu",
    label: "攻佔中都：蒙古軍隊攻陷金朝中都（今北京），控制華北重要樞紐。",
    type: "people",
    numericYear: 1215
  },
  {
    source: "karakorum",
    target: "qayaligh",
    label: "窩闊台時期的驛站：帝國初步建立橫跨中亞的驛站（站赤）系統，連接蒙古本部與西域。",
    type: "trade",
    numericYear: 1225
  },
  {
    source: "karakorum",
    target: "sarai",
    label: "金帳汗國建立：拔都西征後，在伏爾加河畔建立薩萊，成為統治東歐的中心。",
    type: "people",
    numericYear: 1242
  },
  {
    source: "sarai",
    target: "azov",
    label: "黑海貿易網絡初期：金帳汗國控制黑海北岸，開始與義大利商人接觸。",
    type: "trade",
    numericYear: 1243
  },
  {
    source: "rome",
    target: "sarai",
    label: "柏朗嘉賓出使：教宗使節柏朗嘉賓受命前往蒙古，首站途經薩萊面見拔都。",
    type: "religion",
    numericYear: 1245
  },
  {
    source: "sarai",
    target: "karakorum",
    label: "柏朗嘉賓覲見貴由汗：使節抵達哈拉和林，見證貴由汗的登基，帶回首份關於蒙古的詳細報告。",
    type: "people",
    numericYear: 1246
  }
];

// Append new routes
data.routes.push(...newRoutes);

// Write back to file
fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf-8');
console.log(`Added ${newRoutes.length} early routes to data.json.`);
