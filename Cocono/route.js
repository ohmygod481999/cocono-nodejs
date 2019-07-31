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
        let message = req.flash('error');
        console.log(message);
        if (message.length > 0) {
            message = message[0];
        }
        else message = null;
        res.render('auth/login',{
            errorMessage: message
        });
    });
    app.use('/signup',function (req,res) {
        let message = req.flash('error');
        console.log(message);
        if (message.length > 0) {
            message = message[0];
        }
        else message = null;
        res.render('auth/signup',{
            errorMessage: message
        });
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