let dataServer;
let pubKey = 'pub-c-a99a5926-fa29-4ab5-860d-dadf76824c4d';
let subKey = 'sub-c-08106330-f865-11ea-afa2-4287c4b9a283';
let channelName = "memories";
let weatherName = "weather";
let isPressed = false;
var msg = 0;

var library;
var streetMusic;
var streetAmbient;
var knoking;

//VISITORS
let visitors = 0;

//TEMPERATURE
// API Key c7b87de3a8ea3acdad615412688392cd
let city;
let temperature = 20;

//variables for conditionals
var myColor = "RED";

function preload() {
  // initialize sound
  library = loadSound('sounds/interior.mp3');
  streetMusic = loadSound('sounds/street_music.mp3');
  knoking = loadSound('sounds/knokingFX.mp3');
}

function setup() {
  createCanvas(400, 400);
  city = 'San Jose, Costa Rica';
  //PUBNUB SETUP
   dataServer = new PubNub({ // establish a PubNub Connection
    publish_key   : pubKey,  //get these from the pubnub account online
    subscribe_key : subKey,
    ssl: true  //enables a secure connection. This option has to be used if using the OCAD webspace
  });

  dataServer.addListener({ message: readIncoming }); // Listen for incoming messages on PubNub
  dataServer.subscribe({channels: [channelName]}); // Subscribe to the channel declared at the top of   the code
}

function draw() {
  background(220);
  visitorsDisplay();
  fill(myColor);
  noStroke();
  ellipse(width/2,height/2,200);
}

//READER FUCTIONS
function readIncoming(inMessage){
  // simple error check to match the incoming to the channelName
  if(inMessage.channel == channelName){
    console.log(inMessage.message); // print out the incoming value

    isPressed = true;
    myColor = "BLUE";
    return isPressed;
  }
  print.length()
}
//TEMPERATURE
function loadTemp() {
  const url = "https://api.openweathermap.org/data/2.5/weather?q=San Jose&appid=c7b87de3a8ea3acdad615412688392cd&units=metric"
  httpGet(url, 'json', false, drawWeather);
}

function drawWeather(data) {
  console.log(data.main.temp);
  temperature = data.main.temp;
  //setTimeout(loadIt, 5000);
}

function visitorsDisplay(){
  push();
  fill(0);
  textSize(15);
  textAlign(CENTER);
  text('Visitors of the Day: '+visitors, width/2, 30);
  text('Temperature: '+temperature+'°', width/2, 50);
  pop();
}

function knokingFX(){
  loadTemp();
  //knoking.play();
  visitors++;
}

function mousePressed(){
  loadTemp();
}

//interior.mp3
//street_ambient.mp3
//street_music.mp3




