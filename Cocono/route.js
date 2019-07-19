const indexRouter = require('./routes/index.route');
const authRouter = require('./routes/auth.route');
const courseRouter = require('./routes/course.route');


module.exports.setRoute = function (app) {
    app.use('/', indexRouter);
    app.use('/auth', authRouter);
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
    app.use('/events',function (req,res) {
        res.render('events');
    });
    app.use('/teachers',function (req,res) {
        res.render('teachers');
    });
    app.use('/blog',function (req,res) {
        res.render('blog');
    });

};