// for mysql see: https://github.com/felixge/node-mysql


var config      = require(__dirname + '/config.js');

// Express
var express        = require('express');
var compression    = require('compression');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var cookieParser   = require('cookie-parser');
var session        = require('express-session');


// Auth
var passport       = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// Filesystem
var path     = require('path');
var fs       = require('fs');

// User
var utils    = require(__dirname + '/lib/utils.js');

var db       = require(__dirname + '/database/db.js');


// Setting up Express
var app = express();
app.use(compression());
app.use(methodOverride());  // simulate DELETE and PUT
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(cookieParser());
app.use(session({
   secret: config.cookiesecret,
   proxy: true,
   resave: true,
   saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static((path.join(__dirname, 'public'))));


app.listen(config.port, function(){
   console.log('App listening on port ' + config.port);
});

// Authentication
passport.serializeUser(function(user, done) {
   done(null, user);
});
passport.deserializeUser(function(obj, done) {
   done(null, obj);
});
passport.use(new GoogleStrategy({
   clientID: config.google.GOOGLE_CLIENT_ID,
   clientSecret: config.google.GOOGLE_CLIENT_SECRET,
   callbackURL: config.baseurl + "/auth/google/callback"
}, function(accessToken, refreshToken, profile, done) {
   console.log(profile);
   process.nextTick(function(err) {
      if (profile.id === config.google.user) {
         //utils.log('Login in user "' + profile.displayName + '"');
         return done(null, profile);
      }
      else {
         //utils.log('User not authorised!');
         return done(err);
      }
   });
}));

app.get('/auth/google', passport.authenticate('google', {scope: ['https://www.googleapis.com/auth/plus.login']}), function(req, res) {});
app.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/login'}), function(req, res) {
   res.redirect('/start');
});
app.get('/logout', function(req, res) {
   req.logout();
   res.redirect('/login');
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}


// Router

app.get('/', function(req, res){
   fs.readFile(__dirname + '/public/index.html', 'utf-8', function (err, data){
      res.send(data);
   });
});
app.get('/login', function(req, res){
   fs.readFile(__dirname + '/public/index.html', 'utf-8', function (err, data){
      res.send(data);
   });
});

app.get('/start', ensureAuthenticated, function(req, res) {
    fs.readFile(__dirname + '/public/start.html', 'utf-8', function (err, data) {
        res.send(data);
    });
});

app.get('/test', ensureAuthenticated, function(req, res){
   var mojo = require(__dirname + '/lib/mojo.js');
   mojo.test(function(output){
      res.send(output);
   });
});

app.post('/movie/add', ensureAuthenticated, function(req, res) {
   utils.log('adding new movie: ' + req.body.title);
   utils.log(req.body);
   db.movie.add(req.body);
});
app.get('/movie', ensureAuthenticated, function(req, res) {
   utils.log('requsting list of movies...');
   db.movie.get(0, function(rows){
      res.send(rows);
   });
});

app.post('/movie/update/history', ensureAuthenticated, function(req, res) {
   utils.log('Updating history for movie: ' + req.body.id);
   db.movie.updateHistory(req.body.id, function(){
      'updated!'
   });
});