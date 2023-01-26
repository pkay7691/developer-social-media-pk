const Sequelize = require('sequelize');
const db = require('../db');

const Project_Membership = db.define('project_membership', {
    is_project_admin:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
    },
    is_member:{
        type: Sequelize.BOOLEAN,
        allowNull: false, 
    },
    request_msg:{
        type: Sequelize.TEXT   
    }

})

module.exports = Project_Membership;
