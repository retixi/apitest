module.exports=function (app) {
    app.get('/users',function (req,res) {
        res.render('users.ejs');
    });
    app.get('/login',function (req,res) {
        res.render('login.ejs');
    });
}

