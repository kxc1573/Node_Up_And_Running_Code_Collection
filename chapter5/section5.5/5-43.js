// 用vm把代码编译成脚本对象
var vm = require('vm');
// var fs = require('fs');

// var code = fs.readFileSync('example.js');
// code.toString();
// 'console.log(output);\n'

var s = 'console.log(output);\n';
var code = Buffer.from(s);

// 编译为vm.Script对象后，直接调用
var script = vm.createScript(code);
script.runInNewContext({"console": console, "output": "Kick Ass"});
