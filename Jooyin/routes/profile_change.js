var express = require('express');
var router = express.Router();
var app = express( );
var pool = require('./lib/db.js');
var util = require('util');
var fs = require('fs');
;var multer = require('multer');

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

      res.render('profile_change', {
        user_data : user_data,
        group_data : rows
			});

    });
  });
});

router.post('/change',  function(req, res, next) {
	
	res.locals.nickname = req.session.nickname;

	if (req.file) {
		console.log("70");
		var theFile = util.inspect(req.file);
		console.log(theFile);
		var fs = require('fs');
		fs.rename('./public/images/user_image/tmp/'+req.file.filename, './public/images/user_image/'+res.locals.nickname+'.jpg', function(err) {
			if ( err ) console.log('ERROR: ' + err);
		});
	}
	else {
		console.log("YOYOYO");
	}

	var db = pool;
	var sql = {
		height: req.body.height,
		weight : req.body.weight,
		living_place : req.body.spot,
		favor_sport_1 : req.body.like_sport1,
		favor_sport_2 : req.body.like_sport2,
		diary : req.body.goal,
	};

	console.log("update data:");
	console.log(sql);

	var input = [sql,res.locals.nickname];
	var qur = db.query('UPDATE ac_basic SET ? WHERE ac_basic.nickname = ? ', input, function(err, rows) {
		if (err) {
			console.log(err);	
		}
		res.setHeader('Content-Type', 'application/json');
		res.redirect('/profile');
	});


});


module.exports = router;
