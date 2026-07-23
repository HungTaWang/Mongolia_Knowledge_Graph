const fs = require('fs');

let code = fs.readFileSync('./src/GlobalGraph.tsx', 'utf8');

const regex1 = /\s*\/\/\s*=====\s*蒙古帝國與技術\s*=====\s*[\s\S]*?(?=\s*\/\/\s*=====\s*東方思想與宗教|\s*\/\/\s*=====\s*歷史人物)/;
const regex2 = /\s*\/\/\s*蒙古與帝國人物\s*[\s\S]*?(?=\s*\/\/\s*近代思潮人物)/;

code = code.replace(regex1, '');
code = code.replace(regex2, '');

fs.writeFileSync('./src/GlobalGraph.tsx', code, 'utf8');
console.log('Successfully updated GlobalGraph.tsx');
