var mysql  = require('mysql');
var config = require(__dirname + '/../config.js');
var utils = require(__dirname + '/../lib/utils.js');


var connection = mysql.createConnection({
  host     : config.db.host,
  user     : config.db.user,
  password : config.db.password,
  database : config.db.database,
  supportBigNumbers: true
});
connection.connect();

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
   sql = sql.replace('%keys', k.join());
   sql = sql.replace('%values', v.join());
   utils.log(sql);
   //connection.query(sql);
};

exports.insert = insert;

exports.movie = require('./movie.js');