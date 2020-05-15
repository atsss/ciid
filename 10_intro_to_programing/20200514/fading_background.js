// https://editor.p5js.org/atsss/sketches/Yf-nTosTv

const rgbMin = 0;
const rgbMax = 255;
let rgb = 0;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  rgb = map(mouseX, 0, width, rgbMin, rgbMax);

  background(rgb);
}
