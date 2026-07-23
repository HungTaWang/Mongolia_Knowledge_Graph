const fs = require('fs');
const d = JSON.parse(fs.readFileSync('./src/data.json', 'utf8'));

// 1. 確認南京已有「中體西用」
const nanjing = d.cities.find(c => c.name.includes('南京'));
if (nanjing) {
  if (!nanjing.religion) nanjing.religion = [];
  if (!nanjing.religion.includes('中體西用 (Chinese Learning as Substance, Western Learning for Application)')) {
    nanjing.religion.push('中體西用 (Chinese Learning as Substance, Western Learning for Application)');
  }
  console.log('南京 religion:', nanjing.religion);
}

// 2. 從大都移除「中體西用」，使其變為空城
const dadu = d.cities.find(c => c.id === 'dadu');
if (dadu && dadu.religion) {
  dadu.religion = dadu.religion.filter(r => !r.includes('中體西用'));
  if (dadu.religion.length === 0) delete dadu.religion;
}

// 3. 移除空城
const beforeCount = d.cities.length;
d.cities = d.cities.filter(c => {
  const hasPeople = c.people && c.people.length > 0;
  const hasReligion = c.religion && c.religion.length > 0;
  return hasPeople || hasReligion;
});

// 4. 清理孤立路線與導覽
const keptIds = new Set(d.cities.map(c => c.id));
d.routes = d.routes.filter(r => keptIds.has(r.source) && keptIds.has(r.target));
d.tour = d.tour.filter(t => !t.cityId || keptIds.has(t.cityId));

// 5. 清理 glossary 中的城市引用
for (const key of Object.keys(d.glossary)) {
  const entry = d.glossary[key];
  if (entry.type === 'city' && entry.id && !keptIds.has(entry.id)) {
    delete d.glossary[key];
    console.log('Removed glossary entry:', key);
  }
}

fs.writeFileSync('./src/data.json', JSON.stringify(d, null, 2), 'utf8');
console.log('Removed', beforeCount - d.cities.length, 'cities. Total:', d.cities.length);
