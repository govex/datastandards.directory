var express = require('express'); // defining the Express application
var router = express.Router(); // defining the router, which define an app behavior when a specific reuest is received

db = require('../queries');

// Function getAllStandards is called to get all standards from postgres inventory db's 'standards' table
router.get('/api/single-standard/:id', db.getSingleStandard); 

module.exports = router;