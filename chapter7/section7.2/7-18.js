// 一个简单的Socket.IO服务器
// 在7-16上的小小改进
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

socket.on('connection', function(client) {
    console.log('Client connected');
    client.send('Welcome client ' + client.sessionId);
});