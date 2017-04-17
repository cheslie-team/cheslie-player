var Chess = require('../modules/chess-extended.js').Chess,
    endgame = require('../modules/endgame.js'),
    rndJesus = require('../sample-players/rnd-jesus.js');

exports.move = function (board, doMove) {
    var chess = new Chess(board);

    if (chess.number_of_pieces() < 7) {
    	endgame.move(board, doMove, function (err) {
            console.log(err);
            rndJesus.move(board, doMove);
        });
    } else {
    	rndJesus.move(board, doMove);
    }
};