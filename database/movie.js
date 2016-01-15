var db = require(__dirname + '/db.js');


var function add(data, callback) {
  // db.connection.connect();
//   var sql = 'INSERT INTO movie (title, imdbid, boxofficemojoid, date_opening, date_opening_us, date_opening_china, date_release_disc) VALUES ()';
   //db.connection.query(sql);
   //db.connection.end();
   db.insert('movie', data);
};