/*jshint esversion: 6 */
'use strict'
const express        = require('express'),      
      passport       = require('passport'),
      bodyParser     = require('body-parser'),
      {resolve}      = require('path'),
      pkg            = require('APP');

const app = express();

if (!pkg.isProduction && !pkg.isTesting) {  
  app.use(require('volleyball'))
}

// passport.serializeUser(function (user, done) {
//   console.log('serializeUser')
//   done(null, user);
// });

// passport.deserializeUser(function (id, done) {
//   console.log('deserializeUser', id)
//   User.findById(id)
//     .then(user => {
//       debug('deserialize did ok user.id=%d', user.id)
//       done(null, user)
//     })
//     .catch(err => {
//       debug('deserialize did fail err=%s', err)
//       done(err)
//     })
// });


module.exports = app

  // Body parsing middleware
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())

  // Authentication middleware
  .use(passport.initialize())
  // .use(ejwt({secret: jwtsecret, userProperty: 'tokenPayload'}).unless({path: ['/api/auth/signin']}))
  
  // Serve static files from ../public
  .use(express.static(resolve(__dirname, '..', 'public')))
  .use('/node_modules', express.static(resolve(__dirname, '..', 'node_modules')))


  // Serve our api
  .use('/api', require('./api'))

  // Send index.html for anything else.
  .get('/*', (_, res) => res.sendFile(resolve(__dirname, '..', 'public', 'index.html')))

if (module === require.main) {
  // Start listening only if we're the main module.
  // 
  // https://nodejs.org/api/modules.html#modules_accessing_the_main_module
  const server = app.listen(
    process.env.PORT || 1337,
    () => {
      console.log(`--- Started HTTP Server for ${pkg.name} ---`)      
      console.log(`Listening on ${JSON.stringify(server.address())}`)
    }
  )
}
