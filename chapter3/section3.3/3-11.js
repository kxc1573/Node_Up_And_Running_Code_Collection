// 例3-11 使用集群来分发任务
/**
    Node是单线程的，这意味着Node只能利用一个处理器来工作。想利用多核服务器
的资源优势，可以利用cluster模块，将任务分发给子进程，即Node把程序复制一份
给另一个进程（Windows上其实是另一个线程）。
    这些子进程可以共享资源，比如socket连接
*/

var chluster = require('cluster');
var http = require('http');
var os = require('os');

var numCPUs = os.cpus().length;

if (cluster.isMaster) {     // 主进程
    //创建工作进程
    for (var i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('death', function (worker) {
        console.log('worker' + woker.pid + 'died');
        // 例3-12 出现死亡进程后重新开启新的进程
        cluster.fork();
    });
} else {
    // 工作进程创建http服务器
    http.Server(function (req, res) {
        res.writeHead(200);
        res.end("hello world\n");
    }).listen(8000);
}