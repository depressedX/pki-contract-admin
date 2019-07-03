// 这个版本才是正确版本！
var CryptoJS = require("crypto-js");

const pin = '123456'

const uid = '123'
const token = 'ca981be48e90867604588e75d04feabb63cc007a8f8ad89b10616ed84d815504'

// Encrypt
var ciphertext = CryptoJS.AES.encrypt(uid + '.' + token, pin).toString();
console.log(ciphertext)