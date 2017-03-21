var Chess = require('chess.js').Chess;

/* MinMax player example. Commented out since it runs slowly
var minmax = require('./minmax.js').minmax;

exports.bestMove = function (board) {
    return minmax(board, function (board) {
    	return 0; // a number between Number.NEGATIVE_INFINITY and Number.POSITIVE_INFINITY
    })[0].move;
};
*/

exports.bestMove = function (board) {
    var chess = new Chess(board);
    var moves = chess.moves()
    return moves[Math.floor(Math.random() * moves.length)];
}