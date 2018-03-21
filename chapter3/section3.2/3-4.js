// 顺序串行I/O（模式）：嵌入回调函数来完成顺序请求
/**
    希望按顺序执行一些I/O任务，
    每一个人物都必须再上一个任务完成后才能开始。
*/


server.on('request', function (req, res) {
    // 从memcached里获取session信息
    memcached.getSession(req, function (session) {
        // 从db获取信息
        db.get(session.user, function (userData) {
            // 其他Web服务调用
            ws.get(req, function (wsData) {
                // 渲染页面
                page = pageRender(req, session, userData, wsData);
                // 输出响应内容
                res.write(page);
            });
        });
    });
});