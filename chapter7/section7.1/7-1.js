var express = require('express');

var app = express.http.createServer();

// 7-6把控制权给下一个路由
app.get('/users/:id', function(req, res, next) {
    var id = req.params.id;

    if (checkPermission(id)) {
        // 显示个人页面
    } else {
        next();
    }
});
app.get('/users/:id', function(req, res){
    // 显示公共页面
});


// 7-5用正则表达式的同时指定变量类型
app.get('/:id(\\d+)', function(req, res) {
    res.send(req.params[0]);
});


// 7-4用正则表达式来定义路由
app.get(/\/(\d+)/, function(req, res) {
    req.send(req.params([0]));
});


// 7-3在路由中使用通配符*
app.get('/a*', function(req, res) {
    res.send('a');
    // 匹配 /afoo /a.bar /a/qux等
});
app.get('/b*/c*d', function(req, res){
    res.send('b');
    // 匹配 /b/cd /b/cfood /b//c/d/等
    // 不匹配 /b/c/d/foo
});
app.get('*', function(req, res) {
    res.send('*');
    // 匹配 /a /c /b/cd /b/c/d /b/c/d/foo
    // 不匹配 /afoo /bfoo/cbard (顺序匹配，被前面截胡了)
});

// 7-2在express中设置路由
app.get('/:id?', function(req, res) {
    if(req.param.id) {
        res.send(req.param.id);
    } else {
        res.send('oh hai');
    }
});


// 7-1创建一个简单的Express应用
// 前面漏下的都能匹配
app.get('/', function(req, res) {
    res.send('hello world');
});

app.listen(9001);