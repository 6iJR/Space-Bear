var SpaceBear = SpaceBear || {};

// game def
SpaceBear.game = new Phaser.Game(1200, 920, Phaser.AUTO, '', null, false, false);

// game states
SpaceBear.game.state.add('boot', SpaceBear.bootState);
SpaceBear.game.state.add('preload', SpaceBear.preloadState);
SpaceBear.game.state.add('menu', SpaceBear.menuState);
SpaceBear.game.state.add('play', SpaceBear.playState);
SpaceBear.game.state.add('final', SpaceBear.finalState);

// run game
SpaceBear.game.state.start('boot');