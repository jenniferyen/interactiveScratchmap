var express = require('express');
var path = require('path');
var bodyParser = require('body-parser')
var cookieSession = require('cookie-session');
var mongoose = require('mongoose');
var fs = require('fs')

var accountRoutes = require('./routes/account');
var isAuthenticated = require('./middlewares/isAuthenticated');

// init app
var app = express();

// connect to mongoose
mongoose.connect('mongodb+srv://final:password12345@cis197-final-saq3u.mongodb.net/test?retryWrites=true')

// set the express view engine to take care of ejs within html files
app.engine('html', require('ejs').__express);
app.set('view engine', 'html');

// set up bodyParser
app.use(bodyParser.urlencoded({ extended: false }))

// set up cookie session
app.use(cookieSession({
  name: 'local-session',
  keys: ['spooky'],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

// set up route to accounts
app.use('/account', accountRoutes);

// load CSS and JS
app.use('/css', express.static(__dirname + '/css'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/animations', express.static(__dirname + '/animations'));

app.use(function (err, req, res, next) {
  return res.send('ERROR :  ' + err.message)
})

// home route
app.get('/', function(req, res) {
  res.render('index', { user: req.session.user })
});


// redirect to three.js animations

app.get('/animations/fish', function(req, res) {
  res.sendFile(path.join(__dirname, 'animations/fish.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.get('/animations/lion', function(req, res) {
  res.sendFile(path.join(__dirname, 'animations/lion.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

// listening on port 3000
app.listen(3000, function () {
  console.log('Express app listening on port 3000');
});
