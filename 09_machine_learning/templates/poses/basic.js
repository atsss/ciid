// https://editor.p5js.org/atsss/sketches/QNNlSZ_19

// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
PoseNet example using p5.js

Available parts are:
0   nose
1	leftEye
2	rightEye
3	leftEar
4	rightEar
5	leftShoulder
6	rightShoulder
7	leftElbow
8	rightElbow
9	leftWrist
10	rightWrist
11	leftHip
12	rightHip
13	leftKnee
14	rightKnee
15	leftAnkle
16	rightAnkle
=== */

let video;
let poseNet;
let poses = [];
let noseImage;
let leftEyeImage;
let rightEyeImage;

function preload() {
  noseImage = loadImage("emojiNose.png");
  leftEyeImage = loadImage("emojiEye.png");
  rightEyeImage = loadImage("emojiEye2.png");
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function(results) {
    poses = results;
  });
  // Hide the video element, and just show the canvas
  video.hide();

}

function modelReady() {
  select('#status').html('Model Loaded');
}

function mousePressed(){
  console.log(JSON.stringify(poses[0].pose.keypoints[0].part))
}

function draw() {
  imageMode(CORNER);
  image(video, 0, 0, width, height);

  imageMode(CENTER);

  if (poses.length > 0) {
    let pose = poses[0].pose;

    let nose = pose['nose'];
    fill(255,0,0);
    ellipse(nose.x, nose.y, 50)
    //image(noseImage, nose.x, nose.y, 60, 60);

    //let rightEye = pose['rightEye'];
    //image(rightEyeImage, rightEye.x, rightEye.y, 60, 60);

    //let leftEye = pose['leftEye'];
    //image(leftEyeImage, leftEye.x, leftEye.y, 60, 60);

  }
}
