const fs = require('fs');
const d = JSON.parse(fs.readFileSync('./src/data.json', 'utf8'));
const graphCode = fs.readFileSync('./src/GlobalGraph.tsx', 'utf8');

const peopleInMap = new Set();
const thoughtsInMap = new Set();
d.cities.forEach(c => {
  if (c.people) c.people.forEach(p => peopleInMap.add(p));
  if (c.religion) c.religion.forEach(r => thoughtsInMap.add(r));
});

let inSuccessions = false;
let successionsKeys = new Set();
let successionsTargets = new Set();

const lines = graphCode.split('\n');
lines.forEach(line => {
  if (line.includes('const successions: Record<string, string[]> = {')) inSuccessions = true;
  else if (inSuccessions && line.trim() === '};') inSuccessions = false;
  else if (inSuccessions) {
    const match = line.match(/^\s*"([^"]+)"\s*:\s*\[(.*?)\]/);
    if (match) {
      successionsKeys.add(match[1]);
      const targets = match[2].match(/"([^"]+)"/g);
      if (targets) {
        targets.forEach(t => successionsTargets.add(t.replace(/"/g, '')));
      }
    }
  }
});

const allSuccessions = new Set([...successionsKeys, ...successionsTargets]);

let extraInSuccessions = [];
allSuccessions.forEach(a => {
  if (!peopleInMap.has(a) && !thoughtsInMap.has(a)) extraInSuccessions.push(a);
});

let missingInSuccessions = [];
peopleInMap.forEach(p => {
  if (!allSuccessions.has(p)) missingInSuccessions.push(p + ' (Person)');
});
thoughtsInMap.forEach(t => {
  if (!allSuccessions.has(t)) missingInSuccessions.push(t + ' (Thought)');
});

console.log('--- In Graph but NOT in Map ---');
extraInSuccessions.forEach(x => console.log(x));

console.log('\n--- In Map but NOT in Graph ---');
missingInSuccessions.forEach(x => console.log(x));
