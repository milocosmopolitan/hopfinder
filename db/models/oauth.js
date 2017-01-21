// 'use strict'

// const debug = require('debug')('oauth')
// const Sequelize = require('sequelize')
// const db = require('APP/db')
// const User = require('APP/db/models/user')

// const OAuth = db.define('oauths', {
//   uid: Sequelize.STRING,
//   provider: Sequelize.STRING,

//   // OAuth v2 fields
//   accessToken: Sequelize.STRING,
//   refreshToken: Sequelize.STRING,

//   // OAuth v1 fields
//   token: Sequelize.STRING,
//   tokenSecret: Sequelize.STRING,
  
//   // The whole profile as JSON
//   profileJson: Sequelize.JSON
// }, {
// 	indexes: [{fields: ['uid'], unique: true,}],
// })

// OAuth.V2 = (accessToken, refreshToken, profile, done) => {
  
//   return OAuth.findOrCreate({
//     where: {
//       provider: profile.provider,
//       uid: profile.id,
//       accessToken: accessToken
//     }})
//     .then( oauth => {      

//       let data = {
//         name: profile.displayName,        
//         email: profile.emails[0].value,
//         photo: profile.photos[0].value,
//       };

//       return User.create(data)
//         .then(user => {
//           return oauth[0].setUser(user)
//         })
//     })     
//     .then(user => {
//       console.log('After User.Create', user)
//       done(null, user)
//     })
//     .catch(err=>{
//       console.error(err)
//       done(err, null)
//     })
// }

// // OAuth.setupStrategy =
// // ({
// //   provider,
// //   strategy,
// //   config,
// //   oauth=OAuth.V2,
// //   passport 
// // }) => {      
// //   const undefinedKeys = Object.keys(config)
// //         .map(k => config[k])
// //         .filter(value => typeof value === 'undefined')
// //   if (undefinedKeys.length) {
// //     undefinedKeys.forEach(key =>
// //       debug('provider:%s: needs environment var %s', provider, key))
// //     debug('provider:%s will not initialize', provider)
// //     return
// //   }

// //   debug('initializing provider:%s', provider)
// //   passport.use(new strategy(config, oauth))
// // }

// module.exports = OAuth