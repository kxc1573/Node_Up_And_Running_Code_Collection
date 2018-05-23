// 用spawn()启动子进程
var cp = require('child_process');

var cat = cp.spawn('cat');

cat.stdout.on('data', function (d) {
    console.log(d.toString());
});
cat.on('exit', function () {
    console.log('kthxbai');
});

cat.stdin.write('meow');
cat.stdin.end();

// spawn()第一个参数的让进城开始执行的命令，不是命令字符串，是可执行程序。
// 进程的参数以数组形式作为第二个参数传入，和process.argv的反向操作类似
// 还可以接受一个选项数组作为最后一个参数，同exec()一样

// 通过customFds把父进程的三个文件描述符传递给子进程
// 此时，child.stdin、child.stdout、child.stderr三个子进程自身的引用就丢失了
// 且这些流被显示地置为null，并且完全不能从父进程访问了
var child = cp.spawn('cat', [], {customFds: [0, 1, 2]});

// 也可以传递socket