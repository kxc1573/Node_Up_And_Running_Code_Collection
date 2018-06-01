// 使用app.all()来处理不同的HTTP动作和路由，然后交回控制权

var express = require('express');

var app = require('app');

var users = [{name: 'tj'}, {name: 'tom'}];

// app.all表示所有HTTP动作都处理
// 每当回调函数被触发时，变量.req其实都指向中间件所持有的request对象
// 所以使用中间件的所有函数和路由对request对象的任何操作都是可见的。
app.all('/user/:id/:op?', function(req, res, next) {
    req.user = users[req.params.id];

    if (req.user) {
        next();
    } else {
        next(new Error('Cannot find user with ID: ' + req.params.id));
    }
});

app.get('/user/:id', function(req, res) {
    res.send('Viewing ' + req.user.name);
});

app.get('/user/:id/edit', function(req, res) {
    res.send('Editing ' + req.user.name);
});

app.put('/user/:id', function(req, res) {
    res.send('Updating ' + req.user.name);
});

app.get('*', function(req, res) {
    res.send('Danger, Will Robinson!', 404);
});

app.listen(3000);
