// 顺序串行I/O（模式）：在函数间传递修改后的内容
// 在JavaScript中，对象是以引用的方式传递的
// 当在函数间共享对象时，调用堆栈上靠前的函数会影响这些对象的状态，并传递给后续函数。


var AwesomeClass = function () {
    this.awesomeProp = 'awesome!';
    this.awesomeFunc = function (text) {
        console.log(text + ' is awesome');
    };
};

var awesomeObject = new AwesomeClass();

function middleware (func) {
    oldFunc = func.awesomeFunc;
    func.awesomFunc = function (text) {
        text = text + ' really';
        oldFunc(text);
    };
}

function anotherMiddleware (func) {
    func.anotherProp = 'super duper';
}

function caller(input) {
    input.awesomeFunc(input.anotherProp);
}

middleware(awesomeObject);
anotherMiddleware(awesomeObject);
caller(awesomeObject);
// super duper is awesome