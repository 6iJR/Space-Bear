var SpaceBear = SpaceBear || {};

// Enemy CLASS //
SpaceBear.Enemy = function(game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'enemy');
  this.game = game;
  this.alive = true;
  this.anchor.setTo(0.5);

 
  //animation
  this.animations.add('run-left', [0,1,2,3,4,5]);
  this.animations.add('run-right', [6,7,8,9,10,11]);
  this.facing = 'right';

  var enemy = this;


  this.game.physics.arcade.enable(this);
  this.body.collideWorldBounds = true;
  //hitbox
  this.body.setSize(19, 39, 12, 0);
  this.body.gravity.y = 400;
  this.hSpeed = 190;
  this.body.maxVelocity.x = this.hSpeed;
  this.maxFallSpeed = 350;
  this.body.maxVelocity.y = this.maxFallSpeed;
  this.accelConst = 1800;
  this.body.acceleration.x = 0;
  this.dragConst = 2000;
  this.body.drag.x = this.dragConst;
  this.wallCheck = false; // for custom wall check
  this.wasOnGround = true; // for custom ground check
  this.groundDelay = 6; // Enemy can jump a few frames frames after leaving ground
  this.groundDelayTimer = 0;

  //delayed spawn
  this.spawning = true;
  this.frame = 7;
  var spawnTween = this.game.add.tween(enemy).to({ alpha: 0 }, 100, 'Linear', true, 0, -1, true);
  this.game.time.events.add(700, function() {
    this.spawning = false;
    this.alpha = 1;
    spawnTween.stop();
  }, this);

  // first state
  this.currentState = this.groundState;

  // add to the game
  this.game.add.existing(this);
};

SpaceBear.Enemy.prototype = Object.create(Phaser.Sprite.prototype);
SpaceBear.Enemy.prototype.constructor = SpaceBear.Enemy;

SpaceBear.Enemy.prototype.update = function() {
  if (this.spawning) {
    return;
  }

  // animations and state logic
  this.currentState();
};

// STATES //
SpaceBear.Enemy.prototype.pausedState = function() {
  //stop while paused
  this.body.velocity.x = 0;
  this.body.acceleration.x = 0;
};

SpaceBear.Enemy.prototype.groundState = function() {

  // moving left or right
  this.moveX();

  // animation
  if (Math.abs(this.body.velocity.x)) {
    if (this.facing === 'left') {
      this.animations.play('run-left', 15, true);
    } else {
      this.animations.play('run-right', 15, true);
    }
  }

};


SpaceBear.Enemy.prototype.moveX = function() {
  if(this.facing == 'right'){
    this.body.acceleration.x = this.accelConst;  }
  else if (this.facing == 'left'){
    this.body.acceleration.x = -this.accelConst;
  }
};