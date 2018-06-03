// 在Express和Socket.IO间共享session数据
var io = require('socket.io');
var express = require('express');
var utils = require('connect').utils;
var Session = require('connect').middleware.session.Session;

// express4更新
// var session = require('express-session');  
// var cookieParser = require('cookie-parser')

// 自己创建的store对象，是的session存储可以跨越Express
var store = new express.session.MemoryStore;
var app = express.createServer(); // express4抛弃了该方法
// var store = new session.MemoryStore;
// var app = express();

app.configure(function() {
    // session管理配置
    app.use(express.cookieParser());
    app.use(express.session({secret: 'secretKey', key: 'express.sid', store: store}));
    // app.use(cookieParser())
    // app.use(session({secret: 'secretKey', key: 'express.sid', store: store}));
    
    // 为默认(/)网页创建一个路由
    app.use(function(req, res) {
        var sess = req.session;
        res.render('socket.jade', {email: sess.email || ''});
    });
});

app.listen(8080);

var sio = io.listen(app);

/*
传递给authorization事件的数据是保存在socke的握手（handshake）资源中。
因此，在数据对象中保存session对象是的它能够在socket的声明周期中使用。
当创建Session对象时，使用创建的内存(store)存储并传递给Express,
这样Expres和Socket.IO都可以访问同样的session数据。
Express通过req.session对象访问，sockets通过socket.handshake.session对象访问。
*/

sio.configure(function() {
    sio.set('authorization', function (data, accept) {
        var cookies = utils.parseCookie(data.headers.cookie);
        data.sessionID = cookies['express.sid'];
        data.sessionStore = store;
        store.get(data.sessionId, function(err, session) {
            if (err || !session) {
                return accept('Invalid session', false);
            }
            data.session = new Session(data, session);
            accept(null, true);
        });
    });

    sio.sockets.on('connection', function(socket) {
        var session = socket.handshake.session;
        // 透明地创建了一个专用频道，这样就可以往该用户使用的所有连接中发送消息？
        socket.join(socket.handshake.sessionId);
        socket.on('emailupdate', function(data) {
            session.email = data.email;
            session.save();
            sio.socket.in(socket.handshake.sessionId).emit('emailchanged', {email: data.email});
        });
    });
});