//this is the access point for all things database related!


const db = require("./db");
const Comments = require("./models/Comment");
const Post_like = require('./models/Post_like');
const User = require("./models/User");




const Report = require('./models/Report')
const Project = require('./models/Project')



//associations could go here!



module.exports = {
  db,
  models: {
    User,
    Report,
    Project,
     Comments,
        Post_like
  },
}

