const squareSize = 40;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);

  noStroke();

  for(let i = 0; i < width / squareSize; i++){
    for(let j = 0; j < height / squareSize; j++) {
      fill(30, random(30, 180),random(50, 255));
      // fill(30*j,220,55*i);
      square(i * squareSize, j * squareSize, squareSize);
    }
  }
}
