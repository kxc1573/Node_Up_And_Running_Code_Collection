/*
	1） 设置实例的结构
	2） 把结构（schema）与真实的数据库进行同步
	3） 创建并保存一个Book对象
	4） 创建并保存一个Author对象
	5） 建立author和book之间的关系
*/


// 用Sequelize保存记录和关系
var Sequelize = require('sequelize');

var db = new Sequelize('upandrunning', 'dev', 'dev', {
	host: 'localhost'
});

var Author = db.define('Author', {
	name: Sequelize.STRING,
	biography: Sequelize.TEXT
});

var Book = db.define('Book', {
	name: Sequelize.STRING
})

// 多对多
Author.hasMany(Book);
Book.hasMany(Author);

Author.sync().on('success', function () {
	Book.build({
		name: 'Through the Storm'
	}).save().on('success', function (book) { 		// 等book成功保存到数据库之后再创建author
		console.log('Book saved');
		Author.build({
			name: 'Lynne Spears',
			biography: 'Author and mother of Birtney'
		}).save().on('success', function(record) { 	// 在author成功保存到数据库之后booke才能被添加到author上
			console.log('Author saved');
			record.setBooks([book]);
			record.save().on('success', function() {
				console.log('Author & Book Relation created');
			});
		});
	}).on('failure', function(error) {
		console.log('Could not save book');
	});
}).on('failure', function (err) {
	console.log('Failed to sync database');
});
