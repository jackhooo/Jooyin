var express = require('express');
var router = express.Router();
var pool = require('./lib/db.js');
/* GET home page. */


router.get('/', function(req, res, next) {
	
	res.locals.nickname = req.session.nickname;
	res.locals.logined = req.session.logined ;
	
	var page = 1;

	if (req.query.page) {
		page = req.query.page;
	}
	
	var db = pool;
	var data = "";
	var datalength;
	var myGroup_data = "";

	db.query('SELECT * FROM agroup ORDER By id desc', function(err, rows) {

		if (err) {
			console.log(err);
		}
		datalength = rows.length;
		data = rows;
		data.splice(0, (page - 1) * 6);
		data.splice(6, Number.MAX_VALUE);

		
		db.query('SELECT * FROM group_with_user, agroup WHERE group_with_user.user_name = ? and group_with_user.group_id = agroup.id ORDER By id desc', res.locals.nickname, function(err, rows) {

			if (err) {
				console.log(err);
			}
			myGroup_data = rows;

			//console.log(myGroup_data);

			res.render('maingroup', {
				data : data,
				datalength : datalength,
				page : page,
				myGroup_data : myGroup_data
			});
		});
	});




});

router.post('/', function(req, res, next) {
	
	res.locals.nickname = req.session.nickname;
	res.locals.logined = req.session.logined ;
	res.locals.search = req.body.search;
	var page = 1;

	if (req.query.page) {
		page = req.query.page;
	}
	
	var db = pool;
	var data = "";
	var datalength;
	var myGroup_data = "";
	var sql = [ req.body.search, req.body.search];
	 
	db.query('SELECT * FROM agroup WHERE group_name = ? OR sports_category = ? ORDER By id desc',sql, function(err, rows) {

		if (err) {
			console.log(err);
		}
		datalength = rows.length;
		data = rows;
		//data.splice(0, (page - 1) * 6);
		//data.splice(6, Number.MAX_VALUE);

		
		db.query('SELECT * FROM group_with_user, agroup WHERE group_with_user.user_name = ? and group_with_user.group_id = agroup.id ORDER By id desc', res.locals.nickname, function(err, rows) {

			if (err) {
				console.log(err);
			}
			myGroup_data = rows;

			//console.log(myGroup_data);

			res.render('maingroup', {
				data : data,
				datalength : datalength,
				page : page,
				myGroup_data : myGroup_data
			});
		});
	});




});



module.exports = router;
