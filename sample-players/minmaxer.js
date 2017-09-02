var Chess = require('../modules/chess-extended.js').Chess,
	minmax = require('../modules/minmax.js');

exports.move = function (board, doMove) {
	var depth = 2,
		score = function (chess) {
	        // chess is a chess.js instance
	    	// A number between Number.NEGATIVE_INFINITY and Number.POSITIVE_INFINITY
	    	return Math.random() * 200 - 100;
	    };

    return minmax.move(board, depth, score);
};
