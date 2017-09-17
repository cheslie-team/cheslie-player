var Chess = require('../modules/chess-extended.js').Chess,
    white = require('../ai.js'),
    black = require('../sample-players/rnd-jesus.js'),
    // black = require('../sample-players/endgamer.js'),
    // black = require('../sample-players/minmaxer.js'),
    // black = require('../sample-players/decender.js'),
    chess = new Chess(),
    chessboardjs,
    chessBoard,
    inBrowser = (typeof window !== 'undefined'),
    SUPPORT_UNICODE = true,
    unicodeMap = {
        'K': '\u2654',
        'Q': '\u2655',
        'R': '\u2656',
        'B': '\u2657',
        'N': '\u2658',
        'P': '\u2659',
        'k': '\u265A',
        'q': '\u265B',
        'r': '\u265C',
        'b': '\u265D',
        'n': '\u265E',
        'p': '\u265F'
    };

var unicode = function (ascii) {
    if (!SUPPORT_UNICODE) {
        return ascii;
    }
    return Object.keys(unicodeMap).reduce(function (acc, val) {
        return acc.replace(new RegExp(val, 'g'), unicodeMap[val]);
    }, ascii);
};

var reason = function (chess) {
    if (chess.in_checkmate()) {
        var winner = chess.turn() === 'w' ? 'Black' : 'White';
        return winner + ' won by checkmate';
    }

    if (chess.insufficient_material()) {
        return 'Draw by insufficient material';
    }

    if (chess.in_stalemate()) {
        return 'Draw by stalemate';
    }

    if (chess.in_threefold_repetition()) {
        return 'Draw by threefold repetition';
    }

    return 'Draw since the game lasted over 100 moves';
};

var doMove = function (chess, white, black, move) {
    chess.move(move);
    updateChessBoard(chess);
    console.log(unicode(chess.ascii() + '\n\r K = White, k = ') + 'Black');
    setTimeout(function () {
        play(chess, white, black);
    }, 10);
};

var initChessBoard = function (chess) {
    if (!inBrowser) return;
    chessboardjs = require('../modules/vendor/chessboardjs0.3.0/js/chessboard-0.3.0.js'),
        window.$ = require("jquery");
    chessBoard = ChessBoard('chess-board', {
        pieceTheme: '../modules/vendor/chessboardjs0.3.0/img/chesspieces/wikipedia/{piece}.png',
        position: chess.fen()
    });
}

var updateChessBoard = function (chess) {
    if (!inBrowser) return;
    chessBoard.position(chess.fen(), false);
}

var setStatus = function (status) {
    console.log(status);
    if (inBrowser) {
        $("#status").text("");
        $("#status").text(status);
    }

}

var play = function (chess, white, black) {
    initChessBoard(chess);
    if (chess.game_over()) {
        setStatus(reason(chess))
        return;
    };
    var board = chess.fen(),
        player = chess.turn() === 'w' ? white : black;
    move = player.move(board);

    if (typeof move === "string") {
        doMove(chess, white, black, move);
    } else {
        move.then(function (move) {
            doMove(chess, white, black, move);
        }).catch(function (err) {
            console.log(err.error);
            doMove(chess, white, black, err.move);
        });
    }
};

play(chess, white, black);