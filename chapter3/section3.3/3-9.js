// 例3-9 尝试在回调函数中捕获错误但失败了
// 使用Node的非阻塞I/O时，你给函数传递了一个回调函数，
// 这意味着回调函数被事件触发调用时，是不在try/catch代码块中的。

var http = require('http');

var opts = {
    host: 'asdfghjkl.com',
    port: 80,
    path: '/'
};

try {
    http.get(opts, function (res) {
        console.log('Will this get called?');
    });
} catch (e) {
    console.log('Will we catch an error?');
}