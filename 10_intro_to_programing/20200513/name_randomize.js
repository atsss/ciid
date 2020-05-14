// https://editor.p5js.org/atsss/sketches/4sfI-7kzM

var names = ["Annelie", "Matt", "Paula", "Peter", "Josh"];

function setup() {
  createCanvas(400, 400);
  textSize(width / 10);
  textAlign(CENTER, CENTER);

  background("white");
  text("Click to start!", 200, 200);
}

function draw() {
}

function mouseClicked() {
  var randomPos = floor(random(names.length));
  var name = names[randomPos];

  background("white");
  text(name, width/2, width/2);
  names.splice(randomPos,1);
}
