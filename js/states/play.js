var SpaceBear = SpaceBear || {};

// GAMEPLAY STATE //
SpaceBear.playState = function(){};

var cursors;

SpaceBear.playState.prototype = {
  create: function() {

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
    this.map.setCollisionBetween(1, 2000, true, 'stageLayer',);
    this.map.setCollisionBetween(1, 2000, true, 'trapLayer');
    this.map.setCollisionBetween(1, 2000, true, 'fragileLayer');

    this.noInteractionLayer.resizeWorld();
    //the camera will follow the player in the world
    this.game.camera.follow(this.player);

  },
  update: function() {

    this.game.physics.arcade.collide(this.player, this.stageLayer);
    this.game.physics.arcade.collide(this.player, this.trapsLayer);

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