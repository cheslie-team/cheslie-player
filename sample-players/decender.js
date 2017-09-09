var Chess = require('../modules/chess-extended.js').Chess,
    deepening = require('../modules/deepening.js');

exports.move = function (board, doMove) {
    var depth = 3,
        span = 6,
        score = function (chess) {
            // chess is a chess.js instance
            // A number between Number.NEGATIVE_INFINITY and Number.POSITIVE_INFINITY
            return Math.random() * 200 - 100;
        };

    return deepening.move(board, depth, score, span);
};
