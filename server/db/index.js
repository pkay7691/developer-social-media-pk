//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Report = require('./models/Report')
const Project = require('./models/Project')


//associations could go here!


module.exports = {
  db,
  models: {
    User,
    Report,
    Project,
  },
}
