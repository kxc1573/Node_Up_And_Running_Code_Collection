// 创建一个新类支持EventEmitter事件

// 书上印刷为 require('utils')，实则为util
var utils = require('util');
var EventEmitter = require('events').EventEmitter;

var Server = function () {
    console.log('init');
};

utils.inherits(Server, EventEmitter);

var s = new Server();

// 'abc'是事件名称
s.on('abc', function () {
    console.log('abc');
});

// 4-1 使用on方法监听事件
// server.on('event', function (a, b, c) {
//     // to do 具体操作
// });

// 4-3 触发一个事件
s.emit('abc');

// 4-4 触发事件的时候传递参数
// s.emit('abc', a, b, c)