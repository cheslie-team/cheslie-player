var Chess = require('../modules/chess-extended.js').Chess;

exports.move = function (board, doMove) {
    var chess = new Chess(board),
    	moves = chess.moves(),
    	move = moves[Math.floor(Math.random() * moves.length)];

    doMove(move);
};