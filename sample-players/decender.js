var Chess = require('../modules/chess-extended.js').Chess,
    deepening = require('../modules/deepening.js');

exports.move = function (board) {
	var depth = 3,
		score = function (chess) { // chess is a chess.js instance
			var playingAsColor = chess.turn(); // Is your player playing as white or black?
			return chess.numberOfPieces(playingAsColor); // Return a number between Number.NEGATIVE_INFINITY and Number.POSITIVE_INFINITY
		},
		span = 3;

    return deepening.move(board, depth, score, span);
};
