const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, 'data.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// 1. Add Nanjing City
data.cities.push({
  id: "nanjing",
  name: "南京 (應天府)",
  coordinates: [118.7969, 32.0603],
  description: "朱元璋的龍興之地。1356年攻佔集慶並改名應天府，作為基地穩步擴張，最終於1368年建立明朝，結束了蒙元的統治。",
  people: ["朱元璋 (Hongwu Emperor)"],
  tech: ["里甲制", "火器廣泛應用"],
  infrastructure: ["南京明城牆", "明故宮"],
  numericYear: 1356,
  events: [
    {
      year: "1356年",
      title: "朱元璋攻佔集慶",
      description: "朱元璋取得戰略基地，改名應天府，開始穩步擴張。",
      numericYear: 1356
    },
    {
      year: "1368年",
      title: "明朝建立",
      description: "朱元璋於南京稱帝，建立大明王朝。",
      numericYear: 1368
    },
    {
      year: "1398年",
      title: "朱元璋駕崩",
      description: "洪武時代結束，建文帝繼位，為後續的靖難之役埋下伏筆。",
      numericYear: 1398
    }
  ]
});

// 2. Add events to existing cities
const appendEvent = (cityId, event) => {
  const city = data.cities.find(c => c.id === cityId);
  if (city) {
    if (!city.events) city.events = [];
    city.events.push(event);
    city.events.sort((a, b) => (a.numericYear || 0) - (b.numericYear || 0));
  }
};

appendEvent('karakorum', {
  year: "1206年",
  title: "成吉思汗建立大蒙古國",
  description: "鐵木真統一蒙古高原各部，被尊為成吉思汗，開啟了席捲歐亞大陸的全球擴張。",
  numericYear: 1206
});

appendEvent('dadu', {
  year: "1271年",
  title: "忽必烈建立大元",
  description: "蒙古政權中原化，忽必烈定國號為大元，建都大都。",
  numericYear: 1271
});

appendEvent('dadu', {
  year: "1351年",
  title: "紅巾軍起義爆發",
  description: "元末天災人禍引發大規模農民起義，動搖了元朝的統治基礎。",
  numericYear: 1351
});

appendEvent('hangzhou', {
  year: "1276年",
  title: "元軍攻陷臨安",
  description: "元軍南下攻陷南宋都城臨安，俘獲宋恭帝，南宋朝廷南逃。",
  numericYear: 1276
});

appendEvent('quanzhou', {
  year: "1279年",
  title: "崖山海戰與宋朝滅亡",
  description: "南宋殘餘勢力在崖山海戰中全軍覆沒，陸秀夫背負幼帝投海，元朝完成中國大統一。",
  numericYear: 1279
});

appendEvent('constantinople', {
  year: "1261年",
  title: "拜占庭光復君士坦丁堡",
  description: "尼西亞帝國的米海爾八世收復舊都，帕里奧洛格斯王朝復辟，但帝國實力已大不如前。",
  numericYear: 1261
});

appendEvent('constantinople', {
  year: "1389年-1396年",
  title: "鄂圖曼土耳其崛起與包圍",
  description: "歷經科索沃戰役與尼科波利斯戰役，鄂圖曼土耳其幾乎完全包圍了君士坦丁堡，拜占庭淪為附庸。",
  numericYear: 1396
});

// Update the 1204 event if it exists to be more detailed
const constCity = data.cities.find(c => c.id === 'constantinople');
if (constCity && constCity.events) {
  const event1204 = constCity.events.find(e => e.year.includes('1204'));
  if (event1204) {
    event1204.description = "十字軍攻陷君士坦丁堡，拜占庭中央權威瓦解並建立拉丁帝國。帝國被迫分裂，導致東部防線真空。";
  }
}


// 3. Add to Tour array
data.tour.push(
  {
    cityId: 'karakorum',
    title: '成吉思汗建立大蒙古國',
    year: '1206年',
    content: '鐵木真統一蒙古高原各部，被尊為成吉思汗，開啟了席捲歐亞大陸的全球擴張。',
    numericYear: 1206
  },
  {
    cityId: 'dadu',
    title: '忽必烈建立大元',
    year: '1271年',
    content: '蒙古政權中原化，忽必烈定國號為大元，建都大都。',
    numericYear: 1271
  },
  {
    cityId: 'hangzhou',
    title: '元軍攻陷臨安',
    year: '1276年',
    content: '元軍南下攻陷南宋都城臨安，俘獲宋恭帝，南宋朝廷南逃。',
    numericYear: 1276
  },
  {
    cityId: 'quanzhou',
    title: '崖山海戰與宋朝滅亡',
    year: '1279年',
    content: '南宋殘餘勢力在崖山海戰中全軍覆沒，元朝完成中國大統一。',
    numericYear: 1279
  },
  {
    cityId: 'dadu',
    title: '紅巾軍起義爆發',
    year: '1351年',
    content: '元末天災人禍引發大規模農民起義，動搖了元朝的統治基礎。',
    numericYear: 1351
  },
  {
    cityId: 'nanjing',
    title: '朱元璋攻佔集慶',
    year: '1356年',
    content: '朱元璋取得戰略基地，改名應天府，開始穩步擴張。',
    numericYear: 1356
  },
  {
    cityId: 'nanjing',
    title: '明朝建立與元廷北逃',
    year: '1368年',
    content: '朱元璋於南京稱帝，徐達攻陷大都，元朝統治結束。',
    numericYear: 1368
  },
  {
    cityId: 'nanjing',
    title: '朱元璋駕崩與建文帝繼位',
    year: '1398年',
    content: '洪武時代結束，為後續的靖難之役埋下伏筆。',
    numericYear: 1398
  },
  {
    cityId: 'constantinople',
    title: '拜占庭光復君士坦丁堡',
    year: '1261年',
    content: '尼西亞帝國的米海爾八世收復舊都，帕里奧洛格斯王朝復辟，但帝國實力已大不如前。',
    numericYear: 1261
  },
  {
    cityId: 'constantinople',
    title: '鄂圖曼土耳其包圍',
    year: '1389年-1396年',
    content: '歷經科索沃戰役與尼科波利斯戰役，鄂圖曼土耳其幾乎完全包圍了君士坦丁堡，拜占庭淪為附庸。',
    numericYear: 1396
  }
);

// Sort Tour
data.tour.sort((a, b) => a.numericYear - b.numericYear);

// 4. Add new Routes
data.routes.push(
  {
    source: "karakorum",
    target: "dadu",
    label: "政權南遷與中原化：忽必烈將帝國重心從草原遷至大都，建立元朝。",
    type: "people",
    numericYear: 1271
  },
  {
    source: "dadu",
    target: "hangzhou",
    label: "征服南宋：元軍南下攻陷臨安。",
    type: "trade", // or military, use trade for now to display
    numericYear: 1276
  },
  {
    source: "nanjing",
    target: "dadu",
    label: "明軍北伐：朱元璋派徐達北伐，攻陷大都，將蒙古勢力驅逐出長城以北。",
    type: "people",
    numericYear: 1368
  },
  {
    source: "sarai", // Using sarai roughly as Turkish/Ottoman expanding direction or we can use another node, maybe Tiflis
    target: "constantinople",
    label: "戰略包圍：鄂圖曼土耳其逐步吞噬巴爾幹與小亞細亞，對君士坦丁堡形成包圍網。",
    type: "people",
    numericYear: 1389
  }
);

fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf8');
console.log('Update complete.');
