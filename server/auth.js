const app = require('APP'), {env} = app
const fs = require('fs')
const debug = require('debug')(`${app.name}:auth`)
const passport = require('passport')

const User = require('APP/db/models/user')
const OAuth = require('APP/db/models/oauth')
const auth = require('express').Router()

const _exists = (filepath) => (
  new Promise(resolve=>{
    fs.exists(filepath, resolve)
  })
);

/*************************
 * Auth strategies
 * 
 * The OAuth model knows how to configure Passport middleware.
 * To enable an auth strategy, ensure that the appropriate
 * environment variables are set.
 * 
 * You can do it on the command line:
 * 
 *   FACEBOOK_CLIENT_ID=abcd FACEBOOK_CLIENT_SECRET=1234 npm start
 * 
 * Or, better, you can create a ~/.$your_app_name.env.json file in
 * your home directory, and set them in there:
 * 
 * {
 *   FACEBOOK_CLIENT_ID: 'abcd',
 *   FACEBOOK_CLIENT_SECRET: '1234',
 * }
 * 
 * Concentrating your secrets this way will make it less likely that you
 * accidentally push them to Github, for example.
 * 
 * When you deploy to production, you'll need to set up these environment
 * variables with your hosting provider.
 **/

// Facebook needs the FACEBOOK_CLIENT_ID and FACEBOOK_CLIENT_SECRET
// environment variables.
// OAuth.setupStrategy({
//   provider: 'facebook',
//   strategy: require('passport-facebook').Strategy,
//   config: {
//     clientID: env.FACEBOOK_CLIENT_ID,
//     clientSecret: env.FACEBOOK_CLIENT_SECRET,
//     callbackURL: `${app.rootUrl}/api/auth/login/facebook`,
//   },
//   passport
// })

// Google needs the GOOGLE_CONSUMER_SECRET AND GOOGLE_CONSUMER_KEY
// environment variables.
// OAuth.setupStrategy({
//   provider: 'google',
//   strategy: require('passport-google-oauth').Strategy,
//   config: {
//     consumerKey: env.GOOGLE_CONSUMER_KEY,
//     consumerSecret: env.GOOGLE_CONSUMER_SECRET,
//     callbackURL: `${app.rootUrl}/api/auth/login/google`,
//   },
//   passport
// })




passport.serializeUser((user, done) => {
  debug('will serialize user.id=%d', user.id)
  done(null, user.id)
  debug('did serialize user.id=%d', user.id)
})

passport.deserializeUser(
  (id, done) => {
    debug('will deserialize user.id=%d', id)
    User.findById(id)
      .then(user => {
        debug('deserialize did ok user.id=%d', user.id)
        done(null, user)
      })
      .catch(err => {
        debug('deserialize did fail err=%s', err)
        done(err)
      })
  }
)

auth.use('/google', require('./google'))

// signup, i.e. "let `me` introduce myself"
auth.post('/signup', function (req, res, next) {
  console.log(req)
  User.findOrCreate({
    where: {
      email: req.body.email
    },
    defaults: { // if the user doesn't exist, create including this info
      password: encrypt(req.body.password)
    }
  })
  .spread((user, created) => {
    if (created) {
      // with Passport:
      req.logIn(user, function (err) {
        if (err) return next(err);
        res.json(user);
      });
      // // before, without Passport:
      // req.session.userId = user.id;
      // res.json(user);
    } else {
      res.sendStatus(401); // this user already exists, you cannot sign up
    }
  });
});


// login, i.e. "you remember `me`, right?"
auth.post('/login', function (req, res, next) {  
  User.findOne({
    where: { email:req.body.email } // email and password
  }).then(user => {
    if (!user) {
      debug('authenticate user(email: "%s") did fail: no such user', req.body.email)      
      res.sendStatus(401); // no message; good practice to omit why auth fails
    } else {
      // with Passport:    
      
      req.logIn(user, function (err) {
        if (err) return next(err);
        // console.log(user) 
        // req.session.cookie['user'] = user
        console.log('SESSION FROM LOGIN', req.session)
        console.log('USER FROM PASSPORT', req.user)
        res.json(user);


      });
      // // before, without Passport:
      // req.session.userId = user.id;
      // res.json(user);
    }
  })
  .catch(next);
});

auth.get('/whoami', (req, res) => {

    
  let sessionFile,
      sessionPath = `${process.cwd()}/temp/sessions/${req.sessionID}.json`;
  
  _exists(sessionPath)
    .then(exists=>{
      if(!exists) res.sendStatus(401);
      sessionFile = require(sessionPath);
    })
    .then(()=>User.findById(sessionFile.passport.user))
    .then(user=>{
      if (!user) {
        debug('authenticate user(email: "%s") did fail: no such user', req.body.email)      
        res.sendStatus(401); // no message; good practice to omit why auth fails
      } else {
        // with Passport:    
        
        req.logIn(user, function (err) {
          if (err) return next(err);
          // console.log(user) 
          // req.session.cookie['user'] = user
          // console.log('SESSION FROM LOGIN', req.session)
          // console.log('USER FROM PASSPORT', req.user)
          res.json(req.user);


        });     
      }
    })
})

auth.post('/logout', (req, res, next) => {
  req.session.destroy(err=>{
    req.logout()
    res.redirect('/api/auth/whoami')  
  })  
})

module.exports = auth

