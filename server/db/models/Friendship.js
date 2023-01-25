const { finalizeSession } = require('pg/lib/sasl');
const Sequelize = require('sequelize');
const db = require('../db');

const Friendship = db.define('friendship',{
    status:{
        type: Sequelize.STRING,
        allowNull: false
    },
    request_msg:{
        type: Sequelize.ENUM,
        values:[isFriend, 'isNotFriend']
    }
    //went with Enum because either can be true or validate
})

module.exports =Friendship;