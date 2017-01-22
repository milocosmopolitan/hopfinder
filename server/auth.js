const app = require('APP'), {env} = app
const fs = require('fs')
const debug = require('debug')(`${app.name}:auth`)
const passport = require('passport')

const User = require('APP/db/models/user')
// const OAuth = require('APP/db/models/oauth')
const auth = require('express').Router()

global.localStorage = require('localStorage')
const store = require('store')




const _exists = (filepath) => (
  new Promise(resolve=>{
    fs.exists(filepath, resolve)
  })
);

const secret = require('APP/secret');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
passport.use(
  new GoogleStrategy({
    clientID: secret.google.key,
    clientSecret: secret.google.secret,
    callbackURL: '/api/auth/google/verify'
  },
  function(accessToken, refreshToken, profile, done){
    
    return User.findOrCreate({
      where: {        
        google_id: profile.id,
        accessToken: accessToken
      }})
      .then( user => {      

        let data = {
          name: profile.displayName,        
          email: profile.emails[0].value,
          photo: profile.photos[0].value,
        };

        return user[0].update(data)        
        // return User.create(data)
        //   .then(user => {
        //     return oauth[0].setUser(user)
        //   })
      })     
      .then(user => {       
        store.set('user', user)
        done(null, user)
      })
      .catch(err=>{
        console.error(err)
        done(err, null)
      })
  })
);


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
        // store.set('user', user)
        console.log('deserializeUser get store', store.get('user'))        
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
      return res.sendStatus(401); // no message; good practice to omit why auth fails
    } else {
      // with Passport:    
      
      req.logIn(user, function (err) {
        if (err) return next(err);
        // console.log(user) 
        // req.session.cookie['user'] = user
        store.set('user', user)
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

  // res.json(req.user)
  console.log('who... am i?', store.get('user'))

  if(store.get('user')){
    let user = store.get('user');
      req.logIn(user, function (err) {
        res.json(user) 
      })
  }else {
    console.log('WHO THE FUCK AM I???', req.sessionID)
    let sessionFile,
        sessionPath = `${process.cwd()}/temp/sessions/${req.sessionID}.json`;
    
    _exists(sessionPath)
      .then(exists=>{
        if(!exists) return res.sendStatus(401);
        sessionFile = require(sessionPath);
        if(!sessionFile.passport) return res.sendStatus(401);
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
  }
})

auth.post('/logout', (req, res, next) => {
  req.session.destroy(err=>{
    req.logout()
    store.remove('user')
    res.redirect('/api/auth/whoami')  
  })  
})

module.exports = auth

