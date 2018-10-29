var express = require('express');
var router = express.Router();
const exerciseModel = require('../models/exercise');

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
      .then(function(createdRecord) {
          console.log(createdRecord);
        // append new Exercise _id to the right User _id exercises array
  
        res.send("SUCCESS | creating new User");
      })
      .catch(function(err) {
        res.send("ERROR | creating new User | " + JSON.stringify(err));
      });
  });


module.exports = router;