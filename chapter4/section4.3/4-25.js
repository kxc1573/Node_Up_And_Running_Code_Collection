/*
  Buffer.write()写入时会根据指定Buffer的大小选择性地进行尾部截断操作，
  返回一个数字，表示成功写入多少个字节。
  */

// Buffer.write()及部分字符
var b = new Buffer(1); // 长度为1
console.log(b);

console.log(b.write('a')); // 写入成功返回1
console.log(b);

console.log(b.write('é')); // 写入失败返回0
console.log(b);

// 写入Buffer的字符串包含了结束符
var c = new Buffer(5);
console.log(c.write('fffff'));
console.log(c);

console.log(c.write('ab', 1)); // 指定写入的位置(位移)
console.log(c);
// 书上预期<Buffer 66 61 62 00 66>,00为结束符
// 实际为<Buffer 66 61 62 66 66>,并没有插入结束符