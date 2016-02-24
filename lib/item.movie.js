var item = require(__dirname + '/item.js');


var new = function(title) {
   item.new(title, 'movie');
   
};
exports.new = new;