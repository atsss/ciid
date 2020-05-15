// https://editor.p5js.org/atsss/sketches/ow1eCDZVt

let headImages = [];
let bodyImages = [];
let legsImages = [];
const imageNum = 5
const imageSize = 300;

function preload() {
//   hoge = '/assets/head1.jpg'
//   fuga = '/head1.jpg'
//   piyo = '/head' + 1 + '.jpg'
//   napu = '/assets/head' + 1 + '.jpg'

//   console.log('assets/head1.jpg: ', hoge)
//   console.log('head1.jpg: ', fuga);
//   console.log("'head' + 1 + '.jpg': ", piyo);
//   console.log("'assets/head' + 1 + '.jpg': ", napu);

  for(let i = 0; i < imageNum; i++) {
    headImages.push(loadImage(`assets/head${i+1}.jpg`));
    bodyImages.push(loadImage(`assets/body${i+1}.jpg`));
    legsImages.push(loadImage(`assets/legs${i+1}.jpg`));
  }
}

function setup() {
  createCanvas(imageSize, imageSize * 3);
  background(220);

  drawHuman();
}

function mouseClicked() {
  background(220);

  drawHuman();
}

const drawHuman = () => {
  image(headImages[floor(random(imageNum))], 0, 0, imageSize, imageSize);
  image(bodyImages[floor(random(imageNum))], 0, imageSize, imageSize, imageSize);
  image(legsImages[floor(random(imageNum))], 0, imageSize * 2, imageSize, imageSize);
}
