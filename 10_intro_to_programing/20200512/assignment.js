// https://editor.p5js.org/atsss/sketches/x8XZYMgQe

const hiraganaArray = ['あ', 'い', 'う', 'え', 'お', 'か', 'き', 'く', 'け', 'こ', 'さ', 'し', 'す', 'せ', 'そ', 'た', 'ち', 'つ', 'て', 'と', 'な', 'に', 'ぬ', 'ね', 'の', 'は', 'ひ', 'ふ', 'へ', 'ほ', 'ま', 'み', 'む', 'め', 'も', 'や', 'ゆ', 'よ', 'ら', 'り', 'る', 'れ', 'ろ', 'わ', 'を', 'ん', 'が', 'ぎ', 'ぐ', 'げ', 'ご', 'ざ', 'じ', 'ず', 'ぜ', 'ぞ', 'だ', 'ぢ', 'づ', 'で', 'ど', 'ば', 'び', 'ぶ', 'べ', 'ぼ', 'ぱ', 'ぴ', 'ぷ', 'ぺ', 'ぽ', '、', '。']
const kanjiArray = ['亜', '哀', '挨', '愛', '曖', '悪', '握', '圧', '扱', '宛', '嵐', '安', '案', '暗', '以', '衣', '位', '囲', '医', '依', 'エ', '委', '威', '胃', '為', '畏', '尉', '異', '移', '萎', '偉', '椅', '彙', '意', '違', '維', '慰', '遺', '緯', '域', '育', '壱', '逸', '茨', '芋', '引', '印', '因', '咽', '姻', '員', '院', '陰', '飲', '隠', '韻', '右', '宇', '羽', '六', '雨', '時', '小', '唄', '鬱', '畝', '浦', '運', '雲', 'エ', '永', '泳', '英', '映', '栄', '営', '詠', '影', '鋭', '衛', '易', '疫', '益', '液', '駅', '悦', '越', '謁', '閲', '円', '延', '沿', '炎', '怨', '宴', '媛', '援', '園', '煙', '猿', '遠', '鉛', '塩', '演', '縁', '艶', '汚', '王', '凹', '央', '応', '往', '押', '旺', '欧', '殴', '桜', '翁', '奥', '横', '岡', '屋', '億', '憶', '臆', '虞', '乙', '俺', '卸', '音', '恩', '温', '穏', '下', '化', '火', '加', '可', '仮', '何', '花', '佳', '価', '果', '河', '苛', '科', '架', '夏', '家', '荷', '華', '菓', '貨', '渦', '過', '嫁', '暇', '禍', '靴', '寡', '歌', '箇', '稼', '課', '蚊', '牙', '瓦', '我', '画', '芽', '賀', '雅', '餓', '介', '回', '灰', '会', '快', '戒', '改', '怪', '拐', '悔', '海', '界', '皆', '械', '絵', 'エ', '開', '階', '塊', '楷', '解', '潰', '壊', '懐', '諧', '貝', '外', '劾', '害', '崖', '涯', '街', '慨', '蓋', '該', '概', '骸', '垣', '柿', '各', '角', '拡', '革', '格', '核', '殻', '郭', '覚', '較', '隔', '閣', '確', '獲', '嚇', '穫', '学', '岳', '楽', '額', '顎', '掛', '潟', '括', '活', '喝', '渇', '割', '葛', '滑', '褐', '轄', '且', '株', '釜', '鎌', '刈', '干', '刊', '甘', '汗', '缶', '完', '肝', '官', '冠', '巻', '看', '陥', '乾', '勘', '患', '貫', '寒', '喚', '堪', '換', '敢', '棺', '款', '間', '閑', '勧', '寛', '幹', '感', '漢', '慣', '管', '関', '歓', '監', '緩', '憾', '還', '館', '環', '簡', '観', '韓', '艦', '鑑', '丸', '含', '岸', '岩', '玩', '眼', '頑', '顔', '願']
const bookWidth = 600;
const bookHeight = 400;
const rowNumOfPage = 20;
const columnNumOfPage = 10;
const margin = 20;
const backgroundColor = '#fff2e6';
const textColor = '#8c8c8c';
const subColor = '#b3b3b3';
const fontSize = 15;
const distanceX = (bookWidth / 2 - 2 * margin) / columnNumOfPage;
const distanceY = (bookHeight - 2 * margin) / rowNumOfPage;
const firstStartPointX = margin;
const firstStartPointY = margin + distanceY;
const secondStartPointX = bookWidth / 2 + margin;
const secondStartPointY = margin + distanceY;

function setup() {
  createCanvas(bookWidth, bookHeight);
  setupBook();
}

function draw() {}

function mouseClicked() {
  setupBook();

  // first page
  writeCharacters(firstStartPointX, firstStartPointY);
  // second page
  writeCharacters(secondStartPointX, secondStartPointY);
}

const setupBook = () => {
  background(color(backgroundColor));

  // center line
  stroke(subColor);
  line(width / 2, 0, width / 2, height);
}

const writeCharacters = (startPointX, startPointY) => {
  let pointX;
  let pointY;
  let RandomNum;
  let index;

  textSize(fontSize);
  fill(textColor);

  for(let i = 0; i < columnNumOfPage; i++) {
    for(let j = 0; j < rowNumOfPage; j++) {
      pointX = startPointX + distanceX * i;
      pointY = startPointY + distanceY * j;
      randomNum = Math.floor(random(10));

      if((i * j) % randomNum === 0) {
        index = Math.floor(random(kanjiArray.length));
        text(kanjiArray[index], pointX, pointY);
      } else {
        index = Math.floor(random(hiraganaArray.length));
        text(hiraganaArray[index], pointX, pointY);
      }
    }
  }
}
