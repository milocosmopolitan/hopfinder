const router = require('express').Router();
const passport = require('passport');



const { User } = require('APP/db/models');






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

router.use('/', (req, res, next)=>{
  if(req.isAuthenticated()) return next()
  res.redirect('/')
});
module.exports = router;
