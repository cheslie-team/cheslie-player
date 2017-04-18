var Chess = require('./chess-extended.js').Chess;

var minOrMax = function (a, b, maximizing) {
	if (maximizing && a.score > b.score) {
		return a;
	}
	if (!maximizing && a.score < b.score) {
		return a;
	}
	return b;
}

var exploreChildren = function (board, moves, depth, alphaBeta, maximizing, score, v) {
	if (alphaBeta.beta <= alphaBeta.alpha || moves.length === 0) {
		return v;
	}

	var child = moves.pop();

	v = minOrMax(v, minmaxAlphaBeta(board, depth - 1, alphaBeta, !maximizing, score, child), maximizing);

	alphaBeta = {
		alpha: maximizing ? Math.max(alphaBeta.alpha, v.score) : alphaBeta.alpha,
		beta: maximizing ? alphaBeta.beta : Math.min(alphaBeta.beta, v.score)
	};

	return exploreChildren(board, moves, depth, alphaBeta, maximizing, score, v);
}

var minmaxAlphaBeta = function (fen, depth, alphaBeta, maximizing, score, child) {
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

	var v = exploreChildren(node.fen(), node.moves(), depth, alphaBeta, maximizing, score, maximizing ? loosing : winning);
	
	return { score: v.score, move: child ? child : v.move };
};

var minmax = function (fen, score, depth) {
	var node = new Chess(fen);
	return minmaxAlphaBeta(fen, depth, {alpha: Number.NEGATIVE_INFINITY, beta: Number.POSITIVE_INFINITY}, true, score, null);
};

exports.move = function (board, doMove, score, depth) {
	doMove(minmax(board, score, depth).move);
};

/* should select Qh6+ as best move
var chess2 = new Chess('r1bq2r1/b4pk1/p1pp1p2/1p2pP2/1P2P1PB/3P4/1PPQ2P1/R3K2R w - - 0 1');
console.log(minmax(chess2.fen(), function (fen) {
	return 0;
}, 3));
*/

/* should select Kb6 as best move
var chess2 = new Chess('Q4B2/1kP2p1p/4bp1B/R2PPR1r/5P2/2Q2K2/8/1N5B b - - 0 1');
console.log(minmax(chess2.fen(), function (fen) {
	return 0;
}, 4));
*/