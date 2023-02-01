const Sequelize = require('sequelize')
const db = require('../db')

const Project = db.define('project', {
    project_name: {
        type: Sequelize.STRING,
        allowNull: false 
    },
    modelType: {
        type: Sequelize.STRING,
        defaultValue: 'project'
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
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            customValidator: (value) => {
              const enums = ['Open', 'In Progress', 'Completed']
              if (!enums.includes(value)) {
                throw new Error('not a valid option')
              }
            }
          }       
        
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
