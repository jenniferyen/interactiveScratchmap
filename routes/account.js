var express = require('express')
var router = express.Router();
const User = require('../models/user.js')
const isAuthenticated = require('../middlewares/isAuthenticated.js');
var fs = require('fs')

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
              var user = new User({username: username, password: password})
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
  // // debug check
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
            res.redirect('/'); // redirect to home
        }
    })
});

router.get('/logout', isAuthenticated, function (req, res, next) {
    req.session.user = '';
    res.redirect('/');
    
})

// app.post("/addname", (req, res) => {
//  var myData = new User(req.body);
//  myData.save()
//  .then(item => {
//  res.send("item saved to database");
//  })
//  .catch(err => {
//  res.status(400).send("unable to save to database");
//  });
// });

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
      eventHandlers: {
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
      }
    }
  }
}
let data = JSON.stringify(obj, null, 2)
fs.writeFileSync('maps/personalMap.json', data)

router.get('/getMap', function(req, res) {
  const out = fs.readFileSync('./maps/personalMap.json', 'utf-8')
  res.json(out)
});

module.exports = router;
