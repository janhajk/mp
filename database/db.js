var mysql  = require('mysql');
var config = require(__dirname + '/config.js');

var connection = mysql.createConnection({
  host     : config.db.host,
  user     : config.db.user,
  password : config.db.password,
  database : config.db.database
});

exports.mysql = mysql;
exports.connection = connection;