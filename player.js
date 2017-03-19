var game = require('socket.io-client')('http://192.168.0.24:3000'),
    lobby = require('socket.io-client')('http://192.168.0.24:3030'),
    Chess = require('chess.js').Chess;

game.on('connect', function () {
    console.log('Player is connected to game');
});

lobby.on('join', function (gameId) {
    console.log('Player is joining game: ' + gameId);
    game.emit('join', gameId);
});

game.on('move', function (game) {
    var chess = new Chess();
    chess.load(game.board);
 
    var moves = chess.moves(),
        move = moves[Math.floor(Math.random() * moves.length)];

    console.log(move);
    game.move = move;

    game.emit('move', game);
});
