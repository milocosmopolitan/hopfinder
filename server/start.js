'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const {resolve} = require('path')
const passport = require('passport')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const FileStore = require('session-file-store')(session)


// Bones has a symlink from node_modules/APP to the root of the app.
// That means that we can require paths relative to the app root by
// saying require('APP/whatever').
//
// This next line requires our root index.js:



const pkg = require('APP')

const app = express()


let sessionSaveUninitialized = false;
if (!pkg.isProduction && !pkg.isTesting) {
  sessionSaveUninitialized = true;
  // Logging middleware (dev only)
  app.use(require('volleyball'))
}
  const sess_options = {
    path: `${process.cwd()}/temp/sessions/`,
    useAsync: true,
    reapInterval: 5000,
    httpOnly: false,
    maxAge: 30000
  };

module.exports = app
  // We'll store the whole session in a cookie

  /*
   * Setup express-seesion
   */

  .use(session({
    name: 'server-session-cookie-id',
    store: new FileStore(sess_options),
    secret: 'singlecut',
    resave: true,
    saveUninitialized: sessionSaveUninitialized
  }))

  .use(function printSession(req, res, next) {
    console.log('req.session', req.session);
    return next();
  })

  .get('/', function initViewsCount(req, res, next) {
    if(typeof req.session.views === 'undefined') {
      req.session.views = 1;
      return res.end('Welcome to the file session demo. Refresh page!');
    }
    return next();
  })

  // Body parsing middleware
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())

  // Authentication middleware
  .use(passport.initialize())
  .use(passport.session())
  
  // Serve static files from ../public
  .use(express.static(resolve(__dirname, '..', 'public')))


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
