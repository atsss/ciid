// https://editor.p5js.org/atsss/sketches/-7nMTyvG3

let capture;

function setup() {
  createCanvas(780, 480);
  capture = createCapture(VIDEO);
  capture.size(320, 240);
  capture.hide();
}

function draw() {
  background(255);

  blendMode(BLEND)
  image(capture, 0, 0, width, height);

  blendMode(DIFFERENCE)
  image(capture, 0, 0, width + 300, height);
}
