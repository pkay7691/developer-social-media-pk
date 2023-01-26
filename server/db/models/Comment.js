const Sequelize = require('sequelize');
const db= require('../db')

const Comments = db.define('comment',{
  text_field:{
    type: Sequelize.TEXT,
  }
})

module.exports = Comments
