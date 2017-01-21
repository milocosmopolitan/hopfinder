const router = require('express').Router();
const passport = require('passport');



const { User } = require('APP/db/models');


// Google authentication and login
router.get('/', passport.authorize('google', { scope: 'email', failureRedirect: '/login' }));

// handle the callback after Google has authenticated the user
router.get('/verify',	
  passport.authorize('google', { failureRedirect: '/login' }),
  function (req, res) {
  	console.log('verify callback URL')
    res.redirect(`/`);
  }
);

router.use('/', (req, res, next)=>{
  if(req.isAuthenticated()) return next()
  res.redirect('/')
});
module.exports = router;
