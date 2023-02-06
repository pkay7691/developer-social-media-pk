const Sequelize = require('sequelize');
const db = require('../db');

const Friendship = db.define('friendship',{
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  compositeId: {
    type: Sequelize.STRING,
    unique: true,
  },
    status:{
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'inReview',
        validate: {
            customValidator: (value) => {
              const enums = ['inReview', 'isFriend']
              if (!enums.includes(value)) {
                throw new Error('not a valid option')
              }
            }
          }   
    },
    request_msg:{
        type: Sequelize.TEXT   
    },
    friendName: {
      type: Sequelize.STRING,

    },
    userName: {
      type: Sequelize.STRING,

    },
    //went with Enum because either can be true or validate
})

module.exports = Friendship;
