
  /**
   * 
   * Web to Web example using Publish and Subscribe PubNub features
   * 
   * Everytime a mouse is clicked by a user, a message with the x & y position of the cursor is published.
   * 
   * A circle is drawn at that x & y location and filled with a random RGB colour. 
   * 
   * **/
  
  var dataServer;
  var pubKey = 'pub-c-e2f7cb71-71c2-49de-9213-6103856e911d';
  var subKey = 'sub-c-04038704-bfb7-11ea-9208-3200fd38a8e3';
  var channelName = "web-circles";

  let x;
  let y;
  let r;
  let g;
  let b;

function setup() {

    createCanvas(windowWidth, windowHeight);

    dataServer = new PubNub({ // establish a connection to PubNub
        publish_key   : pubKey,  //get these from the pubnub account online
        subscribe_key : subKey,  
        ssl: true  //enables a secure connection. This option has to be used if using the OCAD webspace
      });

  dataServer.addListener({ message: readIncoming }) // listen for incoming messages
  dataServer.subscribe({channels: [channelName]}); // subscribe to the channel delared at the beginning

}

function draw() {

}

function readIncoming(inMessage){
    
    if(inMessage.channel == channelName){

        console.log(inMessage.message); // print out the incoming message

        ellipse(inMessage.message.xPos, inMessage.message.yPos, 100,100); // draw a circle with the cursor position of where the sender clicked

        r = random(255); 
        g = random(255); 
        b = random(255);
        // fill the circle a random RGB colour
        fill(r,g,b);
    }
}

function mouseClicked() { // on mouse click publish the x & y position of your cursor 
    x = mouseX;
    y = mouseY;
    sendTheMessage(x,y); // send to PubNub
}


function sendTheMessage(x,y) {

// Send Data to the server to draw it in all other canvases
dataServer.publish({
    channel: channelName,
    message: 
        {   sender: 'Your name', 
            xPos: x,
            yPos: y
        }
    });
}
