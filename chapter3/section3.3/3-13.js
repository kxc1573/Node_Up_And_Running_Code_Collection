// 例3-13 通过消息传递来监控工作进程状态

/**
    处理共享socket之外，由于cluster是基于child_process模块的，它还可以
用来检测子进程健康状态。
    可以让工作进程在传消息给主进程的时候，报告自己的状态。
    借此实现运维团队检测系统健康状态的功能
*/

var chluster = require('cluster');
var http = require('http');
var os = require('os');

var numCPUs = os.cpus().length;
var rssWarn = (12 * 1024 * 1024);
var hepWarn = (10 * 1024 * 1024);

if (cluster.isMaster) {     // 主进程
    for (var i = 0; i < numCPUs; i++) {
        var worker = cluster.fork();
        worker.on('message', function (m) {
            if (m.memory) {
                if (m.memory.rss > rssWarn) {
                    console.log('Worker ' + m.process + ' using to much memory.');
                }
            }
        });
    }
} else {
    // 工作进程创建http服务器
    http.Server(function (req, res) {
        res.writeHead(200);
        res.end("hello world\n");
    }).listen(8000);

    // 每秒报告一次状态
    setInterval(function report () {
        process.send({memory: process.memoryUsage(), process: process.pid});
    }, 1000);
}