var socket = require('socket.io-client')('http://192.168.0.24:3000'),
    Chess = require('chess.js').Chess;

socket.on('connect', function () {
    console.log('Player is connected');
});

socket.on('move', function (game) {
    var chess = new Chess();
    chess.load(game.board);
 
    var moves = chess.moves(),
        move = moves[Math.floor(Math.random() * moves.length)];

    console.log(move); 
    game.move = move;

    socket.emit('move', game);
});
