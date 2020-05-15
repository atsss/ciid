// https://editor.p5js.org/atsss/sketches/qBFj10lAh

let featureExtractor;
let classifier;
let video;
let loss;
let imagesOfA = 0;
let imagesOfB = 0;
let classificationResult;
let confidence = 0;

let pg;
let lastSnapShot;

let timer = 0;
let showLatestPhoto = false;

let nCurrentClass = 0;
let shutter;

function setup() {
  createCanvas(640, 480);

  pixelDensity(1);

  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  featureExtractor = ml5.featureExtractor('MobileNet', modelReady);

  const options = { numLabels: 2 }; //Specify the number of classes/labels
  classifier = featureExtractor.classification(video, options);

  shutter = loadSound('shutter.wav');

  pg = createGraphics(width, height);

  setupButtons();
}

function draw() {
  background(122);
  image(video, 0, 0);
  if (classificationResult == 'A') {
    nCurrentClass = 0;
  } else if (classificationResult == 'B') {
    nCurrentClass++;
  }

  //Show the last image taken for a short period
  if (showLatestPhoto) {
    image(pg, 0, 0);
  }

  //Flash effect
  if (timer < 5) {
    background(timer * 25 + 130);
  } else if (timer < 8) {
    background(255);
  }

  if (timer > 100) {
    showLatestPhoto = false;
  }
  timer++;

  if (classificationResult == 'B' && nCurrentClass > 50) {
    takePicture();
  }
}


function takePicture() {
  save('myCanvas.jpg');
  shutter.play();
  pg.image(video, 0, 0);
  timer = 0;
  showLatestPhoto = true;
  nCurrentClass = 0;
}


// A function to be called when the model has been loaded
function modelReady() {
  select('#modelStatus').html('Base Model (MobileNet) loaded!');
}

// A function to be called when the video has loaded
function videoReady() {
  select('#videoStatus').html('Video ready!');
}


// Classify the current frame.
function classify() {
  classifier.classify(gotResults);
}

// A util function to create UI buttons
function setupButtons() {
  // When the A button is pressed, add the current frame
  // from the video with a label of "A" to the classifier
  buttonA = select('#ButtonA');
  buttonA.mousePressed(function() {
    classifier.addImage('A');
    select('#amountOfAImages').html(imagesOfA++);
  });

  // When the B button is pressed, add the current frame
  // from the video with a label of "B" to the classifier
  buttonB = select('#ButtonB');
  buttonB.mousePressed(function() {
    classifier.addImage('B');
    select('#amountOfBImages').html(imagesOfB++);
  });

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
    classifier.load(loadBtn.elt.files, function(){
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
  select('#confidence').html(nf(result[0].confidence,0,2));

  classificationResult = result[0].label;
  confidence = result[0].confidence;

  classify();
}
