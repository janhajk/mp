$(document).ready(function() {
   var msg = function(msg, type){
      alert(msg);
   };
   $("#formaddmovie").submit(function(event) {
      event.preventDefault();
      submitForm();
   });
   var
      function = addMovie() {
            var data = {
               title: $('#addMovieTitle').val();
               imdbid: $('#addMovieimdbid').val();
               boxofficemojoid: $('#addMovieboxofficemojoid').val();
               runtime: $('#addMovieruntime').val();
               date_opening: $('#addMoviedate_opening').val();
               date_opening_us: $('#addMoviedate_opening_us').val();
               date_opening_china: $('#addMoviedate_opening_china').val();
               date_release_disc: $('#addMoviedate_release_disc').val();
            };
            $.ajax("/movie/add"{
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
});