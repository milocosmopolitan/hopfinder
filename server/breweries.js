'use strict'

const db = require('APP/db')
const Breweries = db.model('breweries')


module.exports = require('express').Router()
	.get('/', (req, res, next) => 
		Follow.findAll({
			where:{
				user_id: req.user.id
			}
		})
		.then(favorites => {
			console.log(favorites)
			res.json(favorites)
		})
		.catch(next))

	.post('/', (req, res, next) =>
		Follow.create(req.body)
		.then(favorite => res.status(201).json(favorite))
		.catch(next))

	.param('id', (req, res, next)=>
		Follow.findById(req.params.id)
			.then(follow=>{
				req.follow = follow;
				next()
			})
			.catch(next))
	
	.delete('/:id', (req, res, next) =>
		req.follow.destroy()
			.then(()=>res.status(204).end())		
			.catch(next))