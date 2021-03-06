var SpaceBear = SpaceBear || {};
SpaceBear.deaths = 0;
SpaceBear.muteBool = 0;

// GAMEPLAY STATE //
SpaceBear.playState = function(){};

var cursors;
SpaceBear.playState.prototype = {
  create: function() {

    var muteKey = this.game.input.keyboard.addKey(Phaser.Keyboard.M);
    muteKey.onDown.add(function() {
      if(SpaceBear.muteBool === 0) {
        SpaceBear.currentTrack.stop();
        SpaceBear.muteBool = 1;
      } else {
        SpaceBear.currentTrack.play();
        SpaceBear.muteBool = 0;
      }
    },this);

    //Sounds
    this.fragileSound = this.add.audio('fragile');
    this.fragileSound.volume -= .9;
    this.deathSound = this.add.audio('dead');
    this.deathSound.volume -= .9;
    this.goalSound = this.add.audio('goal');
    this.goalSound.volume -= .9;

	 this.background = this.game.add.sprite(0, 0, 'background');
    this.background.width = this.game.width;
    this.background.height = this.game.height;
    this.background.fixedToCamera = true;

    // fade in
    this.game.camera.flash(0x000000, 250);

    //chose and load map
    this.map = this.game.add.tilemap(SpaceBear.level);
    switch(SpaceBear.level) {
    	case '1':
    		this.map.addTilesetImage('marsLevelFloor', 'marstiles');
    		this.levelText = this.game.add.bitmapText(this.game.camera.width - 150, 60, '04b', 'Mars', 15);
    		break;
    	case '2':
    		this.map.addTilesetImage('jupiterLevelFloor', 'jupitertiles');
    		this.levelText = this.game.add.bitmapText(this.game.camera.width - 150, 60, '04b', 'Jupiter', 15);
    		break;
      case '3':
      	this.map.addTilesetImage('saturnLevelFloor', 'saturntiles');
      	this.levelText = this.game.add.bitmapText(this.game.camera.width - 150, 60, '04b', 'Saturn', 15);
      	break;
    	case '4':
      	this.map.addTilesetImage('uranusLevelFloor', 'uranustiles');
      	this.levelText = this.game.add.bitmapText(this.game.camera.width - 150, 60, '04b', 'Uranus', 15);
      	break;
   	  case '5':
     		this.map.addTilesetImage('neptunLevelFloor', 'neptuntiles');
     		this.levelText = this.game.add.bitmapText(this.game.camera.width - 150, 60, '04b', 'Neptune', 15);
      	break;
    } 

    //init layers
    this.noInteractionLayer = this.map.createLayer('noInteractionLayer');
    this.stageLayer = this.map.createLayer('stageLayer');
    this.trapsLayer = this.map.createLayer('trapLayer');
    this.fragileLayer = this.map.createLayer('fragileLayer');
    this.bounceLayer = this.map.createLayer('bounceLayer');

    //link input, link & create player
    this.input = new SpaceBear.Input(this.game);
    var objects = this.findObjectsByType('playerStart', this.map, 'objectsLayer');
    this.player = new SpaceBear.Player(this.game, this.input, objects[0].x, objects[0].y);

    //add and spawn enemies
    this.enemies = this.game.add.group();
    this.enemies.enableBody = true;
    var result = this.findObjectsByType('enemyStart', this.map, 'objectsLayer');
    for(var e = 0; e < result.length; e++){
      var enemy = new SpaceBear.Enemy(this.game, result[e].x, result[e].y);
      this.enemies.add(enemy);
    }

    //set collisions
    this.map.setCollisionBetween(1, 2000, true, 'stageLayer');
    this.map.setCollisionBetween(1, 2000, true, 'trapLayer');
    this.map.setCollisionBetween(1, 2000, true, 'fragileLayer');
    this.map.setCollisionBetween(1, 2000, true, 'bounceLayer');
    
    //resize
    this.noInteractionLayer.resizeWorld();

    this.createFuel();

    //possible ui addons
    this.game.layers = {
      ui: this.game.add.group()
    };


    this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_PLATFORMER);
    

    //fix death counter on screen
    this.deathText = this.game.add.bitmapText(this.game.camera.width - 150, 30, '04b', 'Deaths ' + SpaceBear.deaths, 15);
    this.muteText = this.game.add.bitmapText(30, this.game.camera.height-15, 'carrier_command', 'Mute: M', 8);
    this.game.layers.ui.add(this.deathText);
    this.game.layers.ui.add(this.levelText);
    this.game.layers.ui.add(this.muteText);

    this.game.layers.ui.fixedToCamera = true;

   

  },
  update: function() {

    //set collisions
    this.game.physics.arcade.collide(this.player, this.stageLayer);
    this.game.physics.arcade.collide(this.enemies, this.stageLayer,
    this.enemyStageHandler, null, this);
    this.game.physics.arcade.collide(this.player, this.trapsLayer,
    this.playerTrapHandler, null, this);
    this.game.physics.arcade.collide(this.enemies, this.bounceLayer,
    this.enemyBounceHandler, null, this);
    this.game.physics.arcade.collide(this.enemies, this.trapsLayer,
    this.enemyTrapHandler, null, this);
    this.game.physics.arcade.collide(this.player, this.fragileLayer,
    this.playerFragileHandler, null, this);
    this.game.physics.arcade.collide(this.player, this.fuels, 
    this.playerFuelHandler, null, this);
    this.game.physics.arcade.collide(this.player, this.enemies, 
    this.playerEnemyHandler, null, this);

  }
};

SpaceBear.playState.prototype.playerFuelHandler = function(player, fuel) {
  fuel.body.velocity.x = 0;
  fuel.body.velocity.y = 0;

  // stop following player with camera
  this.game.camera.unfollow();

  if (!this.goalSound.isPlaying && SpaceBear.muteBool === 0) {
    this.goalSound.play();
  }

  // destroy player and fuel
  fuel.pendingDestroy = true;
  player.pendingDestroy = true;

    //fade out + levelchange
    this.game.camera.fade(0x000000, 1000);
    this.game.camera.onFadeComplete.addOnce(function() {
      SpaceBear.level = fuel.targetTilemap;
      this.transporting = false;
      if(SpaceBear.level === 'final'){
        var dead = SpaceBear.deaths;
        this.game.state.start('final',dead);
      } else {        
        this.game.state.start(this.game.state.current);
      }
  }, this);
};

SpaceBear.playState.prototype.playerEnemyHandler = function(player, enemy) {
  enemy.body.velocity.x = 50;
  enemy.body.velocity.y = 0;

  // stop following player with camera
  this.game.camera.unfollow();

  player.pendingDestroy = true;

  SpaceBear.deaths++;

  if (!this.deathSound.isPlaying && SpaceBear.muteBool === 0) {
    this.deathSound.play();
  }
  // show some text, if not already showing any
  if (!this.drawTutText) {
    var text = '';
    var rand = Math.random();
    if (rand < 0.1) {
      text = 'Sorry Mate';
    } else if (rand < 0.2) {
      text = 'youre supposed to help me';
    } else if (rand < 0.3) {
      text = 'PLS STOP!';
    } else if (rand < 0.4){
      text = 'Poor bear';
    } else if (rand < 0.5) {
      text = '**** these little guys';
    } else if (rand < 0.6) {
      text = 'come on now :[';
    } else if (rand < 0.7) {
      text = 'Those aliens';
    } else if (rand < 0.8) {
      text = 'Help me, pls!';
    } else if (rand < 0.9) {
      text = 'Stop being like that';
    } else {
      text = 'Gosh, stoooop';
    }
    this.deathText = this.game.add.bitmapText(this.game.camera.x + (this.game.camera.width / 2), this.game.camera.y + (this.game.camera.height / 2), '04b', text, 25);
    this.deathText.anchor.setTo(0.5, 0.5);
  }

  // shake the camera + restart level
  this.game.camera.shake(0.004, 1200);
  this.game.camera.onShakeComplete.addOnce(function() {
    this.game.camera.fade(0x000000, 250);
    this.game.camera.onFadeComplete.addOnce(function() {
      this.game.state.start(this.game.state.current);
    }, this);
  }, this);
};

SpaceBear.playState.prototype.playerTrapHandler = function(player, trap) {
  this.game.camera.unfollow();

  player.pendingDestroy = true;

  //Todecounter?
  SpaceBear.deaths++;

  if (!this.deathSound.isPlaying && SpaceBear.muteBool === 0) {
    this.deathSound.play();
  }

  // show some text, if not already showing any
  if (!this.drawTutText) {
    var text = '';
    var rand = Math.random();
    if (rand < 0.1) {
      text = 'Sorry Mate';
    } else if (rand < 0.2) {
      text = 'Ouch, that hurts!';
    } else if (rand < 0.3) {
      text = 'PLS STOP!';
    } else if (rand < 0.4){
      text = 'Poor bear';
    } else if (rand < 0.5) {
      text = 'Um.. are you okay?';
    } else if (rand < 0.6) {
      text = 'youre supposed to help me';
    } else if (rand < 0.7) {
      text = 'You killed me';
    } else if (rand < 0.8) {
      text = 'Help me, pls!';
    } else if (rand < 0.9) {
      text = 'Stop being like that';
    } else {
      text = 'Gosh, stoooop';
    }
    this.deathText = this.game.add.bitmapText(this.game.camera.x + (this.game.camera.width / 2), this.game.camera.y + (this.game.camera.height / 2), '04b', text, 25);
    this.deathText.anchor.setTo(0.5, 0.5);
  }

  // shake the camera +restart level
  this.game.camera.shake(0.004, 1200);
  this.game.camera.onShakeComplete.addOnce(function() {
    this.game.camera.fade(0x000000, 250);
    this.game.camera.onFadeComplete.addOnce(function() {
      this.game.state.start(this.game.state.current);
    }, this);
  }, this);
};


//bounces for the enemies
SpaceBear.playState.prototype.enemyTrapHandler = function(enemies, trap) {
  if(enemies.body.blocked.left){
    enemies.facing = 'right';
  } else if(enemies.body.blocked.right){
    enemies.facing = 'left';
  }
};

SpaceBear.playState.prototype.enemyBounceHandler = function(enemies, trap) {
  if(enemies.body.blocked.left){
    enemies.facing = 'right';
  } else if(enemies.body.blocked.right){
    enemies.facing = 'left';
  }
};

SpaceBear.playState.prototype.enemyStageHandler = function(enemies, trap) {
  if(enemies.body.blocked.left){
    enemies.facing = 'right';
  } else if(enemies.body.blocked.right){
    enemies.facing = 'left';
  }
};

SpaceBear.playState.prototype.playerFragileHandler = function(player, block) {
  // block disappears with breaksound
  this.game.time.events.add(250, function() {
    if (!this.fragileSound.isPlaying && SpaceBear.muteBool === 0) {
      this.fragileSound.play();
    }
    this.map.removeTile(block.x, block.y, 'fragileLayer');
  }, this);
};

SpaceBear.playState.prototype.findObjectsByType = function(type, map, layer) {
//array with results
var result = new Array();

//pushes result into array
map.objects[layer].forEach(function(element){
  if(element.type === type) {
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

  // play animation (if propertie animated)
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
