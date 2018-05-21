// EventEmitter改变了上下文

// outputThis方法作为事件监听器绑定在output事件上
// 在不同的上下文中触发output事件时，均保持在EventEmitter对象所在的作用域中
var EventEmitter = require('events').EventEmitter;
var util = require('util');

var Server = function() {};
util.inherits(Server, EventEmitter);
Server.prototype.outputThis = function(output) {
    console.log(this);
    console.log(output);
};

Server.prototype.emitOutput = function(input) {
    this.emit('output', input);
};

Server.prototype.callEmitOutput = function() {
    this.emitOutput('innerEmitOutput');
};

var s = new Server();
s.on('output', s.outputThis);

s.emitOutput('outerEmitOutput');
s.callEmitOutput();
s.emit('output', 'Direct');