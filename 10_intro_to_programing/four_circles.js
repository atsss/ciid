// https://editor.p5js.org/atsss/sketches/4TexaX-Eo

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0);

  // In the top-left corner, draw two overlapping circles.
  fill(255,255,random(0,255),200);
  noStroke();
  ellipseMode(CORNER);
  ellipse(0, 0, 50);
  ellipse(30, 0, 50);


  // In the top-right corner, draw two non-overlapping circles.
  fill(255,random(0,255),255,200);
  noStroke();
  ellipseMode(CORNER);
  ellipse(280, 0, 50);
  ellipse(350, 0, 50);

  // In the bottom-left corner, draw two circles that touch at exactly one point ("tangent").
  fill(random(0,255),255,255,150);
  noStroke();
  ellipse(0, 300, 50);
  ellipse(0, 350, 50);

  // In the bottom-right corner, draw one circle inside another. (Make sure both are visible!)
  fill(255);
  noStroke();
  ellipse(200, 200, 200); // big one
  fill(0);
  ellipse(300, 300, 50); // small
}
