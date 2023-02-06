const Sequelize = require ('sequelize');
const db =require ('../db');

const Post_like = db.define('post_like',{
  does_like: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
  compositeId: {
    type: Sequelize.STRING,
    unique: true,
  }
})

module.exports= Post_like;
