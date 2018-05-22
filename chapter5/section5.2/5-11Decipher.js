// Decipher和Cipher是相反的
// 由于Cipher.update()和Cipher.final()总是输出固定带小的数据块
// Decipher也需要出入精确大小的内容，不过它会缓存数据。

// 文本加密与解密
var crypto = require('crypto');
var fs = require('fs');

var pem = fs.readFileSync('key.pem');
var key = pem.toString('ascii');    // 密钥

var plaintext = new Buffer('abcdefghijklmnopqrstuvwxyz');
var encrypted = '';
var cipher = crypto.createCipher('blowfish', key);
encrypted += cipher.update(plaintext, 'binary', 'hex');
encrypted += cipher.final('hex');   // 确保全部进行了加密

var decrypted = '';
var decipher = crypto.createDecipher('blowfish', key);
decrypted += decipher.update(encrypted, 'hex', 'binary');
decrypted += decipher.final('binary');

var output = new Buffer(decrypted);

console.log(output);
console.log(plaintext);