// https://editor.p5js.org/atsss/sketches/N3dWNDSzK

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
let confidence;

let myClasses = [];
let myClassNames = ["Nobody", "Andreas", "Bottle", "Hi!"]; //Add as many classes as you wish

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
  if (classificationResult == myClassNames[0]) {
    //Do something
    //rect(100, 100, 100, 100);
  } else if (classificationResult == myClassNames[1]) {
    //Do something else
    //ellipse(100, 100, 100, 100);
  } else {
    //Do something third
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

  classificationResult = result[0].label;
  confidence = result[0].confidence;
  console.log(confidence);

  classify();
}
