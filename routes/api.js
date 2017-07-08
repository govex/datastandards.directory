var express = require('express'); // defining the Express application
var router = express.Router(); // defining the router, which define an app behavior when a specific reuest is received

db = require('../queries');

router.get('/get/:id', db.api); // outputs the getRequest function
router.post('/add', db.createStandard)
router.post('/update', db.post)

module.exports = router;