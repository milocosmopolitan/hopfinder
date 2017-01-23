'use strict'

/*
 * JSON WEB TOKEN
 */
const jwt = require('jsonwebtoken');
const genToken = (user) => {
  let u = {
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    id: user.id.toString(),
    photo: user.photo
  }

  let token = jwt.sign(u, process.env.JWT_SECRET || 'secret', {
     expiresIn: 60 * 60 * 24 // expires in 24 hours
  });
  return token;
};


module.exports = {
  genToken
}