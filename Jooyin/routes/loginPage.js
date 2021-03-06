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
  var isFb = req.body.isFb;

  //if (req.body.isFb == true) {isFb = true;}
  //console.log(req.body.isFb);
  var db = pool;
  //var data = "";
  if (isFb) {
    console.log(req.body.cname);
    var userid = req.body.uid;
    var filter = "";
    if (userid) { filter = 'WHERE email = ?'; }
    db.query('SELECT * FROM ac_basic ' + filter, userid, function (err, rows) {
      if (err) { console.log(err); }
      var data = rows;
      //console.log(data);
      if (rows.length === 0) {
        var sql = {
          email: req.body.uid,
          sex: null,
          nickname: req.body.cname,
          birthday: req.body.birthday,
          password: null
        };
        var qur = db.query('INSERT INTO ac_basic SET ?', sql, function (err, rows) {
          if (err) {
            console.log(err);
          }
        });
      }
    });
    req.session.email = req.body.uid;
    req.session.nickname = req.body.cname;
    req.session.password = null;
    req.session.logined = true;

    const download = require('image-downloader')


    // Download to a directory and save with the original filename 
    const options = {
      url: 'http://graph.facebook.com/' + req.body.uid + '/picture?type=large',
      dest: './public/images/user_image/' + req.body.cname + '.jpg'          // Save to /path/to/dest/image.jpg 
    }

    download.image(options)
      .then(({ filename, image }) => {
        console.log('File saved to', filename)
      }).catch((err) => {
        throw err
      })

    res.send('hi');
    //res.redirect('../maingroup');
  }
  else {
    //console.log("hi");
    var userName = req.body.email;
    var filter = "";
    if (userName) { filter = 'WHERE email = ?'; }
    db.query('SELECT * FROM ac_basic ' + filter, userName, function (err, rows) {
      if (err) {
        console.log(err);
      }
      var data = rows;
      //console.log(data);
      if (rows.length === 0) {
        res.locals.error = '使用者不存在';
        res.render('loginPage', { title: '' });
        return;
      }
      else {
        if (data[0].password !== req.body.password) {
          res.locals.error = '密碼錯誤';
          res.render('loginPage', { title: '' });
        }
        else {
          req.session.email = data[0].email;
          req.session.nickname = data[0].nickname;
          req.session.password = data[0].password;
          req.session.logined = true;
          res.redirect('../maingroup');
        }
        return;
      }
    });
  }

});

/* 使用者登出頁面. */
router.get('/signout', function (req, res, next) {
  req.session.logined = false;
  res.redirect('../homepage');
  res.end();
});

module.exports = router;