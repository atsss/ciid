// https://editor.p5js.org/atsss/sketches/PHeTlCslU

const diameter = 20;
const ovalWidht = 15;
const ovalHeight = 30;
const columnNum = 20;
let rowNum;
const margin = 20;
const adjustNum = 10;

function setup() {
  rowNum = ceil(ufoShapes.length / columnNum);

  createCanvas(600, 600);
  noStroke();

  background('black');

  for(let i = 0; i < ufoShapes.length; i++) {
    let ufoShape = ufoShapes[i];
    let posX = map(i % columnNum, 0, columnNum - 1, margin, width - margin);
    let posY = map(floor(i / columnNum), 0, rowNum, margin, height - margin);

    if(ufoShape === 'circle') {
      fill('yellow');
      circle(posX, posY, diameter);
    } else if(ufoShape === 'oval') {
      fill('green');
      ellipse(posX, posY, ovalWidht, ovalHeight);
    } else {
      fill('red');
      triangle(
        posX - adjustNum, posY + adjustNum,
        posX, posY - adjustNum,
        posX + adjustNum, posY + adjustNum
      );
    }
  }
}

function draw() {}

// (some) UFO sightings, 2014-01-01 til 2014-03-31
// from NUFORC: https://www.kaggle.com/NUFORC/ufo-sightings/data
// var ufoShapes = ["circle", "circle", "circle", "circle", "circle", "circle", "oval", "circle", "circle", "circle", "circle", "circle", "triangle", "triangle", "circle", "circle", "circle", "circle", "oval", "circle", "circle", "circle", "circle", "circle", "circle", "circle", "triangle", "circle", "circle"];
var ufoShapes = ["circle", "circle", "circle", "circle", "circle", "circle", "oval", "circle", "circle", "circle", "circle", "circle", "triangle", "triangle", "circle", "circle", "circle", "circle", "oval", "circle", "circle", "circle", "circle", "circle", "circle", "circle", "triangle", "circle", "circle", "circle", "circle", "circle", "oval", "circle", "triangle", "oval", "circle", "triangle", "oval", "circle", "oval", "triangle", "triangle", "oval", "oval", "circle", "triangle", "circle", "circle", "circle", "circle", "triangle", "triangle", "circle", "circle", "circle", "circle", "oval", "triangle", "circle", "circle", "circle", "circle", "triangle", "triangle", "oval", "circle", "oval", "circle", "circle", "triangle", "triangle", "triangle", "circle", "triangle", "triangle", "triangle", "triangle", "circle", "circle", "oval", "triangle", "triangle", "circle", "circle", "circle", "triangle", "triangle", "oval", "circle", "triangle", "circle", "circle", "circle", "circle", "circle", "circle", "triangle", "oval", "triangle", "circle", "triangle", "triangle", "triangle", "circle", "circle", "triangle", "circle", "circle", "circle", "triangle", "circle", "circle", "oval", "triangle", "triangle", "circle", "oval", "oval", "circle", "triangle", "circle", "circle", "circle", "triangle", "triangle", "triangle", "triangle", "circle", "triangle", "circle", "triangle", "oval", "circle", "triangle", "circle", "oval", "circle", "triangle", "oval", "oval", "triangle", "triangle", "circle", "circle", "triangle", "triangle", "circle", "triangle", "triangle", "circle", "triangle", "triangle", "circle", "oval", "circle", "circle", "oval", "circle", "triangle", "triangle", "triangle", "circle", "triangle", "triangle", "oval", "circle", "triangle", "triangle", "circle", "circle", "circle", "circle", "oval", "circle", "oval", "circle", "circle", "triangle", "circle", "triangle", "triangle", "triangle", "oval", "circle", "circle", "oval", "circle", "oval", "circle", "circle", "circle", "oval", "triangle", "oval", "circle", "circle", "circle", "triangle", "triangle", "triangle", "triangle", "circle", "circle", "circle", "oval", "circle", "circle", "circle", "oval", "triangle", "triangle", "oval", "circle", "triangle", "triangle", "triangle", "circle", "oval", "oval", "circle", "oval", "circle", "triangle", "circle", "oval", "circle", "circle", "circle", "circle", "triangle", "oval", "triangle", "circle", "circle", "oval", "circle", "oval", "triangle", "circle", "triangle", "triangle", "circle", "oval", "circle", "triangle", "circle", "circle", "triangle", "oval", "circle", "circle", "oval", "circle", "circle", "circle", "oval", "circle", "circle", "triangle", "circle", "oval", "triangle", "triangle", "circle", "circle", "oval", "oval", "circle", "circle", "circle", "oval", "triangle", "triangle", "circle", "circle", "oval", "triangle", "triangle", "circle", "triangle", "circle", "circle", "circle", "circle", "triangle", "circle", "triangle", "triangle", "circle", "circle", "oval", "oval", "triangle", "circle", "circle", "circle", "circle", "triangle", "circle", "circle", "triangle", "triangle", "circle", "triangle", "oval", "oval", "oval", "triangle", "circle", "circle", "circle", "triangle", "circle", "oval", "oval", "circle", "triangle", "triangle", "oval", "triangle", "triangle", "circle", "circle", "triangle", "oval", "circle", "triangle", "triangle", "circle", "oval", "oval", "triangle", "circle", "circle", "triangle", "circle", "oval", "circle", "circle", "oval", "triangle", "circle", "circle", "triangle", "circle", "triangle", "triangle", "circle", "triangle", "circle", "oval", "circle", "triangle", "circle", "triangle", "circle", "triangle", "circle", "circle", "circle", "oval", "circle", "circle", "triangle", "triangle", "triangle", "triangle", "triangle", "circle", "circle", "circle", "circle", "circle", "circle", "triangle", "circle", "circle", "oval", "circle", "circle", "oval", "triangle", "triangle", "circle", "triangle", "triangle", "triangle", "oval", "triangle", "triangle", "circle", "circle", "circle", "circle", "triangle", "triangle", "triangle", "circle", "circle", "triangle", "circle", "circle", "oval", "circle", "circle", "triangle", "circle", "triangle", "circle", "triangle", "triangle", "oval", "circle", "oval", "circle", "circle", "circle", "triangle", "circle", "triangle", "triangle", "triangle", "circle", "triangle", "circle", "triangle", "triangle", "triangle", "triangle", "circle", "circle", "circle", "circle", "triangle", "oval", "triangle", "triangle", "circle", "circle", "oval", "triangle", "triangle", "circle", "triangle", "triangle", "triangle", "circle", "triangle", "circle"];
