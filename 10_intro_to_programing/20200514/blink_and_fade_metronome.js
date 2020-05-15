// https://editor.p5js.org/atsss/sketches/qrxLWmUYm

let alpha;
const alphaMin = 0;
const alphaMax = 255;
const loopLength = 1;
const diameter = 200;
const red = 252;
const green = 3;
const blue = 3;

function setup() {
  createCanvas(600, 400);
  noStroke();
}

function draw() {
  background('white')

  let loopTime = (millis() / 1000) % loopLength;

  alpha = map(loopTime, 0, loopLength, alphaMin, alphaMax);

  fill(red, green, blue, alpha);
  circle(width / 2, height / 2, diameter);
}
