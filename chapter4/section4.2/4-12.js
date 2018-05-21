// 往上传服务写入数据，HTTP POST和PUT

var options = {
    host: 'www.example.com',
    port: 80,
    path: '/submit',
    method: 'POST'  // 'PUT'
};

var req = http.request(options, function(res) {
    res.setEncoding('utf8');
    res.on('data', function(chunk) {
        console.log('BODY: ' + chunk);
    });
});

req.write("my data");
req.write("more of my data");

req.end();