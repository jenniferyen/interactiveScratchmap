var express = require('express')
var router = express.Router();
const User = require('../models/user.js')
const isAuthenticated = require('../middlewares/isAuthenticated.js');
var bodyParser = require('body-parser')

// set up bodyParser
router.use(bodyParser.json({ type: 'application/json' }))

// set up account routes
router.get('/signup', function (req, res, next) {
  // // debug check
  // User.find({}, function (err, results) {
  //   console.log(results)
  // })
  res.render('signup')
})

router.post('/signup', function (req, res, next) {
    var {username, password} = req.body;
    // debug check if this username has already existed
    User.find({username: username}, function (err, results) {
        if (!err) {
            if (results.length !== 0) {
              // console.log(results);
              next(new Error('User exists! Please try another username.'));
            } else {
              var map = createMap(obj)
              var user = new User({username: username, password: password, map: map})
              // console.log(map)
              // console.log('created new user')
              user.save(function (err, result) {
                if (!err) {
                  res.redirect('/') // redirect to home
                } else {
                  next(err);
                }
              });
            }
        } else {
          next(err);
        }
    });
});

router.get('/login', function (req, res) {
  // User.find({}, function (err, results) {
  //   console.log(results)
  // })
  res.render('login');
});

var map = {}

router.post('/login', function (req, res, next) {
    var {username, password} = req.body;
    User.findOne({username: username, password: password}, function (err, result) {
        if (err) {
          next(err);
        } else if (!result) {
          next(new Error('incorrect credentials'));
        } else {
          req.session.user = result.username
          map = result.map
          // console.log(map)
          res.redirect('/'); // redirect to home
        }
    })
});

router.get('/logout', isAuthenticated, function (req, res, next) {
  req.session.user = '';
  res.redirect('/');
})

router.post('/save', isAuthenticated, function(req, res, next) {
  User.findOne({username: req.session.user}, function(err, result) {
    if (err) {
      next(err)
    } else {
      var temp = JSON.stringify(req.body)
      console.log(temp)
      User.updateOne({map: result.map}, {upsert: true}, {$set: {}}, function(err, result) {
        if (err) {
            next(err)
        } else {
          console.log('sucessfully updated')
        }
      })
    }
  })
  res.direct('/')
})

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
        fill: "#28587B",
        cursor: "pointer"
      },
      attrsHover: {
        fill: "#ffae1a"
      },
      eventHandlers: {
      }
    },
    defaultPlot: {
      attrs: {
        fill: "#ffae1a",
        opacity: 1.0
      },
      attrsHover: {
        opacity: 1
      },
      text: {
        attrs: {
          fill: "#000"
        }, attrsHover: {
          fill: "#000"
        }
      }
    }
  },
  areas: {
  },
  plots: {
    'Bora Bora': {
      type: "circle",
      size: 15,
      latitude: -16.499701,
      longitude: -151.770538,
      value: 700000,
      tooltip: {content: "Bora Bora"},
      href: "/animations/fish"
    },
    'Masai Mara Reserve, Kenya': {
      type: "circle",
      size: 15,
      latitude: 1.3210,
      longitude: 34.9714,
      value: 700000,
      tooltip: {content: "Masai Mara Reserve, Kenya"},
      href: "/animations/lion"
    }
  }
}

var stringifiedMap = ''

function createMap(obj) {
  stringifiedMap = JSON.stringify(obj, null, 2)
  console.log('created new map')
  return stringifiedMap
}

router.get('/getMap', isAuthenticated, function (req, res, next) {
  var obj = JSON.parse(map)
  // console.log(obj)
  res.send(obj)
});

module.exports = router;
