// https://editor.p5js.org/atsss/sketches/wTdZvzlbD

let gradationColor;
let pickedColors = [];
const colorWidth = 5;
const gradationHeight = 100;

function setup() {
  createCanvas(400, 400);

  noStroke();
  const startColor = color(255, 0, 0);
  const endColor = color(0, 0, 255);

  for(let i = 0; i < width; i += colorWidth) {
    let gradationColor = lerpColor(startColor, endColor, i / width)

    fill(gradationColor);
    rect(i, 0, colorWidth, gradationHeight);
  }
}

function draw() {
  if(pickedColors.length !== 0) {
    let pickedColorWidth = width / pickedColors.length;

    for(let i = 0; i < pickedColors.length; i++) {
      fill(pickedColors[i]);
      rect(pickedColorWidth * i, gradationHeight, pickedColorWidth, height - gradationHeight);
    }
  }
}

function mouseClicked() {
  let offsetY = dist(0, 0, 0, mouseY);
  const startColor = color(255, 0, 0);
  const endColor = color(0, 0, 255);

  if(offsetY < gradationHeight) {
    let offsetX = dist(0, 0, mouseX, 0);

    let gradationColor = lerpColor(startColor, endColor,  offsetX / width)

    pickedColors.push(gradationColor);
  }
}
