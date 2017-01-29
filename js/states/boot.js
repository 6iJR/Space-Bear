var SpaceBear = SpaceBear || {};

SpaceBear.bootState = function(){};

SpaceBear.bootState.prototype = {
	preload: function() {
		this.load.bitmapFont('carrier_command', 'assets/font/carrier_command.png', 'assets/font/carrier_command.xml');
		this.load.bitmapFont('04b', 'assets/font/04b30.png', 'assets/font/04b30.xml');
	},
	create: function() {

		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    	this.scale.pageAlignHorizontally = true;
    	this.scale.pageAlignVertically = true;

    	this.game.physics.startSystem(Phaser.Physics.ARCADE);

    	this.state.start('preload');
	}
};