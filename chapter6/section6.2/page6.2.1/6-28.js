/*
 可以使用Sequelize来定义数据库与程序间共享的对象，这样就不需要为每个操作写查询语句，
 而是直接通过操作这些对象来写入或读取数据库。
 */

var Sequelize = require('sequelize'); 		// npm install -g sequelize

var db = new Sequelize('upandrunning', 'dev', 'dev', {
	host: 'localhost'
});

var Author = db.define('Author', {
	name: Sequelize.STRING,
	biography: Sequelize.TEXT
});

// Sequelize是基于监听事件驱动的架构，而其他地方采用回调函数驱动的架构。
Author.sync().on('success', function () {
	console.log('Author table was created.');
}).on('failure', function (err) {
	console.log('Unable to create author table.');
});