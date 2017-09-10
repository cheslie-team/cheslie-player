var Chess = require('./modules/chess-extended.js').Chess;

// Feel free to give your AI a more personal name
exports.name = 'Tørrfisk - ' + Math.floor(Math.random() * 1000);

/*
 * This is where you make your move.
 * You are given a chessboard in FEN format and need to return a move as a SAN string (or a promise resolving to a SAN string)
 * Don't worry to much about FEN and SAN, chess.js can handle all the details :-)
 */
exports.move = function (board) {
	// Make a new chess.js object from the FEN-board
    var chess = new Chess(board),
        moves = chess.moves(), // Get all legal moves
        move = moves[Math.floor(Math.random() * moves.length)];

    return move;
};

/*
 * running npm start in the console will run your AI again a player making random moves.
 * npm test will run some simple tests valitdating that the player makes a legal move.
 * npm run tournament will connect the player to the tournament server.
 */