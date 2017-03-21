var Chess = require('chess.js').Chess;

exports.bestMove = function (board) {
    var chess = new Chess(board);
    var moves = chess.moves()
    return moves[Math.floor(Math.random() * moves.length)];
}