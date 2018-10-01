var Chess = require('./chess-extended.js').Chess;
https = require('https'),
    querystring = require('querystring');

var getEndgameMove = function (board) {
    var query = querystring.stringify({
            fen: board
        }),
        path = '/v1/syzygy?' + query,
        moves = new Chess(board).moves({
            verbose: true
        });

    return new Promise(function (resolve, reject) {
        https.get({
            host: 'cheslie-endgame.azurewebsites.net',
            path: path
        }, function (response) {
            if (response.statusCode < 200 || response.statusCode > 299) {
                return reject({
                    error: 'Failed to load page, status code: ' + response.statusCode,
                    move: moves[Math.floor(Math.random() * moves.length)].san
                })
            }

            var body = '';
            response.on('data', function (data) {
                body += data;
            });

            response.on('end', function () {
                var parsed = JSON.parse(body);
                if (parsed.bestMove) {
                    var move = moves.find(function (move) {
                        return parsed.bestMove.includes(move.from) && parsed.bestMove.includes(move.to);
                    });
                    if (move) {
                        resolve(move.san);
                    }
                } else {
                    reject({
                        error: 'Endgame failed to return a legal move',
                        move: moves[Math.floor(Math.random() * moves.length)].san
                    });
                }
            }).on('error', function (err) {
                reject({
                    error: err,
                    move: moves[Math.floor(Math.random() * moves.length)].san
                });
            });
        });
    });
};

exports.move = function (board) {
    return getEndgameMove(board);
};

/*
// Some quick and dirty tests

var chess = new Chess('2b1k3/8/8/8/8/8/2P5/1N2K3 b - - 0 1');
getEndgameMove(chess.fen())
    .then((move) => console.log(move))
    .catch((err) => console.log(err));


var chess = new Chess('2b1k3/3n4/8/8/8/8/2P5/1N2K3 b - - 0 1');
getEndgameMove(chess.fen())
    .then((move) => console.log(move))
    .catch((err) => console.log(err));

getEndgameMove('lolz-so-wrong')
    .then((move) => console.log(move))
    .catch((err) => console.log(err));
*/