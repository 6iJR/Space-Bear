var SpaceBear = SpaceBear || {};


var finalText = [
    "WOW! You really did it! Insane! Thank you very much, dear Friend!",
    "",
    "Thank you so much!",
    "",
    "I mean.. you know.. If you would kill me once more I would be dead forever.",
    "",
    "But I think you knew that.",
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
        if(SpaceBear.muteBool === 0){
            SpaceBear.currentTrack.loopFull();
        }
    }


    this.background = this.game.add.sprite(0, 0, 'background');
    this.background.width = this.game.width;
    this.background.height = this.game.height;
    this.background.fixedToCamera = true;


    this.map = this.game.add.tilemap('finale');
    this.map.addTilesetImage('neptunLevelFloor', 'neptuntiles');
    this.stageLayer = this.map.createLayer('stageLayer');

    this.map.setCollisionBetween(1, 2000, true, 'stageLayer');

    this.stageLayer.resizeWorld();


    this.finalscreen = this.game.add.sprite(0, 85, 'finalscreen');
    this.finalscreen.width = this.game.width;
    this.finalscreen.height = this.game.height;

  	this.finalText = this.game.add.bitmapText(this.game.world.centerX, this.game.world.centerY-250, 'carrier_command',0,8);
    this.finalText.anchor.setTo(0.5, 0.5);
    this.nextLineFin();
    

  
},};


SpaceBear.finalState.prototype.nextLineFin = function() {
    if (lineIndexFin === finalText.length)
    {
        this.titleText = this.game.add.bitmapText(this.game.world.centerX, this.game.world.centerY-75, '04b', 'VICTORY', 40);
    	this.titleText.anchor.setTo(0.5, 0.5);
        this.deathText = this.game.add.bitmapText(this.game.world.centerX, this.game.world.centerY, 'carrier_command', 'Total deaths:' + SpaceBear.deaths +'', 12);
        this.deathText.anchor.setTo(0.5, 0.5);
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


 