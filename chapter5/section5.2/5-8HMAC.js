// HMAC同时使用了哈希算法和加密算法

var crypto = require('crypto');
var fs = require('fs');

var pem = fs.readFileSync('key.pem');
var key = pem.toString('ascii');    // 密钥

var hmac = crypto.createHmac('sha1', key);
hmac.update('foo');

console.log(hmac.digest('hex'));