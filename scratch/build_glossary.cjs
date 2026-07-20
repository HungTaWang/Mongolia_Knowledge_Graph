const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../src/data.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

if (!data.glossary) {
  data.glossary = {};
}

// Ensure all cities have a glossary entry
data.cities.forEach(city => {
  if (!data.glossary[city.name]) {
    data.glossary[city.name] = {
      type: "city",
      id: city.id,
      description: `歷史名城：${city.name}。` + (city.description ? city.description.substring(0, 50) + "..." : "")
    };
  }
});

// Gather all people, tech, infrastructure
const gatherTags = (category) => {
  const set = new Set();
  data.cities.forEach(city => {
    if (city[category]) {
      city[category].forEach(item => set.add(item));
    }
  });
  return Array.from(set);
};

const people = gatherTags('people');
const tech = gatherTags('tech');
const infrastructure = gatherTags('infrastructure');

const addGlossary = (list, type) => {
  list.forEach(item => {
    const name = item.split('(')[0].trim(); // Get the Chinese name without english brackets
    if (!data.glossary[name]) {
      data.glossary[name] = {
        type: type,
        description: `歷史${type === 'person' ? '人物' : type === 'tech' ? '技術/文化' : '基礎建設'}：${item}`
      };
    }
  });
};

addGlossary(people, 'person');
addGlossary(tech, 'tech');
addGlossary(infrastructure, 'infrastructure');

// Also try to find unmapped place names commonly used in events
const commonPlaces = [
  "羅馬", "花剌子模", "中都", "北京", "哈拉和林", "薩萊", "亞速", "威尼斯",
  "海押立", "塔拉斯", "布哈拉", "撒馬爾罕", "內沙布爾", "阿力麻里", "伏爾加河", "克孜勒庫姆沙漠"
];

// Verify if they are in cities
const existingCityNames = data.cities.map(c => c.name);
commonPlaces.forEach(place => {
  const exists = existingCityNames.some(c => c.includes(place) || place.includes(c));
  if (!exists && !data.glossary[place]) {
    data.glossary[place] = {
      type: "location_missing",
      description: `歷史地名：${place}`
    };
  }
});

fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf-8');
console.log('Glossary updated in data.json with ' + Object.keys(data.glossary).length + ' entries.');
