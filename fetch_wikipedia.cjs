const fs = require('fs');
const https = require('https');

const DATA_JSON_PATH = 'src/data.json';
const NEW_DATA_JSON_PATH = 'src/new_data.json';

function fetchWikipediaSummary(title, retries = 3) {
    return new Promise((resolve, reject) => {
        const url = `https://zh.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&explaintext&format=json&redirects=1&titles=${encodeURIComponent(title)}`;
        const options = {
            headers: {
                'User-Agent': 'HistoryKnowledgeGraphBot/1.0 (contact@example.com)'
            }
        };
        https.get(url, options, (res) => {
            let data = '';
            res.on('data', (chunk) => { data += chunk; });
            res.on('end', () => {
                try {
                    const parsedData = JSON.parse(data);
                    const pages = parsedData.query.pages;
                    const pageId = Object.keys(pages)[0];
                    if (pageId === '-1') {
                        resolve(null); // Not found
                    } else {
                        resolve(pages[pageId].extract);
                    }
                } catch (e) {
                    if (retries > 0) {
                        console.log(`Rate limited or error on ${title}, retrying...`);
                        setTimeout(() => {
                            fetchWikipediaSummary(title, retries - 1).then(resolve).catch(reject);
                        }, 2000);
                    } else {
                        reject(new Error(`Failed to parse JSON for ${title}: ${e.message} - Response: ${data.substring(0, 50)}`));
                    }
                }
            });
        }).on('error', (err) => {
            reject(err);
        });
    });
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
    let dataJson = {};
    let newDataJson = {};
    try {
        dataJson = JSON.parse(fs.readFileSync(DATA_JSON_PATH, 'utf8'));
        newDataJson = JSON.parse(fs.readFileSync(NEW_DATA_JSON_PATH, 'utf8'));
    } catch (e) {
        console.error("Error reading JSON files:", e);
        return;
    }

    // Collect unique titles to query
    const titles = new Set();
    
    if (dataJson.glossary) {
        for (const key of Object.keys(dataJson.glossary)) {
            titles.add(key);
        }
    }
    
    if (dataJson.cities) {
        for (const city of dataJson.cities) {
            if (city.name) titles.add(city.name);
        }
    }
    
    if (newDataJson.cities) {
        for (const city of newDataJson.cities) {
            if (city.name) titles.add(city.name);
        }
    }

    console.log(`Found ${titles.size} unique titles to fetch from Wikipedia.`);
    
    const summaries = {};
    let count = 0;
    
    for (const title of titles) {
        count++;
        process.stdout.write(`Fetching ${count}/${titles.size}: ${title}... `);
        try {
            const summary = await fetchWikipediaSummary(title);
            if (summary && summary.trim().length > 0) {
                summaries[title] = summary.trim();
                console.log('Found!');
            } else {
                console.log('Not found or empty.');
            }
        } catch (e) {
            console.log(`Error: ${e.message}`);
        }
        await delay(1200); // 1200ms delay to be polite to the API
    }

    // Update dataJson.glossary
    let updatedGlossary = 0;
    if (dataJson.glossary) {
        for (const key of Object.keys(dataJson.glossary)) {
            if (summaries[key]) {
                dataJson.glossary[key].description = summaries[key];
                updatedGlossary++;
            }
        }
    }

    // Update dataJson.cities
    let updatedDataCities = 0;
    if (dataJson.cities) {
        for (const city of dataJson.cities) {
            if (summaries[city.name]) {
                city.description = summaries[city.name];
                updatedDataCities++;
            }
        }
    }

    // Update newDataJson.cities
    let updatedNewDataCities = 0;
    if (newDataJson.cities) {
        for (const city of newDataJson.cities) {
            if (summaries[city.name]) {
                city.description = summaries[city.name];
                updatedNewDataCities++;
            }
        }
    }

    console.log(`\nUpdated ${updatedGlossary} glossary entries, ${updatedDataCities} data.json cities, ${updatedNewDataCities} new_data.json cities.`);

    // Write back
    fs.writeFileSync(DATA_JSON_PATH, JSON.stringify(dataJson, null, 2), 'utf8');
    fs.writeFileSync(NEW_DATA_JSON_PATH, JSON.stringify(newDataJson, null, 2), 'utf8');
    console.log('Saved JSON files successfully.');
}

run();
