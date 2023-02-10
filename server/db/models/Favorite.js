const Sequelize = require('sequelize');
const db = require('../db');

const Favorite = db.define('favorite',{
    id:{
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
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