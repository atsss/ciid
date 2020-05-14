// https://editor.p5js.org/atsss/sketches/BsFvaoMWs

let centerX;
let conterY;
const diameter = 50;

function setup() {
  createCanvas(400, 400);

  randomizeCenter();
  drawCircle();
}

function mouseClicked() {
  if(dist(centerX, centerY, mouseX, mouseY) < diameter / 2) {

    randomizeCenter();
    drawCircle();
  }
}

const randomizeCenter = () => {
  centerX = random(400);
  centerY = random(400);
}

const drawCircle = () => {
  background(220);
  circle(centerX, centerY, diameter);
}
