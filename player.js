var config = require('cheslie-config'),
    io = require('socket.io-client'),
    ai = require('./ai.js'),
    game = io(config.game.url),
    lobby = io(config.lobby.url),
    name = ai.name;

lobby.on('connect', function () {
    console.log('Player ' + name + ' is connected to lobby');
    lobby.emit('enter', name);
});

lobby.on('join', function (gameId) {
    console.log('Player is joining game: ' + gameId);
    game.emit('join', gameId, name);
});

game.on('connect', function () {
    console.log('Player ' + name + ' is connected to game');
});

game.on('move', function (gameState) {
    gameState.move = ai.move(gameState.board);

    setTimeout(function () {
        game.emit('move', gameState);
    }, 100);
});
