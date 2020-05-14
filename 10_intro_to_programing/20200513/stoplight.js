// https://editor.p5js.org/atsss/sketches/uiGkAX0jY

const colorArray = ['red', 'yellow', 'green'];
const diameter = 100;
let count = 0;

function setup() {
  createCanvas(400, 400);

  background(220);

  drawCircle(colorArray[0]);
}

function draw() {}

function mouseClicked() {
  if(dist(width / 2, height / 2, mouseX, mouseY) < diameter / 2) {
    count++;

    drawCircle(colorArray[count % 3]);
  }
}

const drawCircle = (colorCircle) => {
  fill(colorCircle);
  circle(width / 2, height / 2, diameter);
}
