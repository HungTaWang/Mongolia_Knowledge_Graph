const fs = require('fs');
const data = JSON.parse(fs.readFileSync('src/data.json', 'utf8'));
console.log('Glossary snippet:');
console.log(JSON.stringify(Object.entries(data.glossary || {}).slice(0, 3), null, 2));

console.log('Cities snippet:');
console.log(JSON.stringify(data.cities.slice(0, 2).map(c => ({id: c.id, desc: c.description})), null, 2));
