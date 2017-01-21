const router = require('express').Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


const {User, Oauth} = require('APP/db/models');

var secret = require('APP/secret');


// configuring the strategy (credentials + verification callback)
passport.use(
  new GoogleStrategy({
    clientID: secret.google.key,
    clientSecret: secret.google.secret,
    callbackURL: '/api/auth/google/verify'
  },
  Oauth.V2)
);

// Google authentication and login
router.get('/', passport.authenticate('google', { scope: 'email' }));

// handle the callback after Google has authenticated the user
router.get('/verify',	
  passport.authenticate('google', { failureRedirect: '/login' }),
  function (req, res) {
  	console.log('verify callback URL')
    res.redirect(`/`);
  }
);

module.exports = router;
