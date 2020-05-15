// https://editor.p5js.org/atsss/sketches/pzZAToeaq

const maxDiameter = 100;
const loopLength = 3;
let pointY;
let prevPointY = 0;

function setup() {
  createCanvas(400, 400);
  background('black');
}

function draw() {
  let loopTime = (millis() / 1000) % loopLength;
  pointY = map(loopTime, 0, loopLength, 0, height);

  let pointX = width / 2;
  let diameter = map(noise(loopTime), 0, 1, 0, maxDiameter);

  if(prevPointY > pointY) { background('black'); }

  fill('white');
  circle(pointX, pointY, diameter);

  prevPointY = pointY;
}
