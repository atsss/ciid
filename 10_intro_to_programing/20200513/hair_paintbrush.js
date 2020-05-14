// https://editor.p5js.org/atsss/sketches/3ndO1lVy7

function setup() {
  createCanvas(400, 400);
  // noStroke();
  background(200);
  fill("white");
  circle(width/2,height/2,100);
  fill("black");
  circle(width/2-22,height/2-5,10);
  circle(width/2+22,height/2-5,10);

  frameRate(10);
}

function draw() {
  if(mouseIsPressed) {
    // circle(mouseX, mouseY, 10);
    line(mouseX, mouseY, pmouseX, pmouseY);
  }
}
