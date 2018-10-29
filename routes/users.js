var express = require('express');
var router = express.Router();
const userModel = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users');
});

router.post('/new', function(req, res, next) {
  const userInfo = req.body;

  const userData = {
    userName: userInfo.userName,
    age: parseInt(userInfo.userAge),
    weight: parseInt(userInfo.userWeight),
    height: parseInt(userInfo.userHeight),
    goals: userInfo.userGoals,
  }

  userModel
    .create(userData)
    .then(function() {
      // get the new user id

      // find the new user record 

      // render the Specific User page with this new user's data
      
      res.send("SUCCESS | creating new User");
    })
    .catch(function(err) {
      res.send("ERROR | creating new User | " + JSON.stringify(err));
    });
});

/* GET users listing. */
router.get('/test/:userID', function(req, res, next) {
  res.send(`respond with a resource ${req.params.userID}`);
});


module.exports = router;
