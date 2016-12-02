var SpaceBear = SpaceBear || {};

SpaceBear.preloadState = function (){};

SpaceBear.preloadState.prototype = {
	preload: function() {
		this.load.tilemap('map1', 'assets/tilemaps/1.json', null, Phaser.Tilemap.TILED_JSON);

		this.load.image('player', 'assets/img/polarbear.png');
		this.load.image('marstiles', 'assets/img/marsLevelFloor.png');


	},
	create: function () {
		this.state.start('menu');
	}
};