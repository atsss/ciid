// https://editor.p5js.org/atsss/sketches/ACSJM--tO

const width = 1000;
const height = 400;

function setup() {
  createCanvas(width, height);
}

function draw() {
  background(220);

  // backgroud
  noStroke();
  fill('#ffffe6');
  rect(0, 0, width, height * 3 / 4);
  fill('#e6ffff');
  rect(0, height * 3 / 4, width, height / 4);

  // Game Cube controller
  drawBridge();
  drawLeftHand();
  drawRightHand();

  // Nintendo Switch
  drawMonitor();
  drawLeftPart();
  drawRightPart();
}

const colorOfController = '#00ccff';
const colorOfNormalButton = '#e0e0eb';
const colorOfPrimaryButton = '#00ffbf';
const colorOfDangerButton = '#ff471a';
const colorOfWarningButton = '#ffff4d';
const colorOfLeftPart = '#79ff4d';
const colorOfRightPart = '#ff66a3';
const colorOfMonitor = '#000000';
const colorOfSwitchButton = '#000000';
const colorOfPowerOn = '#e6e6e6';

const basicSetUp = () => {
  noStroke();
  ellipseMode(CORNER);
};

const drawLeftHand = () => {
  basicSetUp();

  // body
  fill(colorOfController);
  ellipse(20, 150, 60, 200);
  ellipse(30, 131, 100);
  ellipse(75, 210, 70);

  // buttons
  fill(colorOfNormalButton);

  rect(90, 240, 40, 10)
  rect(105, 225, 10, 40)

  ellipseMode(CENTER);
  circle(80, 180, 60);
  stroke('#f0f0f5');
  circle(80, 180, 45);
  circle(80, 180, 30);
  circle(80, 180, 15);
}

const drawRightHand = () => {
  basicSetUp();

  // body
  fill(colorOfController);
  ellipse(240, 150, 60, 200);
  ellipse(190, 131, 100);
  ellipse(175, 210, 70);

  // buttons
  ellipseMode(CENTER);

  fill(colorOfPrimaryButton);
  circle(245, 180, 45);

  fill(colorOfDangerButton);
  circle(215, 210, 25);

  fill(colorOfWarningButton);
  circle(210, 250, 40);

  fill(colorOfNormalButton);
  quad(
    205, 160,
    230, 140,
    235, 150,
    210, 170
  );

  quad(
    250, 150,
    255, 140,
    280, 160,
    275, 170
  );
};

const drawBridge = () => {
  basicSetUp();

  fill(colorOfController);
  ellipse(60, 110, 200, 110);

  // buttons
  fill(colorOfNormalButton);
  ellipseMode(CENTER);
  circle(160, 200, 15);
};

const drawLeftPart = () => {
  basicSetUp();

  // body
  fill(colorOfLeftPart);
  rect(350, 100, 70, 250, 30, 0, 0, 30);

  // buttons
  ellipseMode(CENTER);
  fill(colorOfSwitchButton);
  circle(385, 170, 45);
  circle(385, 250, 20);
  circle(405, 270, 20);
  circle(385, 290, 20);
  circle(365, 270, 20);
};

const drawRightPart = () => {
  basicSetUp();

  // body
  fill(colorOfRightPart);
  rect(920, 100, 70, 250, 0, 30, 30, 0);

  // buttons
  ellipseMode(CENTER);
  fill(colorOfSwitchButton);
  circle(955, 270, 45);
  circle(955, 150, 20);
  circle(975, 170, 20);
  circle(955, 190, 20);
  circle(935, 170, 20);
};

const drawMonitor = () => {
  basicSetUp();

  // body
  fill(colorOfSwitchButton);
  rect(420, 100, 500, 250);

  if (mouseIsPressed) {
    fill(colorOfPowerOn);
  } else {
    fill(colorOfSwitchButton);
  }

  rect(440, 120, 460, 210);
};
