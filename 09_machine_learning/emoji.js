// p5.js editor url: https://editor.p5js.org/atsss/sketches/_SIhrdXGI
// Teachable Machine ml5 image example - modified from The Coding Train https://thecodingtrain.com/TeachableMachine/1-teachable-machine.html
let video;
let label = "waiting...";
let confidence = 0.0;
let classifier;
let modelURL = 'https://teachablemachine.withgoogle.com/models/dmj4Og1No/';
let emoji = "❓"; //Pick emojis here: https://emojipedia.org/

// STEP 1: Load the model
function preload() {
  classifier = ml5.imageClassifier(modelURL + 'model.json');
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

  // STEP 4: Show current label + emoji
  textSize(32);
  textAlign(CENTER, CENTER);
  fill(255);
  text(label + " " + confidence, width/2, height - 16);

  if (label == "Good") {
    emoji = "😄";
  } else if (label == "Sleepy") {
    emoji = "💤";
  }  else if (label == "Rude") {
    emoji = "😝";
  } else if (label == "Backward") {
    emoji = "💩";
  }

  // Draw the emoji if confidence is over a set value
  if (confidence > 0.5) {
    textSize(256);
    text(emoji, width/2, 0.7*height);
  }
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
  label = results[0].label;
  confidence = nf(results[0].confidence, 0, 2);
  classifyVideo();
}
