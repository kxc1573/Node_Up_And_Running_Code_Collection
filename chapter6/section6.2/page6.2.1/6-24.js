// 首先需要一个脚本创建基本的数据库表和结构：
/*
	DROP DATABASE IF EXISTS upandrunning;

	CREATS DATABASE upandrunning;

	GRANT ALL PRIVILEGES ON upandrunning.* TO 'dev'@'%' IDENTIFIED BY 'dev';

	USE upandrunning;

	CREATE TABLE users(
		id int auto_increment primary key,
		user_login varchar(25),
		user_nicename varchar(75)
	);
 */

var mysql = require('db-mysql'); 	// npm install -g db-mysql

var connectParams = {
	'hostname': 'localhost',
	'user': 'dev',
	'password': 'dev',
	'database': 'upandrunning'
}

var db = new mysql.Database(connectParams);

// 从MySQL选出数据
db.connect(function (error) {
	if (error) return console.log('Failed to connect');

	// SELECT id, user_login FROM users
	// 链式函数
	this.query()
	  .select({'id', 'user_login'})
	  .from('users')
	  .execute(function (err, rows, columns) {
	  	if (err) {
	  		console.log("Error on query: " + err);
	  	} else {
	  		console.log(rows);
	  	}
	  });
});


// 插入到MySQL中
db.connect(function (error) {
	if (error) return console.log('Failed to connect');

	// INSERT user_login, newbie IN users
	// 数据库驱动会处理好转义，不用担心SQL注入攻击
	this.query()
	  .insert('users', ['user_login'], ['newbie'])		
	  .execute(function (err, rows, columns) {
	  	if (err) {
	  		console.log('Error on query: ' + err);
	  	} else {
	  		console.log(rows);
	  	}
	  });
});

// 在MySQL中更新数据
db.connect(function (error) {
	if (error) return console.log('Failed to connect');

	this.query()
		.update('users')
		.set({'user_nicename': 'New User'})
		.where('user_login = ?', ['newbie'])
	.execute(function(err, rows, columns) {
		if (err) {
			console.log('Error on query: ' + err);
		} else console.log(rows);
	});
});

// 从MySQL中删除数据
db.connect(function (error) {
	if (error) return console.log('Failed to connect');

	this.query()
		.delet()		// delete命令和update命令类似，唯一不同在于它不接受任何列的名字和数据
		.from('users')
		.where('user_login = ?', ['newbie'])
	.execute(function (err, rows, columns) {
		if (err) {
			console.log('Error on query: ' + err);
		} else console.log(rows);
	})
});