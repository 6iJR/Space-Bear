var SpaceBear = SpaceBear || {};

// GAMEPLAY STATE //
SpaceBear.playState = function(){};

SpaceBear.playState.prototype = {
  create: function() {
    // fade camera in
    this.game.camera.flash(0x000000, 250);

    // init the tile map
    this.map = this.game.add.tilemap(SpaceBear.level);


    // create tilemap layers
    this.backgroundLayer = this.map.createLayer('backgroundLayer');
    this.stageLayer = this.map.createLayer('stageLayer');


    // set collisions on stageLayer, trapsLayer, fragileLayer and springLayer
 

    // resize game world to match layer dimensions
    this.backgroundLayer.resizeWorld();

    // create items on the stage


    // actor/fx rendering layers

    // create block dust effects

    // create crystal burst effects

    //create player


    //the camera will follow the player in the world
    this.game.camera.follow(this.player);

    // make the UI
    // timer
    // keep HUD fixed to camera

  },

  update: function() {
    // stage collisions
  }
  // debugging
  // render: function() {
  //   this.game.debug.body(this.player);
  // }
};

// COLLISION HANDLERS //


// GAMEPLAY STATE UTILITIES //

/* map creation */
