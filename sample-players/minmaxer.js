var Chess = require('chess.js').Chess,
	minmax = require('../modules/minmax.js');

exports.move = function (board, doMove) {
    minmax.move(board, doMove, function (board) {
    	// A number between Number.NEGATIVE_INFINITY and Number.POSITIVE_INFINITY
    	return Math.random() * 200 - 100;
    }, 2);
};
