// 连接到MongoDB并写入一条记录
// 使用原生驱动mongodb
var mongo = require('mongodb');
var host = "localhost";
var port = mongo.Connection.DEFAULT_PORT;

var db = mongo.Db('node-mongo-examples', new mongo.Server(host, port, {}, {}));

db.open(function (err, db) {
	db.collection('users', function (err, collection) {
		collection.insert({username: 'Bilbo', firstname: 'Shilbo'}, function (err, docs) {
			console.log(docs);
			db.close();
		});
	});
});
