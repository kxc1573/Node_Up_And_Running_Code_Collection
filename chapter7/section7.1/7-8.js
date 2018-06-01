// 可选或必填的路由扩张项
var express = require('express');
var app = express.createServer();

app.get('/users/:id.:format?', function(req, res) {
    res.send(req.params.id + "<br/>" + req.params.format);
    // 会响应：
    // /users/15
    // /users/15.xml
    // /users/15.json
});

app.get('/books/:id.format((json|xml))', function(req, res) {
    res.send(req.params.id + "<br/>" + req.params.format);
    // 会响应:
    // /books/7.json
    // /books/7.xml
    // 不会响应：
    // /books/7
    // /books/7.txt
});

app.listen(8000);
