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
mongoose.connect('mongodb+srv://cis197-final-user:cis197-final-password@cis197-final-nfk6f.mongodb.net/test?retryWrites=true')

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

app.use(function (err, req, res, next) {
  return res.send('ERROR :  ' + err.message)
})

// home route
app.get('/', function(req, res) {
  res.render('index', { user: req.session.user })
});

// TO DO: read and write personal maps
var obj =
{
  map: {
    name: "world_countries_mercator",
    zoom: {
      enabled: true,
      maxLevel: 20,
    },
    defaultArea: {
      attrs: {
        fill: "AliceBlue",
        stroke: "#99c7ff",
        cursor: "pointer"
      },
      attrsHover: {
        fill: "#ffae1a"
      },
      // eventHandlers: {
      //   dblclick: function (e, id, mapElem, textElem) {
      //     var newData = {
      //       'areas': {}
      //     };
      //     // if color is original, change to new
      //     if (mapElem.originalAttrs.fill == "AliceBlue") {
      //       newData.areas[id] = {
      //         attrs: {
      //           fill: "LightSeaGreen"
      //         }
      //       };
      //     // if color is new, change to original
      //     } else {
      //       newData.areas[id] = {
      //         attrs: {
      //           fill: "AliceBlue"
      //         }
      //       };
      //     }
      //     $(".mapcontainer").trigger('update', [{mapOptions: newData}]);
      //   }
      // },
    }
  }
}
let data = JSON.stringify(obj, null, 2)
fs.writeFileSync('maps/personalMap.json', data)

app.get('/getMap', function(req, res) {
  const out = fs.readdirSync('./maps')
  res.json(out)
});

// listening on port 3000
app.listen(3000, function () {
  console.log('Express app listening on port 3000');
});
