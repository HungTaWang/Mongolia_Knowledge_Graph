const fs = require('fs');

function analyzeFile(filename) {
    const data = JSON.parse(fs.readFileSync(filename, 'utf8'));
    console.log(`--- ${filename} ---`);
    for (const key in data) {
        if (Array.isArray(data[key])) {
            console.log(`Key: ${key}, Array of length ${data[key].length}`);
            if (data[key].length > 0) {
                console.log(`First item keys: ${Object.keys(data[key][0]).join(', ')}`);
            }
        } else {
            console.log(`Key: ${key}, Type: ${typeof data[key]}`);
        }
    }
}

analyzeFile('src/data.json');
analyzeFile('src/new_data.json');
