'use strict'
const Sequelize = require('sequelize')
const db = require('APP/db')

const Follow = db.define('follow', {
	brewdb_id: {
		type: Sequelize.STRING,
		allowNull: false
	}
})

module.exports = Follow