var should = require('chai').should(),
    Chess = require('chess.js').Chess,
    ai = require('./../ai.js');

describe('When the ai is asked to generate å move', () => {
    var chess = new Chess();
    var generatedMove;

    before('Make the ai generate a move', () => ai.move(chess.fen(), (move) => generatedMove = move));


    it('should generate a move in a string representation', () => {
        generatedMove.should.be.a('string');
    });

    it('should generate a legal move', () => {
        chess.moves().should.include(generatedMove);
    });
});