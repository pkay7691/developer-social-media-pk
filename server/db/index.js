//this is the access point for all things database related!
const db = require("./db");
const Comments = require("./models/Comment");
const Post_like = require('./models/Post_like');
const User = require("./models/User");
const Report = require('./models/Report')
const Project = require('./models/Project')
const Friendship = require('./models/Friendship');
const Project_Membership = require('./models/Project_Membership')
const Post = require('./models/Post')
const Comment_Like = require('./models/Comment_Like');
const Message = require('./models/Message');
const Chat = require('./models/Chat');
const Support = require('./models/Support.js');


User.belongsToMany(User, {
  as: 'friends',
  foreignKey: 'userId',
  through: Friendship,
}) 
User.belongsToMany(User, {
  as: 'userFriends',
  foreignKey: 'friendId',
  through: Friendship,
}) 

User.belongsToMany(Project, {through: Project_Membership})
User.hasMany(Report)
User.hasMany(Post)
User.hasMany(Comments)
User.hasMany(Comment_Like)
User.hasMany(Post_like)
User.belongsToMany(Message, {through: Chat})
User.hasMany(Support)


Report.belongsTo(User) 
Support.belongsTo(User)

Post.hasMany(Comments);
Post.hasMany(Post_like)
Post.belongsTo(User)
Post.belongsTo(Project);



Post_like.belongsTo(Post)
Post_like.belongsTo(User)

Comments.hasMany(Comment_Like);
Comments.belongsTo(Post);
Comments.belongsTo(User)

Comment_Like.belongsTo(Comments);
Comment_Like.belongsTo(User);

Message.belongsToMany(User, {through: Chat})


Project.belongsToMany(User, {
  through: Project_Membership,
  as: 'member',
  foreignKey: 'userId',
})
Project.hasMany(Post)











//associations could go here!



module.exports = {
  db,
  models: {
    User,
    Report,
    Post,
    Post_like,
    Project,
    Comments,
    Post_like,
    Comment_Like,
    Project_Membership,
    Support,
    
    Message,
    Chat,    
  },
}

