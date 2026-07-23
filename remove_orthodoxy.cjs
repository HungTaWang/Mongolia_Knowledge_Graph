const fs = require('fs');

// 1. Update GlobalGraph.tsx
let graphCode = fs.readFileSync('./src/GlobalGraph.tsx', 'utf8');
const orthodoxyRegex = /\s*"東正教\s*\(Eastern Orthodoxy\)":\s*\["俄羅斯東正教\s*\(Russian Orthodoxy\)",\s*"喬治亞正教\s*\(Georgian Orthodoxy\)"\],?/;
graphCode = graphCode.replace(orthodoxyRegex, '');
fs.writeFileSync('./src/GlobalGraph.tsx', graphCode, 'utf8');

// 2. Update data.json
let d = JSON.parse(fs.readFileSync('./src/data.json', 'utf8'));
const orthodoxyTerms = new Set(['東正教 (Eastern Orthodoxy)', '俄羅斯東正教 (Russian Orthodoxy)', '喬治亞正教 (Georgian Orthodoxy)']);

d.cities.forEach(c => {
  if (c.religion) {
    c.religion = c.religion.filter(r => !orthodoxyTerms.has(r));
    if (c.religion.length === 0) delete c.religion;
  }
});

// Remove empty cities
const beforeCount = d.cities.length;
d.cities = d.cities.filter(c => {
  const hasPeople = c.people && c.people.length > 0;
  const hasReligion = c.religion && c.religion.length > 0;
  const hasEvents = c.events && c.events.length > 0;
  return hasPeople || hasReligion || hasEvents;
});

// Remove orphaned routes/tours
const keptIds = new Set(d.cities.map(c => c.id));
d.routes = d.routes.filter(r => keptIds.has(r.source) && keptIds.has(r.target));
d.tour = d.tour.filter(t => !t.cityId || keptIds.has(t.cityId));

fs.writeFileSync('./src/data.json', JSON.stringify(d, null, 2), 'utf8');
console.log('Removed', beforeCount - d.cities.length, 'cities.');
