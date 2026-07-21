const fs = require('fs');

const dataJson = JSON.parse(fs.readFileSync('src/data.json', 'utf8'));
const newDataJson = JSON.parse(fs.readFileSync('src/new_data.json', 'utf8'));

const titles = new Set();
if (dataJson.glossary) Object.keys(dataJson.glossary).forEach(k => titles.add(k));
if (dataJson.cities) dataJson.cities.forEach(c => { if(c.name) titles.add(c.name) });
if (newDataJson.cities) newDataJson.cities.forEach(c => { if(c.name) titles.add(c.name) });

const result = Array.from(titles);
fs.writeFileSync('scratch/titles.json', JSON.stringify(result, null, 2));
console.log(`Wrote ${result.length} titles to scratch/titles.json`);
