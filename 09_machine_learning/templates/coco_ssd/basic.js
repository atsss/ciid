// https://editor.p5js.org/atsss/sketches/Mf-6FgW7P

let video;
let detector;
let detections;

function setup() {
  createCanvas(480, 360);

  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  detector = ml5.objectDetector('cocossd', modelReady)
}


function modelReady() {
  console.log('model loaded')
  detect();
}

function detect() {
  detector.detect(video, gotResults);
}

function gotResults(err, results) {
  if (err) {
    console.log(err);
    return
  }
  detections = results;
  detect();
}

function draw() {
  image(video, 0, 0, width, height);

  if (detections) {
    detections.forEach(detection => {
      noStroke();
      fill(255);
      text(detection.label, detection.x + 4, detection.y + 10)

      noFill();
      strokeWeight(3);
      stroke(0, 255, 0);
      rect(detection.x, detection.y, detection.width, detection.height);
    })
  }
}
