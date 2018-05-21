// 使用缓冲池模型来读取完整的流数据

// stream是个抽象的数据流
var spool = '';
stream.on('data', function(data) {
    spool += data;
});
stream.on('end', function() {
    console.log(spool);
});