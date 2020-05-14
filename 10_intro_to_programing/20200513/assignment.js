// https://editor.p5js.org/atsss/sketches/XqcoB8TwQ

const canvasWidth = 450;
const canvasHeight = 450;
const sushiHeight = canvasHeight * 0.8;
let sushies = [];
let counter = 0;
let isFull = false;
let colorDiff = 0;
const plateDiameter = 200;
const plateStartPointX = 330;
const plateStartPointY = 300;
const plateOffsetX = 105;
const plateOffsetY = 30;
const maxPlateNum = 10;
const plateColor = '#f7f3da';
const dirtyPlateColor = '#d6a874';
const spongeColor = '#f7f57c';
const primaryColor = '#dae7f7';
const dangerColor = '#f7dae1';
const subColor = '#787576';

function preload() {
  sushies.push(loadImage('aji.jpeg'));
  sushies.push(loadImage('buri.jpeg'));
  sushies.push(loadImage('ikura.jpeg'));
  sushies.push(loadImage('katsuo.jpeg'));
  sushies.push(loadImage('maguro.jpeg'));
  sushies.push(loadImage('salmon.jpeg'));
  sushies.push(loadImage('sanma.jpeg'));
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);
}

function draw() {
  background('white');

  if(isFull) {
    writeText('You have to wash!', 40, 50);
    drawPlates();
    washPlates();
    drawSponge();
  } else {
    // sushi
    image(sushies[counter % sushies.length], 0, 0, canvasWidth, sushiHeight);

    drawPlates();
    createButtons();
  }
}

function mouseClicked() {
  if(!isFull) {
    if(mouseY < sushiHeight) { return; }
    if(mouseX < canvasWidth / 2) { counter++; }
    else { isFull = !isFull; }
  }
}

function mouseMoved() {
  if(isFull) {
    if(colorDiff < 100) {
      colorDiff++;
    } else {
      colorDiff = 0;
      counter--;
    }

    if(counter === 0) { isFull = !isFull; }
  }
}


const drawPlates = () => {
  for(let i = 0; i < counter; i++) {
    drawPlate(
      plateStartPointX - plateOffsetX * floor(i / maxPlateNum),
      plateStartPointY - plateOffsetY * (i % maxPlateNum)
    );
  }
}

const drawPlate = (posX, posY) => {
  stroke(subColor);
  fill(plateColor);
  rect(posX, posY, 100, 15); // top
  rect(posX + 20, posY + 15, 60, 15); // buttom
}

const writeText = (word, posX, posY) => {
  fill(subColor);
  text(word, posX, posY);
}

const createButtons = () => {
  noStroke();
  textSize(40);
  fill(primaryColor);
  rect(0, sushiHeight, canvasWidth / 2, canvasHeight - sushiHeight);
  writeText('More!!', 40, sushiHeight + 60);

  fill(dangerColor);
  rect(canvasWidth / 2, sushiHeight, canvasWidth / 2, canvasHeight - sushiHeight);
  writeText("I'm full", canvasWidth / 2 + 40, sushiHeight + 60);
}

const drawSponge = () => {
  fill(spongeColor);
  rect(mouseX, mouseY, 40, 60);
}

const washPlates = () => {
  const startColor = color(dirtyPlateColor);
  const endColor = color(plateColor)
  let changingColor = lerpColor(startColor, endColor, colorDiff / 100);

  fill(changingColor);
  circle(canvasWidth / 2, canvasHeight / 2, plateDiameter);
}
