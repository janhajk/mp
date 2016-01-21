var db = require(__dirname + '/db.js');


var add = function(data, callback) {
  // db.connection.connect();
//   var sql = 'INSERT INTO movie (title, imdbid, boxofficemojoid, date_opening, date_opening_us, date_opening_china, date_release_disc) VALUES ()';
   //db.connection.query(sql);
   //db.connection.end();
   db.insert('movie', data);
};
exports.add = add;


var get = function(id, callback) {
   db.connection.connect();
   var id = '';
   if (id !== 0) id = ' WHERE id = ' + id;
   var sql = "SELECT * FROM movie" + id;
   db.connection.query(sql, function(err, rows, fields) {
      callback(rows);
   });
   db.connection.end();
};