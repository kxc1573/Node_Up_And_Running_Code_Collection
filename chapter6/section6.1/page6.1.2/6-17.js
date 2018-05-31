// 使用Redis订阅与发布
/*
 Redis支持发布-订阅（pub-sub）消息模型，允许发送者（发布者）往频道里
 添加消息，然后由匿名的接收者（订阅者）使用。
 */
var redis = require('redis');
var talkativeClient = redis.createClient();
var pensiveClient = redis.createClient();

// 订阅
pensiveClient.on('subscribe', function (channel, count) {
    talkativeClient.publish(channel, 'Welcome to ' + channel);
    talkativeClient.publish(channel, 'You subscribed to ' + count + ' channels');
});
// 取消订阅
pensiveClient.on('unsubscribe', function (channel, count) {
    if(count == 0) {
        talkativeClient.end();
        pensiveClient.end();
    }
});
// 接收推送消息
pensiveClient.on('message', function (channel, message) {
    console.log(channel + ': ' + message);
});

pensiveClient.on('ready', function () {
    pensiveClient.subscribe('quiet channel', 'peaceful channel', 'nosiy channel');
    setTimeout(function() {
        pensiveClient.unsubscribe('quiet channel', 'peaceful channel', 'nosiy channel');
    }, 10000);
});