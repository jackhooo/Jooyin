var express = require('express');
var router = express.Router();
var pool = require('./lib/db.js');


router.get('/', function(req, res, next) {

	res.locals.nickname = req.session.nickname;
	res.locals.logined = req.session.logined ;
	res.locals.username = req.query.username;

  var isMyUser = false;
  console.log(res.locals.username);
  if( res.locals.username==undefined ) {
    console.log("isMyUser");
    isMyUser = true;
    res.locals.username = res.locals.nickname;
  }
  else console.log("DEEEEFINDEDD");

  var db = pool;

  db.query('SELECT * FROM ac_basic WHERE ac_basic.nickname = ?' , res.locals.username , function(err, rows) {
    if (err) {
      console.log(err);
    }
    var user_data = rows[0];

    db.query('SELECT * FROM group_with_user, agroup WHERE group_with_user.user_name = ? and group_with_user.group_id = agroup.id ORDER By start_datetime desc', res.locals.username, function(err, rows) {
      
      var group_data = rows;
      db.query('SELECT * FROM group_user_save, agroup WHERE group_user_save.user_name = ? and group_user_save.group_id = agroup.id ORDER By start_datetime desc', res.locals.username, function(err, rows) {
        
          res.render('profile', {
            user_data : user_data,
            group_data : group_data,
            save_group_data : rows, 
            isMyUser : isMyUser
          });
      });
    });
  });
});

module.exports = router;
