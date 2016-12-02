// MAIN GAME ENTRY POINT //
var SpaceBear = SpaceBear || {};

// game def
SpaceBear.game = new Phaser.Game(1920, 1080, Phaser.AUTO, '', null, false, false);

// game states
SpaceBear.game.state.add('boot', SpaceBear.bootState);
SpaceBear.game.state.add('preload', SpaceBear.preloadState);
SpaceBear.game.state.add('menu', SpaceBear.menuState);

// run game
SpaceBear.game.state.start('boot');