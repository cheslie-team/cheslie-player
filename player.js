var config = require('cheslie-config'),
    io = require('socket.io-client'),
    ai = require('./ai.js'),
    game = io(config.game.url),
    tournament = io(config.tournament.url),
    name = ai.name;

tournament.on('connect', function () {
    console.log('Player ' + name + ' is connected to ' + config.tournament.app.name);
    tournament.emit('enter', name);
});

tournament.on('join', function (gameId) {
    console.log('Player is joining game: ' + gameId);
    game.emit('join', gameId, name);
});

game.on('connect', function () {
    console.log('Player ' + name + ' is connected to ' + config.game.app.name);
});

var emitMove = function (gameState, move) {
    gameState.move = move;
    game.emit('move', gameState);
};

game.on('move', function (gameState) {
    var move = ai.move(gameState.board);
    if (typeof move === "string") {
        emitMove(gameState, move);
    } else {
        move.then(function (move) {
            emitMove(gameState, move);
        }).catch(function (err) {
            console.log(err.error);
            emitMove(gameState, err.move);
        });        
    }
});
