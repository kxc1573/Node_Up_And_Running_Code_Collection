// 用AMQP发布长时间运行任务
var connection = requier('amqp').createConnection();
var count = 0;

// 纯粹的任务生产者，每隔1s发布一个任务
// 需配合6-37使用
connection.on('ready', function() {
    console.log('Connected to ' + connection.serverProperties.product);
    var e = connection.exchange('up-and-running');
    var q = connection.queue('up-and-running-queue');

    q.on('queueDeclareOk', function(args) {
        console.log('Queue opened');
        q.bind(e, "#");

        q.on('queueBindOk', function() {
            console.log('Queue bound');

            setInterval(function() {
                console.log('Publishing message # ' + (++count));
                e.publish('routingKey', {count: count});
            }, 1000);
        });
    });
});