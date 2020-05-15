// https://editor.p5js.org/atsss/sketches/ypFJ1KNcM

let circles = [];
const circleNum = 30;
const diameter = 20;
const stableColorMin = 150;
const stableColorMax = 250;
const backgroundColor = 'faf6dc';

function setup() {
  createCanvas(400, 400);
  noStroke();

  for(let i = 0; i < circleNum; i++) {
    let circleColor = color(
      random(stableColorMin, stableColorMax),
      random(stableColorMin, stableColorMax),
      random(stableColorMin, stableColorMax)
    );

    circles.push(new Circle(random(width), random(height), circleColor));
  }
}

function draw() {
  background(backgroundColor)

  for(let i = 0; i < circles.length; i++) {
    let targetCircle = circles[i];

    fill(targetCircle.color);
    circle(targetCircle.posX, targetCircle.posY, diameter);
  }
}

function mouseClicked() {
  for(let i = 0; i < circles.length; i++) {
    let targetCircle = circles[i];

    if(dist(mouseX, mouseY, targetCircle.posX, targetCircle.posY) < diameter / 2) {
      circles.splice(i, 1);
    }
  }
}

class Circle {
  constructor(posX, posY, color) {
    this.posX = posX;
    this.posY = posY;
    this.color = color;
  }
}
