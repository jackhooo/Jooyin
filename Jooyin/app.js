var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cookieSession = require('cookie-session');
var socket = require('socket.io');
var uploads = require('./routes/profile_change');

var fs = require('fs');
var multer = require('multer');

var index = require('./routes/index');
var users = require('./routes/users');
var loginPage = require('./routes/loginPage');
var elements = require('./routes/elements');
var generic = require('./routes/generic');
var insidegroup = require('./routes/insidegroup');
var maingroup = require('./routes/maingroup');
var newgroup = require('./routes/newgroup');
var signupPage = require('./routes/signupPage');
var homepage = require('./routes/homepage');
var profile = require('./routes/profile');
var profile_change = require('./routes/profile_change');

// DataBase
var mysql = require("mysql");

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1995",
    database: "test"
});

con.connect(function(err) {
    if (err) {
        console.log('connecting error');
        return;
    }
    console.log('connecting success');
});

var app = express();

//啟用cookieSession
app.use(cookieSession({
    key: 'node',
    secret: 'HelloExpressSESSION'
}));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(multer({dest: './public/images/user_image/tmp'}).single('uploadingFile'));;
app.use(bodyParser({uploadDir: './public/images/user_image/'}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/loginPage', loginPage);
app.use('/index', index);
app.use('/users', users);
app.use('/elements', elements);
app.use('/generic', generic);
app.use('/insidegroup', insidegroup);
app.use('/maingroup', maingroup);
app.use('/newgroup', newgroup);
app.use('/signupPage', signupPage);
app.use('/homepage', homepage);
app.use('/profile', profile);
app.use('/profile_change', profile_change);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
