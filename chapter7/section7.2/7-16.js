
var http = require('http');
var io = require('socket.io');

// Socket.IO依赖HTTP服务器
server = http.createServer();
server.on('request', function(req, res) {
    // 常见的http服务器内容
    res.wraiteHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World');
});

server.listen(8080);

// 创建Socket.IO服务器
var socket = io.listen(server);

socket.on('connection', function(client) {
    console.log('Client connected');
});

/*
Socket.IO并不关心HTTP服务器做什么，它只是把自带的事件监听器
包装再发送到服务器的所有请求上，该监听器会查找从Socket.IO客户
端发来的请求，并对应处理。对于其它请求，它会以原本的工作方式
传递给HTTP服务器。
*/

// 与Socket.IO服务器交互的小王爷
/*
    <!DOCTYPE html>
    <html>
      <body>
        <script src="/socket.io/socket.io.js"></script>
        <script>
          var socket = io.connect('http://localhost:8080');
          socket.on('message', function(data){ console.log(data) })
        </script>
      </body>
    </html>    
*/
