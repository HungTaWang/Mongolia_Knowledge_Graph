const fs = require('fs');

const DATA_JSON_PATH = 'src/data.json';
const BC_AD_DATA_PATH = 'scratch/bc_ad_data.json';

function run() {
    let dataJson = JSON.parse(fs.readFileSync(DATA_JSON_PATH, 'utf8'));
    let newData = JSON.parse(fs.readFileSync(BC_AD_DATA_PATH, 'utf8'));

    // 1. Add new cities if not exist
    newData.newCities.forEach(nc => {
        if (!dataJson.cities.find(c => c.id === nc.id)) {
            dataJson.cities.push(nc);
        }
    });

    // 2. Add new routes
    dataJson.routes = [...dataJson.routes, ...newData.newRoutes];

    // 3. Add new tours and sort
    dataJson.tour = [...dataJson.tour, ...newData.newTours];
    dataJson.tour.sort((a, b) => a.numericYear - b.numericYear);

    // 4. Update Glossary
    if (!dataJson.glossary) dataJson.glossary = {};
    for (const [key, value] of Object.entries(newData.glossaryUpdates)) {
        dataJson.glossary[key] = value;
    }

    fs.writeFileSync(DATA_JSON_PATH, JSON.stringify(dataJson, null, 2), 'utf8');
    console.log(`Added ${newData.newCities.length} cities, ${newData.newRoutes.length} routes, ${newData.newTours.length} tours, and updated glossary.`);
}

run();
