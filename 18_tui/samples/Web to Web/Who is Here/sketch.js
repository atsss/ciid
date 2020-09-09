
  /** 
   * 
   * Web to Web example using Publish & Subscribe PubNub features
   * 
   * This sketch draws out the names of all the unique users who have clicked on the webpage. 
   * 
   * Each name is sized according to how many times the user has clicked 
   * (i.e. if the user clicked 10 times, the font size drawn is size 10, clicked 123 times, the font size of that particular name is 123 etc.)
   * 
   * The name is drawn at the x & y position the user first clicked 
   * 
   * All the names are stored in an array, each time a message is received it loops through the array to see if the sender is a unique user.
   * If the user is unique, it is then pushed into the array as an array itself. The nested array holds the value of the x & y position, and the mouse click counter for the user.
   * 
   * **/
  
  var dataServer;
  var pubKey = 'pub-c-e2f7cb71-71c2-49de-9213-6103856e911d';
  var subKey = 'sub-c-04038704-bfb7-11ea-9208-3200fd38a8e3';
  var channelName = "who-is-here";

  let clicks = 0; // variable that counts how many times your click on the webpage
  let senders = []; // array that stores everyone who has sent a message 

function setup() {

    createCanvas(windowWidth, windowHeight);

    dataServer = new PubNub({ // Establish a connection to PubNub
        publish_key   : pubKey,  //get these from the pubnub account online
        subscribe_key : subKey,  
        ssl: true  //enables a secure connection. This option has to be used if using the OCAD webspace
      });

  dataServer.addListener({ message: readIncoming }); // listen for incoming messages
  dataServer.subscribe({channels: [channelName]}); // subscribe to the channel declared at the beginning
}

function draw() {

    background(255);
    
    for (let i = 0; i < senders.length; i++) { // draw all the unique names of the senders, their positions, and size. 
        textSize(senders[i][3]);
        text(senders[i][0], senders[i][1], senders[i][2]);
    }
}

function readIncoming(inMessage){  // on an incoming message
    if(inMessage.channel == channelName){ // if the channel is the channel you are listening to...

        let hasNameAppeared = 0; // is the name of the sender stored in the senders array?

        for (let i = 0; i < senders.length; i++) { // loop through the entire length of the sender array

            if (inMessage.message.sender == senders[i][0]) { // does the name of the sender match the name of anyone in the array?

                senders[i][3] = inMessage.message.clickCount; // if it does, update the click count of that particular sender
                hasNameAppeared++; // increment the value of hasNameAppeared
            }
        }

        if (hasNameAppeared == 0) { // if the name of the sender is not in the array, hasNameAppeared will be equal to 0
            // add the name to the array as an array itself, with the value of its current published x & y position, and click count
            let newVal = [inMessage.message.sender, inMessage.message.x, inMessage.message.y, inMessage.message.clickCount]

            /** 
             * newVal looks like this: 
             * senders [
             *        name1 [102, 510, 58],
             *        name2 [631, 190, 25],
             *        name3 [143, 789, 10]
             * ]
             * **/

            senders.push(newVal); // push this value to the senders array 
        
        }
    }
    return senders; // return senders so that it can be used in the draw loop
}

function mouseClicked() { // on mouse click, send your name, the x & y position of your cursor, and how many times you've clicked
     x = mouseX;
     y = mouseY;
     clicks++; // increment how many times you've clicked on the page
    sendTheMessage(clicks, x , y); // Publish this information to PubNub
}


function sendTheMessage(count, xPos, yPos) {

// Send Data to the server to draw it in all other canvases
dataServer.publish({
    channel: channelName,
    message: 
        {   sender: 'Place Your Name Here!',
            clickCount: count,
            x: xPos,
            y: yPos
        }
    });
}
