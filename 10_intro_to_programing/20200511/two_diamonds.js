// https://editor.p5js.org/atsss/sketches/h_EKQlRps

function setup() {
  createCanvas(200, 200);
}

function draw() {
  background(220);
  //big
  fill(color('#ff00ff'));
  quad(50,100,100,50,150,100, 100, 150);
  //small
  fill(color('#00ff00'));
  quad(80,100,100,80,120,100, 100, 120);
}
