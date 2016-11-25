var SpaceBear = SpaceBear || {};

SpaceBear.bootState = function(){};

SpaceBear.bootState.prototype = {
	preload: function() {
		this.load.bitmapFont('carrier_command', 'assets/font/carrier_command.png', 'assets/font/carrier_command.xml');
	},
	create: function() {
		this.game.stage.background = '#02171f';

		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    	this.scale.pageAlignHorizontally = true;
    	this.scale.pageAlignVertically = true;

    	this.game.physics.startSystem(Phaser.Physics.ARCADE);

    	this.state.start('preload');
	}
};