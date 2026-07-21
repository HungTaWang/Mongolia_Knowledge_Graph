const fs = require('fs');
const DATA_PATH = '../src/data.json';

function run() {
  let data = require(DATA_PATH);

  const newGlossary = {
    "新柏拉圖主義 (Neoplatonism)": { type: "religion", description: "西元3世紀由普羅提諾創立的哲學流派。它將柏拉圖的理型論發展為一種神秘主義的流溢說，認為宇宙萬物都從至高的「太一」（The One）流溢而出。它深刻影響了後來的基督教與伊斯蘭教神學。" },
    "抽象表現主義 (Abstract Expressionism)": { type: "tech", description: "二戰後興起於美國紐約的藝術運動。它徹底放棄了具象描繪，強調透過顏料的潑灑與強烈的筆觸來表達藝術家內在的潛意識與情感。標誌著世界藝術中心從巴黎轉移至紐約。" },
    "巴克提運動 (Bhakti Movement)": { type: "religion", description: "中世紀印度教的一場宗教改革運動。它反對僵化的種姓制度與繁瑣的婆羅門儀式，主張信徒透過對神的虔誠熱愛（巴克提）就能獲得解脫。它對後來錫克教的誕生有深遠影響。" },
    "蘇菲主義 (Sufism)": { type: "religion", description: "伊斯蘭教的神秘主義派別。強調透過內心的修煉、苦行、冥想甚至旋轉舞蹈，來達到與真主直接相合的境界。它在伊斯蘭文化向邊疆（如中亞、南亞）的傳播過程中扮演了關鍵角色。" },
    "資訊理論 (Information Theory)": { type: "tech", description: "1948年由克勞德·香農（Claude Shannon）創立的數學理論。它首次將「資訊」定義為可量化的實體（以位元 bit 為單位），奠定了現代數據壓縮、通訊與網路技術的理論基礎。" },
    "白銀帝國 (Silver Empire)": { type: "tech", description: "指明朝中後期，由於商品經濟發達與「一條鞭法」的實施，導致國內對白銀產生巨大需求。這促使美洲與日本的白銀大量流入中國，將中國捲入了早期的全球化貿易網絡。" },
    "馬克思 (Karl Marx)": { type: "person", description: "19世紀德國哲學家、政治經濟學家、社會學家。他與恩格斯共同起草了《共產黨宣言》，並在《資本論》中深刻剖析了資本主義的內在矛盾。他的思想引發了20世紀席捲全球的共產主義運動。" },
    "卡爾·馬克思 (Karl Marx)": { type: "person", description: "19世紀德國哲學家、政治經濟學家、社會學家。他與恩格斯共同起草了《共產黨宣言》，並在《資本論》中深刻剖析了資本主義的內在矛盾。他的思想引發了20世紀席捲全球的共產主義運動。" },
    "釋迦牟尼 (Gautama Buddha)": { type: "person", description: "佛教創始人。原為古印度迦毗羅衛國王子，為了尋求解脫生老病死的痛苦而離開宮廷修行，最終在菩提樹下覺悟。他提出「四聖諦」與「八正道」，為人類指引了一條斷除煩惱的道路。" },
    "古騰堡 (Johannes Gutenberg)": { type: "person", description: "15世紀德國發明家。他將鉛銻合金鑄字、油性墨水與壓榨機結合，發明了歐洲的機械活字印刷術。這項發明打破了知識的壟斷，直接催生了科學革命與宗教改革。" },
    "拉瓦節 (Antoine Lavoisier)": { type: "person", description: "18世紀法國化學家，被譽為「現代化學之父」。他推翻了燃素說，提出了氧化理論，並發表了質量守恆定律。最終在法國大革命期間被送上斷頭台。" }
  };

  for (const [key, value] of Object.entries(newGlossary)) {
    if (!data.glossary[key]) {
      data.glossary[key] = value;
    }
  }

  const outPath = require('path').join(__dirname, DATA_PATH);
  require('fs').writeFileSync(outPath, JSON.stringify(data, null, 2), 'utf8');
  console.log(`Added ${Object.keys(newGlossary).length} remaining entries to glossary.`);
}

run();
