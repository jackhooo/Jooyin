var express = require('express');
var router = express.Router();
var pool = require('./lib/db.js');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('newgroup', {
		title : 'Expresss'
	});
});

router.post('/creatgroup', function(req, res, next) {
	
	console.log(req.body);
	var db = pool;
	var sql = {
		formatted_address: req.body.formatted_address,
		group_name : req.body.group_name,
		start_datetime : req.body.start_date + " " + req.body.start_time,
		end_datetime : req.body.end_date + " " + req.body.end_time,
		sports_category : req.body.sports_category,
		group_people : req.body.group_people,
		group_location : req.body.group_location,
		detail : req.body.detail,
		position_lat : req.body.position_lat,
		position_lng : req.body.position_lng
	};

	// var qur = db.query('INSERT INTO group_with_user SET ?', sql2,
	// function(err, rows) {
	// if (err) {
	// console.log(err);
	// }
	// res.setHeader('Content-Type', 'application/json');
	// res.redirect('../maingroup');
	// });

	// console.log(sql);
	var qur = db.query('INSERT INTO agroup SET ?', sql, function(err, rows) {
		if (err) {
			console.log(err);
		}
		res.setHeader('Content-Type', 'application/json');
		res.redirect('/maingroup');

		db.query('SELECT MAX(id) as id FROM agroup', function(err, rows2) {
			if (err) {
				console.log(err);
			}

			var data = rows2;
			console.log(data);
			var sql2 = {
				user_name : req.session.nickname,
				group_id : data[0].id,
			};
			var qur = db.query('INSERT INTO group_with_user SET ?', sql2,
					function(err, rows3) {
						if (err) {
							console.log(err);
						}
					});

		});
	});

	// res.render('newgroup', { title: 'Expresss' });
});

module.exports = router;
