const Sequelize = require('sequelize')
const db = require('../db')


const Report = db.define('report', {
    reportee: {
        type: Sequelize.STRING,
        validator: {
            notEmpty: true
        }
    },
    reason_for_report: {
        type: Sequelize.STRING,
        validator: {
            notEmpty: true
        }
    },
    message: {
        type: Sequelize.TEXT,
        validator: {
            notEmpty: true
        }
    },
    admin_response: {
        type: Sequelize.TEXT,
        validator: {
            notEmpty: true
        }
    },
    report_status: {
        type: Sequelize.ENUM('pending', 'resolved'),
        defaultValue: 'pending'
    }
});

module.exports = Report
