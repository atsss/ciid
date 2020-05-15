// https://editor.p5js.org/atsss/sketches/M4J_45R94

const diameter = 80;
const randomNum = 1000;

function setup() {
  createCanvas(400, 400);
  noStroke();
}

function draw() {
  background('black');

  let posX = map(noise(millis() / 1000), 0, 1, 0, width - diameter);
  let posY = map(noise(millis() / 1000 + randomNum), 0, 1, 0, height - diameter);

  square(posX, posY, diameter);
}
