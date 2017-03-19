var game = require('socket.io-client')('http://192.168.0.24:3000'),
    lobby = require('socket.io-client')('http://192.168.0.24:3030'),
    Chess = require('chess.js').Chess,

    name = 'RndJesus_' + Math.floor(Math.random() * 100);;

lobby.on('connect', function () {
    console.log('Player ' + name + ' is connected to lobby');
});

lobby.on('join', function (gameId) {
    console.log('Player is joining game: ' + gameId);
    game.emit('join', gameId);
});

game.on('connect', function () {
    console.log('Player ' + name + ' is connected to game');
    //game.emit('join', 'test_game');
});

game.on('move', function (gameState) {
    var chess = new Chess();
    chess.load(gameState.board);
 
    var moves = chess.moves(),
        move = moves[Math.floor(Math.random() * moves.length)];

    console.log(move);
    gameState.move = move;

    game.emit('move', gameState);
});
