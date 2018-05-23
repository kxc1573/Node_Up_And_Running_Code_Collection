// nextTick()函数创建一个回调函数，直接访问事件循环。

// 用process.nextTick()往事件循环队列中插入回调函数
var http = require('http');
var s = http.createServer(function (req, res) {
    res.writeHead(200, {});
    res.end('foo');
    console.log('http response');
    process.nextTick(function () {console.log('tick');});
});
s.listen(8000);
// 每次请求后输出日志为：
/*
    'http response'
    'tick'
*/


// 在其他代码异常之后，nextTick()继续工作
process.on('uncaughtException', function (e) {
    console.log(e);
});

process.nextTick(function () {
    console.log('tick');
});

process.nextTick(function () {
    iAmAMistake();
    console.log('tock');
});

process.nextTick(function () {
    console.log('tick tock');
});
console.log('End of lst loop');

// 输出为：
/*
    'End of lst loop'
    'tick'
    {stack: [Getter/Setter],
     arguments: ['iAmAMistake']
     type: [Getter/Setter] }
    'tick tock'
*/
