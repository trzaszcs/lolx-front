var express = require('express');
var proxy = require('http-proxy-middleware');

var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/dist'));

app.use('/api', proxy({target: 'http://www.example.org', changeOrigin: true}));


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
