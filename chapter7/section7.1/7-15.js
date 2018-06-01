// Express中的中间件工厂
var express = require('express');
var app = express.createServer(
    express.cookieParser(),
    express.session({ secret: 'secret key'})
);

var roleFactory = function(role) {
    return function(req, res, next) {
        if (req.session.role && req.session.role.indexOf(role) != -1) {
            next();
        } else {
            res.send('You are not authenticated.');
        }
    };
};

app.get('/', roleFactory('admin'), function(req, res) {
    res.send('Welcome to Express!');
});

app.get('/auth', function(req, res) {
    res.session.role = 'admin';
    res.send('You have been authenticated.');
});

app.listen(8080);
