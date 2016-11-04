var mongojs=require('mongojs');
var db = require('../db').db;
var encrypt = require('../encrypt');
module.exports=function (app) {




//用户注册
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
    db.users.findOne({uid: uid}, function (err, existUser){
        if(existUser){res.send('用户已经存在')}

        else{User.createdAt=new Date();
            var encryptedPassword = encrypt.encryptPassword(User.password);
            User.password=encryptedPassword
            db.users.save(User);

            res.send({"user":User,
            "accesstoken":"dsfdsfsdafsda"
            })}
    }
    )}
})

//用户登录
app.post('/login',function (req,res) {
    var inputpassword=req.body.password;
    var User=db.users.findOne({uid:req.body.uid},function (err,existuser) {
        if(!existuser){res.send('用户不存在')}
        else{
        if(!encrypt.comparePassword(inputpassword, existuser.password)){res.send('密码不正确')}
        else{res.send({
            "user": {
                "_id" : "57fc366c9a04201a98836126",
                "uid": "zhz821",
                "name": "張志華",
                "createdAt": "2016-12-01T08:40:51.620Z",
                "gender": 0,
                "birthday": "1982/01/16",
                "avatar": "xxxx.png",
                "inviting": [
                    {"uid": "abc"},
                    {"uid": "def"}
                ]
            },
            "accessToken": "abcdefghijklmn"
        })}

        }
    });
});

//取得自己信息
app.get('/user',function (req,res) {
    if (req.headers.authorization=='Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9')
    {       res.setHeader("Content-Type", "application/json")
        res.send({
            "_id" : "57fc366c9a04201a98836126",
            "uid": "zhz821",
            "name": "張志華",
            "createdAt": "2016-12-01T08:40:51.620Z",
            "gender": 0,
            "birthday": "1982/01/16",
            "avatar": "xxxx.png",
            "inviting": [
                {"uid": "abc"},
                {"uid": "def"}
            ],
            "invited": [
                {"uid": "ghi"},
                {"uid": "jkl"}
            ],
            "friend": [
                {"uid": "aaa"}
            ]
        })

    }
})




}
