// 例3-14 杀死僵尸进程

// 在主进程中同样添加定时工作，用来判断工作进程是否变为僵尸进程

var chluster = require('cluster');
var http = require('http');
var os = require('os');

var numCPUs = os.cpus().length;
var rssWarn = (50 * 1024 * 1024);
var hepWarn = (50 * 1024 * 1024);

var workers = {};

if (cluster.isMaster) {     // 主进程
    for (var i = 0; i < numCPUs; i++) {
        createWorker();
    }

    setInterval(function () {
        var time = new Date().getTime();
        for (var pid in workers) {
            if (workers.hasOwnProperty(pid) && 
                workers[pid].lastCb + 5000 < time) {
                console.log('Long running worker ' + pid + ' killed');
                workers[pid].worker.kill();
                delete workers[pid];
                createWorker();
            }
        }
    }, 1000);
} else {
    // 工作进程创建http服务器
    http.Server(function (req, res) {
        //打乱200个请求中的1个
        if (Math.floor(Math.random() * 200) === 4) {
            console.log('Stopped ' + process.pid + ' from ever finishing');
            while(true) { continue; }
        }
        res.writeHead(200);
        res.end("hello world from " + process.pid + '\n');
    }).listen(8000);

    // 每秒报告一次状态
    setInterval(function report () {
        process.send({
            cmd:"reportMem", 
            memory: process.memoryUsage(), 
            process: process.pid});
    }, 1000);
}

function createWorker () {
    var worker = cluster.fork();
    console.log('Created worker: ' + worker.pid);
    // 允许开机时间
    workers[worker.pid] = {worker: worker, lastCb: new Date().getTime()-1000};
    worker.on('message', function (m) {
        if(m.cmd === "reportMem") {
            workers[m.process].lastCb = new Date().getTime();
            if (m.memory) {
                if (m.memory.rss > rssWarn) {
                    console.log('Worker ' + m.process + ' using to much memory.');
                }
            }
        }
    });
}