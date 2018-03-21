// Node中的无序并行I/O（模式）

var fs = require('fs');

fs.readFile('foo.txt', 'utf-8', function (err, data) {
    console.log(data);
});

fs.readFile('bar.txt', 'utf-8', function (err, data) {
    console.log(data);
});