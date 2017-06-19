var express = require('express');
var router = express.Router();
var pool = require('./lib/db.js');


router.get('/', function(req, res, next) {

	res.locals.nickname = req.session.nickname;
	res.locals.logined = req.session.logined ;

  var db = pool;

  db.query('SELECT * FROM ac_basic WHERE ac_basic.nickname = ?' , res.locals.nickname , function(err, rows) {
    if (err) {
      console.log(err);
    }
    var user_data = rows[0];

    db.query('SELECT * FROM group_with_user, agroup WHERE group_with_user.user_name = ? and group_with_user.group_id = agroup.id ORDER By start_datetime desc', res.locals.nickname, function(err, rows) {
      
      res.render('profile', {
        user_data : user_data,
        group_data : rows
			});
      
    });
  });
});

module.exports = router;
