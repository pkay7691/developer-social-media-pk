//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Report = require('./models/Report')
const Project = require('./models/Project')


// User.belongsToMany(User, {through: Friendship}) 
// User.belongsToMany(Project, {throught: ProjectMembership})
// User.hasMany(Report)
// User.hasMany(Post)
// 
// Report.hasOne(User) 
// 
// Post.hasMany(Comment);
// Post.hasMany(Like)
// Post.belongsTo(User)
// Post.belongsTo(Project);

// PostLike.belongsTo(Post)

// Comment.hasMany(CommentLike);
// Comment.belongsTo(Post);

// CommentLike.belongsTo(Comment);

// Project.hasMany(ProjectTechnologies);
// Project.belongsToMany(User, {through: ProjectMembership})
// Project.hasMany(Post)

// ProjectTechnologies.belongsTo(Project)







//associations could go here!


module.exports = {
  db,
  models: {
    User,
    Report,
    Project,
  },
}
