// p5.js editor url: https://editor.p5js.org/atsss/sketches/93gVuXoqL
// Small issue with the updateCounts(), it seems to be one step behind...
// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Image Classification using Feature Extraction with MobileNet and four classes
=== */

let featureExtractor;
let classifier;
let video;
let loss;
let classificationResult = "";
let previousResult = "";
let confidence;

let myClasses = [];
let myClassNames = ["One", "Two", "Three", "Four", "Five", "Nothing"]; //Add as many classes as you wish

function preload() {
  DoSound = loadSound("1 Position.m4a");
  ReSound = loadSound("2 Position.m4a");
  MiSound = loadSound("3 Position.m4a");
  FaSound = loadSound("4 Position.m4a");
  SolSound = loadSound("5 Position.m4a");
}

function setup() {
  createCanvas(640, 480);

  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  // Extract the already learned features from MobileNet
  featureExtractor = ml5.featureExtractor('MobileNet', modelReady);
  // Create a new classifier using those features and give the video we want to use
  //classifier = featureExtractor.classification(video, videoReady);

  //featureExtractor.numClasses = myClassNames.length;


  const options = {
    numLabels: myClassNames.length
  }; //Specify the number of classes/labels
  classifier = featureExtractor.classification(video, options);


  for (let i = 0; i < myClassNames.length; i++) {
    myClasses.push(new Category(myClassNames[i]));
  }

  // Set up the UI buttons
  setupButtons();

  fill(0, 255, 0);
  textSize(36);
  textAlign(CENTER);
}

function draw() {
  background(122);
  image(video, 0, 0);

  for (let i = 0; i < myClassNames.length; i++) {

    if (myClasses[i].recordExamples) {
      addExample(myClasses[i].name);
      myClasses[i].nExamples++;
    }
  }

  text(classificationResult, width / 2, height / 2);

  //Make specific things happen when specific classes are detected
  if (classificationResult == myClassNames[0] && previousResult != myClassNames[0]) {
    DoSound.play();
    ReSound.stop();
    MiSound.stop();
    FaSound.stop();
    SolSound.stop();
  } else if (classificationResult == myClassNames[1] && previousResult != myClassNames[1]) {
    DoSound.stop();
    ReSound.play();
    MiSound.stop();
    FaSound.stop();
    SolSound.stop();
  } else if (classificationResult == myClassNames[2] && previousResult != myClassNames[2]) {
    DoSound.stop();
    ReSound.stop();
    MiSound.play();
    FaSound.stop();
    SolSound.stop();
  } else if (classificationResult == myClassNames[3] && previousResult != myClassNames[3]) {
    DoSound.stop();
    ReSound.stop();
    MiSound.stop();
    FaSound.play();
    SolSound.stop();
  } else if (classificationResult == myClassNames[4] && previousResult != myClassNames[4]) {
    DoSound.stop();
    ReSound.stop();
    MiSound.stop();
    FaSound.stop();
    SolSound.play();
  } else if (classificationResult == myClassNames[5]) {
    //don't do anything on this label
  }
}

// Category class
class Category {
  constructor(s) {
    this.name = s;
    this.recordExamples = false;
    this.nExamples = 0;
  }
}

// A function to be called when the model has been loaded
function modelReady() {
  select('#modelStatus').html('Base Model (MobileNet) loaded!');
}

// A function to be called when the video has loaded
function videoReady() {
  select('#videoStatus').html('Video ready!');
}

// Add the current frame from the video to the classifier
function addExample(label) {
  classifier.addImage(label);
  updateCounts();
}

// Classify the current frame.
function classify() {
  classifier.classify(gotResults);
}

// Update the example count for each label
function updateCounts() {
  for (let i = 0; i < myClassNames.length; i++) {
    myClasses[i].exampleCount.html(myClasses[i].name + " examples: " + myClasses[i].nExamples || 0);
  }
}

// A util function to create UI buttons
function setupButtons() {
  //Linebreak
  linebreak = createDiv('');

  for (let i = 0; i < myClassNames.length; i++) {
    //Buttons for recording new examples
    myClasses[i].button = createButton('Add Examples to Class ' + myClasses[i].name)
      .mousePressed(() => myClasses[i].recordExamples = true)
      .mouseReleased(() => myClasses[i].recordExamples = false);

    myClasses[i].exampleCount = createP(myClasses[i].name + ' examples');

    //Linebreak
    linebreak = createDiv('');
  }


  // Train Button
  train = select('#train');
  train.mousePressed(function() {
    classifier.train(function(lossValue) {
      if (lossValue) {
        loss = lossValue;
        select('#loss').html('Loss: ' + loss);
      } else {
        select('#loss').html('Done Training! Final Loss: ' + loss);
      }
    });
  });

  // Predict Button
  buttonPredict = select('#buttonPredict');
  buttonPredict.mousePressed(classify);


  // Save model
  saveBtn = select('#save');
  saveBtn.mousePressed(function() {
    classifier.save();
  });

  // Load model
  loadBtn = select('#load');
  loadBtn.changed(function() {
    classifier.load(loadBtn.elt.files, function() {
      select('#modelStatus').html('Custom Model Loaded!');
    });
  });
}

// Show the results
function gotResults(err, result) {
  // Display any error
  if (err) {
    console.error(err);
  }
  select('#result').html(result[0].label);
  select('#confidence').html(nf(result[0].confidence, 0, 2));

  previousResult = classificationResult;
  classificationResult = result[0].label;
  confidence = result[0].confidence;
  console.log(confidence);

  classify();
}
