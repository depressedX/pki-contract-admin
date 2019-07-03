const crypto = require('crypto');
const fs = require('fs')
const decipher = crypto.createDecipher('aes192', '123456');

let decrypted = '';
decipher.on('readable', () => {
    const data = decipher.read();
    if (data)
        decrypted += data.toString('utf8');
})
decipher.on('end', () => {
    console.log(decrypted)
})

const data = fs.readFileSync('passport.key')
console.log(data.toString())

decipher.write(data.toString(), 'hex');
decipher.end();