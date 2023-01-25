const Sequelize = require ('sequelize');
const db =require ('../db');

const Post_like = db.define('post_like',{
  user_id:{
    type:Sequelize.INTEGER
  },
  post_id:{
    type: Sequelize.INTEGER
  }
})

module.exports= Post_like;
