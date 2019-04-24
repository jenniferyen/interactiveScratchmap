var express = require('express')
var router = express.Router();
const User = require('../models/user.js')
const isAuthenticated = require('../middlewares/isAuthenticated.js');
const initialMap = require('../js/initialMap.js')

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
              var map = createMap(initialMap)
              var user = new User({username: username, password: password, map: map})
              // console.log(map)
              // console.log('created new user')
              user.save(function (err, result) {
                if (!err) {
                  res.redirect('/') // redirect to home
                } else {
                  next(err);
                }
              })
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

router.post('/login', function (req, res, next) {
    var {username, password} = req.body;
    User.findOne({username: username, password: password}, function (err, result) {
        if (err) {
          next(err);
        } else if (!result) {
          next(new Error('incorrect credentials'));
        } else {
          req.session.user = result.username
          req.session.id = result.id
          res.redirect('/'); // redirect to home
        }
    })
});

router.get('/logout', isAuthenticated, function (req, res, next) {
  req.session.user = '';
  res.redirect('/');
})

function updateMap(mapString, newArea) {
  const mapTemp = JSON.parse(mapString)
  // console.log(Object.keys(newArea)) => gives 2 letter code
  // console.log(Object.values(newArea)) => gives attrs.fill.color info
  const newAreasTemp = Object.values(newArea);
  const newAreasFinal = newAreasTemp.reduce(
   function(reduced, next){
      Object.keys(next).forEach(function(key){reduced[key]=next[key];});
      return reduced;
   }
  );
  // console.log(newAreasFinal)
  const tempAttrs = Object.keys(newArea)
  mapTemp.areas[Object.keys(newArea)[0]] = newAreasFinal
  mapTemp.areas[Object.keys(newArea)].tooltip = {content: tempAttrs }
  // console.log(mapTemp)
  mapString = JSON.stringify(mapTemp)
  // console.log(mapString)
  return mapString
}

router.post('/save', isAuthenticated, function(req, res) {
  const userId = req.session.id
  // console.log(userId)

  User.findById(userId)
  .then(user => {
    const map = user.map
    // console.log(map) => mapString
    // console.log(req.body) => newArea
    user.map = updateMap(map, req.body)
    return user.save()
  })
  .then(() => {
    res.sendStatus(200)
  })
  .catch(error => {
    console.log(error)
    res.sendStatus(500)
  })
})

var stringifiedMap = ''

function createMap(obj) {
  stringifiedMap = JSON.stringify(obj, null, 2)
  console.log('created new map')
  return stringifiedMap
}

router.get('/getMap', isAuthenticated, function (req, res, next) {
  User.findOne({username: req.session.user}, function(err, result) {
    // console.log(result.map)
    var temp = JSON.parse(result.map)
    // console.log(temp)
    res.send(temp)
  })
})

module.exports = router;
