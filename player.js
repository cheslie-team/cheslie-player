var io = require('socket.io-client')
    game = io('http://localhost:3000'),
    lobby = io('http://localhost:3030'),
    Chess = require('chess.js').Chess,

    name = 'RndJesus_' + Math.floor(Math.random() * 100);;

lobby.on('connect', function () {
    console.log('Player ' + name + ' is connected to lobby');
    lobby.emit('enter', name);
});

lobby.on('join', function (gameId) {
    console.log('Player is joining game: ' + gameId);
    game.emit('join', gameId);
});

game.on('connect', function () {
    console.log('Player ' + name + ' is connected to game');
});

game.on('move', function (gameState) {
    var chess = new Chess();
    chess.load(gameState.board);
 
    var moves = chess.moves(),
        move = moves[Math.floor(Math.random() * moves.length)];

    console.log(move);
    gameState.move = move;

    setTimeout(function () {
        game.emit('move', gameState);
    }, 100);
});
