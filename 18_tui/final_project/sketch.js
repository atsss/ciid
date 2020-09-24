let dataServer;
const pubKey = 'pub-c-b4b683ef-1879-49f9-a476-a527defd00f1';
const subKey = 'sub-c-51100418-f2d5-11ea-afa2-4287c4b9a283';
const channelName = 'upe';
let inData;


function setup() {
  dataServer = new PubNub({ // establish a PubNub Connection
    publish_key   : pubKey,  //get these from the pubnub account online
    subscribe_key : subKey,
    ssl: true  //enables a secure connection. This option has to be used if using the OCAD webspace
  });

  dataServer.addListener({ message: readIncoming }); // Listen for incoming messages on PubNub
  dataServer.subscribe({channels: [channelName]}); // Subscribe to the channel declared at the top of the code

  createCanvas(width, height);
  textSize(70);
}


function draw() {
  background('grey');
}

function readIncoming(inMessage){ // this works because we subscribed to the channel in setup()
  if(inMessage.channel == channelName){
    console.log(inMessage); // print out the incoming messages for troubleshooting
    inData = inMessage.message.value; // assign the value of the potiometer to the inData

    return inData;
  }
}
