const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
let users =[];

module.exports.create = async function (req,res) {
    const email = req.body.email;
    const password = req.body.password;
    const encryptPassword = await bcrypt.hash(password,12);

    const isUserExist = await User.findOne({email: email}).then((user)=>{
        if (user) {
            return true;
        }
    });

    if (isUserExist) {
        res.redirect('/signup');
        return;
    }

    let user = new User ({
        email: email,
        password: encryptPassword
    });

    User.create(user, function (err, data, next) {
        if (err) return next(err);
        res.send("Tao user thanh cong! <a href='/login'>Den trang dang nhap</a>")
    });
};

module.exports.login = function (req,res,next) {
    User.findOne({email: req.body.email})
        .then(async user => {
            if (!user) {
                return res.redirect('/login');
            }
            const doMatch = await bcrypt.compare(req.body.password,user.password);
            if (doMatch){
                req.session.uname = req.body.email;
                req.session.isLoggedIn = true;
                req.session.user = user;
                return res.redirect('/');
            }
            return res.redirect('/login')
        });
};

module.exports.logout = function (req,res,next) {
    req.session.destroy((err)=>{
        if (err) throw new Error(err);
        res.redirect('/');
    });
};