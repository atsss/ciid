// https://editor.p5js.org/atsss/sketches/9Ow4dYA6-

let circleCenterPoints = [];
const diameter = 20;
const offset = 50;
const initialPointX = 30;

function setup() {
  createCanvas(400, 400);

  for(let i = 0; i < width; i += offset) {
    circleCenterPoints.push([initialPointX + i, height / 2]);
  }
}

function draw() {
  background(220);

  for(let i = 0; i < circleCenterPoints.length; i++) {
    let centerPoint = circleCenterPoints[i];

    circle(centerPoint[0], centerPoint[1], diameter);
  }
}

function mouseClicked() {
  for(let i = 0; i < circleCenterPoints.length; i++) {
    let centerPointX = circleCenterPoints[i][0];
    let centerPointY = circleCenterPoints[i][1];

    if(dist(mouseX, mouseY, centerPointX, centerPointY) < diameter / 2) {
      circleCenterPoints.splice(i, 1);
    }
  }
}
