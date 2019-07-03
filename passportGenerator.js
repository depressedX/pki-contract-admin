// 这个版本是错误版本！
const crypto = require('crypto')

const pin = '123456'

const cipher = crypto.createCipher('aes192', pin)

const uid = '123'
const token = 'ca981be48e90867604588e75d04feabb63cc007a8f8ad89b10616ed84d815504'

let encrypted = '';
cipher.on('readable', () => {
    const data = cipher.read();
    if (data)
        encrypted += data.toString('hex');
});
cipher.on('end', () => {
    console.log(encrypted)
});

cipher.write(uid + '.' + token);
cipher.end()