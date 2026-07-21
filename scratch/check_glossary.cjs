const fs = require('fs');
const data = JSON.parse(fs.readFileSync('src/data.json', 'utf8'));

let emptyOrShortDesc = 0;
let total = 0;

for (const [key, value] of Object.entries(data.glossary || {})) {
    total++;
    const descLength = value.description ? value.description.length : 0;
    if (descLength < 50) {
        emptyOrShortDesc++;
        console.log(`Short description: ${key} (${descLength} chars) - ${value.description || 'MISSING'}`);
    }
}
console.log(`Total in glossary: ${total}, Empty or short: ${emptyOrShortDesc}`);
