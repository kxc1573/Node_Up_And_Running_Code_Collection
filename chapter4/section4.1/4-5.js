// 触发器里如何调用事件

if (arguments.length <= 3) {
    // 速度快
    handler.call(this, arguments[1], arguments[2]);
} else {
    // 速度慢
    var args = Array.prototype.slice.call(arguments, 1);
    handler.apply(this, args);
}

/**
 如果传给emit()的参数只有3个或者更少，该方法就走捷径直接调用call方法
 否则就会使用较慢的apply方法，以数组的方式传递所有参数

 同时使用的this参数，意味着监听器被调用的时候是在EventEmitter的上下文中，
 而不是他们原始的位置。
 */