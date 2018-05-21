// 简单地HTTP服务器

// 4-7 链式写法
require('http').createServer(function(req,res){res.writeHead(200, {});
res.end('hello world');}).listen(8125);

// 可读性更好的写法，且可重用
var http = require('http');
var server = http.createServer();
var handleReq = function(req, res) {
    res.writeHead(200, {});
    res.end('hello world');
};
sever.on('request', handleReq);
server.listen(8125);