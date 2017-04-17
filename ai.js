var Chess = require('./modules/chess-extended.js').Chess;

// var rndJesus = require('./sample-players/rnd-jesus.js');
// var endgamer = require('./sample-players/endgamer.js');
// var minmaxer = require('./sample-players/minmaxer.js');

exports.name = 'Tørrfisk - ' + Math.floor(Math.random() * 1000);

// rnd-jesus.js
exports.move = function (board, doMove) {
    var chess = new Chess(board),
        moves = chess.moves(),
        move = moves[Math.floor(Math.random() * moves.length)];

    doMove(move);
};
