// https://editor.p5js.org/mrbombmusic/sketches/B1gG3goAQ

let dataServer;
let pubKey = 'pub-c-b5bebc3e-454d-4a9e-b2e6-hogehoge';
let subKey = 'sub-c-d66f402e-f2d5-11ea-ae2d-fugafuga';
let channelName = "crosswalk";
let inData = { a: 0, s: 0, d: 0, f:0, volume: 0 }; // data received from nano

var space = 70;
var rSide = [];
var black = [];
var mid = [];
var lSide = [];
var osc = [];
var envo = [];

var rKee = ['A', null, null, 'F'];
var midKee = [null, 'S', null, null];
var lKee = [null, null, 'D', null];

function setup() {
  dataServer = new PubNub({ // establish a PubNub Connection
    publish_key   : pubKey,  //get these from the pubnub account online
    subscribe_key : subKey,
    ssl: true  //enables a secure connection. This option has to be used if using the OCAD webspace
  });

  dataServer.addListener({ message: readIncoming }); // Listen for incoming messages on PubNub
  dataServer.subscribe({channels: [channelName]}); // Subscribe to the channel declared at the top of the code

  createCanvas(space * 4, 500);

  for (var j = 0; j < 4; j++) {
    envo.push(new p5.Env());
    envo[j].setADSR(0.1, 0.5, 1, 0.1);
    envo[j].setRange(1, 0);
    osc.push(new p5.Oscillator());
    osc[j].amp(envo[j]);
  }

  for (var i = 0; i < 4; i++) {
    rSide.push(new rSideKey(i, space, rKee[i]));
    mid.push(new MidKey(i, space, midKee[i]));
    lSide.push(new lSideKey(i, space, lKee[i]));
  }
}


function draw() {
  volume = map(inData.volume, 10, 100, 1, 0);
  masterVolume(volume);

  makeSound(inData.a, inData.s, inData.d, inData.f);

  //background(255);
  for (var i = 0; i < rSide.length; i++) {
    if (i === 0 || i === 3 || i === 7) {
      rSide[i].display();
    }
    // if ((i !== 2) && (i !== 6) && (i !== 9) && (i !== 10)) {
    //   black[i].display();
    // }
    if (i === 1 || i === 4 || i === 5 || i === 8) {
      mid[i].display();
    }
    if (i === 2 || i === 6 || i === 9) {
      lSide[i].display();
    }
  }
}

function readIncoming(inMessage){
  // simple error check to match the incoming to the channelName
  if(inMessage.channel == channelName){
    console.log(inMessage.message); // print out the incoming value

    inData = inMessage.message; // assign the value of the potiometer to the inData

    return inData;
  }
  print.length()
}


function makeSound(a, s, d, f) {
  var root = 60;
  if (a === 1) {
    rSide[0].red();
    osc[0].start();
    osc[0].freq(midiToFreq(root));
    envo[0].play();
    rSide[0].white();
  } else if (s === 1) {
    mid[1].red();
    osc[1].start();
    osc[1].freq(midiToFreq(root + 2));
    envo[1].play();
    mid[1].white();
  }  else if (d === 1) {
    lSide[2].red();
    osc[2].start();
    osc[2].freq(midiToFreq(root + 4));
    envo[2].play();
    lSide[2].white();
  } else if (f === 1) {
    rSide[3].red();
    osc[3].start();
    osc[3].freq(midiToFreq(root + 5));
    envo[3].play();
    rSide[3].white();
  }
}

function rSideKey(start, space, kee) {
  this.x = start * space;
  this.keyWidth = space;
  this.col = color(255);
  this.kee = kee;
  this.size = space/3;

  this.display = function() {
    fill(this.col);
    beginShape();
    vertex(this.x, 0);
    vertex(this.x, height);
    vertex(this.x + this.keyWidth, height);
    vertex(this.x + this.keyWidth, height * 0.6)
    vertex(this.x + (this.keyWidth * 0.667), height * 0.6)
    vertex(this.x + (this.keyWidth * 0.667), 0);
    endShape();

    fill(0, 0, 230);
    textSize(this.size);
    text(this.kee, this.x + (this.keyWidth *0.4), height - this.size);
  }

  this.red = function() {
    this.col = color(255, 0, 0);
  }

  this.white = function() {
    this.col = color(255);
  }
}

function MidKey(start, space, kee) {
  this.x = start * space;
  this.keyWidth = space;
  this.col = color(255);
  this.kee = kee;
  this.size = space/3;

  this.display = function() {
    fill(this.col);
    beginShape();
    vertex(this.x + (this.keyWidth * 0.333), 0);
    vertex(this.x + (this.keyWidth * 0.333), height * 0.6);
    vertex(this.x, height * 0.6);
    vertex(this.x, height);
    vertex(this.x + this.keyWidth, height);
    vertex(this.x + this.keyWidth, height * 0.6);
    vertex(this.x + (this.keyWidth * 0.667), height * 0.6);
    vertex(this.x + (this.keyWidth * 0.667), 0);
    endShape();

    fill(0, 0, 230);
    textSize(this.size);
    text(this.kee, this.x + (this.keyWidth *0.4), height - this.size);
  }

   this.red = function() {
    this.col = color(255, 0, 0);
  }

  this.white = function() {
    this.col = color(255);
  }
}

function lSideKey(start, space, kee) {
  this.x = start * space;
  this.keyWidth = space;
  this.col = color(255);
  this.kee = kee;
  this.size = space/3;

  this.display = function() {
    fill(this.col);
    beginShape();
    vertex(this.x + (this.keyWidth * 0.333), 0);
    vertex(this.x + (this.keyWidth * 0.333), height * 0.6);
    vertex(this.x, height * 0.6);
    vertex(this.x, height);
    vertex(this.x + this.keyWidth, height);
    vertex(this.x + this.keyWidth, 0);
    endShape();

    fill(0, 0, 230);
    textSize(this.size);
    text(this.kee, this.x + (this.keyWidth *0.4), height - this.size);
  }

   this.red = function() {
    this.col = color(255, 0, 0);
  }

  this.white = function() {
    this.col = color(255);
  }
}
