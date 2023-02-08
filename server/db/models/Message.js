const Sequelize = require('sequelize');
const db = require('../db');

const Message = db.define('message', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
    content: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
});

module.exports = Message;