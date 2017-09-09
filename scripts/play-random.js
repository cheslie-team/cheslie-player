var Chess = require('chess.js').Chess,
    white = require('../ai.js'),
    black = require('../sample-players/rnd-jesus.js'),
    // black = require('../sample-players/endgamer.js'),
    // black = require('../sample-players/minmaxer.js'),
    // black = require('../sample-players/decender.js'),
    chess = new Chess(),

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
    console.log(unicode(chess.ascii() + '\n\r K = White, k = ') + 'Black');
    
    setTimeout(function () {
        play(chess, white, black);
    }, 10);
};

var play = function (chess, white, black) {
    if (chess.game_over()) {
        console.log(reason(chess));
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