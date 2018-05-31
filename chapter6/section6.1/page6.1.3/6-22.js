/*
 MongoDB不要求显式地定义存储数据的数据结构，因而被称为“无结构的”（NoSQL数据库）
 实际上，MongoDB是有结构的，但并不由它保存的数据所决定；
 你可以对已有的模型增加属性，但不需要为之前的数据定义结构，就可以直接查询新的字段。
 总结：Mongo并不强制执行结构，但程序员需要再自己的程序中定义统一的访问模式。
 */

// 用Mongoose定义结构
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var AuthorSchema = new Schema ({
	name: {
		first 		: String,
		last 		: String,
		full 		: String
	},
	contact: {
		email 		: String,
		twitter 	: String,
		google 		: String
	},
	photo 			: String
});

var CommentSchema = new Schema({
	commenter 		: String,
	body 			: String,
	posted 			: Date
});

var ArticleSchema = new Schema({
	author 			: ObjecetId,
	title 			: String,
	contents 		: String,
	published 		: Date,
	comments  		: [CommentSchema]
});


var Author = mongoose.model('Author', AuthorSchema);
var Article = mongoose.model('Article', ArticleSchema);


// 用Mongoose读写记录 
mongoose.connect('mongodb://localhost:27017/upandrunning', function(err) {
	if (err) {
		console.log('Could not connect to mongo');
	}
});

// to do something: newAuthor
newAuthor.save(function(err) {
	if (err) {
		console.log('Could not save author');
	} else {
		console.log('Author saved');
	}
});

Author.find(function(err, doc) {
	console.log(doc);
});