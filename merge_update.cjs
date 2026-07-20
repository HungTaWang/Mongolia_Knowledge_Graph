const fs = require('fs');

const currentData = JSON.parse(fs.readFileSync('./src/data.json', 'utf8'));
const newData = JSON.parse(fs.readFileSync('./src/new_data.json', 'utf8'));

// Update or add cities (replace existing if ID matches)
const cityMap = new Map();
currentData.cities.forEach(c => cityMap.set(c.id, c));
newData.cities.forEach(c => cityMap.set(c.id, c)); // overwrites if exists
currentData.cities = Array.from(cityMap.values());

// Update or add routes (replace existing if source-target matches)
const routeMap = new Map();
currentData.routes.forEach(r => routeMap.set(r.source + '-' + r.target, r));
newData.routes.forEach(r => routeMap.set(r.source + '-' + r.target, r)); // overwrites if exists
currentData.routes = Array.from(routeMap.values());

fs.writeFileSync('./src/data.json', JSON.stringify(currentData, null, 2), 'utf8');
console.log('Merged with updates successfully!');
