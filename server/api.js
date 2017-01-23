'use strict'

const db = require('APP/db')
const api = module.exports = require('express').Router()
const jwt            = require('jsonwebtoken');
const jwtsecret = process.env.JWT_SECRET || 'secret';

api.use((req, res, next) => {
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

api
  .get('/heartbeat', (req, res) => res.send({ok: true,}))
  .use('/auth', require('./auth'))
  .use('/follow', require('./follow'))
  .use('/users', require('./users'))

// Send along any errors
api.use((err, req, res, next) => {
  res.status(500).send(err)
})

// No routes matched? 404.
api.use((req, res) => res.status(404).end())