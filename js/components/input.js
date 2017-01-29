var SpaceBear = SpaceBear || {};

SpaceBear.Input = function(game) {
  this.game = game;

  // init keyboard controls
  this.cursors = this.game.input.keyboard.createCursorKeys();
  this.kbPrimary = this.game.input.keyboard.addKey(Phaser.Keyboard.X);
  this.kbStart = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

  // input buffer setup
  this.bufferFrames = 6; // must be LESS than player.wasOnGround
  this.kbPrimaryTimer = 0;
  this.kbPrimaryDown = false;
  this.kbPrimaryPressed = false;
  this.kbPrimaryLast = this.kbPrimaryDown;

};

// SpaceBear.Input.prototype = Object.create(Object.prototoype);
SpaceBear.Input.prototype.constructor = SpaceBear.Input;

SpaceBear.Input.prototype.update = function() {

  // keyboard input buffering for primary jey
  if (this.kbPrimaryPressed) {
    this.kbPrimaryTimer++;
    if (this.kbPrimaryTimer > this.bufferFrames) {
      this.kbPrimaryPressed = false;
      this.kbPrimaryTimer = 0;
    }
  }

  // primary button
  this.kbPrimaryLast = this.kbPrimaryDown;
  this.kbPrimaryDown = this.kbPrimary.isDown;

  if (this.resetting) {
    this.resetting = false;
    return; // skip the onDown flag if input is being cleared
  }

  // process and set flags (for handmade onDown events)
  if (this.kbPrimaryDown && !this.kbPrimaryLast) { // just pressed
    this.kbPrimaryPressed = true;
  }

};

// GET BUTTON OBJECTS //
SpaceBear.Input.prototype.leftIsDown = function() {
  return this.cursors.left.isDown;
};

SpaceBear.Input.prototype.rightIsDown = function() {
  return this.cursors.right.isDown;
};

SpaceBear.Input.prototype.primaryPressed = function() {
  return this.kbPrimaryPressed;
};

SpaceBear.Input.prototype.startPressed = function() {
  return this.kbStart.isDown;
};


SpaceBear.Input.prototype.destroy = function() {
  // nothing
};

SpaceBear.Input.prototype.resetPrimary = function() {
  this.kbPrimaryTimer = 0;
  this.kbPrimaryDown = false;
  this.kbPrimaryPressed = false;
  this.kbPrimaryLast = this.kbPrimaryDown;
  this.resetting = true;
};
