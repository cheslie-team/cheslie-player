var Chess = require('chess.js').Chess;

/* MinMax player example. Commented out since it runs slowly
var minmax = require('./minmax.js').minmax;

exports.move = function (board, callback) {
    var mm = minmax(board, function (board) {
    	return 0; // a number between Number.NEGATIVE_INFINITY and Number.POSITIVE_INFINITY
    });

    callback(mm[0].move);
};
*/

/* RNDJesus
exports.move = function (board, calback) {
    var chess = new Chess(board),
    	moves = chess.moves(),
    	move = moves[Math.floor(Math.random() * moves.length)];

    calback(move);
};
*/

var endgame = require('./endgame.js');

var pieces = function (chess) {
    var letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
    	squares = [];

    for (var i = 1; i <= 8; i++) {
    	letters.forEach(function (letter) {
    		squares.push(letter + i);
    	});
    };

    return squares.map(function (square) {
    	return chess.get(square);
    }).filter(function (val) {
    	return val;
    });
};

exports.move = function (board, callback) {
    var chess = new Chess(board),
    	moves = chess.moves(),
    	move = moves[Math.floor(Math.random() * moves.length)];
    	nop = pieces(chess).length;

    if (nop < 7) {
    	endgame.move(chess, callback);
    } else {
    	callback(move);
    }
};