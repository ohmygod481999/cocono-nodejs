const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');

const mongoose = require('mongoose');
const MongoDBStore = require('connect-mongodb-session')(session);
const route = require('./route');

const MONGODB_URI = 'mongodb://localhost:27017/cocono';

var app = express();
const store = new MongoDBStore({
  uri : MONGODB_URI,
  collection: 'sessions',
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//set session
app.use(session({
  secret: 'mySecretKey',
  resave: false,
  saveUninitialized: false,
  store: store
}));

app.use(function(req, res, next) {
  res.locals.uname = req.session.uname;
  res.locals.isLoggedIn = req.session.isLoggedIn;
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
route.setRoute(app);


// app.use('/angular.js',function (req,res) {
//   res.sendFile(__dirname + '/node_modules/angular/angular.js');
// });

//set up mongoose connection
mongoose.connect(MONGODB_URI,function (err) {
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
