var express = require('express');
var httpProxy = require('http-proxy-middleware');

var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/dist'));

// PROXY config

var proxyConfig = {
  target: 'http://lolx-backend.herokuapp.com/',  
  pathRewrite: {'^/api' : ''},
  changeOrigin: true
};
app.use(httpProxy('/api', proxyConfig));


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
