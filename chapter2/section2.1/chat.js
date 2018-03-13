// 2.1基于TCP的聊天服务器，支持Telenet连接

var net = require('net');

var chatServer = net.createServer();
var clientList = [];

chatServer.on('connection', function (client) {
    client.name = clent.remoteAddress + ':' + client.remotePort;
    client.write('Hi' + client.name + '!\n');
    console.log(client.name + ' joined');

    clientList.push(client);

    client.on('data', function (data) {
        broadcast(data, client);
    });

    // 监听socket连接断开
    client.on('end', function () {
        console.log(client.name + ' quit');
        clientList.splice(clientList.indexOf(client), 1);
    });

    client.on('error', function (e) {
        console.log(e);
    });
});


function broadcast (message, client) {
    var cleanup = [];
    for (var i = 0; i < clientList.length; i += 1) {
        if (client !== clientList[i]) {

            // 检查socket的可写状态, 与监听end事件为双保险
            if(clientList[i].writeable) {
                clientList[i].write(client.name + " says " + message);
            } else {
                // 遍历clientList时并未移除socket 
                cleanup.push(clientList[i]);
                clientList[i].destroy();
            }
        }
    }

    // 删除死节点，消除垃圾索引
    for (i = 0; i < cleanup.length; i += 1){
        clientList.splice(clientList.indexOf(cleanup[i]), 1);
    }
}

chatServer.listen(9000);