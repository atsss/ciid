// https://editor.p5js.org/atsss/sketches/XTM2B69TH

let modelURL = "https://teachablemachine.withgoogle.com/models/eS-oMtWl/";
let label = "waiting...";
let confidence = 0.00;
let framesSinceLastClassification = 0;
let clapImg;
let whistleImg;

// STEP 1: Load the model
function preload() {
  const options = {
    probabilityThreshold: 0.95
  };
  classifier = ml5.soundClassifier(modelURL + "model.json", options);
  //classifier = ml5.soundClassifier("SpeechCommands18w", options); //Alternative  pre-trained model which can recognize the ten digits from "zero" to "nine", "up", "down", "left", "right", "go", "stop", "yes", "no": More info at https://learn.ml5js.org/docs/#/reference/sound-classifier
  clapImg = loadImage("clap.png");
  whistleImg = loadImage("whistle.png");
}

function setup() {
  createCanvas(640, 520);
  // STEP 2: Start continous classifying from the microphone
  classifier.classify(gotResult);
}

function draw() {
  background(155);

  // STEP 4: Show current label + image
  if (framesSinceLastClassification > 60) {
    label = "no sound";
    confidence = "";
  } else {
    if (label == "clap") {
      image(clapImg, 0, 0, width, 480);
    } else if (label == "whistle") {
      image(whistleImg, 0, 0, width, 480);
    } else if (label == "nothing") {
      //don't display any image
    }
  }
  textSize(32);
  textAlign(CENTER, CENTER);
  fill(255);
  text(label + " " + confidence, width / 2, height - 16);

  framesSinceLastClassification++;
}


// STEP 3: Get the classification
//Notice that the model does not output results for background noise and often outputs multiple classifications for the same class in a row
function gotResult(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  console.log(results[0].label);
  label = results[0].label;
  confidence = nf(results[0].confidence, 0, 2);

  framesSinceLastClassification = 0;
}
