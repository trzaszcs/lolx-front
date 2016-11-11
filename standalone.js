var express = require('express');
var httpProxy = require('http-proxy-middleware');
var rewriteModule = require('http-rewrite-middleware');

var app = express();

app.set('port', (process.env.PORT || 5000));

// rewrite
app.use(rewriteModule.getMiddleware([
    {from: '^/fb(.*)$', to: '/#!/login$1' , redirect: 'permanent'}
]));

app.use(express.static(__dirname + '/dist'));

// PROXY config

var proxyConfigForApi = {
  target: 'http://lolx-backend.herokuapp.com/',  
  pathRewrite: {'^/api' : ''},
  changeOrigin: true
};

var proxyConfigForAuthApi = {
    target: 'http://lolx-auth.herokuapp.com/',  
    pathRewrite: {'^/auth-api' : ''},
    changeOrigin: true
};

var proxyConfigForCategoryApi = {
    target: 'http://lolx-category.herokuapp.com/',  
    pathRewrite: {'^/category-api' : ''},
    changeOrigin: true
};

var proxyConfigForChatApi = {
    target: 'http://lolx-chat.herokuapp.com/',  
    pathRewrite: {'^/chat-api' : ''},
    changeOrigin: true
};

app.use(httpProxy('/api', proxyConfigForApi));
app.use(httpProxy('/auth-api', proxyConfigForAuthApi));
app.use(httpProxy('/category-api', proxyConfigForCategoryApi));
app.use(httpProxy('/chat-api', proxyConfigForChatApi));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
