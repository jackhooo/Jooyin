/**
 * http://usejsdoc.org/
 */
var express = require('express');
var router = express.Router();
var pool = require('./lib/db.js');

router.get('/', function (req, res, next) {
	res.locals.error = null;
    res.render('loginPage', { title: 'Expresss' });
});

router.post('/', function (req, res, next) {

  var db = pool;
  var data = "";
  var userName = req.body.email;

  //req.body['txtUserName']

  var filter = "";

  if (userName) {
    filter = 'WHERE email = ?';
  }

  db.query('SELECT * FROM ac_basic ' + filter, userName, function (err, rows) {
    if (err) {
      console.log(err);
    }
    var data = rows;
    
    console.log(data);
    
    if (rows.length === 0) {
      res.locals.error = '使用者不存在';
      res.render('loginPage', { title: '' });
      return;
    }
    else{
    	if(data[0].password !== req.body.password) {
    		res.locals.error = '密碼錯誤';
    	    res.render('loginPage', { title: '' });  		
    	}
    	else{
    		req.session.email = data[0].email;
    		req.session.nickname = data[0].nickname;
    		req.session.password = data[0].password;
    		req.session.logined = true;
    		res.redirect('../maingroup');
    	}
    	
    	
    	
      return;
    }

    // use index.ejs
    // res.render('index', { title: 'Account Information', data: data, user: user });
  });

});

/* 使用者登出頁面. */
router.get('/signout', function(req, res, next) {
    req.session.logined = false;
    res.redirect('../maingroup');
    res.end();
});


module.exports = router;