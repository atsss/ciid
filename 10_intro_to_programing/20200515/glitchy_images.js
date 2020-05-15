// https://editor.p5js.org/atsss/sketches/NVM2Nm7uW

let maguro;
let bm;
let clickCount = 0;
let firstBm;

function setup() {
  createCanvas(400, 400);
  bm = [BLEND, DARKEST, LIGHTEST, DIFFERENCE, MULTIPLY, EXCLUSION, SCREEN, REPLACE, OVERLAY, HARD_LIGHT, SOFT_LIGHT, DODGE, BURN, ADD, REMOVE];
  firstBm = bm[0];

  maguro = loadImage('https://assets.editor.p5js.org/5eb09289a3c3fe001970f3f7/8dfce3ae-712a-4234-832f-22a341d063b1.jpeg');
}

function draw() {
  background(255);

  blendMode(firstBm);
  image(maguro, 0, 0, width, height);

  blendMode(bm[clickCount % bm.length]);
  image(maguro, 0, 0, width + 200, height);
}

function mouseClicked() {
  firstBm = bm[floor(random(bm.length))];
  clickCount++;
}
