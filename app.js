var mongojs=require('mongojs');
var db = mongojs('local', ['users']);

module.exports=function (app) {


app.get('/users',function (req,res) {
    res.render('users.ejs');
});

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

        else{db.users.save({
            uid:User.uid,
            name:User.name,
            password:User.password,
            gender:User.gender,
            birthday:User.birthday

        })

            res.send({"user":{
                'uid':User.uid,
                'name':User.name,
                'password':User.password,
                'gender':User.gender,
                'birthday':User.birthday

            },
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
            if (existuser.password == inputpassword) {
                res.send({
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
                })
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

//事件
app.get('/events',function (req,res) {
    if (req.headers.authorization=='Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9')
    {   res.setHeader("Content-Type", "application/json");
        res.json(
            [
                {
                    "_id": "5726ac024ff978af01400b57",
                    "type": "inviting",
                    "from": {
                        "uid": "test04",
                        "name": "Test04",
                        "avatar": "xxxx.png"
                    },
                    "to": {
                        "uid": "test05",
                        "name": "Test05",
                        "avatar": "xxxx.png"
                    },
                    "createdAt": "2016-12-01T08:40:51.620Z"
                },
                {
                    "_id": "5726ac024ff978af01400b57",
                    "type": "message",
                    "from": {
                        "uid": "test04",
                        "name": "Test04",
                        "avatar": "xxxx.png"
                    },
                    "to": {
                        "uid": "test05",
                        "name": "Test05",
                        "avatar": "xxxx.png"
                    },
                    "event": "圣诞节",
                    "mid": "m12345678",
                    "createdAt": "2016-12-01T08:40:51.620Z"
                }
            ]
            )

    }
})


}
