// 用AMQP处理长时间运行任务
var connection = requier('amqp').createConnection();

function sleep (milliseconds) {
    var start = new Date().getTime();
    while (new Date().getTime < start + milliseconds);
}

// 纯粹的任务消费者，每个任务耗时5s
// 需配合6-36使用
// 由于任务生产-消费时间为1:5，因此消费者服务器的部署也要是生产的5倍.
connection.on('ready', function() {
    console.log('Connected to ' + connection.serverProperties.product);
    var e = connection.exchange('up-and-running');
    var q = connection.queue('up-and-running-queue');

    q.on('queueDeclareOk', function(args) {
        console.log('Queue opened');
        q.bind(e, "#");

        q.subscibe({ack: true}, function(msg) {
            console.log('Message received: ');
            console.log(msg.count);
            sleep(5000);
            console.log("Processed. Waiting for next message.");
            q.shift();          // ack 消息
        });
    });
});