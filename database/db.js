var mysql  = require('mysql');
var config = require(__dirname + '/../config.js');
var movie = require(__dirname + '/movie.js');

var connection = mysql.createConnection({
  host     : config.db.host,
  user     : config.db.user,
  password : config.db.password,
  database : config.db.database,
  supportBigNumbers: true
});

exports.mysql = mysql;
exports.connection = connection;


var insert = function(table, values){
   var sql = 'INSERT INTO ' + table + ' (%keys) VALUES (%values)';
   var k = [];
   var v = [];
   for (var key in values) {
      k.push(key);
      v.push("'" + values[key]  + "'");
   }
   sql.replace('%keys', k.join());
   sql.replace('%values', v.join());
   connection.connect();
   utils.log(sql);
   //connection.query(sql);
   connection.end();
};

exports.insert = insert;

exports.movie = movie;