'use strict';

// Require our models. Running each module registers the model into sequelize
// so any other part of the application could call sequelize.model('User')
// to get access to the User model.
const db = require('APP/db')

const User = require('./user')
const Follow = require('./follow')
const Breweries = require('./breweries')
// const Oauth = require('./oauth')

Follow.belongsTo(User);
Follow.belongsTo(Breweries);



// table association
module.exports = {User, Follow, Breweries}
