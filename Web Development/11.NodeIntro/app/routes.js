// After building dir structure
var express = require('express');
var router = express.Router();
module.exports = router;

// Route for home page
router.get('/', function(req, res) {
	res.send('Hello');
});

// Route for about page
router.get('/about', function(req, res) {
	res.send('Hello to about page');
});

// Routes for contact
router.get('/contact');
router.post('/contact');
