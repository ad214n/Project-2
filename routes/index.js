var express = require('express');
var router = express.Router();

const userModel = require('../models/user');
const exerciseModel = require('../models/exercise');

/*----------------
  HOME PAGE ROUTE
----------------*/

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: `It's Time To Workout!` });
});


/*----------------
  USER ROUTES
----------------*/

/* GET users listing. */
router.get('/users/', function(req, res, next) {
  res.render('users');
});

/* POST to make a new user. */
router.post('/users/new', function(req, res, next) {
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

/* GET specific users. */
router.get("/users/profile/:userID", function(req, res, next){
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
router.get('/users/allUsers', function(req, res, next) {
  // userModel.find({})
  //   .then(function(results) {
  //     res.send(JSON.stringify(results));
  //   });
  const response = userController.getAll(req, res);
  res.send(response);
});


/*----------------
  EXERCISE ROUTES
----------------*/

/* POST to make a new exercise. */
router.post('/exercises/new', function(req, res, next) {
  const input = req.body;

  const exerData = {
    name: input.exerciseName,
    reps: parseInt(input.userReps),
    description: input.exerDescr
  }

  exerciseModel
    .create(exerData)
    .then(function(createdRecord) {
        console.log(createdRecord);
      // append new Exercise _id to the right User _id exercises array

      res.send("SUCCESS | creating new Exercise");
    })
    .catch(function(err) {
      res.send("ERROR | creating new Exercise | " + JSON.stringify(err));
    });
});


/*----------------
  GYM ROUTES
----------------*/

/* GET users listing. */
router.get('/gyms/', function(req, res, next) {
  res.render('gyms');
});

/* GET users listing. */
router.get('/gyms/test/:gymid', function(req, res, next) {
  res.send(`respond with a resource ${req.params.userID}`);
});



module.exports = router;
