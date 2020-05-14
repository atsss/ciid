// https://editor.p5js.org/atsss/sketches/SLf7n7FCS

let startPoint = [];
let createdLines = [];
let isFirstPoint = true;

function setup() {
  createCanvas(400, 400);
  strokeWeight(10);
}

function draw() {
  background(220);

  for(let i = 0; i < createdLines.length; i++) {
    let linePoints = createdLines[i];

    line(
      linePoints[0], linePoints[1],
      linePoints[2], linePoints[3]
    );
  }

  if(isFirstPoint) {
    circle(mouseX, mouseY, 5)
  } else {
    line(
      startPoint[0], startPoint[1],
      mouseX, mouseY
    );
  }
}

function mouseClicked() {
  if(isFirstPoint) {
    startPoint = [mouseX, mouseY];

    isFirstPoint = false;
  } else {
    createdLines.push([startPoint[0], startPoint[1], mouseX, mouseY]);

    startPoint = [mouseX, mouseY];
  }
}

