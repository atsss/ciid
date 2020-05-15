// https://editor.p5js.org/atsss/sketches/KAQ0OBMMK

const canvasWidth = 400;
const canvasHeight = 400;
const smallMonsterBallSize = 50;
const bigMonsterBallSize = 200;
const backgroundColor = '#e0f7c8';
const redColor = '#eb3e38';
const whiteColor = '#ffffff';
const blackColor = '#000000';
const translatedCenterX = 0;
const translatedCenterY = -1 * bigMonsterBallSize / 2;
let angle;
let loopTime = 0;
let prevLoopTime;
const loopLength = 2;
let isGoingToRight = true;
let counter = 0;
const counterMax = 4;
let isCatched = false;
let isThrown = false;
let pikach;
const imageSize = 200;
const catchableDistance = 50;

function preload() {
  pikach = loadImage('pikach.png');
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);
}

function draw() {
  background(backgroundColor);


  if(isThrown) {
    prevLoopTime = loopTime;
    loopTime = millis() / 1000 % loopLength;

    if(prevLoopTime > loopTime) {
      isGoingToRight = !isGoingToRight;
      counter++;
    }

    if(counter < counterMax) {
      if(isGoingToRight) {
        angle = map(loopTime, loopLength / 2, loopLength, 0, PI / 4);
      } else {
        angle = map(loopTime, loopLength / 2, 0, 0, PI / 4);
      }
    } else {
      angle = 0
      isCatched = true;
    }

    translate(width / 2, height / 2 + 100);
    rotate(angle);

    drawMonsterBall(bigMonsterBallSize, translatedCenterX, translatedCenterY, 10);

    if(isCatched) { drawCatchEffects();}
  } else {
    imageMode(CENTER);
    image(pikach, width / 2, height / 2, imageSize, imageSize);

    drawMonsterBall(smallMonsterBallSize, mouseX, mouseY, 5);
  }
}

function mouseMoved() {
  let distance = dist(width / 2, height / 2, mouseX, mouseY);

  if(distance < catchableDistance) { isThrown = true; }
}

const drawMonsterBall = (diameter, centerX, centerY, strokeWidth) => {
  noStroke();
  fill(redColor);
  arc(centerX, centerY, diameter, diameter, PI, 2 * PI);
  fill(whiteColor);
  arc(centerX, centerY, diameter, diameter, 0, PI);
  stroke(blackColor);
  strokeWeight(strokeWidth);
  line(
    centerX - diameter / 2, centerY,
    centerX + diameter / 2, centerY
  );
  circle(centerX, centerY, diameter / 4);
}

const drawCatchEffects = () => {
  line(-70, -190, -100, -220);
  line(0, -215, 0, -260);
  line(70, -190, 100, -220);
}
