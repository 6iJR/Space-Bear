var SpaceBear = SpaceBear || {};

// game def
SpaceBear.game = new Phaser.Game(1300, 850, Phaser.AUTO, '', null, false, false);

// game states
SpaceBear.game.state.add('boot', SpaceBear.bootState);
SpaceBear.game.state.add('preload', SpaceBear.preloadState);
SpaceBear.game.state.add('menu', SpaceBear.menuState);
SpaceBear.game.state.add('play', SpaceBear.playState);

// run game
SpaceBear.game.state.start('boot');