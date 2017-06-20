var express = require('express');
var router = express.Router();
var pool = require('./lib/db.js');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.locals.error = null;
	res.render('signupPage', {
		title : 'Expresss'
	});
});

router.post('/', function(req, res, next) {
	var db = pool;
	res.locals.error = null;
	
	db.query('SELECT * FROM ac_basic WHERE email = ?', req.body.email, function(err, rows1) {
        if (err) {
            console.log(err);
        }
        var data1 = rows1;
        if(rows1.length !== 0){
        	res.locals.error = '此email已經被註冊過!!';
        	res.render('signupPage');
        }
        else{	
			var fs = require('fs');
			var sexPhoto;
			console.log(req.body.sex);
			if( req.body.sex == 'M' ) sexPhoto = 'man';
			else sexPhoto = 'female';
			fs.writeFileSync('./public/images/user_image/'+req.body.nickname, fs.readFileSync('./public/images/user_image/'+sexPhoto));

        	var sql = {
        			email : req.body.email,
        			sex : req.body.sex,
        			nickname : req.body.nickname,
        			birthday : req.body.birthday,
        			password : req.body.password
			};
			var qur = db.query('INSERT INTO ac_basic SET ?', sql, function(err, rows) {
				if (err) {
					console.log(err);
				}
				req.session.email = req.body.email;
				req.session.nickname = req.body.nickname;
				req.session.password = req.body.password;
				req.session.logined = true;
				res.setHeader('Content-Type', 'application/json');
				res.redirect('../maingroup');
			});
        }
    });
});

module.exports = router;
