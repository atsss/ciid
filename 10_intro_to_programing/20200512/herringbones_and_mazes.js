const squareSize = 40;

function setup() {
  createCanvas(600, 600);
  frameRate(10);
}

function draw() {
  background(0);

  strokeWeight(10);
  stroke('white');

  for(let i = 0; i < width / squareSize; i++){
      for(let j = 0; j < height / squareSize; j++) {
      // if(i % 2 === 0) {
      if( Math.floor(random(2)) % 2 === 0) {
        line(
          squareSize * i, squareSize*j,
          squareSize * (i + 1), squareSize *(j+1)
        );
      } else {
        line(
          squareSize * i, squareSize*(j+1),
          squareSize * (i + 1), squareSize*j
        );
      }
    }
  }
}
