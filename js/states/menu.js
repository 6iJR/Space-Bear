var SpaceBear = SpaceBear || {};

SpaceBear.menuState = function (){};

SpaceBear.menuState.prototype = {
	create: function() {
		// this.startText = this.game.add.bitmapText(this.game.world.centerX, this.game.height - 150, 'carrier_command', 'SPACE BEARRRR', 12);
    	// this.startText.anchor.setTo(0.5, 0.5);
    	this.map = this.game.add.tilemap('map1');
    	this.map.addTilesetImage('HochkantEins', 'HochkantEins');
    	this.map.addTilesetImage('HochkantZwei', 'HochkantZwei');
    	this.map.addTilesetImage('MarsLevelFloor - Horizontal', 'MarsLevelFloor - Horizontal');
    	this.map.addTilesetImage('MarsLevelFloor -Horizontal Gespiegelt', 'MarsLevelFloor -Horizontal Gespiegelt');
    	this.map.addTilesetImage('LavaZwei', 'LavaZwei');
    	this.map.addTilesetImage('stachel von untendunkel', 'stachel von untendunkel');
    	this.map.addTilesetImage('stachel, seitlich 2', 'stachel, seitlich 2');
    	this.map.addTilesetImage('stachel, seitlich', 'stachel, seitlich');
    	this.map.addTilesetImage('bruchlinks', 'bruchlinks');
    	this.map.addTilesetImage('bruchmitte', 'bruchmitte');
    	this.map.addTilesetImage('bruchrechts', 'bruchrechts');
    	this.map.addTilesetImage('MarsLevelFloorPNG (1)', 'MarsLevelFloorPNG (1)');
		this.map.createLayer('Kachelebene 1').resizeWorld();
   	}
} 