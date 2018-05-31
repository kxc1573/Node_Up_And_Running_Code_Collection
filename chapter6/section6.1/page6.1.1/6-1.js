// 通过HTTP访问CouchDB的单个操作的示例
var http = require('http');

http.createServer(function (req, res) {
    var client = http.createClient(5984, "127.0.0.1");

    // 获取CouchDB的数据库列表(GET)
    var request1 = client.request("GET", "/_all_dbs");
    request1.end();

    request1.on("response", function(response) {
        var body = "";

        response.on('data', function(chunck) {
            body += chunck;
        });

        response.on('end', function() {
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.write('body');
            res.end();
        });
    });


    //创建CouchDb数据库(PUT, dbname数据库名)
    var request2 = client.request("PUT", "/dbname");
    request2.end();

    request2.on('response', function(response) {
        response.on('end', function() {
            if (response.statusCode == 201) {
                console.log("Database successfully created.");
            } else {
                console.log("Could not create database");
            }
        });
    });

    var request3 = client.request("DELETE", "/dbname");
    request3.end();

    request3.on("response", function(response) {
        response.on("end", function() {
            if (response.statusCode == 200) {
                console.log("Deleted database.");
            } else {
                console.log("Could not delete database.");
            }
        });
    });
}).listen(8080);

