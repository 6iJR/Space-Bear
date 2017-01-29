var SpaceBear = SpaceBear || {};

var content = [
    "“Hello Im Desmond. Its getting pretty hot on earth and the Polar ice caps are melting.",
    "",
    "Theres not much room left for a polarbear on Earth. Thats why I decided to look for a",
    "",
    "new home planet. Maybe something colder would be nice, you know. It would be nice if",
    "",
    "you could help me. Lets do this for me and my family. Help me to reach the fuel at the",
    "",
<<<<<<< HEAD
    "end of the planets I travel to. Bring me and my family to the planet neptune and we",
=======
    "end of the planets I travel to. Bring me and my family to the planet neptun and we",
>>>>>>> 5a007831159a41d2b46f3efaa7df2d17d525b54e
    "",
    "can live in peace and harmony together.",
    "",
    "",
    "", 
    "Thanks, dear friend!",
    "",
    "",
    "", 
    "",
    "",
    "", 
];

<<<<<<< HEAD

=======
>>>>>>> 5a007831159a41d2b46f3efaa7df2d17d525b54e
var line = [];

var wordIndex = 0;
var lineIndex = 0;

var wordDelay = 200;
<<<<<<< HEAD
var lineDelay = 200;
=======
var lineDelay = 400;
>>>>>>> 5a007831159a41d2b46f3efaa7df2d17d525b54e

// MAIN MENU STATE //
SpaceBear.menuState = function(){};

SpaceBear.menuState.prototype = {
  create: function() {
  	if (!SpaceBear.currentTrack) {
      var trackKey = 'playsound';
      SpaceBear.currentTrack = this.game.add.audio(trackKey);
      SpaceBear.currentTrack.volume -= .85;
      SpaceBear.currentTrack.loopFull();
    }
<<<<<<< HEAD
    this.startscreen = this.game.add.sprite(0, 0, 'startscreen');
    this.startscreen.width = this.game.width;
    this.startscreen.height = this.game.height;
=======

  	this.text = this.game.add.bitmapText(this.game.world.centerX, this.game.world.centerY -200, 'carrier_command',0,10);
  	

    this.nextLine();
    this.text.anchor.setTo(0.5, 0.5);
 
>>>>>>> 5a007831159a41d2b46f3efaa7df2d17d525b54e

  	this.text = this.game.add.bitmapText(this.game.world.centerX, this.game.world.centerY -200, 'carrier_command',0,10);
  	

<<<<<<< HEAD
    this.nextLine();
    this.text.anchor.setTo(0.5, 0.5);
 

=======
>>>>>>> 5a007831159a41d2b46f3efaa7df2d17d525b54e
  
    // start button
    var startKey = this.game.input.keyboard.addKey(Phaser.Keyboard.X);
    startKey.onDown.add(function() {
    	if (this.starting) {
        	return;
     	}
     	this.starting = true;

      	// after 1.5 sec, transition to next state
      	this.game.time.events.add(700, function() {
        	this.game.camera.fade(0x000000, 250);
        	SpaceBear.currentTrack = null;
        	SpaceBear.newLevel = true;

        	// change start level for tests
        	SpaceBear.level = '1';


        	// fade into level
        	this.game.camera.onFadeComplete.addOnce(function() {
          		this.starting = false;
          		this.game.state.start('play');
	        }, this);
	    }, this);
	}, this);
},};


SpaceBear.menuState.prototype.nextLine = function() {
    if (lineIndex === content.length)
    {
        this.titleText = this.game.add.bitmapText(this.game.world.centerX, this.game.world.centerY, '04b', 'SPACE BEAR', 32);
    	this.titleText.anchor.setTo(0.5, 0.5);

    	this.startText = this.game.add.bitmapText(this.game.world.centerX, this.game.height - 150, '04b', 'PRESS \'X\' TO START', 12);
    	this.startText.anchor.setTo(0.5, 0.5);
        return;
    }

    //  Split the current line
    line = content[lineIndex].split(' ');

    //  reset for first word of a line
    wordIndex = 0;

    //  call next word til line ends
    this.game.time.events.repeat(wordDelay, line.length, this.nextWord, this);

    //  Advance to the next line
    lineIndex++;

}

SpaceBear.menuState.prototype.nextWord = function() {

    //  Add the next word onto the text string, followed by a space
    this.text.text = this.text.text.concat(line[wordIndex] + " ");

    //  Advance the word index to the next word in the line
    wordIndex++;

    //  Last word?
    if (wordIndex === line.length)
    {
        //  Add a carriage return
        this.text.text = this.text.text.concat("\n");

        //  Get the next line after the lineDelay amount of ms has elapsed
        this.game.time.events.add(lineDelay, this.nextLine, this);
    }
}

<<<<<<< HEAD
 
=======
      }
      this.starting = true;

      // after 1.5 sec, transition to next state
      this.game.time.events.add(700, function() {
        this.game.camera.fade(0x000000, 250);
        SpaceBear.currentTrack = null;
        SpaceBear.newLevel = true;

        // start level for tests
        SpaceBear.level = '5';


        // fade into level
        this.game.camera.onFadeComplete.addOnce(function() {
          this.starting = false;
          this.game.state.start('play');
        }, this);
      }, this);
    }, this);
  },

>>>>>>> 5a007831159a41d2b46f3efaa7df2d17d525b54e
