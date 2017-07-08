var express = require('express'); // defining the Express application
var router = express.Router(); // defining the router, which define an app behavior when a specific reuest is received

db = require('../queries');

router.get('/', function(req, res, next) { // router.get() = HTTP method; '/' = URI path to where the capture the request; function (req, res, next) = handler function
  res.render('index.jade');
});

router.get('/keywords', db.keywords);

module.exports = router;
