const Sequelize = require('sequelize');
const db = require('../db');


//Users can submit bugs, surveys, and feature requests
const Support = db.define('support', {
    username: {
        type: Sequelize.STRING,
        validator: {
            notEmpty: true
        }
    },
    type_of_request: {
        type: Sequelize.ENUM('Bugs', 'Survey', 'Feature Request'),
        defaultValue: 'Bugs',
        validator: {
            notEmpty: true
        }
    },
    description: {
        type: Sequelize.TEXT,
        validator: {
            notEmpty: true
        }
    },
    status: {
        type: Sequelize.ENUM('Open', 'In Progress', 'Closed'),
        defaultValue: 'Open',
        validator: {
            notEmpty: true
        }
    },
    priority: {
        type: Sequelize.ENUM('N/A' ,'Low', 'Medium', 'High'),
        defaultValue: 'N/A',
        validator: {
            notEmpty: true
        }
    },
    admin_comment: {
        type: Sequelize.TEXT,
        validator: {
            notEmpty: true
        }
    }
});

module.exports = Support;