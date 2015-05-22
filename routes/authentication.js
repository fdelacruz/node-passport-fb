var express = require('express');
var router = express.Router();
var passport = require('passport');

// base url: '/auth'
router.get('/', function(req, res) {
	res.render('login', {
		title: 'Login'
	});
});

router.get(
	'/facebook',
	passport.authenticate(
		'facebook', {
			scope: 'email'
		}
	)
);

module.exports = router;
