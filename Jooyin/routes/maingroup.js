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
	db.query('SELECT * FROM agroup ORDER By id desc', function(err, rows) {
		if (err) {
			console.log(err);
		}
		var datalength = rows.length;
		// console.log(datalength);
		var data = rows;
		data.splice(0, (page - 1) * 4);
		data.splice(4, Number.MAX_VALUE);

		// console.log(data);
		res.render('maingroup', {
			data : data,
			datalength : datalength,
			page : page
		});
	});
});


module.exports = router;
