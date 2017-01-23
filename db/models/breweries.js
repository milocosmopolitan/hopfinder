'use strict'
const db = require('APP/db')
const Sequelize = require('sequelize')

module.exports = db.define('breweries', {
	brewdb_id: {
		type: Sequelize.STRING
	},
	name:{
		type: Sequelize.STRING,
		allowNull: false
	},
	website: {
		type: Sequelize.STRING
	},
	latitude: {
		type: Sequelize.DECIMAL
	},
	longitude: {
		type: Sequelize.DECIMAL
	}
})