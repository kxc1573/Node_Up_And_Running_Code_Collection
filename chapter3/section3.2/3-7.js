// 顺序串行I/O（模式）：用声明函数分离代码，并封装在回调函数中
// 使得代码易于书写
// 使用闭包的共享作用域解决各个函数内变量的作用域限制

server.on('request', function (req, res) {

    var render = function (wsData) {
        page = pageRender(req, session, userData, wsData);
    };

    var getWsInfo = function (userData) {
        ws.get(req, render);
    };

    var getDbInfo = function (session) {
        db.get(session.user, getWsInfo);
    };

    var getMemCached = function (req, res) {
        memcached.getSession(req, getDbInfo);
    };
});