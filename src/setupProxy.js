const proxy = require('http-proxy-middleware');

module.exports = function (app) {
    app.use('/admin',proxy('/admin', {
        target: 'http://47.95.214.69:1002',
        onProxyReq:function onProxyReq(proxyReq, req, res) {
            console.log('aaaaaaaaaaaaaaaa')
        }
    }));

};