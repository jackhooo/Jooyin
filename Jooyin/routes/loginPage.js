/**
 * http://usejsdoc.org/
 */
var express = require('express');
var router = express.Router();
var pool = require('./lib/db.js');

router.get('/', function (req, res, next) {
    res.render('loginPage', { title: 'Expresss' });
});

router.post('/', function (req, res, next) {

  var db = pool;
  var data = "";
  var userName = "";
  var userName = req.body.email;

  //req.body['txtUserName']

  var filter = "";

  if (userName) {
    filter = 'WHERE name = ?';
  }

  db.query('SELECT * FROM test ' + filter, userName, function (err, rows) {
    if (err) {
      console.log(err);
    }
    var data = rows;

    if (rows == '') {
      res.locals.error = '使用者不存在';
      res.render('loginPage', { title: '' });
      return;
    }
    else if(userName != ''){
      res.redirect('maingroup');
    }
    else{
      res.locals.error = '未輸入使用者';
      res.render('loginPage', { title: '' });
      return;
    }

    // use index.ejs
    // res.render('index', { title: 'Account Information', data: data, user: user });
  });

});

module.exports = router;