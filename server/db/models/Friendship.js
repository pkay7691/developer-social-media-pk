const Sequelize = require('sequelize');
const db = require('../db');

const Friendship = db.define('friendship',{
    status:{
        type: Sequelize.ENUM,
        allowNull: false,
        values:['inReview', 'isFriend']
    },
    request_msg:{
        type: Sequelize.TEXT   
    }
    //went with Enum because either can be true or validate
})

module.exports = Friendship;