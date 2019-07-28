const indexRouter = require('./routes/index.route');
const authRouter = require('./routes/auth.route');
const courseRouter = require('./routes/course.route');
const adminRouter = require('./routes/admin.route');


module.exports.setRoute = function (app) {
    app.use('/', indexRouter);
    app.use('/auth', authRouter);
    app.use('/courses',courseRouter);
    app.use('/admin',adminRouter);
    app.use('/login',function (req,res) {
        res.render('auth/login');
    });
    app.use('/signup',function (req,res) {
        res.render('auth/signup');
    });
    app.use('/about',function (req,res) {
        res.render('about');
    });
    app.use('/events',function (req,res) {
        res.render('event/events');
    });
    app.use('/teachers',function (req,res) {
        res.render('teacher/teachers');
    });
    app.use('/blog',function (req,res) {
        res.render('blog/blog');
    });
};