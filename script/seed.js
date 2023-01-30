'use strict'

const {db, models: {User, Post, Project, Comments, Post_like, Comment_Like} } = require('../server/db')
const { faker } = require('@faker-js/faker')
const Report = require('../server/db/models/Report')


/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */

async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')

  // Creating Users

    const nic = await User.create({
      username: 'TheRealNicCage',
      password: 'password',
      is_admin: true,
      location: 'Chicago IL',
      skill_level: 'Master',
      img_url: 'https://static01.nyt.com/images/2019/08/11/magazine/11mag-talk/11mag-talk-jumbo.jpg',
      email: 'admin@gmail.com',
      first_name: 'Nicholas',
      last_name: 'Cage',
      about_me: 'Oscar Winner/Software Developer',
     })

     const johnny = await User.create({
      username: 'regularguy66',
      password: 'password',
      is_admin: false,
      location: 'New York, NY',
      skill_level: 'Beginner',
      email: 'guy@gmail.com',
      first_name: 'Johnny',
      last_name: 'Tsunami',
      about_me: 'Just a guy',
     })
  // User adding another user as a friend
     await nic.addFriend(johnny)
     await johnny.addFriend(nic)


     const report1 = await Report.create({
      reporter: 1,
      message: "He was being mean"
     })

    //  Reporting User
    await johnny.addReport(report1)

    const userPost = await Post.create({
      title: "Check site Out",
      description: "Cool new search engine I found!",
      url: 'www.google.com'
    })

    // User making Post
    await johnny.addPost(userPost)

    const graceshopper = await Project.create({
      project_name: 'GraceShopper',
      technologies: 'Node and React',
      project_type: 'Ecommerce Website',
      status: 'Open',
      details: 'Functional Ecommerce website',
      github_url: "github.com",
    })

    // project adding user as member
    await graceshopper.addMember(nic)

    const projectPost = await Post.create({
      title: "New Coding Project",
      description: "Building an app that needs developers!",
      url: 'www.github.com'
    })


    // user Posting a Project Post
    await projectPost.setProject(graceshopper);
    await nic.addPost(projectPost)

    const projectPostComment = await Comments.create({
      text_field: "Holy smokes this is a cool post!",
    })

    // User adding comment to post
    await projectPostComment.setUser(johnny)
    await projectPost.addComment(projectPostComment)


    // user adding a like to a post
    const postLike = await Post_like.create();
    await postLike.setUser(nic)
    await projectPost.addPost_like(postLike)

// user adding a like to a comment
    const commentLike = await Comment_Like.create();
    await commentLike.setUser(nic)
    await projectPostComment.addComment_like(commentLike)













  console.log(`seeded users`)
  console.log(`seeded successfully`)

}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
