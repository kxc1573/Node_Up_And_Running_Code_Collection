// 提交HTTP GET请求

var http = require('http');

// 1.使用http.request工厂方法，指定method参数
var opts1 = {
    host: 'www.google.com',
    port: 8080,
    path: '/',
    method: 'GET'
};
var req1 = http.request(opts1, function(res) {
    console.log(res);
    res.on('data', function(data) {
        console.log(data);
    });
});
req1.end();

// 2.直接使用http.get工厂方法
var opts2 = {
    host: 'www.google.com',
    port: 8080,
    path: '/',
};
var req2 = http.get(opts2, function(res) {
    console.log(res);
    res.on('data', function(c) {    // 3-1 对比裸Buffer输出
        console.log(c);
    });
});
req2.end();

var req3 = http.get(opts2, function(res) {
    res.setEncoding('utf8');   // 3-2 对比指定编码格式的输出
    res.on('data', function(c) {
        console.log(c);
    });
});