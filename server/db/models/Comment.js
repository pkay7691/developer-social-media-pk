const Sequelize = require('sequelize');
const db= require('../db')

const Comments = db.define('comment',{
  post_id:{
    type: Sequelize.INTEGER,
    unique: true,
  },
  user_id:{
    type: Sequelize.INTEGER,
    allowNull: false
  },
  text_field:{
    type: Sequelize.TEXT,

  }
})

module.exports = Comments
