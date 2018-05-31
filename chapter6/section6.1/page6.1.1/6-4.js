// 通过HTTP访问CouchDB的组合操作，一个基本的数据库管理工具

// 一个简单地创建CouchDB数据库的方式
var http = require('http');
var qs = require('querystring');
var url = require('url');

var dbHost = '127.0.0.1';
var dbPort = 5984;

var deleteDb = function(res, dbpath) {
    var client = http.createClient(dbPort, dbHost);
    var req = client.request("DELETE", dbpath);
    req.end();

    req.on('response', function(response) {
        response.on('end', function() {
            if (response.statusCode == 200) {
                showDbs(res, "Delete database");
            } else {
                showDbs(res, "Could not delete database");
            }
        });
    });
};

var createDb = function(res, dbname) {
    var client = http.createClient(dbPort, dbHost);
    var req = client.request("PUT", "/" + dbname);
    req.end();

    req.on('response', function(response) {
        response.on('end', function() {
            if (response.statusCode == 201) {
                showDbs(res, dbname + " created.");
            } else {
                showDbs(res, "Could not create " + dbname);
            }
        });
    });
};

var showDbs = function(res, message) {
    var client = http.createClient(dbPort, dbHost);
    var req = client.request("GET", "/_all_dbs");
    req.end();

    req.on('response', function(response) {
        var body = "";
        response.on('data', function(chunk) {
            body += chunk;
        });

        response.on('end', function() {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write("<form method='post'");
            res.write("New Database Name: <input type='text' name='dbname' />");
            res.write("<input type='submit'");
            res.write("</form>");
            if( null != message) res.write("<h1>" + message + "</h1>");

            res.write("<h1>Active database:</h1>");
            res.write("<ul>");
            var dblist = JSON.parse(body);
            for (var i = 0; i < dblist.length; i++) {
                var dbname = dblist[i];
                res.write("<li><a href='/" + dbname + "'>" + dbname + "</a></li>");
            }
            res.write("</ul>");
            res.end();
        }); 
    });
};

http.createServer(function (req, res) {
    if (req.method == 'POST') {
        // 解析请求
        var body = '';
        req.on('data', function (data) {
            body += data;
        });
        req.on('end', function () {
            var POST = qs.parse(body);
            var dbname = POST['dbname'];
            if (null != dbname) {
                createDb(res, dbname);
            } else {
                showDbs(res, "Bad DB name, cannot create database.");
            }
        });
    } else {
        var path = url.parse(req.rul).pathname;
        if (path != "/") {
            deleteDb(res, path);
        } else {
            showDbs(res);
        }
    }
}).listen(8080);