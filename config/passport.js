var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../models/user');

// load config/auth.js (credentials, NOT commited)
var configAuth = require('./auth');

var fbStrategy = new FacebookStrategy({
	clientID 		: configAuth.facebookAuth.clientID,
	clientSecret 	: configAuth.facebookAuth.clientSecret,
	callbackURL 	: configAuth.facebookAuth.callbackURL
}, function(accessToken, refreshToken, profile, next) {
	User.findOne({fbId: profile.id}, function(err, user) {
		if (user) {
			next(null, user);
		} else {
			// User was not found, save and allow access
			var newUser = new User({
				fbId: profile.id,
				name: profile.displayName,
				email: profile.emails[0].value
			});
			newUser.save(function(err, user) {
				if (err) {
					throw err;
				}
				next(null, user);
			});
		}
	});	
});

passport.use(fbStrategy);
