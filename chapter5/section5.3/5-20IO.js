//把标准输入写到标准输出
process.stdin.resume(); //为stdin填入供读取的缓存，避免数据丢失
process.stdin.setEncoding('utf8');

process.stdin.on('data', function (chunk) {
    process.stdout.write('data: ' + chunk);
});

// 通过管道将标准输入转到标准输出，连接两个数据流最漂亮的方式。
process.stdin.resume();
process.stdin.pipe(process.stdout);