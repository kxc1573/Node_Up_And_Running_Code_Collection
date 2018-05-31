// 使用felix-couchdb包来访问CouchDB

var dbHost = '127.0.0.1';
var dbPort = 5984;
var dbName = 'users';

var couchdb = require('felix-couchdb');
var client = couchdb.createClient(dbPort, dbHost);
var db = client.db(dbName);

// 在CouchDB中创建一个表
db.exists(function(err, exists) {
    if (!exists) {
        db.create();
        console.log('Database ' + dbName + ' created.');
    } else {
        console.log('Database ' + dbName + ' exists.');
    }
});


// 在CouchDB中创建一个文档
var user = {
    name: {
        first: 'John',
        last: 'Doe'
    }
};
// jdoe是一个标识,可通过http://127.0.0.1:5984/users/jdoe访问该文档
db.saveDoc('jdoe', user, function(err, doc) {
    if (err) {
        console.log(JSON.stringify(err));
    } else {
        console.log('Saved user.');
    }
});


// 从CouchDB中取回一条记录
db.getDoc('jdoe', function(err, doc) {
    console.log(doc);
});

// 在CouchDB中更新一条记录
db.getDoc('jdoe', function(err, doc) {
    doc.email = 'jdoe@johndoe.com';
    doc.saveDoc('jdoe', doc);
    db.getDoc('jdoe', function(err, revisedUser) {
        console.log(revisedUser);
    });
});

// 在CouchDB中删除一条记录
db.getDoc('jdoe', function(err, doc) {
    db.removeDoc(doc._id, doc._rev);    // 内部id和版本号
});