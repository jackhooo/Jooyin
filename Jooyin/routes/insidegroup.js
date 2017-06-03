var express = require('express');
var router = express.Router();
var pool = require('./lib/db.js');
/* GET home page. */
router.get('/', function(req, res, next) {
  var db = pool;
  var data="";
  var group_user="";
  var group_id = req.query.group_id;
  
  var data = "";

      db.query('SELECT * FROM agroup ,group_with_user WHERE agroup.id = ? and agroup.id = group_with_user.group_id', group_id, function(err, rows) {
    	  
    	  if (err) {
              console.log(err);
          }
    	  var data = rows;
    	  console.log(data);
    	     	  
          res.render('insidegroup', { data: data});
            	  
    	  
                  
      });
     
});
module.exports = router;
