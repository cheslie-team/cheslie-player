var Chess = require('./chess-extended.js').Chess;

var minOrMax = function (a, b, maximizing) {
    if (maximizing && a.score > b.score) {
        return a;
    }
    if (!maximizing && a.score < b.score) {
        return a;
    }
    return b;
};

var exploreChildren = function (board, moves, depth, span, maximizing, score, v) {
    if (moves.length === 0) {
        return v;
    }

    var child = moves.pop();

    v = minOrMax(v, decent(board, depth - 1, span, !maximizing, score, child), maximizing);

    return exploreChildren(board, moves, depth, span, maximizing, score, v);
};

var firstInteresting = function (moves, score, n) {
    var interesting = moves.map(function (move) {
            return {score: score(move), move: move};
        })
        .sort(function (a, b) {
            if (a.score < b.score) return -1;
            if (a.score > b.score) return 1;
            return 0;
        })
        .map(function (move) {
            return move.move;
        });


    if (interesting.length >= n) {
        return interesting.slice(0, n);
    }
    return interesting;
};

var decent = function (fen, depth, span, maximizing, score, child) {
    var node = new Chess(fen),
        winning = { score: Number.POSITIVE_INFINITY, move: child },
        loosing = { score: Number.NEGATIVE_INFINITY, move: child };

    if (child) {
        node.move(child);
    }

    if (node.game_over()) {
        if (node.in_draw()) {
            return { score: 0, move: child };
        }

        return maximizing ? loosing : winning;
    }

    if (depth <= 0) {
        return { score: score(node), move: child };
    }

    var interestingMoves = firstInteresting(node.moves(), score, span);
    var v = exploreChildren(node.fen(), interestingMoves, depth, span, maximizing, score, maximizing ? loosing : winning);
    
    return { score: v.score, move: child ? child : v.move };
};

var deepening = function (fen, score, depth, span) {
    return decent(fen, depth, span, true, score, null);
};

exports.move = function (board, depth, score, span) {
    return deepening(board, score, depth, span).move;
};

/*
console.time('deepening');

console.log('Case #1');
var chess2 = new Chess('r1bq2r1/b4pk1/p1pp1p2/1p2pP2/1P2P1PB/3P4/1PPQ2P1/R3K2R w - - 0 1');
console.log(deepening(chess2.fen(), function (fen) {
    return 0;
}, 3, 10));

console.log('Case #2');
var chess2 = new Chess('Q4B2/1kP2p1p/4bp1B/R2PPR1r/5P2/2Q2K2/8/1N5B b - - 0 1');
console.log(deepening(chess2.fen(), function (fen) {
    return 0;
}, 4, 10));

console.timeEnd('deepening');
*/