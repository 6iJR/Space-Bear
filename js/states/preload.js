var SpaceBear = SpaceBear || {};

SpaceBear.preloadState = function (){};

SpaceBear.preloadState.prototype = {
	preload: function() {
		this.load.tilemap('map1', 'assets/tilemaps/map1.json', null, Phaser.Tilemap.TILED_JSON);

		this.load.image('Prototyp', 'assets/tiles/Prototyp.png');

		this.load.image('bruchlinks', 'assets/tiles/bruchlinks.png');
		this.load.image('bruchmitte', 'assets/tiles/bruchmitte.png');
		this.load.image('bruchrechts', 'assets/tiles/bruchrechts.png');
		this.load.image('HochkantEins', 'assets/tiles/HochkantEins.png');
		this.load.image('HochkantZwei', 'assets/tiles/HochkantZwei.png');
		this.load.image('LavaZwei', 'assets/tiles/LavaZwei.png');
		this.load.image('MarsLevelFloor - Horizontal', 'assets/tiles/MarsLevelFloor - Horizontal.png');
		this.load.image('MarsLevelFloor -Horizontal Gespiegelt', 'assets/tiles/MarsLevelFloor -Horizontal Gespiegelt.png');
		this.load.image('MarsLevelFloorPNG (1)', 'assets/tiles/MarsLevelFloorPNG (1).png');
		this.load.image('stachel von obendunkel', 'assets/tiles/stachel von obendunkel.png');
		this.load.image('stachel von untendunkel', 'assets/tiles/stachel von untendunkel.png');
		this.load.image('stachel, seitlich 2', 'assets/tiles/stachel, seitlich 2.png');
		this.load.image('stachel, seitlich', 'assets/tiles/stachel, seitlich.png');

	},
	create: function () {
		this.state.start('menu');
	}
};