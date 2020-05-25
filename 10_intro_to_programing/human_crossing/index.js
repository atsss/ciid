// canvas variables
const canvasWidth = 800;
const canvasHeight = 800;

// destinations variables
const destinationDiameter = 200;
const destinations = [
  { id: 0, name: 'CIID', x: destinationDiameter/2, y: canvasHeight - destinationDiameter/2 },
  { id: 1, name: 'auto mercado', x: canvasWidth - destinationDiameter/2, y: destinationDiameter/2 },
  { id: 2, name: 'ATM', x: destinationDiameter/2, y: destinationDiameter/2 },
  { id: 3, name: 'Home', x: canvasWidth - destinationDiameter/2, y: canvasHeight - destinationDiameter/2 }
];
const lastDestinationId = 3;
let nextDestination;
const destinationCircleColor = '#00d1b2';
const destinationStrokeWidth = 10;

// your variables
const left = 37;
const front = 38;
const right = 39;
const back = 40;
const steps = 5;
let posX;
let posY;
const playerDiameter = 25;
const yourColor = { red: 39, green: 227, blue: 130 }

// breathing circle variables
let diff = 0;
let speed = 2;
const basicDiameter = 50;
let changingDiameter;

// players variables
const otherPlayerColor = { red: 0, green: 0, blue: 0 }
const colorAlpha = 100;
let isStarted = false;
let isCompleted = false;

// distance after toching anything variables
const movingDistance = 30;

// timer variables
const frames = 40;
const timer = 5;
let countDown = timer;
let isTouched = false;
const MarginToAlign = 27; // margin to put the countdown number in the center of circle
const countDownDiameter = 100;
const countDownSize = 80;

// effects variables
let collisionSound;
let completeSound;
let wellDoneSound;
let startSound;

// machine learning variables
let video;
let poseNet;
let poses = [];

// images
let backgroundImage;
let onboardingImage;
let sanitizingImage;
let wonPopImage;
const sanitizingImageSize = 300;

// onboarding
let button;

// element names
const readyButtonElement = '#ready-button';
const nextDestinationElement = '#next-destination';


function preload() {
  collisionSound = loadSound("assets/collision.wav");
  completeSound = loadSound("assets/complete.wav");
  wellDoneSound = loadSound("assets/well-done.wav");
  startSound = loadSound("assets/start.wav");
  backgroundImage = loadImage("assets/background_image.png");
  onboardingImage = loadImage("assets/onboarding.png");
  sanitizingImage = loadImage("assets/sanitising.png");
  wonPopImage = loadImage("assets/won_pop.png");
}

function setup() {
  createCanvas(canvasWidth, canvasHeight).parent("#canvas-holder");

  // If you edit this project, CHANGE THE PROJECT NAME :D
  multiplayer.connect("test-ats05");

  // set up initial isStarted flag
  multiplayer.setSharedData("isStarted", false);

  // set up your start point
  posX = floor(random(width));
  posY = floor(random(height));

  // set up number of frames within one sec
  frameRate(frames);

  // set up first destination
  nextDestination = destinations[0];

  // set up machine learing
  video = createCapture(VIDEO);
  video.size(width, height);

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function(results) {
    poses = results;
  });
  // Hide the video element, and just show the canvas
  video.hide();

  // get button element
  button = select(readyButtonElement);
}

function draw() {
  if (!multiplayer.connected) { return; }

  imageMode(CORNER);
  background(backgroundImage);

  // draw circle of next destination
  for(let i = 0; i < destinations.length; i++) {
    let destination = destinations[i];

    if(destination.id === nextDestination.id) {
      noFill();
      strokeWeight(destinationStrokeWidth);
      stroke(destinationCircleColor);
      circle(destination.x, destination.y, destinationDiameter);
    }
  }

  // calclate if you get to next destination
  let distanceToNextDestination = dist(posX, posY, nextDestination.x, nextDestination.y);
  if((playerDiameter + destinationDiameter)/2 > distanceToNextDestination && isStarted) {
    if(nextDestination.id === lastDestinationId) {
      // make well done sound
      if(!isCompleted) { wellDoneSound.play(); }

      // turn isCompleted flag into true
      isCompleted = true;
    } else {
      // make complete sound
      completeSound.play();

      // set next destination
      let nextDestinationId = nextDestination.id + 1;
      nextDestination = destinations[nextDestinationId];
    }
  }

  // show next destination
  select(nextDestinationElement).html(nextDestination.name);

  // store your position in firebase
  multiplayer.setMyData("posX", posX);
  multiplayer.setMyData("posY", posY);

  // draw other players
  for (var i = 0; i < multiplayer.players.length; i++) {
    let player = multiplayer.players[i];

    // skip to calculate if 'you' is the player
    if(multiplayer.myPlayerId !== player.playerId) {
      let theirX = multiplayer.getTheirData(player, "posX");
      let theirY = multiplayer.getTheirData(player, "posY");

      // player circle
      noStroke();
      fill(otherPlayerColor.red, otherPlayerColor.green, otherPlayerColor.blue);
      circle(theirX, theirY, playerDiameter);

      // breathing circle
      fill(otherPlayerColor.red, otherPlayerColor.green, otherPlayerColor.blue, colorAlpha);
      circle(theirX, theirY, changingDiameter);

      let socialDistance = dist(posX, posY, theirX,theirY);
      if(socialDistance < changingDiameter && isStarted) {
        // make collision sound
        collisionSound.play();

        // change isTouched flag
        isTouched = true;

        // make social distance
        if(posX > theirX) {
          posX += movingDistance;
          theirX -= movingDistance;
        } else {
          posX -= movingDistance;
          theirX += movingDistance;
        }

        if(posY > theirY) {
          posY += movingDistance;
          theirY -= movingDistance;
        } else {
          posY -= movingDistance;
          theirY += movingDistance;
        }
      }
    }
  }

  // start game
  button.mouseClicked(changeIsStartedFlag);
  if(multiplayer.getSharedData("isStarted")) {
    if(!isStarted) { startSound.play(); } // play only first time

    isStarted = true;
  }

  // show onboarding image
  if(!isStarted) { image(onboardingImage, 0, 0, width, height); }

  // draw you
  noStroke();
  fill(yourColor.red, yourColor.green, yourColor.blue);
  circle(posX, posY, playerDiameter);
  // draw your breathing circle
  fill(yourColor.red, yourColor.green, yourColor.blue, colorAlpha);
  circle(posX, posY, changingDiameter);
  fill(yourColor.red, yourColor.green, yourColor.blue);
  textSize(20);
  text('You', posX - 20, posY - 40); // adjust 'You' text postiion

  if(isTouched) {
    // calculate timer with frames
    if(frameCount % frames === 0 && countDown > 0) {
      countDown --;
    }
    if(countDown === 0) {
      // reset countdown
      countDown = timer;

      // reset isTouched flag
      isTouched = false;
    }

    // show sanitizing image
    imageMode(CENTER);
    image(sanitizingImage, width/2, height/2, sanitizingImageSize, sanitizingImageSize)

    // show contdown number
    noStroke();
    fill(0);
    circle(width/2, height/2, countDownDiameter);
    fill(255);
    textSize(countDownSize);
    text(countDown, width/2 - MarginToAlign, height/2 + MarginToAlign);
  } else {
    // control your position by your nose position
    if (poses.length > 0) {
      let pose = poses[0].pose;
      let nose = pose.nose;

      posX = width - nose.x;
      posY = nose.y;
    }

    // calculate breathing circle
    if (diff >= 20 || diff <= -20) { speed = speed*(-1) }
    diff +=speed;
    changingDiameter = basicDiameter - diff;
  }

  if(isCompleted) {
    imageMode(CORNER);
    image(wonPopImage, 0, 0, width, height);
  }
}

const changeIsStartedFlag = () => {
  multiplayer.setSharedData("isStarted", true);
}
