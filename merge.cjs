const fs = require('fs');

const currentData = JSON.parse(fs.readFileSync('./src/data.json', 'utf8'));
const newData = JSON.parse(fs.readFileSync('./src/new_data.json', 'utf8'));

// Merge cities
const cityIds = new Set(currentData.cities.map(c => c.id));
for (const city of newData.cities) {
  if (!cityIds.has(city.id)) {
    currentData.cities.push(city);
    cityIds.add(city.id);
  }
}

// Merge routes
const routeKeys = new Set(currentData.routes.map(r => r.source + '-' + r.target));
for (const route of newData.routes) {
  const key = route.source + '-' + route.target;
  if (!routeKeys.has(key)) {
    currentData.routes.push(route);
    routeKeys.add(key);
  }
}

fs.writeFileSync('./src/data.json', JSON.stringify(currentData, null, 2), 'utf8');
console.log('Merged successfully!');
