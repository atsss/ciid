// p5.js edior url: https://editor.p5js.org/atsss/sketches/wGjABgT5V
// Teachable Machine ml5 image example - modified from The Coding Train https://thecodingtrain.com/TeachableMachine/1-teachable-machine.html
let video;
let label = "waiting...";
let confidence = 0.0;
let classifier;
let modelURL = 'https://teachablemachine.withgoogle.com/models/eUwO5LbaR/';
let ChairImg;

// STEP 1: Load the model!
function preload() {
  classifier = ml5.imageClassifier(modelURL + 'model.json');
  ChairImg = loadImage("chair.jpeg");
}

function setup() {
  createCanvas(1200, 700);
  video = createCapture(VIDEO);
  video.hide();
  classifyVideo();
}

function draw() {
  background(155);
  image(video, 0, 0);

  // STEP 4: Show image + current label if confidence is over a set value
  if (label == "Book" && confidence > 0.8) {
    image(ChairImg, 0, 0, width, video.height);
  }  else if (label == "nothing") {
    //don't display any image
  }

  textSize(32);
  textAlign(CENTER, CENTER);
  fill(255);
  text(label + " " + confidence, width / 2, height - 16);
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
