/**
 * Experiment 5: Web to Physical 
 * 
 * Web to Physical Computing example using the Web page to publish JSON to an Arduino Nano. 
 * 
 * When the user clicks on the page, the value of 0 or 255 is published. 
 * 
 * The Arduino receives the value. If the value is 255, the LED turns on. If the value is 0, the LED turns off
 * 
 * **/
var dataServer;
var pubKey = 'Your Publish Key Goes Here';
var subKey = 'You Subscribe Key Goes Here';
var channelName = "web-to-nano";

let ledPin = 0;

function setup() {

    createCanvas(windowWidth, windowHeight);

    dataServer = new PubNub({ // this Establishes a connection to PubNub
        publish_key   : pubKey,  //get these from the pubnub account online
        subscribe_key : subKey,  
        ssl: true  //enables a secure connection. This option has to be used if using the OCAD webspace
      });

  dataServer.addListener({ message: readIncoming }) // listen for incoming messages 
  dataServer.subscribe({channels: [channelName]}); // declare what channel you are listening to (this is delcared at the top of the code)

  textAlign(CENTER); // align all text in the center 

}

function draw() {

    background(255); // white background
    textSize(70); // make the text for "ON" and "OFF" size 70

    if (ledPin == 255) { // if the LED is on
        fill(255, 255, 0); // fill the rectangle yellow
        rect(windowWidth/2 - 100 ,windowHeight/2 - 75, 200, 100);
        fill(0); // make the ON text black
        text("ON", windowWidth/2, windowHeight/2); // Text wraps within text box

    } else { // if the LED is off
        fill(0); // fill the recatangle black
        rect(windowWidth/2 - 100 ,windowHeight/2 - 75, 200, 100);
        fill(255); // make the OFF text white
        text("OFF", windowWidth/2, windowHeight/2); // Text wraps within text box
    }

    fill(0); // Make the description text black
    textSize(14); // Make the description text size 14
    text("Click the box to toggle the LED on the Arduino Nano", windowWidth/2 - 100, windowHeight/2 + 50, 200, 100);
}

function readIncoming(inMessage){ // this works because we subscribed to the channel in setup()
    if(inMessage.channel == channelName){
        console.log(inMessage); // print out the incoming messages for troubleshooting
    }
}
function mouseClicked() { // when you click your mouse change the value of the LEDpin

    if (ledPin === 0) { // if the LED is 0 when you click, change it to 255
        ledPin = 255;
    } else { // if the LED is 255 when you click, change it to 0
        ledPin = 0;
    }

    console.log("Mouse clicked");
    
    sendTheMessage(ledPin); // Publish to PubNub
    return ledPin; // return ledPin value to use in draw loop 
}


function sendTheMessage(value) { // value == ledPin

// Send Data to the server to draw it in all other canvases
dataServer.publish({ // publish to the delcared channel
    channel: channelName,
    message: 
        {   sender: 'Your Name',
            messageText: value 
        }
    });
}
