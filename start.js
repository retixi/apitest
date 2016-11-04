var express = require('express');
var bodyParser = require('body-parser');
//var multipart = require('connect-multiparty');
//var multipartMiddleware = multipart();
//var morgan = require('morgan');
var app = express();
var server = require('http').createServer(app);
app.set('views','./client/views');
app.set('view engine','ejs');
app.use(bodyParser.json({limit: '1mb'}));  //这里指定参数使用 json 格式
app.use(bodyParser.urlencoded({
    extended: true
}));

require('./server/routes/user')(app);
require('./client/loader')(app);
server.listen(3000);