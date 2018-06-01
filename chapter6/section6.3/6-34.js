// 使用node-db的连接池
var mysql = require('db-mysql');
var poolModule = require('generic-pool');

var connectParams = {
    'hostname': 'localhost',
    'user': 'dev',
    'passwor': 'dev',
    'database': 'zborowski'
};

var pool = poolModule.Pool({
    name: 'mysql',
    create: function(callback) {            // 创建
        var db = new mysql.Database( connectParams );
        db.connec(function (err) {
            callback(err, db);
        });
    },
    destroy: function(client) {             // 销毁
        client.disconnect();
    },
    max: 10,
    idleTimeoutMillis: 3000,                // 空闲间隔
    log: true
});

pool.acquire(function(error, client) {
    if (error) return console.log("Failed to connect");

    client.query()
      .select(['id', 'user_login'])
      .from('wp_users')
      .execute(function(err, rows, columns) {
        if (err) {
            console.log('Error on query: ' + err);
        } else {
            console.log(rows);
        }
        pool.release(client);
      });
});
