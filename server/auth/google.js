const router 				 = require('express').Router(),
			passport 			 = require('passport'),
			{ User } 			 = require('APP/db/models'),
      utils          = require('../utils'),
			secret   			 = require('APP/secret'),
			GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.use(new GoogleStrategy({
    clientID: secret.google.key,
    clientSecret: secret.google.secret,
    callbackURL: '/api/auth/google/verify'
  },
  (accessToken, refreshToken, profile, done) => 
    User.findOrCreate({
        where: {
          google_id: profile.id,
          accessToken: accessToken
        }
      })
    	.then(user => user[0].update(
    		{
          name: profile.displayName,
          email: profile.emails[0].value,
          photo: profile.photos[0].value,
      	}
    	))
      .then(user => { 
        done(null, user) 
      })
      .catch(err => { done(err, null) })
  ));


// Google authentication and login
router.get('/', passport.authenticate('google', { 
	scope: 'email', 
	failureRedirect: '/login' 
}));

// handle the callback after Google has authenticated the user
router.get('/verify',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    req.logIn(req.user, (err) => {
      console.log('user signed in', req.user, err)  
      if (err) return next(err);

      var token = utils.genToken(req.user); // <-- Generate token
      // user = utils.getCleanUser(user);          
      res.json({
        user: user,
        token: token
      });

    })
  }
);

router.use('/', (req, res, next) => {
  if (req.isAuthenticated()) return next()
  res.redirect('/')
});
module.exports = router;
