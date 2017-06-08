var express = require('express');
var router = express.Router();
var pool = require('./lib/db.js');
/* GET home page. */
// var app = require('express')();
//
//
// var http = require('http').Server(app);
// var io = require('socket.io')(http);
router.get('/',function(req, res, next) {

	res.locals.nickname = req.session.nickname;
	res.locals.logined = req.session.logined;
	var db = pool;
	var data = "";
	var group_user = "";
	var group_id = req.query.group_id;

	var data = "";

	db.query('SELECT * FROM agroup ,group_with_user WHERE agroup.id = ? and agroup.id = group_with_user.group_id',group_id, function(err, rows) {

		if (err) {
			console.log(err);
		}
		var data = rows;
		//console.log(data);
		db.query('SELECT * FROM group_with_user, agroup WHERE group_with_user.user_name = ? and group_with_user.group_id = agroup.id', res.locals.nickname, function(err, rows) {

			if (err) {
				console.log(err);
			}
			myGroup_data = rows;
		//	console.log(myGroup_data);
			res.render('insidegroup', {
				data : data,
				myGroup_data : myGroup_data
			});
		});
	});

});

router.get('/join', function(req, res, next) {

	var group_id = req.query.group_id;
	var db = pool;

	var sql = {
			user_name : req.session.nickname,
			group_id : group_id,
	};
	var qur = db.query('INSERT INTO group_with_user SET ?', sql,function(err, rows2) {
		if (err) {
			console.log(err);
		}
		res.redirect('/insidegroup?group_id='+ group_id);
	});


});

router.get('/quit', function(req, res, next) {

	var group_id = req.query.group_id;
	var user_name = req.session.nickname;
	var db = pool;

	var sql = [ user_name, group_id];
	var qur = db.query('DELETE FROM group_with_user WHERE user_name = ? and group_id = ? ', sql,function(err, rows2) {
		if (err) {
			console.log(err);
		}
		res.redirect('/insidegroup?group_id='+ group_id);
	});
});
module.exports = router;
