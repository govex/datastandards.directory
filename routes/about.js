var express = require('express'); // defining the Express application
var router = express.Router(); // defining the router, which define an app behavior when a specific reuest is received

var db = require('../queries');

// Function getAllStandards is called to get all standards from postgres inventory db's 'standards' table
//router.get('/api/inventory', db.getAllStandards);
router.get('/', function (req, res) {  
  res.render('about');
});

module.exports = router;