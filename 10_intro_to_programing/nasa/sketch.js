const nasaApiKey = 'GS6PWQ41ii8SXP7o2Z3NloA7wh6qBmjlggmTdIlv';
let img;

function preload() {
  // img = loadImage('https://apod.nasa.gov/apod/image/2005/waterspout_mole_960.jpg', () => console.log('s'), () => console.log('f'));
  // img = loadImage('https://assets.editor.p5js.org/5eb09289a3c3fe001970f3f7/41f1d0d4-515e-4091-9a02-4e49a54a8e2f.png');
  img = loadImage('https://doraeiga.com/eximages/2019/images_new/main_dora_sp.png');
}

async function setup() {
  createCanvas(400, 400);

  // let url = await getImage();
  // console.log(url);
  // img = loadImage(url);
  // console.log(img);
  // console.log('aaaaa');
  // img = loadImage('https://apod.nasa.gov/apod/image/2005/waterspout_mole_960.jpg ');
  image(img, 0, 0, width, height);
}

function draw() {
  // background(220);
  // image(img, 0, 0, 100, 100);
}

async function getImage() {
  const url = `https://api.nasa.gov/planetary/apod?hd=true&date=2020-05-17&api_key=${nasaApiKey}`;
  let response = await fetch(url);
  let image = await response.json();

  return image.url;
}
