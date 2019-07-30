const _ = require('lodash');

module.exports.checkAdmin = (req, res, next) => {
    if (_.get(req.session, 'user.role', '') != 'admin'){
        return res.redirect('/');
    }
    next()
};

module.exports.checkLogin = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        return res.redirect('/login')
    }
    next()
};