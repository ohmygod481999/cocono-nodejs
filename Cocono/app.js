var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
const session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const courseRouter = require('./routes/course.route');
var mongoose = require('mongoose');
const route = require('./route');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/views',express.static(path.join(__dirname, 'views')));
app.use('/angular',express.static(path.join(__dirname, 'node_modules/angular')));
route.setRoute(app);

// app.use('/angular.js',function (req,res) {
//   res.sendFile(__dirname + '/node_modules/angular/angular.js');
// });

//set up mongoose connection
const mongoDb = 'mongodb://localhost:27017/cocono';
mongoose.connect(mongoDb,function (err) {
  if (err) throw err;
  console.log('Connect database successfully!');
});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

//set session
app.use(session({
  secret: 'mySecretKey',
  resave: true,
  saveUninitialized: false
}));

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
