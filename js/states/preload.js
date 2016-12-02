var SpaceBear = SpaceBear || {};

SpaceBear.preloadState = function (){};

SpaceBear.preloadState.prototype = {
	preload: function() {
		this.load.tilemap('map1', 'assets/tilemaps/MarsWelt.json', null, Phaser.Tilemap.TILED_JSON);

		this.load.image('tiles', 'assets/tiles/MarsLevelFloorv2.png');

	},
	create: function () {
		this.state.start('menu');
	}
};