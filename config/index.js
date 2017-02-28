// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  },
  dev: {
    env: require('./dev.env'),
    port: 8080,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      "/api": {
          target: "http://localhost:8081/", 
          pathRewrite: {'^/api' : ''},
          changeOrigin: true
      },
      "/auth-api": {
          target: "http://localhost:8082/", 
          pathRewrite: {'^/auth-api' : ''},
          changeOrigin: true
      },
      "/category-api": {
          target: "http://lolx-category.herokuapp.com/", 
          pathRewrite: {'^/category-api' : ''},
          changeOrigin: true
      },
      "/chat-api": {
          target: "http://localhost:8084/", 
          pathRewrite: {'^/chat-api' : ''},
          changeOrigin: true
      },
      "/rating-api": {
          target: "http://localhost:8085/", 
          pathRewrite: {'^/rating-api' : ''},
          changeOrigin: true
      }
    },
    rewrites: [
      {from: '^/fb(.*)$', to: '/#!/login$1', redirect: 'permanent'}
    ],
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false,
  }
}
