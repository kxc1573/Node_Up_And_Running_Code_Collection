// 定义Express中的全局模板引擎
var express = require('express');
var app = express.createServer();

// 将Jade引擎作为默认的模板引擎
app.set('view engine', 'jade');

app.get('/', function(req, res) {
    // 在render的时候依然可以修改引擎
    // 默认Jade模板引擎的前提下
    // 此处batterstar实际代表了/views/battlestar.jade
    // 且会使用/views/layout.jade文件作为布局
    res.render('battlestar');
});

// layout文件
/*
    html 
      body
        h1 Batterstar Galactica Fan Page
        != body
*/

// ！=body  // 变量body
/*
不要混淆变量body与关键字body
当layout=true时，render方法会把第一个参数的内容解析出来，
然后把渲染好的输出以变量body传递给他layout
*/

// battlestar.jade文件
/*
    p Welcome to the fan page
*/