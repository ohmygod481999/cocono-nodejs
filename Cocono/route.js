const indexRouter = require('./routes/index');
const usersRouter = require('./routes/user.route');
const courseRouter = require('./routes/course.route');


module.exports.setRoute = function (app) {
    app.use('/index', indexRouter);
    app.use('/users', usersRouter);
    app.use('/courses',courseRouter);
    app.use('/login',function (req,res) {
        res.render('login');
    });
    app.use('/signup',function (req,res) {
        res.render('signup');
    });
    app.use('/about',function (req,res) {
        res.render('about');
    });
};