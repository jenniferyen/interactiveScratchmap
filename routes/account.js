var express = require('express')
var router = express.Router();
const User = require('../models/user.js')
const isAuthenticated = require('../middlewares/isAuthenticated.js');


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

module.exports = router;
