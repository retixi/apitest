
var mongojs = require('mongojs');
var db = mongojs('zhihuazhang:p821161102@happyCoupon.zhihuazhang.net/presentchat',
    ['users']);
console.log('connetion');
/*
db.users.find(function (err, docs) {
    // docs is an array of all the documents in mycollection
    console.log(docs)
});


db.users.insert({
    userid:'aaa',
    password:123,
    name:'rtx',
    birthday:'2000.1.1',
    sex:'男'

});*/


module.exports = {
    db: db,
    mongojs: mongojs
}

