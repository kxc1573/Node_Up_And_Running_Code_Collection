/*
 Node中哈希的使用：
 1.调用工厂方法crypto.createHash()创建一个Hash对象
 2.调用hash.update()生成数据摘要
 3.调用hash.digest()输出哈希，调用之后hash的生命周期就结束了

 Node的加密算法是以OpenSSL库为基础，常见算法有：
 · md5
 · sha1
 · sha256
 · sha512
 · ripemd160 
 */

var crypto = require('crypto');

var md5 = crypto.createHash('md5');
md5.update('foo');
console.log(md5.digest());  // 二进制输出,console.log会转为utf8编码

// md5.digest('hex');     // error: digest之后，md5已被释放

var md5 = crypto.createHash('md5');
md5.update('foo');
console.log(md5.digest('hex')); // 16进制输出

// hash.update()是串联起来的，类似于流模式，但并不是流
var sha1 = crypto.createHash('sha1');
sha1.update('foo');
sha1.update('bar');

var sha2 = crypto.createHash('sha1');
sha2.update('foobar');

console.log(sha1.digest('hex') == sha2.digest('hex'));  // true
