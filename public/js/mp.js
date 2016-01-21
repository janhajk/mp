$(document).ready(function() {
   var msg = function(msg, type){
      alert(msg);
   };
   $("#formaddmovie").submit(function(event) {
      event.preventDefault();
      movieAdd();
   });
   var movieAdd = function() {
      var data = {
         title: $('#addMovieTitle').val(),
         imdbid: $('#addMovieimdbid').val(),
         boxofficemojoid: $('#addMovieboxofficemojoid').val(),
         runtime: $('#addMovieruntime').val(),
         date_opening: $('#addMoviedate_opening').val(),
         date_opening_us: $('#addMoviedate_opening_us').val(),
         date_opening_china: $('#addMoviedate_opening_china').val(),
         date_release_disc: $('#addMoviedate_release_disc').val()
      };
      $.ajax("/movie/add", {
         type: "POST",
         data: data,
         dataType: "json",
         success: function(text) {
            if(text == "success") {
               msg('New Movie created. ' + text);
            }
         }
      });
   };
   
   var movieLoad = function(id, callback) {
      if (id === 0 || typeof id === 'undefined') id = [];
      if (id.constructor !== Array) id = [id];
      $.ajax('/movie', {
         type: 'GET',
         data: {id:id},
         dataType: 'json',
         success: function(rows){
            callback(rows);
         },
         error: function(jq, err){console.log(err)}
      });
   };
   
   var movieLine = function(movie) {
      var tr = document.createElement('tr');
      var title = document.createElement('td');
      var updateHistory = document.createElement('td');
      title.innerHTML = movie.title;
      updateHistory.innerHTML = 'update history';
      updateHistory.onclick = function(){
         movieHistoryUpdate(movie.id);
      };
      tr.appendChild(title);
      tr.appendChild(updateHistory);
      return tr;
   };
   movieLoad(0, function(rows){
      var container = document.getElementById('movies');
      var table = document.createElement('table');
      for (var i in rows) {
         table.appendChild(movieLine(rows[i]));
      }
   });
});