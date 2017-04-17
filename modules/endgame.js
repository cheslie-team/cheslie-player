var Chess = require('chess.js').Chess,
    https = require('https'),
    querystring = require('querystring');

var getEndgameMove = function (board, doMove, fail) {
    var query = querystring.stringify({fen: board}),
        path = '/api/v2?' + query,
        moves = new Chess(board).moves({verbose: true});

    https.get({
        host: 'syzygy-tables.info',
        path: path
    }, function(response) {
        if (response.statusCode !== 200) {
            fail(response);
        }

        var body = '';
        response.on('data', function(d) {
            body += d;
        });

        response.on('end', function() {
            var parsed = JSON.parse(body);
            if (!parsed.bestmove) {
                fail(parsed);
                return;
            }

            var move = moves.find(function (move) {
                return parsed.bestmove.includes(move.from) && parsed.bestmove.includes(move.to);
            });
            if (move) {
                doMove(move.san);
            } else {
                fail(parsed);
            }
        });
    });
};

exports.move = function (board, doMove) {
    setTimeout(function() {
        getEndgameMove(board, doMove)
    }, 1000);
};
