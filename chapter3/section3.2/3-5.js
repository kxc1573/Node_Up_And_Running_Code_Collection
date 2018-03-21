// 顺序串行I/O（模式）：给嵌入的回调函数命名
// 增加代码阅读性，便于调试

server.on('request', function getMemCached(req, res) {
    memcached.getSession(req, function getDbInfo(session) {
        db.get(session.user, function getWsInfo(userData) {
            ws.get(req, function (wsData) {
                // 渲染页面
                page = pageRender(req, session, userData, wsData);
                // 输出响应内容
                res.write(page);
            });
        });
    });
});