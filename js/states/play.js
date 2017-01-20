var SpaceBear = SpaceBear || {};

// GAMEPLAY STATE //
SpaceBear.playState = function(){};

var cursors;

SpaceBear.playState.prototype = {
  create: function() {


    if (!SpaceBear.currentTrack) {
      var trackKey = 'playsound';
      SpaceBear.currentTrack = this.game.add.audio(trackKey);
      SpaceBear.currentTrack.volume -= .85;
      SpaceBear.currentTrack.loopFull();
    }

    //FX SOUND
    this.fragileSound = this.add.audio('fragile');
    this.fragileSound.volume -= .95;

    


    cursors = this.game.input.keyboard.createCursorKeys();
    // fade camera in
    this.game.camera.flash(0x000000, 250);

    this.map = this.game.add.tilemap('map1');
    this.map.addTilesetImage('marsLevelFloor', 'marstiles')

    this.noInteractionLayer = this.map.createLayer('noInteractionLayer');
    this.stageLayer = this.map.createLayer('stageLayer');
    this.trapsLayer = this.map.createLayer('trapLayer');
    this.fragileLayer = this.map.createLayer('fragileLayer');

    this.input = new SpaceBear.Input(this.game);
    var objects = this.findObjectsByType('playerStart', this.map, 'objectsLayer');
    this.player = new SpaceBear.Player(this.game, this.input, objects[0].x, objects[0].y);

    //this.map.setCollisionBetween(1, 2000, false, 'noInteractionLayer');
    this.map.setCollisionBetween(1, 2000, true, 'stageLayer');
    this.map.setCollisionBetween(1, 2000, true, 'trapLayer');
    this.map.setCollisionBetween(1, 2000, true, 'fragileLayer');

    this.noInteractionLayer.resizeWorld();

    this.createFuel();

    //the camera will follow the player in the world
    this.game.camera.follow(this.player);

  },
  update: function() {

    this.game.physics.arcade.collide(this.player, this.stageLayer);
    this.game.physics.arcade.collide(this.player, this.trapsLayer,
    this.playerTrapHandler, null, this);
    this.game.physics.arcade.collide(this.player, this.fragileLayer,
    this.playerFragileHandler, null, this);
    this.game.physics.arcade.collide(this.player, this.fuels, 
    this.playerFuelHandler, null, this);

    /*if (cursors.up.isDown)
    {
        this.game.camera.y -= 10;
    }
    else if (cursors.down.isDown)
    {
        this.game.camera.y += 10;
    }

    if (cursors.left.isDown)
    {
        this.game.camera.x -= 10;
    }
    else if (cursors.right.isDown)
    {
        this.game.camera.x += 10;
    }*/
  }
};

SpaceBear.playState.prototype.playerFuelHandler = function(player, fuel) {
  fuel.body.velocity.x = 0;
  fuel.body.velocity.y = 0;
  // flag to disable fuelHandler (multiple fuels)
  if (this.transporting) {
    return;
  }
  this.transporting = true;

  // flag that the state is resetting because of a new level (for tut text)
  //SpaceBear.newLevel = true;

  // stop following player with camera
  this.game.camera.unfollow();

  // destroy player and fuel
  fuel.pendingDestroy = true;
  player.pendingDestroy = true;
};

SpaceBear.playState.prototype.playerTrapHandler = function(player, trap) {
  //camera stops following player
  this.game.camera.unfollow();
  // player dies
  player.pendingDestroy = true;

  //Todecounter?

  // shake camera
  // this.startCameraShake();

  // show some text, if not already showing any
  if (!this.drawTutText) {
    var text = '';
    var rand = Math.random();
    if (rand < 0.1) {
      text = 'HAHAHAHA';
    } else if (rand < 0.2) {
      text = 'OUCHIE :[';
    } else if (rand < 0.3) {
      text = 'Try again T.T';
    } else if (rand < 0.4){
      text = 'You win! JK you died.';
    } else if (rand < 0.5) {
      text = '*burp*';
    } else if (rand < 0.6) {
      text = 'come on now :[';
    } else if (rand < 0.7) {
      text = 'What is... feeling?';
    } else if (rand < 0.8) {
      text = 'Juicy';
    } else if (rand < 0.9) {
      text = 'nice try, you got this <3';
    } else {
      text = 'You\'re breaking my <3';
    }
    this.deathText = this.game.add.bitmapText(this.game.camera.x + (this.game.camera.width / 2), this.game.camera.y + (this.game.camera.height / 2), 'carrier_command', text, 25);
    this.deathText.anchor.setTo(0.5, 0.5);
  }

  // shake the camera
  this.game.camera.shake(0.004, 1200);
  this.game.camera.onShakeComplete.addOnce(function() {
    // restart level after camera shake
    this.game.camera.fade(0x000000, 250);
    this.game.camera.onFadeComplete.addOnce(function() {
      this.game.state.start(this.game.state.current);
    }, this);
  }, this);
};

SpaceBear.playState.prototype.playerFragileHandler = function(player, block) {
  // block disappears after .25 seconds
  this.game.time.events.add(250, function() {

    if (!this.fragileSound.isPlaying) {
      this.fragileSound.play();
    }

    // store block index so we can replace it later
    var index = block.index;
    this.map.removeTile(block.x, block.y, 'fragileLayer');
  }, this);
};

SpaceBear.playState.prototype.findObjectsByType = function(type, map, layer) {
var result = new Array();

map.objects[layer].forEach(function(element){
  if(element.type === type) {
    //Phaser uses top left, Tiled bottom left so we have to adjust the y position
    element.y -= map.tileHeight;
    result.push(element);
  }
 });
 return result;
};

SpaceBear.playState.prototype.createFromTiledObject = function(element, group) {
  var sprite = group.create(element.x, element.y, element.properties.sprite);
  //copy all properties to the sprite
  Object.keys(element.properties).forEach(function(key){
    sprite[key] = element.properties[key];
  });

  // play animation
  if (sprite.animated) {
    sprite.animations.add('default');
    sprite.animations.play('default', 10, true);
  }
};

SpaceBear.playState.prototype.createFuel = function() {
  // create end-of-level fuel
  this.fuels = this.game.add.group();
  this.fuels.enableBody = true;
  var result = this.findObjectsByType('portal', this.map, 'objectsLayer');
  result.forEach(function(element){
    this.createFromTiledObject(element, this.fuels);
  }, this);
};