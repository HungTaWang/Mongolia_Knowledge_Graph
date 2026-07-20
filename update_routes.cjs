const fs = require('fs');
const data = JSON.parse(fs.readFileSync('./src/data.json', 'utf8'));

data.routes.forEach(route => {
  const lbl = route.label;
  if (lbl.includes('宗教') || lbl.includes('景教') || lbl.includes('天主教') || lbl.includes('神學') || lbl.includes('傳教') || lbl.includes('東正教') || lbl.includes('佛教')) {
    route.type = 'religion';
  } else if (lbl.includes('技術') || lbl.includes('天文') || lbl.includes('印刷') || lbl.includes('曆法') || lbl.includes('金融') || lbl.includes('文字') || lbl.includes('幾何')) {
    route.type = 'tech';
  } else if (lbl.includes('使團') || lbl.includes('外交') || lbl.includes('移動') || lbl.includes('同盟') || lbl.includes('政治') || lbl.includes('跨文化') || lbl.includes('過境') || lbl.includes('觀察')) {
    route.type = 'people';
  } else {
    // Default to trade / infrastructure
    route.type = 'trade';
  }
});

fs.writeFileSync('./src/data.json', JSON.stringify(data, null, 2), 'utf8');
console.log('Routes typed successfully!');
