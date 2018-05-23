// 使用vm和eval()在访问本地作用域时的区别
var vm = require('vm');
var e = 0;
var v = 0;

eval(e=e+1);    // eval()运行在当前作用域
console.log(e);

// vm.runInThisContext('v=v+1');
// ReferenceError: v is not defined

// vm实际运行在每一个实例的内部，维护自身的本地上下文，且能保持状态。
console.log(vm.runInThisContext('v=0'));
console.log(vm.runInThisContext('v=v+1'));


// 通过第二个参数将对象传入vm作为上下文
// runInNewContext是创建新的上下文作用域的意思么？？
var context = {alphabet: ""};
console.log(vm.runInNewContext("alphabet+='a'", context));
console.log(vm.runInNewContext("alphabet+='b'", context));
console.log(context);
