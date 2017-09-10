var Chess = require('../modules/chess-extended.js').Chess,
    endgame = require('../modules/endgame.js'),
    rndJesus = require('../sample-players/rnd-jesus.js');

exports.move = function (board) {
    var chess = new Chess(board);

    if (chess.numberOfPieces() <= 5) {
        // This will return a promise
        return endgame.move(board);
    } else {
        return rndJesus.move(board);
    }
};