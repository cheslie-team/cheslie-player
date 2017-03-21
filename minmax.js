var Chess = require('chess.js').Chess;

var minmaxAlphaBeta = function (fen, depth, alpha, beta, minimizingPlayer, score) {
	var node = new Chess(fen);

	if (node.game_over()) {
		if (node.in_draw()) {
			return 0;
		} else if (node.turn() === minimizingPlayer) {
			return Number.POSITIVE_INFINITY;
		} else {
			return Number.NEGATIVE_INFINITY;
		}
	}
	else if (depth <= 0) {
		return score(node);
	}
	else if (node.turn() === minimizingPlayer) {
		var v = Number.POSITIVE_INFINITY;
		
		node.moves().some(function (child) {
			node.move(child);
			v = Math.min(v, minmaxAlphaBeta(node.fen(), depth - 1, alpha, beta, minimizingPlayer, score));
			node.undo();
			beta = Math.min(beta, v);
			return beta <= alpha; // Beta cut-off
		});

		return v;
	}
	else {
		var v = Number.NEGATIVE_INFINITY;
		
		node.moves().some(function (child) {
			node.move(child);
			v = Math.max(v, minmaxAlphaBeta(node.fen(), depth - 1, alpha, beta, minimizingPlayer, score));
			node.undo();
			alpha = Math.max(alpha, v);
			return beta <= alpha; // Beta cut-off
		});

		return v;
	}
};

var minmax = function (fen, score) {
	var node = new Chess(fen);
	return node.moves().map(function (move) {
		node.move(move)
		var s = minmaxAlphaBeta(node.fen(), 2, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY, node.turn(), score)
		node.undo();
		return {
			move: move,
			score: s
		};
	}).sort(function compare(a, b) {
		if (a.score < b.score) {
	    	return 1;
		}
		return -1;
	});
};

/* should select Qh6+ as best move
var chess2 = new Chess('r1bq2r1/b4pk1/p1pp1p2/1p2pP2/1P2P1PB/3P4/1PPQ2P1/R3K2R w - - 0 1');
console.log(minmax(chess2.fen(), function (fen) {
	return 0;
}));
*/

exports.minmax = minmax;