const Sequelize = require('sequelize')
const db = require('../db')

const Project = db.define('project', {
    project_name: {
        type: Sequelize.STRING,
        allowNull: false 
    },
    technologies: {
        type: Sequelize.STRING,
        allowNull: false
    },
    project_type: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM('Open', 'In Progress', 'Completed'),
        allowNull: false
    },
    details:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    github_url: {
        type: Sequelize.STRING,
    },
})

module.exports = Project