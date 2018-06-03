// 使用命名空间的Socket.IO服务器
var http = require('http');
var io = require('socket.io');
var fs = require('fs');

var sockFile = fs.readFileSync('socket.html');

server = http.createServer();
server.on('request', function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(sockFile);
});

server.listen(8080);

var socket = io.listen(server);

socket.of('/upandrunning')
    .on('connection', function(client) {
        console.log('Client connected to Up and running namespace.');
        client.send('Welcome to "Up and Running." ');
});

socket.of('/weather')
    .on('connection', function(client) {
        console.log('Client connected to Weather namespace.');
        client.send('Welcome to "Weather Updates." ');
});