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
   var sqlid = '';
   if (id !== 0) sqlid = ' WHERE id = ' + id;
   var sql = "SELECT * FROM movie" + sqlid;
   db.connection.query(sql, function(err, rows, fields) {
      console.log(err);
      console.log(rows);
      callback(rows);
   });
   db.connection.end();
};
exports.get = get;