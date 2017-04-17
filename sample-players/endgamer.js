var Chess = require('chess.js').Chess,
    rndJesus = require('../sample-players/rnd-jesus.js')
    endgame = require('../modules/endgame.js');

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

exports.move = function (board, doMove) {
    var chess = new Chess(board),
    	nop = pieces(new Chess(board)).length;

    if (nop < 7) {
    	endgame.move(board, doMove, function (err) {
            console.log(err);
            rndJesus.move(board, doMove);
        });
    } else {
    	rndJesus.move(board, doMove);
    }
};