const fs = require('fs');

const d = JSON.parse(fs.readFileSync('./src/data.json', 'utf8'));
const graphCode = fs.readFileSync('./src/GlobalGraph.tsx', 'utf8');

// =============================================
// Step 1: Parse the new successions from GlobalGraph.tsx
// =============================================
let inSuccessions = false;
let successionsKeys = new Set();
let successionsTargets = new Set();
const lines = graphCode.split('\n');
lines.forEach(line => {
  if (line.includes('const successions: Record<string, string[]> = {')) inSuccessions = true;
  else if (inSuccessions && line.trim() === '};') inSuccessions = false;
  else if (inSuccessions) {
    const match = line.match(/^\s*"([^"]+)"\s*:\s*\[(.*?)\]/);
    if (match) {
      successionsKeys.add(match[1]);
      const targets = match[2].match(/"([^"]+)"/g);
      if (targets) {
        targets.forEach(t => successionsTargets.add(t.replace(/"/g, '')));
      }
    }
  }
});
const allSuccessions = new Set([...successionsKeys, ...successionsTargets]);
console.log('Total entities in new successions:', allSuccessions.size);

// =============================================
// Step 2: Remove noise from city data
// =============================================
const noiseThoughts = new Set([
  '天主教 (Catholicism)', '天主教傳教 (Catholic Missions)', '天主教外交 (Papal diplomacy)', '羅馬教廷 (Papal Court)',
  '跨信仰神學辯論 (Interfaith debate)', '跨信仰神學交流 (Interfaith dialogue)',
  '伊斯蘭教 (Islam)', '印度教 (Hinduism)', '佛教 (Buddhism)',
  '印象派 (Impressionism)', '抽象表現主義 (Abstract Expressionism)', '浪漫主義 (Romanticism)',
  '宗教融合 (Religious syncretism)',
  '讖緯學 (Chenwei/Theology of Texts)', '道教內丹術 (Daoist Internal Alchemy)',
  '密教 (Vajrayana)',
  '文藝復興 (Renaissance)',
]);

const noisePeople = new Set([
  '花剌子米 (Al-Khwarizmi)',
]);

// Fix duplicate names
const nameMapping = {
  '馬克思 (Karl Marx)': '卡爾·馬克思 (Karl Marx)',
  '孔德 (Auguste Comte)': '奧古斯特·孔德 (Auguste Comte)',
};

d.cities.forEach(c => {
  // Clean thoughts
  if (c.religion) {
    c.religion = c.religion.filter(r => !noiseThoughts.has(r));
    c.religion = c.religion.map(r => nameMapping[r] || r);
    // Deduplicate
    c.religion = [...new Set(c.religion)];
    if (c.religion.length === 0) delete c.religion;
  }
  
  // Clean people
  if (c.people) {
    c.people = c.people.filter(p => !noisePeople.has(p));
    c.people = c.people.map(p => nameMapping[p] || p);
    // Deduplicate
    c.people = [...new Set(c.people)];
    if (c.people.length === 0) delete c.people;
  }
});

console.log('Cleaned noise from cities.');

// =============================================
// Step 3: Strip city data to ONLY what's in successions
// =============================================
d.cities.forEach(c => {
  if (c.religion) {
    c.religion = c.religion.filter(r => allSuccessions.has(r));
    if (c.religion.length === 0) delete c.religion;
  }
  if (c.people) {
    c.people = c.people.filter(p => allSuccessions.has(p));
    if (c.people.length === 0) delete c.people;
  }
});

console.log('Stripped city data to match successions.');

// =============================================
// Step 4: Add missing entities to appropriate cities
// =============================================
const additions = [
  // Missing thoughts
  { city: '長安', thoughts: ['經學 (Classical Studies)'] },
  { city: '巴黎', thoughts: ['實證主義 (Positivism)'] },
  { city: '敦煌', thoughts: ['大乘佛教 (Mahayana Buddhism)'] },
  { city: '柏林', thoughts: ['德國觀念論 (German Idealism)'] },
  { city: '曼徹斯特', thoughts: ['辯證唯物主義 (Dialectical Materialism)'] },
  { city: '巴格達', thoughts: ['蘇菲主義 (Sufism)'] },
  { city: '佛羅倫斯', thoughts: ['文藝復興自然哲學 (Renaissance Natural Philosophy)'] },
  { city: '羅馬', thoughts: ['新柏拉圖主義 (Neoplatonism)'] },
  { city: '南京', thoughts: ['中體西用 (Chinese Learning as Substance, Western Learning for Application)'] },
  { city: '雅典', thoughts: ['伊壁鳩魯主義 (Epicureanism)'] },
  { city: '倫敦', thoughts: ['邏輯實證主義 (Logical Positivism)'] },
  { city: '瓦拉納西', thoughts: ['巴克提運動 (Bhakti Movement)'] },
  
  // Missing people
  { city: '雅典', people: ['蘇格拉底 (Socrates)', '柏拉圖 (Plato)', '亞里斯多德 (Aristotle)'] },
  { city: '倫敦', people: ['洛克 (John Locke)'] },
  { city: '洛陽', people: ['達摩 (Bodhidharma)'] },
  { city: '南京', people: ['顧炎武 (Gu Yanwu)'] },
  { city: '曲阜', people: ['荀子 (Xunzi)'] },
  { city: '杭州', people: ['慧能 (Huineng)'] },
  { city: '柏林', people: ['康德 (Immanuel Kant)'] },
];

additions.forEach(add => {
  const city = d.cities.find(c => c.name.includes(add.city));
  if (city) {
    if (add.thoughts) {
      if (!city.religion) city.religion = [];
      add.thoughts.forEach(t => {
        if (!city.religion.includes(t)) city.religion.push(t);
      });
    }
    if (add.people) {
      if (!city.people) city.people = [];
      add.people.forEach(p => {
        if (!city.people.includes(p)) city.people.push(p);
      });
    }
  } else {
    console.log('WARNING: City not found:', add.city);
  }
});

console.log('Added missing entities to cities.');

// =============================================
// Step 5: Remove empty cities
// =============================================
const beforeCities = d.cities.length;
d.cities = d.cities.filter(c => {
  const hasPeople = c.people && c.people.length > 0;
  const hasReligion = c.religion && c.religion.length > 0;
  return hasPeople || hasReligion;
});

const keptCityIds = new Set(d.cities.map(c => c.id));
d.routes = d.routes.filter(r => keptCityIds.has(r.source) && keptCityIds.has(r.target));
d.tour = d.tour.filter(t => !t.cityId || keptCityIds.has(t.cityId));

// Also clean glossary
for (const key of Object.keys(d.glossary)) {
  const entry = d.glossary[key];
  if (entry.type === 'city' && entry.id && !keptCityIds.has(entry.id)) {
    delete d.glossary[key];
  }
}

console.log('Removed', beforeCities - d.cities.length, 'empty cities.');

// =============================================
// Step 6: Final sync check
// =============================================
const finalPeople = new Set();
const finalThoughts = new Set();
d.cities.forEach(c => {
  if (c.people) c.people.forEach(p => finalPeople.add(p));
  if (c.religion) c.religion.forEach(r => finalThoughts.add(r));
});

let missingFromMap = [];
allSuccessions.forEach(a => {
  if (!finalPeople.has(a) && !finalThoughts.has(a)) missingFromMap.push(a);
});

let missingFromGraph = [];
finalPeople.forEach(p => { if (!allSuccessions.has(p)) missingFromGraph.push(p + ' (Person)'); });
finalThoughts.forEach(t => { if (!allSuccessions.has(t)) missingFromGraph.push(t + ' (Thought)'); });

console.log('\n=== FINAL SYNC CHECK ===');
console.log('In Graph but NOT in Map:', missingFromMap.length);
if (missingFromMap.length > 0) missingFromMap.forEach(x => console.log('  -', x));
console.log('In Map but NOT in Graph:', missingFromGraph.length);
if (missingFromGraph.length > 0) missingFromGraph.forEach(x => console.log('  -', x));

fs.writeFileSync('./src/data.json', JSON.stringify(d, null, 2), 'utf8');
console.log('\ndata.json saved. Cities:', d.cities.length);
