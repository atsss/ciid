// https://editor.p5js.org/atsss/sketches/A4N3p3OpF

let img;

function preload() {
  img = loadImage('https://assets.editor.p5js.org/5eb09289a3c3fe001970f3f7/41f1d0d4-515e-4091-9a02-4e49a54a8e2f.png');
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(255);
  image(img, 0, 0, mouseX, mouseY);
}
