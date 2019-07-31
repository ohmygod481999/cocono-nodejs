const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const sendGridTransport = require('nodemailer-sendgrid-transport');

const transporter = nodemailer.createTransport(sendGridTransport({
    auth: {
        api_key: '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'
    }
}));

module.exports.create = async function (req,res) {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirm_password;
    const encryptPassword = await bcrypt.hash(password,12);

    const isUserExist = await User.findOne({email: email}).then((user)=>{
        if (user) {
            return true;
        }
    });

    if (isUserExist) {
        req.flash('error','This email is already exist, pick another one!')
        res.redirect('/signup');
        return;
    }

    if (password != confirmPassword) {
        req.flash('error', 'Wrong confirm password!');
        return res.redirect('/signup');
    }

    let user = new User ({
        email: email,
        password: encryptPassword
    });

    await User.create(user, function (err, data, next) {
        if (err) return next(err);
        transporter.sendMail({
            to: email,
            from: 'coconovietnam@gmail.com',
            subject: 'Signup succeeded!',
            html: '<h1>You successfully signed up!</h1>'
        }).catch((err)=>{
            console.log(err)
        });
        res.send("Tao user thanh cong! <a href='/login'>Den trang dang nhap</a>")
    });
};

module.exports.login = function (req,res,next) {
    User.findOne({email: req.body.email})
        .then(async user => {
            if (!user) {
                req.flash('error','Invalid email.');
                return res.redirect('/login');
            }
            const doMatch = await bcrypt.compare(req.body.password,user.password);
            if (doMatch){
                req.session.uname = req.body.email;
                req.session.isLoggedIn = true;
                req.session.user = user;
                return res.redirect('/');
            }
            req.flash('error','Invalid password.');
            return res.redirect('/login')
        });
};

module.exports.logout = function (req,res,next) {
    req.session.destroy((err)=>{
        if (err) throw new Error(err);
        res.redirect('/');
    });
};