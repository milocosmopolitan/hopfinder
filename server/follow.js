'use strict'

const db = require('APP/db')
const Follow = db.model('follow')
const Breweries = db.model('breweries')


module.exports = require('express').Router()
	.get('/', (req, res, next) => 
		Follow.findAll({			
			where:{
				user_id: req.user.id
			},
			include: [Breweries]
		})
		.then(favorites => {
			console.log(favorites)
			res.json(favorites)
		})
		.catch(next))

		.post('/', (req, res, next) => {
			console.log(req.body)
			Breweries.findOrCreate({
					where: {brewdb_id: req.body.brewery.brewery.id},
					defaults: {
						brewdb_id: req.body.brewery.brewery.id,
						name: req.body.brewery.brewery.name,
						website: req.body.brewery.brewery.website,
						latitude: req.body.brewery.latitude,
						longitude: req.body.brewery.longitude
					}
				})
				.spread((brewery, created)=>{
					console.log(brewery)
					
					return Follow.create(req.body.favorite)
				})
				.then(favorite => res.status(201).json(favorite))
				.catch(next)
		})

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