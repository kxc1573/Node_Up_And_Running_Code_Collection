// process是EventEmitter的实例，因而它提供了基于对Node进程的系统调用的事件

// exit事件,在Node退出前调用代码
process.on('exit', function () {
    setTimeout(function () {
        console.log('This will not run');
    }, 100);
    console.log('Bye.');
});

// uncaughtException事件，捕获事件主循环异常的最后一道防线
process.on('uncaughtException', function (err) {
    console.log('Caught execption: ' + err);
});

setTimout(function () {
    console.log('This will still run.');
}, 500);

nonexistentFunc();      // 故意导致异常，并且不捕获它。
console.log('This will not run.');
