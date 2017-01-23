const db = require('APP/db')
const { User, Follow, Breweries } = require('APP/db/models')

const data = {
	users: [
	  {name: 'so many', email: 'god@example.com', password: '1234'},
	  {name: 'Barack Obama', email: 'barack@example.gov', password: '1234'},
	],
	followes: [
		{ brewdb_id: 'fake', user_id: 1, brewery_id: 1 },
		{ brewdb_id: 'LVjHK1', user_id: 1, brewery_id: 2 },
		{ brewdb_id: 'fake', user_id: 2, brewery_id: 1 },
	],
	breweries: [
		{ brewdb_id: 'fake', name: 'FAKE BREWERY', website: 'localhost:1337', latitude: 0, longitude: 0},
		{ brewdb_id: 'fake2', name: 'FAKE BREWERY22', website: 'localhost:1337', latitude: 2, longitude: 2}
	]
}

db.didSync
  .then(() => db.sync({force: true}))
  .then(()=>User.bulkCreate(data.users))
  .then(users => console.log(`Seeded ${users.length} users OK`))
  .then(()=>Breweries.bulkCreate(data.breweries))
  .then(breweries => console.log(`Seeded ${breweries.length} breweries OK`))
  .then(()=>Follow.bulkCreate(data.followes))
  .then(followes => console.log(`Seeded ${followes.length} followes OK`))
  .catch(error => console.error(error))    
  .finally(() => db.close())




