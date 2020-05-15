// https://editor.p5js.org/atsss/sketches/KBDuhmF6B

if (annyang) {
  annyang.addCallback('start', function() {
    console.log('Speech Recognition engine starts listening');
  });

  annyang.addCallback('error', function() {
    console.log('There was an error!');
  });

  annyang.addCallback('result', function(whatWasHeard) {
    //document.getElementById("voiceToText").innerHTML = whatWasHeard[0];
    console.log(whatWasHeard[0]);
  });

  // Let's define our first command. First the text we expect, and then the function it should call
  var commands = {

    // Match a string 100%
    'refresh': refresh,

    // Define part of a command as optional
    'hello (there)': hello,

    // A named variable is a one word variable, that can fit anywhere in your command.
    // e.g. saying "show blue circle" will call showCircle('blue');
    'show :color circle': showCircle,

    // Capture anything after a splat (*) and pass it to the function.
    'write *text': showSomeText,

    // Use regular expressions for more flexibility
    ':praise': {
      'regexp': /^(?:.*)(good job|nice work)(?:.*)$/,
      'callback': praise
    },

  };

  // Add our commands to annyang
  annyang.addCommands(commands);

  // Start listening. You can call this here, or attach this call to an event, button, etc.
  annyang.start();

  // OPTIONAL: activate debug mode for detailed logging in the console
  annyang.debug();
}

function setup() {
  createCanvas(400, 400);
  textAlign(CENTER);
  textSize(16);
}

function draw() {
  //background(220);
}

function refresh() {
  background(random(150, 240));
}

function hello() {
  text("hello", random(50, 350), random(50, 350));
}

function showSomeText(myString) {
  background(220);
  text(myString, width / 2, height / 2);
}

function praise() {
  background(50, 180, 50);
  text("THANK YOU!", width / 2, height / 2);
}


function showCircle(col) {
  background(220);
  if (col == "red") {
    fill(255, 0, 0);
  } else if (col == "green") {
    fill(0, 255, 0);
  } else if (col == "blue") {
    fill(0, 0, 255);
  } else {
    fill(255);
  }
  ellipse(width / 2, height / 2, 100);
}
