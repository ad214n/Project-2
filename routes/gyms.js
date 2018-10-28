var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('gyms');
});

/* GET users listing. */
router.get('/test/:gymid', function(req, res, next) {
  res.send(`respond with a resource ${req.params.userID}`);
});


module.exports = router;