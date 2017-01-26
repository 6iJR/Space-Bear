var SpaceBear = SpaceBear || {};

SpaceBear.preloadState = function (){};

SpaceBear.preloadState.prototype = {
	preload: function() {
		//this.load.tilemap('map1', 'assets/tilemaps/1.json', null, Phaser.Tilemap.TILED_JSON);
		for (var i = 1; i <= 2; i++) {
      		this.load.tilemap(i.toString(), 'assets/tilemaps/' + i.toString() + '.json', null, Phaser.Tilemap.TILED_JSON);
    	}

		this.load.spritesheet('player', 'assets/img/player_sprite.png', 40, 40, 29);
		this.load.image('marstiles', 'assets/img/marsLevelFloor.png');
		this.load.image('jupitertiles', 'assets/img/jupiterLevelFloor.png');
		this.load.spritesheet('fuel', 'assets/img/fuel.png', 40, 40);
		this.load.spritesheet('enemy', 'assets/img/enemiesSprite.png', 40, 40);

		this.load.audio('playsound', 'assets/audio/playsound.mp3');
		this.load.audio('fragile', 'assets/audio/Explosion2.wav');
		this.load.audio('jump', 'assets/audio/Jump.wav');

	},
	create: function () {
		this.state.start('menu');
	}
};