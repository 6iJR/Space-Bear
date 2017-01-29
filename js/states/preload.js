var SpaceBear = SpaceBear || {};

SpaceBear.preloadState = function (){};

SpaceBear.preloadState.prototype = {
	preload: function() {
		//loading the json files
		for (var i = 1; i <= 5; i++) {
      		this.load.tilemap(i.toString(), 'assets/tilemaps/' + i.toString() + '.json', null, Phaser.Tilemap.TILED_JSON);
    	}

    	//all sprites
		this.load.spritesheet('player', 'assets/img/player_sprite.png', 40, 40, 29);
		this.load.spritesheet('fuel', 'assets/img/fuel.png', 40, 40);
		this.load.spritesheet('enemy', 'assets/img/enemySprite.png', 40, 40, 12);

		//all maps
		this.load.image('marstiles', 'assets/img/marsLevelFloor.png');
		this.load.image('jupitertiles', 'assets/img/jupiterLevelFloor.png');
		this.load.image('saturntiles', 'assets/img/saturnLevelFloor.png');
		this.load.image('uranustiles', 'assets/img/uranusLevelFloor.png');
		this.load.image('neptuntiles', 'assets/img/neptunLevelFloor.png');
		this.load.image('background', 'assets/img/hintergrund.jpg');
		this.load.image('startscreen', 'assets/img/startscreen.jpg');

		//all sonuds
		this.load.audio('playsound', 'assets/audio/playsound.mp3');
		this.load.audio('fragile', 'assets/audio/Explosion2.wav');
		this.load.audio('jump', 'assets/audio/Jump.wav');

	},
	create: function () {
		this.state.start('menu');
	}
};