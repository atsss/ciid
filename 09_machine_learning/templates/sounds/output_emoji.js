// https://editor.p5js.org/atsss/sketches/Ya4VK28yj

let modelURL = "https://teachablemachine.withgoogle.com/models/eS-oMtWl/";
let label = "waiting...";
let confidence = 0.00;
let emoji = "❓"; //Pick emojis here: https://emojipedia.org/

let framesSinceLastClassification = 0;

// STEP 1: Load the model
function preload() {
  const options = { probabilityThreshold: 0.95};
  classifier = ml5.soundClassifier(modelURL + "model.json", options);
  //classifier = ml5.soundClassifier("SpeechCommands18w", options); //Alternative  pre-trained model which can recognize the ten digits from "zero" to "nine", "up", "down", "left", "right", "go", "stop", "yes", "no": More info at https://learn.ml5js.org/docs/#/reference/sound-classifier
}

function setup() {
  createCanvas(640, 520);
  // STEP 2: Start continous classifying from the microphone
  classifier.classify(gotResult);
}

function draw() {
  background(0);

  // STEP 4: Show current label + emoji
  if (label == "clap") {
    emoji = "👏";
  } else if (label == "whistle") {
    emoji = "😙";
  }


  if (framesSinceLastClassification > 60) {
    emoji = "❓";
    label = "no sound";
    confidence = "";
  }
  textSize(256);
  text(emoji, width/2, 0.7*height);


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
