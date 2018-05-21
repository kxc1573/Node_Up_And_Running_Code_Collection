var fs = require('fs');

// 异步读取并删除文件——这是错误的
fs.readFile('warandpeace.txt', function(e, data) {
    console.log('War and Peace: ' + data);
});
fs.unlink('warandpeace.txt');

// 通过嵌入回调函数完成异步读取并删除文件
fs.readFile('warandpeace.txt', function(e, data) {
    console.log('War and Peace: ' + data);
    fs.unlink('warandpeace.txt');
});

/*也可以使用同步方法fs.readFileSync*/