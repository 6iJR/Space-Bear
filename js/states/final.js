var SpaceBear = SpaceBear || {};

<<<<<<< HEAD
var finalText = [
    "WOW! You really did it! Insane! Thank you very much, dear Friend!",
    "",
    "Thank you so much! And you only killed me "+ SpaceBear.deaths +" times.",
    "",
    "I mean.. you know.. polarbears just have " + (SpaceBear.deaths+1) +" lives! I think u knew that.",
=======

var finalText = [
    "WOW! You really did it! Insane! Thank you very much, dear Friend!",
    "",
    "Thank you so much!",
    "",
    "I mean.. you know.. If you would kill me once more I would be dead forever.",
    "",
    "But I think u knew that.",
>>>>>>> physics
    "",
    "Finally we can live in a polarbear friendly environment! Well there is ",
    "",
    "no air in here and we have no food.. well ****. This idea was stupid.",
    "",
    "I think we have to travel back... But now we can do this by ourselves.",
    "",
    "",
    "", 
    "Thank you anyways.",
    "",
    "",
    "", 
    "",
    "",
    "****.", 
];

var lineFin = [];

var wordIndexFin = 0;
var lineIndexFin = 0;

var wordDelayFin = 200;
var lineDelayFin = 300;

// final STATE //
SpaceBear.finalState = function(){};

SpaceBear.finalState.prototype = {
  create: function() {
    //stopping current Track
    if (SpaceBear.currentTrack) {
        SpaceBear.currentTrack.stop();
    }
    SpaceBear.currentTrack = null;

    //staring new Track
    if (!SpaceBear.currentTrack) {
      var trackKey = 'win';
      SpaceBear.currentTrack = this.game.add.audio(trackKey);
      SpaceBear.currentTrack.volume -= .85;
      SpaceBear.currentTrack.loopFull();
    }

    //tilemap
    this.map = this.game.add.tilemap('finale');
    this.map.addTilesetImage('neptunLevelFloor', 'neptuntiles');

    this.stageLayer = this.map.createLayer('stageLayer');

    this.stageLayer.resizeWorld();

    this.map.setCollisionBetween(1, 2000, true, 'stageLayer');

    this.background = this.game.add.sprite(0, 0, 'background');
    this.background.width = this.game.width;
    this.background.height = this.game.height;
    this.background.fixedToCamera = true;



    this.map = this.game.add.tilemap('finale');
    this.map.addTilesetImage('neptunLevelFloor', 'neptuntiles');

    this.stageLayer = this.map.createLayer('stageLayer');

    this.stageLayer.resizeWorld();

    this.map.setCollisionBetween(1, 2000, true, 'stageLayer');

    this.finalscreen = this.game.add.sprite(0, 150, 'finalscreen');
    this.finalscreen.width = this.game.width;
    this.finalscreen.height = this.game.height;

  	this.finalText = this.game.add.bitmapText(this.game.world.centerX, this.game.world.centerY -300, 'carrier_command',0,10);
<<<<<<< HEAD
  	

=======
>>>>>>> physics
    this.nextLineFin();
    this.finalText.anchor.setTo(0.5, 0.5);

  
},};


SpaceBear.finalState.prototype.nextLineFin = function() {
    if (lineIndexFin === finalText.length)
    {
        this.titleText = this.game.add.bitmapText(this.game.world.centerX, this.game.world.centerY-100, '04b', 'VICTORY', 45);
    	this.titleText.anchor.setTo(0.5, 0.5);
<<<<<<< HEAD
=======
        this.deathText = this.game.add.bitmapText(this.game.world.centerX, this.game.world.centerY, 'carrier_command', 'Total deaths:' + SpaceBear.deaths +'', 15);
        this.deathText.anchor.setTo(0.5, 0.5);
>>>>>>> physics
        return;
    }

    lineFin = finalText[lineIndexFin].split(' ');

    wordIndexFin = 0;

    this.game.time.events.repeat(wordDelayFin, lineFin.length, this.nextWordFin, this);

    lineIndexFin++;

}

SpaceBear.finalState.prototype.nextWordFin = function() {

    this.finalText.text = this.finalText.text.concat(lineFin[wordIndexFin] + " ");

    wordIndexFin++;

    if (wordIndexFin === lineFin.length)
    {
        this.finalText.text = this.finalText.text.concat("\n");

        this.game.time.events.add(lineDelayFin, this.nextLineFin, this);
    }
}

<<<<<<< HEAD
=======
SpaceBear.finalState.prototype.maxdeaths = function() {
    var dead = 0;
    return dead;
}


>>>>>>> physics
 