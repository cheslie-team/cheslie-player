var Chess = require('chess.js');
if (typeof window === 'undefined') {
    Chess = Chess.Chess;
}

exports.Chess = function (fen) {
    var chess = new Chess(fen),
        numberOfMoves = 0,
        _move = chess.move,
        _game_over = chess.game_over;

    chess.pieces = function (color) {
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
            if (color && val) {
                return val.color === color;
            }
            return val;
        });
    };

    chess.numberOfPieces = function (color) {
        return chess.pieces(color).length;
    };

    chess.movesInformation = function () {
        return chess.moves({ verbose: true });
    };

    chess.move = function (arg) {
        numberOfMoves++;
        _move(arg);
    };

    chess.game_over = function () {
        return numberOfMoves >= 100
            || _game_over();
    };

    return chess;
};