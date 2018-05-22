// Signatures验证的是签名者是否用其私钥对数据进行授权
// 和HMAC不同，公钥可以用来对签名进行验证。

// 用sign对数据进行签名、验证签名
var crypto = require('crypto');
var fs = require('fs');

var privatePem = fs.readFileSync('key.pem');
var publicPem = fs.readFileSync('cert.pem');
var key = privatePem.toString();
var pubkey = publicPem.toString();

var data = 'abcdefg';

var sign = crypto.createSign('RSA-SHA256');
sign.update(data);
var sig = sign.sign(key, 'hex');    // 生成签名
console.log(sig);

var verify = crypto.createVerify('RSA-SHA256');
verify.update(data);
console.log(verify.verify(pubkey, sig, 'hex'));     // 验证签名