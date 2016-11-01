var express = require('express');
var bodyParser = require('body-parser');
var mongojs=require('mongojs');
var db=mongojs('xiaozhu',['fangzi']);
//var multipart = require('connect-multiparty');
//var multipartMiddleware = multipart();


//var morgan = require('morgan');
var app = express();
var server = require('http').createServer(app);
app.use(bodyParser.json({limit: '1mb'}));  //这里指定参数使用 json 格式
app.use(bodyParser.urlencoded({
    extended: true
}));
app.get('/users',function (req,res) {
    res.send(`
<form method="post">
    name:<br>
    <input type="text" name="name">
    <br>
    password:<br>
    <input type="text" name="password">
    uid:<br>
    <input type="text" name="uid">
    phone:<br>
    <input type="text" name="phone">
    <br><br>
    <input type="submit" value="Submit">
</form>
`);
})



app.post('/users', function (req, res) {
    var User=req.body;
    var uid = req.body.uid;
    console.log(uid);
    if(uid=='') {
        return res.status(401).json({
            "status": 401,
            "message": "用户名为空，请填写"
        });
    }
    else{
    db.fangzi.findOne({uid: uid}, function (err, existUser){
        if(existUser){res.send('用户已经存在')}
        else{db.fangzi.save({
            uid:User.uid,
            name:User.name,
            password:User.password,
            phone:User.phone

        })

            res.send('用户注册成功')}
    }
    )}
})
    server.listen(3000);
