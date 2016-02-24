var db = require(__dirname + '/db.js');


var add = function(data, callback) {
   db.insert('movie', data);
};
exports.add = add;


var get = function(id, callback) {
   var sqlid = '';
   if (id !== 0) sqlid = ' WHERE id = ' + id;
   var sql = 'SELECT * FROM movie' + sqlid;
   db.connection.query(sql, function(err, rows, fields) {
      console.log(err);
      console.log(rows);
      callback(rows);
   });
};
exports.get = get;

var updateHistory = function(id, callback){
   var mojo = require(__dirname + '../lib/mojo.js');
   // mojoid from id
   mojo.getdailychart(mojoid, function(err, data){
      for (var i in data) {
         // check if entry already exists
         // if exists, overwrite
         // if not add new entry
      }
   });
};
exports.updateHistory = updateHistory;
