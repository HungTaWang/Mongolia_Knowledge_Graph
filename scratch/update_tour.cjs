const fs = require('fs');

const DATA_JSON_PATH = 'src/data.json';
const NEW_TOUR_PATH = 'scratch/new_tour.json';

function run() {
    let dataJson = JSON.parse(fs.readFileSync(DATA_JSON_PATH, 'utf8'));
    let newTour = JSON.parse(fs.readFileSync(NEW_TOUR_PATH, 'utf8'));

    // Replace data.tour with newTour
    dataJson.tour = newTour;

    fs.writeFileSync(DATA_JSON_PATH, JSON.stringify(dataJson, null, 2), 'utf8');
    console.log(`Replaced data.tour with ${newTour.length} events from new_tour.json.`);
}

run();
