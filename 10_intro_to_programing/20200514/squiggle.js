// https://editor.p5js.org/atsss/sketches/B7ETwHwOx

let dots = [];
const diameter = 10;
const loopLength = 3;
let loopTime;
let prevLoopTime = 0;

function setup() {
  createCanvas(400, 400);
  noStroke();
  fill('white');
}

function draw() {
  background('black');

  loopTime = (millis() / 1000) % loopLength;

  if(prevLoopTime > loopTime) {
    dots = []; // reset
  } else {
    let posX = map(loopTime, 0, loopLength, 0, width);
    let posY = map(noise(millis() / 1000), 0, 1, 0, height);

    dots.push([posX, posY]);
  }

  for(let i = 0; i < dots.length; i++) {
    circle(dots[i][0], dots[i][1], diameter);
  }

  prevLoopTime = loopTime;
}
