// https://editor.p5js.org/atsss/sketches/jK-_Qxuut

const width = 400;
const height = 400;

function setup() {
  createCanvas(width, height);
}

function draw() {
  background(220);

  const centerX = width / 2;
  const centerY = height / 2;
  const strokeWidth = 25;

  // big one
  stroke(color('red'));
  strokeWeight(strokeWidth);
  fill(color('orange'));
  circle(centerX,centerY,300);

  // medium one
  stroke(color('yellow'));
  strokeWeight(strokeWidth);
  fill(color('green'));
  circle(centerX,centerY,200);

  // small one
  stroke(color('blue'));
  strokeWeight(strokeWidth);
  fill(color('BlueViolet'));
  circle(centerX,centerY,100);
}
