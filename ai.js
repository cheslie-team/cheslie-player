var Chess = require('chess.js').Chess;

// var rndJesus = require('./sample-players/rnd-jesus.js');
// var endgamer = require('./sample-players/endgamer.js');
// var minmaxer = require('./sample-players/minmaxer.js');

// rnd-jesus.js
exports.move = function (board, doMove) {
    var chess = new Chess(board),
        moves = chess.moves(),
        move = moves[Math.floor(Math.random() * moves.length)];

    doMove(move);
};
