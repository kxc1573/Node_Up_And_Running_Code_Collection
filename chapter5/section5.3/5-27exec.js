// 用exec()调用ls
var cp = require('child_process');

// error：如果子进程异常或者返回错误码，就不为空
// stderr:不论子进程成功与否，均不为空
cp.exec('ls -l', {maxBuffer: 1}, function(error, stdout, stderr) {
    if(!error) {
        console.log(stdout);
        console.log(stderr);
    }
});

// exec 第一个参数是命令行命令字符串，第二个参数是可选的配置对象，比如：
var options = {
    encoding: 'utf8',       // IO流输入字符的编码格式
    timeout: 0,             // 进程运行时间 
    maxBuffer: 200 * 1024,  // stdout或者stderr允许的最大大小，单位为千字节
    killSignal: 'SIGTERM',  // 时间或者Buffer超限时，用来终止进程的信号
    setsid: false,          // 是否创建Node子进程的新会话
    cwd: null,              // 为子进程初始化工作目录(null指当前的)
    env: null               // 进程的环境变量，均可从父进程继承
};

