const User = require('../models/user.model');
let users =[];

module.exports.create = function (req,res) {
    let user = new User ({
        user_name: req.body.user_name,
        password: req.body.password
    });

    User.create(user, function (err, data, next) {
        if (err) return next(err);
        res.send("Tao user thanh cong! <a href='/login'>Den trang dang nhap</a>")
    });
};

function loadUsers(cb){
    User.find({},function (err,data) {
        if(err) return next(err);
        users = data;
        cb();
    });
}

module.exports.login = function (req,res,next) {
    let user = {
        user_name: req.body.user_name,
        password: req.body.password
    };
    loadUsers(()=>{
        let redirect = false;
        for (i of users){
            if(i.user_name==user.user_name && i.password==user.password) {
                req.session.uname = req.body.user_name;
                req.session.isLoggedIn = true;
                redirect = true;
                res.redirect('/');

            }
        }
        if (!redirect) res.send("Invalid username or password <a href='/login'>Back</a>");
    });

};

module.exports.logout = function (req,res,next) {
    req.session.destroy((err)=>{
        if (err) throw new Error(err);
        res.redirect('/');
    });
};