// AMQP/RabbitMQ使用方法
var connection = requier('amqp').createConnection();

connection.on('ready', function() {
    console.log('Connected to ' + connection.serverProperties.product);
    // 声明exchange，不声明会有默认的exchange和queue。
    // exchange是负责接收消息并发他们传递给绑定的队列的实体。
    var e = connection.exchange('up-and-running');

    var q = connection.queue('up-and-running-queue');

    q.on('queueDeclareOk', function(args) {
        console.log('Queue opened');
        // 绑定exchange和queue
        // 关键字参数，可以用来过滤消息; "#"可以订阅所有内容
        q.bind(e, "#");

        q.on('queueBindOk', function() {
            console.log('Queue bound');

            q.on('basicConsumeOk', function() {
                console.log('Consumer has subscribed, publishing message.');
                // AMQP的核心思想是发布者永远不知道哪些订阅者连接了
                // 所以要有一个作为路由的关键词备用
                e.publish('routingKey', {hello: 'world'});
            });
        });

        // 执行成功后，AMQP会分发basicConsumeOk事件
        q.subscribe(function(msg) {
            console.log('Message received: ');
            console.log(msg);
            connection.end();
        });
    });
});