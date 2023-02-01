const Sequelize = require('sequelize');
const db = require('../db');

const Chat = db.define('chat', {
    chatId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    numOfChat: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
        validate: {
            min: 1,
        },
    },
});

module.exports = Chat;