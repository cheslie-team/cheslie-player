var socket = require('socket.io-client')('http://localhost:3000');

socket.on('connect', function () {
    console.log('Player is connected');
});
