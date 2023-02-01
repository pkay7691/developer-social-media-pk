const Sequelize = require('sequelize');
const db = require('../db');

const Comment_Like = db.define('comment_like',{
    does_like: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      }
})
module.exports = Comment_Like;
