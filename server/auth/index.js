const app       = require('APP'),
      { env }   = app;

const fs        = require('fs'),
      debug     = require('debug')(`${app.name}:auth`),
      passport  = require('passport'),
      jwt       = require('jsonwebtoken'),      
      auth      = require('express').Router(),
      store     = require('store'),
      User      = require('APP/db/models/user'),
      secret    = require('APP/secret'),
      utils     = require('APP/server/utils'),
      jwtsecret = process.env.JWT_SECRET || 'secret',
      LocalStrategy  = require('passport-local').Strategy,
      BearerStrategy = require('passport-http-bearer').Strategy,
      passportJWT = require("passport-jwt"),
      ExtractJwt = passportJWT.ExtractJwt,
      JwtStrategy = passportJWT.Strategy;      
  // const OAuth = require('APP/db/models/oauth')
// global.localStorage = require('localStorage')

// const _exists = (filepath) => (
//   new Promise(resolve => {
//     fs.exists(filepath, resolve)
//   })
// );


// Local Strategy
passport.use(new LocalStrategy((email, password, cb) => {
  console.log('Using Local Strategy', email, password)
  return User.findOne({email:email, password:password})
    .then(user=>{
        if (user) {
          return cb(null, user);
        } else {
          return cb(null, false);
        }
    })  
}));

// passport.use(new BearerStrategy((token, cb) => {
//   console.log('Using Bearer Strategy', token)
//   jwt.verify(token, jwtsecret, (err, decoded) => {
//     if (err) return cb(err);
//     var user = users[decoded.id];
//     return cb(null, user ? user : false);
//   });
// }));

var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
    opts.secretOrKey = jwtsecret;
    opts.issuer = 'accounts.examplesoft.com';
    opts.audience = 'yoursite.net';




// Verify JWT Token For Protected Routes
  // serves as passport serialize
auth.use((req, res, next)=>{    
  let token = req.headers['authorization'];
  if (!token) return next();

  console.log('JWT MIDDLEWARE', token)
  jwt.verify(token, jwtsecret, (err, user) => {      
    if (err) {
      console.error(err)
      return res.status(401).json({
        success: false,
        message: 'Please register Log in using a valid email to submit posts'
      });
    } else {
      
      req.user = user; //set the user to req so other routes can use it

      console.log('I got you', req.user)
      next();
    }
  })

})

/*
 *  ================================
 *  Generate JWT Token: SignUp Route
 *  ================================
 */
auth.post('/signup', (req, res, next) => {
  var body = req.body;
  User
    .create({
      name: body.name.trim(),
      email: body.email.trim(),
      password: body.password,
      isAdmin: false
    })
    .then(user => {
      req.logIn(user, (err) => {
        if (err) return next(err);
        let token = utils.genToken(user); // < -- -- - Generate Token
        res.json({
          user: user,
          token: token
        });
      });
    }).catch(next);
});

// app.post('/profile', passport.authenticate('jwt', { session: false }),
//   function(req, res) {
//       res.send(req.user.profile);
//   }
// );
/*
 *  ================================
 *  Generate JWT Token: SignIn Route
 *  ================================
 */

// auth.post('/signin',
//   passport.authenticate('local', { session: false }),
//   function(req, res){
//     console.log('signin')
//   }
// );

auth.post('/signin', (req, res, next) => {
  console.log('User SignIn route', req.body)
  User.findOne({ 
    where: { 
      email: req.body.email
    }
  }) // <-- Check email
    .then(user => {
      // console.log(user)
      if (!user) {
        console.log('user does NOT exist')
        return res.status(404).json({
          error: true,
          message: 'Username or Password is Wrong'
        });
      } else {
        // with Passport:    
        
        req.logIn(user, (err) => {
          console.log('user signed in', user, err)  
          if (err) return next(err);

          var token = utils.genToken(user); // <-- Generate token
          // user = utils.getCleanUser(user);          
          res.json({
            user: user,
            token: token
          });

        });
      }
    }).catch(next);
});


/*
 *  =========================================
 *  Generate JWT Token: Re-Authenticate Route
 *  =========================================
 */

// 1. get current user from token
auth.get('/me', (req, res, next) => {
  // 2. check header or url parameters or post parameters for token  
  console.log('Who am I?')
  let token = req.headers['authorization'];
  if (!token) return next();

  console.log(token)

  // var token = req.body.token || req.query.token;
  if (!token) return res.status(401).json({ message: 'Must pass token' });
  // 3. Check token that was passed by decoding token using secret
  jwt.verify(token, jwtsecret, (err, user) => {
      if (err) throw err;
      // 4. return user using the id from w/in JWTToken
      User.findById(user.id)
        .then(user => {
          if (!user) return res.status(404).json({
            error: true,
            message: 'Token mismatch'
          });
          res.json(req.user);
        }).catch(next);
  });
});

passport.use(new JwtStrategy(opts, (jwt_payload, next) => {
  console.log('payload received', jwt_payload);
  // usually this would be a database call:
  return User.findById(jwt_payload.id)
    .then(user=>{
        if (user) {
          return cb(null, user);
        } else {
          return cb(null, false);
        }
    });
}));

auth.use('/google', require('./google'))

auth.post('/logout', (req, res, next) => {  
  req.logout()
  res.redirect('/api/auth/me')  
})

module.exports = auth
