const fs = require('fs');

const data = JSON.parse(fs.readFileSync('src/data.json', 'utf8'));
const cities = data.cities.map(c => ({ id: c.id, name: c.name }));
fs.writeFileSync('scratch/city_map.json', JSON.stringify(cities, null, 2));
