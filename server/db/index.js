//this is the access point for all things database related!

const db = require("./db");
const Comments = require("./models/Comment");
const Post_like = require('./models/Post_like');
const User = require("./models/User");

//associations could go here!



module.exports = {
  db,
    models: {
      User,
      Comments,
        Post_like
      },

};
