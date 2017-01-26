var SpaceBear = SpaceBear || {};

// MAIN MENU STATE //
SpaceBear.menuState = function(){};

SpaceBear.menuState.prototype = {
  create: function() {
 

    // create background
    this.map = this.game.add.tilemap('1');
    this.map.addTilesetImage('marsLevelFloor', 'marstiles');

 
    // create menu text
    this.startText = this.game.add.bitmapText(this.game.world.centerX, this.game.height - 150, 'carrier_command', 'PRESS \'X\' TO START', 12);
    this.startText.anchor.setTo(0.5, 0.5);

  
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
        // CHANGE FOR DEBUGGING/TESTING LEVELS //
        SpaceBear.level = '1'; // 1
        // LEVEL TESTING //
        this.game.camera.onFadeComplete.addOnce(function() {
          this.starting = false;
          this.game.state.start('play');
        }, this);
      }, this);
    }, this);
  },
 
};
