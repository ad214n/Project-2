var express = require('express');
var router = express.Router();
const userModel = require('../models/user');
const exerciseModel = require('../models/exercise');

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

router.get("/profile/:userID", function(req, res, next){
  const userID = req.params.userID;
  
  userModel.findById(userID)
    .populate("exercises")
    .then(function(results) {
      const profileObj = {
        username: results.userName,
        age: results.age,
        height: results.height,
        weight: results.weight,
        goals: results.goals
      };

      res.render("profile", profileObj);
    });

});

/* GET users listing. */
router.get('/allUsers', function(req, res, next) {
  userModel.find({})
    .then(function(results) {
      res.send(JSON.stringify(results));
    });
});


module.exports = router;
