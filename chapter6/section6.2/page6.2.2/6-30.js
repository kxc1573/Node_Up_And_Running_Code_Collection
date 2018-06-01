/*
 假设已经创建了一个叫做upandrunning的数据库
 并授予了dev用户权限（密码也是dev）
 */
var pg = require('pg');
var connectionString = "pg://dev:dev@localhost:5432/upandrunning";

// 从PostgreSQL选出数据
pg.connect(connectionString, function(err, client) {
    if (err) {
        console.log(err);
    } else {
        var sqlStmt = "SELECT username, firstname, lastname FROM users";
        client.query(sqlStmt, null, function(err, result) {
            if (err) {
                console.log(err);
            } else {
                console.log(result);
            }
            pg.end();
        });
    }
});

// 插入到PostgreSQl
pg.connect(connectionString, function(err, client) {
    if (err) {
        console.log(err);
    } else {
        var sqlStmt = "INSERT INTO users( username, firstname, lastname ) ";
        sqlStmt += "VALUES ( $1, $2, $3 )";
        var sqlParams = ['jdoe', 'Jhon', 'Doe'];
        var query = client.query(sqlStmt, sqlParams, function(err, result) {
            if(err) {
                console.log(err);
            } else {
                console.log(result);
            }
            pg.end();
        });
    }
});

// 在PostgreSQL中更新数据
pg.connect(connectionString, function(err, client) {
    if (err) {
        console.log(err);
    } else {
        var sqlStmt = "UPDATE users " /
                    + "SET firstname = $1" /
                    + "WHERE username = $2";
        var sqlParams = ['jane', 'jdoe'];
        var query = client.query(sqlStmt, sqlParams, function(err, result) {
            if (err) {
                console.log(err);
            } else {
                console.log(result);
            }
            pg.end();
        });
    }
});

// 从PostgreSQL中删除数据
pg.connect(connectionString, function(err, client) {
    if (err) {
        console.log(err);
    } else {
        var sqlStmt = "DELETE FROM users WHERE username = $1";
        var sqlParams = ['jdoe'];
        var query = client.query(sqlStmt, sqlParams, function(err, result) {
            if (err) {
                console.log(err);
            } else {
                console.log(result);
            }
            pg.end();
        });
    }
});