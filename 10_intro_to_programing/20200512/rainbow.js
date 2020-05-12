const colorArray = [
  'red',
  'orange',
  'yellow',
  'lightgreen',
  'green',
  'skyblue',
  'purple'
];

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);

  noStroke();
  for(let i = 0; i < 7; i++) {
    // fill(255*i,200*i,100*i);
    // if(i===0) {
    //   color = 'red';
    // } else if(i===1) {
    //   color = 'blue'
    // };
    fill(colorArray[i]);
    circle(width / 2, height / 2, width - i * 60);
  }
}
