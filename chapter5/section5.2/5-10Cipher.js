// Cipher类提供了用私钥加密数据的功能
// 输入一个算法和私钥，创建Cipher对象,算法包括：blowfish、ase192
/*
  块密码：输出为标准大小的“块”，blowfish使用40字节的块
  对数据块大小有要求：
    够生成一个加密块，就输出
    不足以构成一个加密块，就会被保留再Cipher对象内
    调用Cipher.final()方法，剩余所有数据都会被加密返回，但会进行填充。
*/

// 密码与块大小
var crypto = require('crypto');
var fs = require('fs');

var pem = fs.readFileSync('key.pem');
var key = pem.toString('ascii');    // 密钥

var cipher = crypto.createCipher('blowfish', key);

console.log(cipher.update(new Buffer(4), 'binary', 'hex')); // 无输出
console.log(cipher.update(new Buffer(4), 'binary', 'hex')); // 有输出

console.log(cipher.update(new Buffer(4), 'binary', 'hex'));
console.log(cipher.final('hex'));        // 填充输出