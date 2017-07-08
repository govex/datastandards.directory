var express = require('express'); // defining the Express application
var router = express.Router(); // defining the router, which define an app behavior when a specific reuest is received

router.get('/', function(req, res, next) { // router.get() = HTTP method; '/' = URI path to where the capture the request; function (req, res, next) = handler function
  res.render('contribute.jade');
});

router.get('/add', db.getAddForm); // outputs the getRequest function
router.get('/update', db.getUpdateForm);

module.exports = router;
