const Sequelize = require('sequelize');
const db = require('../db');

const Comment_Like = db.define('comment_like',{
    likes:{
        type: Sequelize.ENUM,
        values:['isLiked', 'notLiked']
        //went with Enum because either can be true or validate
    }
})
module.exports = Comment_Like;
