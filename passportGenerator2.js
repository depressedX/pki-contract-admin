// 这个版本才是正确版本！
var CryptoJS = require("crypto-js");

const pin = '123456'

const uid = 'admin'
const token = 'admin'

// Encrypt
var ciphertext = CryptoJS.AES.encrypt(uid + '.' + token, pin).toString();
console.log(ciphertext)