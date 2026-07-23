const fs = require('fs');

// 1. Update GlobalGraph.tsx
let graphCode = fs.readFileSync('./src/GlobalGraph.tsx', 'utf8');

// Remove Nestorian branch
const nestorianRegex = /\s*"景教\s*\(Nestorian Christianity\)":\s*\["景教宗主教座堂\s*\(Patriarchate of the Church of the East\)",\s*"景教教堂\s*\(Nestorian Church\)"\],?/;
graphCode = graphCode.replace(nestorianRegex, '');

// Remove Islamic jurisprudence from Islam branch (and potentially the Islam branch if it only had that, but Islam has Sufism too)
// Original: "伊斯蘭教 (Islam)": ["蘇菲主義 (Sufism)", "伊斯蘭法學 (Islamic jurisprudence)"]
// Change to: "伊斯蘭教 (Islam)": ["蘇菲主義 (Sufism)"]
const islamRegex = /("伊斯蘭教\s*\(Islam\)":\s*\["蘇菲主義\s*\(Sufism\)")(?:,\s*"伊斯蘭法學\s*\(Islamic jurisprudence\)")(\])/;
graphCode = graphCode.replace(islamRegex, '$1$2');

fs.writeFileSync('./src/GlobalGraph.tsx', graphCode, 'utf8');

// 2. Update data.json
let d = JSON.parse(fs.readFileSync('./src/data.json', 'utf8'));
const noiseTerms = new Set([
  '景教 (Nestorian Christianity)', 
  '景教宗主教座堂 (Patriarchate of the Church of the East)', 
  '景教教堂 (Nestorian Church)',
  '伊斯蘭法學 (Islamic jurisprudence)'
]);

d.cities.forEach(c => {
  if (c.religion) {
    c.religion = c.religion.filter(r => !noiseTerms.has(r));
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
