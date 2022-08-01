const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
      '/',
      createProxyMiddleware({
        target: 'http://localhost:8089',
        changeOrigin: true,
      })
    );

    app.use(
      '/',
      createProxyMiddleware({
        target: 'http://localhost:4500',
        changeOrigin: true,
      })
    )
  }