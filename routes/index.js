var express = require('express');
var router = express.Router();

const userModel = require('../models/user');
const exerciseModel = require('../models/exercise');

const gymModel = require('../models/gym');

/*----------------
  HOME PAGE ROUTE
----------------*/

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: `It's Time To Workout!` });
});


/*----------------
  USER ROUTES
----------------*/

/* GET users listing. */
router.get('/users/', function (req, res, next) {
  res.render('users');
});

/* POST to make a new user. */
router.post('/users/new', function (req, res, next) {
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
    .then(function (created) {
      // get the new user id
      const userId = created._id;

      // render the Specific User page with this new user's data
      res.redirect("/users/profile/" + userId);
    })
    .catch(function (err) {
      res.send("ERROR | creating new User | " + JSON.stringify(err));
    });
});


router.post('/users/edit/:id', function (req, res, next) {
  const newData = {
    userName: req.body.userName,
    age: parseInt(req.body.userAge),
    weight: parseInt(req.body.userWeight),
    height: parseInt(req.body.userHeight),
    goals: req.body.userGoals,
  }
  userModel
    .update({ _id: req.params.id }, newData)
    .then(function () {
      res.redirect("/users/profile/" + req.params.id);
    })
    .catch(function (err) {
      res.send("ERROR updating user" + JSON.stringify(err));
    });
});

router.post('/users/delete/:id', function (req, res, next) {
  userModel
    .findByIdAndRemove(req.params.id)
    .then(() => {
      res.redirect('/')
    });
});

/* GET specific users. */
router.get("/users/profile/:userID", function (req, res, next) {
  const userID = req.params.userID;

  userModel.findById(userID)
    .populate("exercises")
    .then(function (results) {
      const profileObj = {
        userId: userID,
        username: results.userName,
        age: results.age,
        height: results.height,
        weight: results.weight,
        goals: results.goals,
        exercises: results.exercises
      };

      console.log(results.exercises);

      res.render("profile", profileObj);
    });

});

/* GET users listing. */
router.get('/users/allUsers', function (req, res, next) {
  userModel.find({})
    .then(function (results) {
      res.send(JSON.stringify(results));
    });
});


/*----------------
  EXERCISE ROUTES
----------------*/

/* POST to make a new exercise. */
router.post('/exercises/new/:userID', function (req, res, next) {
  const input = req.body;

  const exerData = {
    name: input.exerciseName,
    reps: parseInt(input.userReps),
    description: input.exerDescr
  }

  exerciseModel
    .create(exerData)
    .then(function (createdRecord) {

      userModel
        .findOneAndUpdate(
          { _id: req.params.userID },
          {
            $push:
              { exercises: createdRecord._id }
          },
          { new: true }
        )
        .then((newUser) => {
          console.log(`updated user to be: ${newUser}`);
        });

      res.redirect("/users/profile/" + req.params.userID);
    })
    .catch(function (err) {
      res.send("ERROR | creating new Exercise | " + JSON.stringify(err));
    });
});


/*----------------
  GYM ROUTES
----------------*/

/* GET users listing. */
router.get('/gyms/', function (req, res, next) {
  gymModel.find({})
    .then(function (results) {
      console.log(results)
      res.render("gyms", { gyms: results });
    });
});

/* GET users listing. */
router.get('/gyms/test/:gymid', function (req, res, next) {
  res.send(`respond with a resource ${req.params.userID}`);
});

router.post('/gyms/new', function (req, res, next) {
  const gymInfo = req.body;

  const gymData = {
    name: gymInfo.gymName,
    city: gymInfo.gymCity,
    state: gymInfo.gymState
  }

  gymModel
    .create(gymData)
    .then(function () {
      res.redirect("/gyms");
    })
    .catch(function (err) {
      res.send("ERROR creating new gym" + JSON.stringify(err));
    });
});
router.post('/gyms/:gymsId', function (req, res, next) {

  gym.findByIdAndRemove(req.params.gymsId)
    .then(() => {
      res.redirect('/')
    });
});
module.exports = router;
