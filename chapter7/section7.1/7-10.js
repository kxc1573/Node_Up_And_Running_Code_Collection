// 一些流行的引擎有Haml、Jade、Embedded Javascript（EJ）、
// CoffeeKup（基于CoffeeScript的引擎）和jQuery模板。

var express = require('express');
var app = express.createServer();

// Express中使用简单的Jade模板
app.get('/', function(req, res) {
    // pageTitle是一个占位符，表明jade文件中有这么个变量
    res.render('index.jade', {pageTitle: 'Jade Example', layout: false});
});

app.listen(8080);

// 所使用的的Jade文件
/*
!!!5                        // HTML5
html(lang="en")
  head
    title = pageTitle       // 把变量pageTitle的内容插入到此处
  body
    h1 Hello, World
    p This is an example of Jade.
*/