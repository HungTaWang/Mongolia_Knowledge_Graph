/**
 * clean_data.cjs — 資料清洗腳本
 * 移除技術相關詞條，僅保留哲學思想與哲學人物
 */
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'src', 'data.json');
const outputPath = path.join(__dirname, 'src', 'data.json');
const backupPath = path.join(__dirname, 'src', 'data.backup.json');

// ===== 非思想人物黑名單（基礎名，不含括號英文） =====
const NON_THOUGHT_PEOPLE = new Set([
  // 蒙古帝國軍政人物
  '成吉思汗', '窩闊台汗', '拔都汗', '海都', '蒙哥汗', '忽必烈汗',
  '旭烈兀', '阿八哈汗', '拜都汗', '蓋海圖汗', '合贊汗', '完者都',
  '月即別汗', '那海', '脫脫汗', '札尼別', '歐芙洛緒涅', '瑪麗亞',
  '腓力四世', '雅巴拉哈三世', '孛羅丞相', '闊里吉思', '阿魯渾·阿加',
  '拉施特', '帖木兒', '察合台', '朮赤', '拖雷', '貴由汗', '也速該',
  '別兒哥', '乃蠻部', '克烈部', '瑪麗亞 (巴亞倫)',

  // 科學家/發明家/工程師
  '蔡倫', '畢昇', '古騰堡', '海什木', '伽利略', '牛頓', '瓦特',
  '拉瓦節', '詹姆斯·馬克士威', '路德維希·波茲曼', '阿爾伯特·愛因斯坦',
  '尼爾斯·波耳', '查爾斯·達爾文', '詹姆斯·華生', '艾倫·圖靈',
  '約翰·馮·紐曼', '郭守敬', '札馬魯丁', '哥白尼', '克卜勒',
  '張衡', '沈括', '李時珍', '祖沖之',
  '花剌子米',  // 數學家

  // 探險家/外交官/旅行者
  '馬可·波羅', '威廉·魯不魯乞', '拉班·掃馬', '伊本·巴圖塔',
  '卻俄尼亞底斯', '柏朗嘉賓', '鄭和',

  // 純粹軍事/政治人物
  '亞歷山大大帝', '凱撒', '查理曼', '拿破崙',
]);

// ===== 思想相關關鍵字（人物描述中包含任一即保留） =====
const THOUGHT_KEYWORDS = [
  '哲學', '思想', '儒', '道家', '道教', '佛', '禪', '教義', '神學',
  '倫理', '理學', '心學', '玄學', '學派', '主義', '精神分析',
  '形上學', '辯證', '啟蒙', '社會契約', '功利', '實證',
  '現象學', '結構', '後現代', '分析哲學', '邏輯',
  '哲人', '思想家', '哲學家', '神學家', '經院', '教父',
  '宗教', '信仰', '靈修', '冥想', '修行', '密教', '華嚴', '唯識',
  '般若', '中觀', '瑜伽', '奧義書', '吠陀', '印度教', '伊斯蘭',
  '蘇菲', '巴克提', '耆那', '錫克', '景教', '基督', '天主教',
  '東正教', '猶太', '摩尼教', '瑣羅亞斯德', '祆教',
  '存在主義', '理性主義', '經驗主義', '觀念論', '唯物',
  '浪漫主義', '人文主義', '古典經濟', '政治經濟', '自由主義',
  '心理學', '意識', '無意識', '知識論', '認識論',
  '易經', '陰陽', '五行', '天人', '名家', '墨家', '法家',
  '黃老', '內丹', '外丹', '老子', '莊子', '孔子', '孟子',
  '朱熹', '王陽明', '顧炎武', '程朱', '陸王', '考據',
  '僧', '法師', '和尚', '喇嘛', '活佛', '高僧', '傳教',
  '教宗', '教皇', '教會', '修道', '傳道',
];

// ===== 輔助函數 =====
function getBaseName(fullName) {
  // "忽必烈汗 (Kublai Khan)" → "忽必烈汗"
  return fullName.split('(')[0].split('（')[0].trim();
}

function isThoughtRelatedPerson(name, description) {
  const baseName = getBaseName(name);

  // 黑名單中的人物直接移除
  if (NON_THOUGHT_PEOPLE.has(baseName)) {
    return false;
  }

  // 如果有描述，用關鍵字判斷
  if (description) {
    for (const kw of THOUGHT_KEYWORDS) {
      if (description.includes(kw)) {
        return true;
      }
    }
  }

  // 沒在黑名單，且沒有描述或描述不含關鍵字
  // 默認保留（寬鬆策略，因用戶說「與思想有關的均可保留」）
  return true;
}

function isPersonInBlacklist(personName) {
  const baseName = getBaseName(personName);
  return NON_THOUGHT_PEOPLE.has(baseName);
}

// ===== 主處理邏輯 =====
function cleanData() {
  console.log('讀取 data.json...');
  const raw = fs.readFileSync(dataPath, 'utf8');
  const data = JSON.parse(raw);

  // 備份原始資料
  fs.writeFileSync(backupPath, raw, 'utf8');
  console.log(`已備份至 ${backupPath}`);

  const stats = {
    citiesRemoved: 0,
    citiesKept: 0,
    routesRemoved: 0,
    routesKept: 0,
    tourRemoved: 0,
    tourKept: 0,
    glossaryRemoved: 0,
    glossaryKept: 0,
    peopleRemoved: [],
    peopleKept: [],
  };

  // ===== 1. 清理 Glossary =====
  console.log('\n清理 glossary...');
  const cleanedGlossary = {};
  const keptGlossaryPersons = new Set(); // 追蹤保留的人物名

  for (const [key, entry] of Object.entries(data.glossary)) {
    const e = entry;
    if (e.type === 'tech' || e.type === 'infrastructure') {
      stats.glossaryRemoved++;
      continue;
    }
    if (e.type === 'person') {
      if (isThoughtRelatedPerson(key, e.description)) {
        cleanedGlossary[key] = entry;
        keptGlossaryPersons.add(getBaseName(key));
        stats.glossaryKept++;
        stats.peopleKept.push(key);
      } else {
        stats.glossaryRemoved++;
        stats.peopleRemoved.push(key);
      }
      continue;
    }
    // type: "religion", "city", "location_missing" → 保留
    cleanedGlossary[key] = entry;
    stats.glossaryKept++;
  }

  // ===== 2. 清理 Cities =====
  console.log('清理 cities...');
  const keptCityIds = new Set();
  const cleanedCities = [];

  for (const city of data.cities) {
    const cleanedCity = { ...city };

    // 移除 tech 和 infrastructure
    delete cleanedCity.tech;
    delete cleanedCity.infrastructure;

    // 過濾 people — 僅保留思想相關人物
    if (cleanedCity.people) {
      cleanedCity.people = cleanedCity.people.filter(p => {
        const baseName = getBaseName(p);
        // 查 glossary 確認是否保留
        if (keptGlossaryPersons.has(baseName)) return true;
        // 如果 glossary 沒有這個人，用黑名單檢查
        return !isPersonInBlacklist(p);
      });
      if (cleanedCity.people.length === 0) {
        delete cleanedCity.people;
      }
    }

    // 判斷城市是否為空
    const hasPeople = cleanedCity.people && cleanedCity.people.length > 0;
    const hasReligion = cleanedCity.religion && cleanedCity.religion.length > 0;
    const hasEvents = cleanedCity.events && cleanedCity.events.length > 0;

    if (!hasPeople && !hasReligion) {
      stats.citiesRemoved++;
      console.log(`  移除空城市: ${city.name} (${city.id})`);
      continue;
    }

    cleanedCities.push(cleanedCity);
    keptCityIds.add(city.id);
    stats.citiesKept++;
  }

  // ===== 3. 清理 Routes =====
  console.log('清理 routes...');
  const cleanedRoutes = [];

  for (const route of data.routes) {
    // 移除 type: "tech" 的路線
    if (route.type === 'tech') {
      stats.routesRemoved++;
      continue;
    }

    // 移除指向已刪除城市的路線
    if (!keptCityIds.has(route.source) || !keptCityIds.has(route.target)) {
      stats.routesRemoved++;
      continue;
    }

    // 對 type: "people" 路線，檢查是否涉及思想人物
    // (保留所有 religion 路線和涉及保留城市的 people 路線)
    cleanedRoutes.push(route);
    stats.routesKept++;
  }

  // ===== 4. 清理 Tour =====
  console.log('清理 tour...');
  const cleanedTour = [];

  for (const tourStep of data.tour) {
    // 移除指向已刪除城市的條目
    if (tourStep.cityId && !keptCityIds.has(tourStep.cityId)) {
      stats.tourRemoved++;
      continue;
    }

    cleanedTour.push(tourStep);
    stats.tourKept++;
  }

  // ===== 5. 清理 glossary 中指向已刪除城市的 city 類型條目 =====
  for (const [key, entry] of Object.entries(cleanedGlossary)) {
    const e = entry;
    if (e.type === 'city' && e.id && !keptCityIds.has(e.id)) {
      delete cleanedGlossary[key];
      stats.glossaryRemoved++;
      stats.glossaryKept--;
    }
  }

  // ===== 輸出結果 =====
  const result = {
    cities: cleanedCities,
    routes: cleanedRoutes,
    tour: cleanedTour,
    glossary: cleanedGlossary,
  };

  fs.writeFileSync(outputPath, JSON.stringify(result, null, 2), 'utf8');

  // ===== 報告 =====
  console.log('\n========== 清洗結果 ==========');
  console.log(`城市: 保留 ${stats.citiesKept} / 移除 ${stats.citiesRemoved}`);
  console.log(`路線: 保留 ${stats.routesKept} / 移除 ${stats.routesRemoved}`);
  console.log(`紀事: 保留 ${stats.tourKept} / 移除 ${stats.tourRemoved}`);
  console.log(`詞條: 保留 ${stats.glossaryKept} / 移除 ${stats.glossaryRemoved}`);

  console.log('\n--- 移除的人物 ---');
  stats.peopleRemoved.forEach(p => console.log(`  ❌ ${p}`));

  console.log('\n--- 保留的人物 ---');
  stats.peopleKept.forEach(p => console.log(`  ✅ ${p}`));

  console.log('\n--- 保留的城市 ---');
  cleanedCities.forEach(c => {
    const pCount = c.people ? c.people.length : 0;
    const rCount = c.religion ? c.religion.length : 0;
    console.log(`  📍 ${c.name} (人物:${pCount}, 思想:${rCount})`);
  });

  console.log('\n✅ 清洗完成，已寫入 data.json');
}

cleanData();
