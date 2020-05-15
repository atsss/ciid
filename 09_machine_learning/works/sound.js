// p5.js editor url: https://editor.p5js.org/atsss/sketches/v32B-mIQT
// Teachable Machine ml5 image example - modified from The Coding Train https://thecodingtrain.com/TeachableMachine/1-teachable-machine.html
let video;
let label = "waiting...";
let displayLabel = "waiting...";
let previousLabel = "waiting...";
let confidence = 0.0;
let classifier;
let modelURL = 'https://teachablemachine.withgoogle.com/models/dmj4Og1No/';
let OkSound;
let HurtSound;
let RightSound;
let WrongSound;

// STEP 1: Load the model + sounds
function preload() {
  classifier = ml5.imageClassifier(modelURL + 'model.json');
  OkSound = loadSound("ok.m4a");
  HurtSound = loadSound("Hurt.m4a");
  RightSound = loadSound("right.m4a");
  WrongSound = loadSound("Wrong.m4a");
}

function setup() {
  createCanvas(640, 520);
  video = createCapture(VIDEO);
  video.hide();
  classifyVideo();
}

function draw() {
  background(0);
  image(video, 0, 0);

  // STEP 4: Playback sound if there is a switch in labels
  if (label == "Good" && previousLabel != "Good") {
    OkSound.play();
    HurtSound.stop();
    RightSound.stop();
    WrongSound.stop();
  } else if (label == "Sleepy" && previousLabel != "Sleepy") {
    OkSound.stop();
    HurtSound.play();
    RightSound.stop();
    WrongSound.stop();
  } else if (label == "Rude" && previousLabel != "Rude") {
    OkSound.stop();
    HurtSound.stop();
    RightSound.play();
    WrongSound.stop();
  } else if (label == "Backward" && previousLabel != "Backward") {
    OkSound.stop();
    HurtSound.stop();
    RightSound.stop();
    WrongSound.play();
  } else if (label == "nothing") {
    //don't do anything on this label
  }

  //Display current label
  textSize(32);
  textAlign(CENTER, CENTER);
  fill(255);
  text(displayLabel + " " + confidence, width / 2, height - 16);

  //Update previousLabel
  previousLabel = label;
}

// STEP 2: Do the classifying
function classifyVideo() {
  classifier.classify(video, gotResults);
}

// STEP 3: Get the classification
function gotResults(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  // Store the label and classify again
  confidence = nf(results[0].confidence, 0, 2);
  //Small hack: Only update labels when confidence is high
  if (confidence > 0.6) {
    label = results[0].label;
    displayLabel = label;
  } else {
    displayLabel = "unsure";
  }
  classifyVideo();
}
