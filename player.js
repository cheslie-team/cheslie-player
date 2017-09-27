var config = require('cheslie-config'),
    io = require('socket.io-client'),
    ai = require('./ai.js'),
    game = io(config.game.url),
    tournament = io(config.tournament.url),
    name = ai.name;

tournament.joinGame = (gameId) => {
    console.log('Player is joining game: ' + gameId);
    if (game.connected) {
        game.emit('join', gameId, name);
    } else {
        tournament.emit('leave');
        game.connect();
    }
}

tournament
    .on('connect', () => {
        console.log('Player ' + name + ' is connected to ' + config.tournament.app.name);
        tournament.emit('enter', name);
    })
    .on('reconnect', () => {
        if (game.connected) {
            tournament.emit('enter', name);
        }
    })
    .on('join', tournament.joinGame);

game.emitMove = (gameState, move) => {
    gameState.move = move;
    game.emit('move', gameState);
};
game.doMove = (gameState) => {
    var move = ai.move(gameState.board);
    if (typeof move === "string") {
        game.emitMove(gameState, move);
    } else {
        move.then(move => {
            game.emitMove(gameState, move);
        }).catch(err => {
            console.log(err.error);
            game.emitMove(gameState, err.move);
        });
    }
}

game
    .on('connect', () => {
        if (tournament.connected) tournament.emit('enter', name);
        console.log('Player ' + name + ' is connected to ' + config.game.app.name);
    })
    .on('move', game.doMove)
    .on('disconnect', () => {
        tournament.emit('leave');
        game.connect();
    });