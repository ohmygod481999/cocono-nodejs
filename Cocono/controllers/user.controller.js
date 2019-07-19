const User = require('../models/user.model');

module.exports.create = function (req,res) {
    const user = {
        user_name: req.body.user_name,
        password: req.body.password
    };

    User.create(user, function (err, data, next) {
        if (err) return next(err);
        res.send('Tao user thanh cong!')
    });
};

module.exports.list = function (req,res,next) {
    User.find({},function (err,user) {
        if(err) return next(err);
        res.send(user);
    })
};