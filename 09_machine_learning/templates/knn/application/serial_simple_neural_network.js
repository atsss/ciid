// https://editor.p5js.org/atsss/sketches/HFHc8Uk4L

//Needs an Arduino and p5.serial to work
//Working, now redo this with 2 input values

// The neural network is the brain
let brain;

// Declare a "SerialPort" object
let serial;
let latestData = "waiting for data";  // you'll use this to write incoming data to the canvas

let sensorValueInt = 0;

function setup() {
  let canvas = createCanvas(256, 256);
  // Only when clicking on the canvas
  //canvas.mousePressed(addData);

  // Create the model
  const options = {
    inputs: ['sensorValue'],
    outputs: ['label'], // TODO: support ['label']
    debug: true,
    task: 'classification'
  }
  brain = ml5.neuralNetwork(options);

  // Train Model button
  select('#train').mousePressed(trainModel);

  background(0);

  // Instantiate our SerialPort object
  serial = new p5.SerialPort();

  // Get a list the ports available
  // You should have a callback defined to see the results
  serial.list();

  // Assuming our Arduino is connected, let's open the connection to it
  // Change this to the name of your arduino's serial port
  serial.open("/dev/tty.usbmodem14101");

  // Here are the callbacks that you can register
  // When we connect to the underlying server
  serial.on('connected', serverConnected);

  // When we get a list of serial ports that are available
  serial.on('list', gotList);
  // OR
  //serial.onList(gotList);

  // When we some data from the serial port
  serial.on('data', gotData);
  // OR
  //serial.onData(gotData);

  // When or if we get an error
  serial.on('error', gotError);
  // OR
  //serial.onError(gotError);

  // When our serial port is opened and ready for read/write
  serial.on('open', gotOpen);
  // OR
  //serial.onOpen(gotOpen);

  serial.on('close', gotClose);

  // Callback to get the raw data, as it comes in for handling yourself
  //serial.on('rawdata', gotRawData);
  // OR
  //serial.onRawData(gotRawData);

}

// Add a data record
function addData() {
  // Get frequency
  let label = select('#label').value();
  // Add data
  brain.addData({sensorValue:sensorValueInt}, {label});
}

// Train the model
function trainModel() {
  // ml5 will normalize data to a range between 0 and 1 for you.
  brain.normalizeData();
  // Train the model
  // Epochs: one cycle through all the training data
  brain.train({ epochs: 100 }, finishedTraining);
}

// When the model is trained
function finishedTraining() {
  brain.classify([sensorValueInt], gotResults);
}

// Got a result
function gotResults(error, results) {
  if (error) {
    console.error(error);
    return;
  }

  // Show classification
  select('#classification').html(results[0].label);

  // Predict again
  brain.classify([sensorValueInt], gotResults);
}

function serverConnected() {
  print("Connected to Server");
}

// Got the list of ports
function gotList(thelist) {
  print("List of Serial Ports:");
  // theList is an array of their names
  for (let i = 0; i < thelist.length; i++) {
    // Display in the console
    print(i + " " + thelist[i]);
  }
}

// Connected to our serial device
function gotOpen() {
  print("Serial Port is Open");
}

function gotClose(){
    print("Serial Port is Closed");
    latestData = "Serial Port is Closed";
}

//Oh, here is an error, let's log it
function gotError(theerror) {
  print(theerror);
}

// There is data available to work with from the serial port
function gotData() {
  let currentString = serial.readLine();  // read the incoming string
  trim(currentString);                    // remove any trailing whitespace
  if (!currentString) return;             // if the string is empty, do no more
  console.log(currentString);             // print the string
  latestData = currentString;            // save it for the draw method
  sensorValueInt = int(latestData);
}

// We got raw from the serial port
function gotRawData(thedata) {
  print("gotRawData" + thedata);
}


function draw() {
 if (mouseIsPressed) {
  addData();
  let label = select('#label').value();
  background(0,255,0);
  text("Adding training data for " + label + ": " + sensorValueInt, 10, 50);
 } else {
  background(0);
 }
}
