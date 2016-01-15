var request = require('request');
var utils = require(__dirname + '/utils.js');

var dailychart = function(mojoid) {
   return 'http://www.boxofficemojo.com/movies/?page=daily&view=chart&id=' + mojoid;
};
var international = function(mojoid){
   return 'http://www.boxofficemojo.com/movies/?page=intl&id=' + mojoid;
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
      if (!i) continue; // skip header of table

      day = {date:0,gross:0,theaters:0};
      utils.log(lines[i]); utils.log('-');
      re = new RegExp("<td[^]*?<\/td>", "gmi");
      cols = lines[i].match(re);
      re = new RegExp("<b.*?>(.*?)<\/b>", "gmi");
      c = re.exec(cols[1]);
      utils.log(c);
      if (c !== null) day.date = dateToStamp(c[1]);
      re = new RegExp("<font.*?>(.*?)<\/font>", "gmi"); //1, 3, 6
      c = re.exec(cols[3]);
      utils.log(c);
      if (c !== null) day.gross = c[1].replace(/[\$|,]/g, '');
      re = new RegExp("<font.*?>(.*?)<\/font>", "gmi");
      c = re.exec(cols[6]);
      utils.log(c);
      if (c !== null) day.theaters = c[1].replace(/,/, '');
      if (day.date) output.push(day);
      utils.log('-');
   }
   callback(output);
};

var dateToStamp = function(date) {
   var m = {Jan:0,Feb:1,Mar:2,Apr:3,Mai:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11};
   var d = /^([a-zA-Z]{3})\.\s(\d*?),\s(\d{4})/.exec(date);
   if (d !== null) {
      return new Date(d[3],m[d[1]],d[2]);
   }
   else return 0;
};

var test = function(callback) {
   var fs = require('fs');
   fs.readFile(__dirname + '/sampledata.dailychart.txt', 'utf-8', function (err, data){
      parseDailyChart(data, callback);
   });
};

exports.test = test;