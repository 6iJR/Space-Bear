var SpaceBear = SpaceBear || {};

// PLAYER CLASS //
SpaceBear.Player = function(game, input, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'player');
  this.game = game;
  this.input = input;
  this.alive = true;
  this.anchor.setTo(0.5);
/*
    // animations
  this.animations.add('run-left', [9,10,11,10]);
  this.animations.add('run-right', [0,1,2,1]);
  this.facing = 'right';*/

  var player = this;


  this.game.physics.arcade.enable(this);
  this.body.collideWorldBounds = true;
  this.body.setSize(30, 40, 5, 0);
  this.body.gravity.y = 350;
  this.jumpSpeed = -200;
  this.hSpeed = 190;
  this.body.maxVelocity.x = this.hSpeed;
  this.maxFallSpeed = 500;
  this.body.maxVelocity.y = this.maxFallSpeed;
  this.accelConst = 1800;
  this.body.acceleration.x = 0;
  this.dragConst = 2000;
  this.body.drag.x = this.dragConst;
  this.wallCheck = false; // for custom wall check
  this.wasOnGround = true; // for custom ground check
  this.groundDelay = 6; // player can jump a few frames frames after leaving ground
  this.groundDelayTimer = 0;
  this.wallBreakTime = 20; // how long player moves away from wall before they "unstick"
  this.wallBreakClock = 0;


  // init with spawning logic
  // (state logic begins after spawn timer is up)
  this.spawning = true;
  this.frame = 7;
  var spawnTween = this.game.add.tween(player).to({ alpha: 0 }, 100, 'Linear', true, 0, -1, true);
  this.game.time.events.add(700, function() {
    this.spawning = false;
    this.alpha = 1;
    spawnTween.stop();
  }, this);

  // first state after spawn
  this.currentState = this.groundState;

  // add to the game
  this.game.add.existing(this);

};

SpaceBear.Player.prototype = Object.create(Phaser.Sprite.prototype);
SpaceBear.Player.prototype.constructor = SpaceBear.Player;

SpaceBear.Player.prototype.update = function() {
  if (this.spawning) {
    return;
  }

  // animations and state logic
  this.currentState();

    this.input.update();
  // handle input
  if (this.input.primaryPressed()) {
    this.jumpBtnHandler();
  }
};

// STATES //
SpaceBear.Player.prototype.pausedState = function() {
  this.body.velocity.x = 0;
  this.body.acceleration.x = 0;
/*
  // stop running animation
  this.animations.stop();
  if (this.facing === 'left') {
    this.frame = 14;
  } else {
    this.frame = 5;
  }*/
};

SpaceBear.Player.prototype.groundState = function() {
  // disable jump when player landed on a spring
  if (this.spring) {
    this.spring = false;
  } else {
    // delayed "onGround" check for better controls
    this.wasOnGround = true;
  }


  // moving left or right
  this.moveX();

  // animate running
  /*if (Math.abs(this.body.velocity.x)) {
    if (this.facing === 'left') {
      this.animations.play('run-left', 15, true);
    } else {
      this.animations.play('run-right', 15, true);
    }
  }

  // stop running animation if stopped
  if (Math.abs(this.body.velocity.x) == 0) {
    // stop running animation
    this.animations.stop();
    if (this.facing === 'left') {
      this.frame = 14;
    } else {
      this.frame = 5;
    }
  }*/
  // fell off a ledge
  if (!this.body.onFloor()) {
    this.currentState = this.airState;
  }
};

SpaceBear.Player.prototype.airState = function() {
  // delayed "onGround" check for better controls
  if (this.wasOnGround) {
    this.groundDelayTimer++;
    if (this.groundDelayTimer > this.groundDelay) {
      this.groundDelayTimer = 0;
      this.wasOnGround = false;
    }
  }

  // moving left or right
  this.moveX();

  // reduce friction
  this.body.drag.x = this.dragConst / 2;
 /*
  // animate
  if (this.facing === 'left') {
    this.frame = 15;
  } else {
    this.frame = 4;
  }*/

  // wall sliding (pre wall-jump)
  if (this.body.onWall() && this.left > 0 && this.right < this.game.width) {
    this.body.drag.x = this.dragConst;
    this.currentState = this.wallSlideState;
  }

  // hit the ground
  if (this.body.onFloor()) {
    this.body.drag.x = this.dragConst;
    this.currentState = this.groundState;
  }
};

SpaceBear.Player.prototype.wallSlideState = function() {

  // if not leaning in to wall, break away from wall after this.wallBreakTime frames
  if ((this.input.rightIsDown() && this.facing === 'right') ||
     (this.input.leftIsDown() && this.facing === 'left')) {
    this.wallBreakClock = 0;
  } else {
    this.wallBreakClock++;
  }

  // "fall" off wall if not leaning into wall
  if (this.wallBreakClock >= this.wallBreakTime) {
    this.wallBreakClock = 0;
    this.currentState = this.airState;
  }

  // slide more slowly
  if (this.body.velocity.y >= this.maxFallSpeed / 4) {
    this.body.velocity.y = this.maxFallSpeed / 4;
  }
  /*
  // animate
  this.animations.stop();
  if (this.facing === 'left') {
    this.frame = 10;
  } else {
    this.frame = 1;
  }*/


  // let go of the wall
  if (!this.body.onWall()) {
    this.wallBreakClock = 0;
    this.body.maxVelocity.y = this.maxFallSpeed;
    this.currentState = this.airState;
  }

  // hit the floor
  if (this.body.onFloor()) {
    this.wallBreakClock = 0;
    this.body.maxVelocity.y = this.maxFallSpeed;
    this.currentState = this.groundState;
  }
};

SpaceBear.Player.prototype.moveX = function() {
  // set acceleration on input
  if (this.input.leftIsDown()) {
    this.facing = 'left';
    this.body.acceleration.x = -this.accelConst;
    // less acceleration if in air
    if (!this.body.onFloor()) {
      this.body.acceleration.x = -this.accelConst / 2;
    }
  } else if (this.input.rightIsDown()) {
    this.facing = 'right';
    this.body.acceleration.x = this.accelConst;
    // less acceleration if in air
    if (!this.body.onFloor()) {
      this.body.acceleration.x = this.accelConst / 2;
    }
  } else {
    this.body.acceleration.x = 0;
  }
};

SpaceBear.Player.prototype.jumpBtnHandler = function() {
  // if player is dead, or if player has already jumped, return
  if (!this.body || this.spawning || this.currentState == this.pausedState) {
    return;
  }

  // reset maxVelocity.x
  this.body.maxVelocity.x = this.hSpeed;
  /*this.drilling = false;
  this.drill.kill();*/

  // if on the wall (not edges of game)
  if (this.body.onWall() && !this.body.onFloor() &&
      this.left > 0 && this.right < this.game.width) {
    this.wasOnGround = false;
    this.jumpSound.play();
    this.body.maxVelocity.y = this.maxFallSpeed;
    this.body.velocity.y = this.jumpSpeed;
    // jump away from wall
    if (this.body.blocked.left) {
      this.body.velocity.x = this.body.maxVelocity.x;
    } else {
      this.body.velocity.x = -this.body.maxVelocity.x;
    }
    // change state to air state
    this.currentState = this.airState;
  // if on the floor (not on the wall)
  } else if (this.body.touching.down) {
    this.wasOnGround = false;
    //this.jumpSound.play();
    this.body.velocity.y = this.jumpSpeed;
    this.currentState = this.airState;
    this.input.resetPrimary();
  }
};