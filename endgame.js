var https = require('https'),
    querystring = require('querystring');

exports.move = function (chess, callback) {
    var query = querystring.stringify({fen: chess.fen()}),
        path = '/api/v2?' + query,
        moves = chess.moves({verbose: true});

    https.get({
        host: 'syzygy-tables.info',
        path: path
    }, function(response) {
        var body = '';
        response.on('data', function(d) {
            body += d;
        });
        response.on('end', function() {
            var parsed = JSON.parse(body);

            if (parsed.bestmove) {
                var move = moves.find(function (move) {
                    return parsed.bestmove.includes(move.from) && parsed.bestmove.includes(move.to);
                });

                if (move) {
                    callback(move.san);
                } else {
                    callback(moves[0].san);    
                }
            } else {
                callback(moves[0].san);
            }
        });
    });
};
