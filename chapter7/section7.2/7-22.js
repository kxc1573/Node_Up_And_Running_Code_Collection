// Socket.IO绑定到Express应用上：服务器代码
var app = require('express').createServer();
var io = require('socket.io').listen(app);

app.listen(8080);

app.get('/', function(req, res) {
    res.sendfile(__dirname + '/socket_express.html');
});

io.sockets.on('connection', function(socket) {
    // 服务端可以发起事件（websocket）
    socket.emit('news', {
        title: 'Welcome to World News',
        contents: 'This news  flash was sent from Node.js!',
        allowResponse: true
    });
    sockent.on('scoop', function(data) {
        socket.emit('news', {
            title: 'Circular Emission Worked',
            contens: 'Received this content: ' + data.contents
        });
    });
});
