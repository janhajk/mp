var request = require('request');
var utils = require(__dirname + '/utils.js');

var dailychart = function(mojoid) {
   return 'http://www.boxofficemojo.com/movies/?page=daily&view=chart&id=' + mojoid;
};

var tablenum = 3;

var getdailychart = function(mojoid, callback) {
   var url = dailychart(mojoid);
   request.get(url, function(err, response, body) {
      utils.log((err===null?'No ':'') + 'Error when requesting url ' + url);
      utils.log('Error: ' + err); utils.log('-');
      parseDailyChart(body, callback);
   });
};


var parseDailyChart = function(data, callback) {
   var re = new RegExp("(<table[^]*?<\/table>)", "gmi");
   var tables = data.match(re);
   var table = tables[tablenum];
   re = new RegExp("<tr[^]*?<\/tr>", "gmi");
   var lines = table.match(re);
   var header = lines.shift;
   var cols;
   var output = [];
   var day = {
      date: 0,
      gross: 0,
      theaters: 0
   };
   var c;
   for (var i in lines) {
      utils.log(lines[i]); utils.log('-');
      re = new RegExp("<td[^]*?<\/td>", "gmi");
      cols = lines[i].match(re);
      re = new RegExp("<b.*?>(.*?)<\/b>", "gmi");
      c = re.exec(cols[1]);
      day.date = c[1];
      re = new RegExp("<font.*?>(.*?)<\/font>", "gmi"); //1, 3, 6
      c = re.exec(cols[3]);
      day.gross = c[1].replace(/\$|,/, '');
      re = new RegExp("<font.*?>(.*?)<\/font>", "gmi");
      c = re.exec(cols[6]);
      day.theaters = c[1].replace(/,/, '');
      output.push(day);
   }
   callback(output);
};

var test = function(callback) {
   var fs = require('fs');
   fs.readFile(__dirname + '/sampledata.txt', 'utf-8', function (err, data){
      parseDailyChart(data, callback);
   });
};

exports.test = test;