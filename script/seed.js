'use strict'

const {db, models: {User} } = require('../server/db')

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')

  // Creating Users
  const users = await Promise.all([
    User.create({ 
      username: 'TheRealNicCage',
      password: 'password',
      is_admin: true,
      location: 'Chicago IL',
      skill_level: 'Master',
      img_url: 'https://static01.nyt.com/images/2019/08/11/magazine/11mag-talk/11mag-talk-jumbo.jpg',
      email: 'admin@gmail.com',
      first_name: 'Nicholas',
      last_name: 'Cage',
      about_me: 'Oscar Winner/Software Developer',
      ban_status: 'good_standing'
     }),
     User.create({ 
      username: 'regularguy66',
      password: 'password',
      is_admin: false,
      location: 'New York, NY',
      skill_level: 'Beginner',
      email: 'guy@gmail.com',
      first_name: 'Johnny',
      last_name: 'Tsunami',
      about_me: 'Just a guy',
      ban_status: 'good_standing'
     }),

  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
  return {
    users: {
      cody: users[0],
      murphy: users[1]
    }
  }
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
