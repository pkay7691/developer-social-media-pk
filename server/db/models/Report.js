const Sequelize = require('sequelize')
const db = require('../db')


const Report = db.define('report', {
    reporter: {
        type: Sequelize.STRING,
        allowNull: false
    },
    message: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

module.exports = Report
