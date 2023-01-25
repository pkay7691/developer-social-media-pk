const Sequelize = require('sequelize')
const db = require('../db')

const Post = db.define('post', {
    title: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    url: {
        type: Sequelize.STRING,
    }
})

module.exports = Post;