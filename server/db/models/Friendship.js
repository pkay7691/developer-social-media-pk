const Sequelize = require('sequelize');
const db = require('../db');

const Friendship = db.define('friendship',{
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

    }
    //went with Enum because either can be true or validate
})

module.exports = Friendship;
