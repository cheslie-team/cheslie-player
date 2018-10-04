const Chess = require('./chess-extended.js').Chess;
const Minmax = require('minmax-wt-alpha-beta-pruning');

const listMoves = gameState => gameState.moves(),
    nextState = (gameState, move) => {
        const newState = new Chess(gameState.fen());
        newState.move(move);
        return newState
    },
    terminalStateEval = (gameState) => {
        if (!gameState.game_over()) return null;
        if (gameState.in_draw()) return 0;
        return Number.NEGATIVE_INFINITY;
    }

exports.move = function (board, depth, score) {;
    return Minmax.minmax(new Chess(board), {
        listMoves,
        nextState,
        terminalStateEval
    }, score, depth).bestMove;
};