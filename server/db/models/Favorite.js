const Sequelize = require('sequelize');
const db = require('../db');

const Favorite = db.define('favorite',{
    favor: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      compositeId: {
        type: Sequelize.STRING,
        unique: true,
      }
})
module.exports = Favorite;