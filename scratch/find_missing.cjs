const fs = require('fs');
const d = require('./src/data.json');
const gg = fs.readFileSync('src/GlobalGraph.tsx','utf8');

const regex = /"([^"]+)": \[([^\]]+)\]/g;
let match;
const allNodes = new Set();
while((match = regex.exec(gg)) !== null) {
  allNodes.add(match[1]);
  const targets = match[2].match(/"([^"]+)"/g);
  if(targets) {
    targets.forEach(t => allNodes.add(t.slice(1,-1)));
  }
}

const gk = new Set(Object.keys(d.glossary));
const missing = [];
allNodes.forEach(n => {
  if(!gk.has(n)) missing.push(n);
});

console.log('Total nodes in GlobalGraph:', allNodes.size);
console.log('Missing from glossary:', missing.length);
if (missing.length > 0) {
  console.log(missing);
}
