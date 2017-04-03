var express = require('express'); // defining the Express application
var router = express.Router(); // defining the router, which define an app behavior when a specific reuest is received

router.get('/', function (req, res, next) {  
  res.render('index');
});

module.exports = router;