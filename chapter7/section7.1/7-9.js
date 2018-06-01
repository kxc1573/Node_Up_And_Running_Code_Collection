// 用Express处理表单
var express = require('express');
var app = require('app');

app.use(express.limit('1mb'));  // 限制正文1MB大小
app.use(express.bodyParser());
app.use(express.methodOverride());

// 把代码逻辑和表现层标记混在一起是一个糟糕的做法
app.get('/', function(req, res) {
    res.send('<form method:"post" action="/">' +
             '<input type="hidden" name="_method" value="put" />' +
             'Your Name: <input type="text" name="username" />' +
             '<input type="submit" />' +
             '</form>');
});

app.put('/', function(req, res) {
    res.send('Welcome, ' + req.body.username);
});

app.listen(8080);
