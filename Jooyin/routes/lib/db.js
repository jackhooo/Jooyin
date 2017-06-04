var mysql = require("mysql");

var pool = mysql.createConnection({
    host: "140.119.163.23",
    user: "admin",
    password: "nccutest",
    database: "jooyin"
});

pool.connect(function(err) {
    if (err) {
        console.log('connecting error');
        return;
    }
    console.log('connecting success');
});

module.exports = pool;