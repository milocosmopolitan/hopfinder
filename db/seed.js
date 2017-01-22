const db = require('APP/db')
const { User, Follow } = require('APP/db/models')

const data = {
	users: [
	  {name: 'so many', email: 'god@example.com', password: '1234'},
	  {name: 'Barack Obama', email: 'barack@example.gov', password: '1234'},
	],
	followes: [
		{ brewery_id: 'Ee9ead', user_id: 1 },
		{ brewery_id: 'LVjHK1', user_id: 1 }
	]
}

db.didSync
  .then(() => db.sync({force: true}))
  .then(()=>User.bulkCreate(data.users))
  .then(users => console.log(`Seeded ${users.length} users OK`))
  .then(()=>Follow.bulkCreate(data.followes))
  .then(followes => console.log(`Seeded ${followes.length} followes OK`))
  .catch(error => console.error(error))    
  .finally(() => db.close())
