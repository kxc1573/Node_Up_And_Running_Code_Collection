// 使用Express的基本Web服务器

var express = require('express');
var bodyParser = require('body-parser');

// var app = express.createServer();
var app = express();
app.listen(8000);                   // 异步

var tweets = [];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.get('/', function (req, res) {
//     res.send('Welcome to Node Twitter');
// });
app.get('/', function (req, res) {
    var title = 'Chirpie';
    var header = 'Welcome to Chirpie';

    res.render('index', {
        locals: {
            'title': title,
            'header': header,
            'tweets': tweets,
            stylessheets: ['/public/style.css']
        }
    });
});

// app.post('/send', express.bodyParser(), function (req, res) {
app.post('/send', function (req, res) {
    if (req.body && req.body.tweet) {
        tweets.push(req.body.tweet);
        
        if (acceptsHtml(req.header)) {
            res.redirect('/', 302);
        } else {
            res.send({status: "ok", message: "Tweet received"});
        }
    } else {
        res.send({status: "nok", message: "No tweet received"});
    }
});

app.get('/tweets', function (req, res) {
    res.send(tweets);
});

// 检测accept头是否包含text/html的小函数
function acceptsHtml (header) {
    var accepts = header.split(',');
    for (i=0; i<accepts.length; i+=0) {
        if (accepts[i] === 'text/html') {
            return true;
        }
    }
}