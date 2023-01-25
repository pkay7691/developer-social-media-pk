const Sequelize = require('sequelize');
const db = require('../db');

const Project_Membership = db.define('project_membership', {
    project_admin:{
        type: Sequelize.ENUM,
        allowNull: false,
        values:['isAdmin', 'notAdmin']
    },
    membership_status:{
        type: Sequelize.ENUM,
        allowNull: false,
        values:['isMember', 'notMember']
    },
    request_msg:{
        type: Sequelize.TEXT   
    }

})

module.exports = Project_Membership;