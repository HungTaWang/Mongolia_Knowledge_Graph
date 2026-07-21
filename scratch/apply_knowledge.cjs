const fs = require('fs');

const DATA_JSON_PATH = 'src/data.json';
const NEW_DATA_JSON_PATH = 'src/new_data.json';
const KNOWLEDGE_PATH = 'scratch/internal_knowledge.json';

function run() {
    let dataJson = JSON.parse(fs.readFileSync(DATA_JSON_PATH, 'utf8'));
    let newDataJson = JSON.parse(fs.readFileSync(NEW_DATA_JSON_PATH, 'utf8'));
    let knowledge = JSON.parse(fs.readFileSync(KNOWLEDGE_PATH, 'utf8'));

    let updatedGlossary = 0;
    if (dataJson.glossary) {
        for (const key of Object.keys(dataJson.glossary)) {
            if (knowledge[key]) {
                dataJson.glossary[key].description = knowledge[key];
                updatedGlossary++;
            }
        }
    }

    let updatedDataCities = 0;
    if (dataJson.cities) {
        for (const city of dataJson.cities) {
            if (knowledge[city.name]) {
                city.description = knowledge[city.name];
                updatedDataCities++;
            }
        }
    }

    let updatedNewDataCities = 0;
    if (newDataJson.cities) {
        for (const city of newDataJson.cities) {
            if (knowledge[city.name]) {
                city.description = knowledge[city.name];
                updatedNewDataCities++;
            }
        }
    }

    console.log(`Updated ${updatedGlossary} glossary entries, ${updatedDataCities} data.json cities, ${updatedNewDataCities} new_data.json cities.`);

    fs.writeFileSync(DATA_JSON_PATH, JSON.stringify(dataJson, null, 2), 'utf8');
    fs.writeFileSync(NEW_DATA_JSON_PATH, JSON.stringify(newDataJson, null, 2), 'utf8');
    console.log('Saved JSON files successfully.');
}

run();
