
  /**
   * Experiment 5:P Physical to Web
   * 
   * An Arduino Nano is publishing the value of a potiometer from between 0-1024. 
   * 
   * This sketch subscribes to the channel the nano is publishing to, and receives that value.
   * 
   * The value is mapped to the height of the screen. Every in coming value is drawn on the screen as a vertical and creates graph. 
   * 
   * **/
  
  
  var dataServer;
  var pubKey = 'Your Publish Key Here';
  var subKey = 'Your Subscribe Key HEre';
  var channelName = "nano-to-web";

  var inData; // data received from nano
  var xPos = 0;  

function setup() {

    createCanvas(windowWidth, windowHeight);

    dataServer = new PubNub({ // establish a PubNub Connection
        publish_key   : pubKey,  //get these from the pubnub account online
        subscribe_key : subKey,  
        ssl: true  //enables a secure connection. This option has to be used if using the OCAD webspace
      });

  dataServer.addListener({ message: readIncoming }); // Listen for incoming messages on PubNub
  dataServer.subscribe({channels: [channelName]}); // Subscribe to the channel declared at the top of the code
}

function draw() {

    graphData(inData); // call graph data & pass along the data received from PubNub

  }
  
function graphData(newData) {

// map the range of the input to the window height:
    var yPos = map(newData, 0, 1024, 0, height);

    // draw the line in a pretty color:
    stroke(0xA8, 0xD9, 0xA7);

    line(xPos, height, xPos, height - yPos);
    // at the edge of the screen, go back to the beginning:

    if (xPos >= width) {
        xPos = 0;
        // clear the screen by resetting the background:
        background(0x08, 0x16, 0x40);
    } else {
        // increment the horizontal position for the next reading:
        xPos++;
    }
}

function readIncoming(inMessage){                             
      
    // simple error check to match the incoming to the channelName
    if(inMessage.channel == channelName){
        console.log(inMessage.message); // print out the incoming value

        inData = inMessage.message.value; // assign the value of the potiometer to the inData

        return inData;
    }
    print.length()
}