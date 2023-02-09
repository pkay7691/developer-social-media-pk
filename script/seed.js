'use strict'

const {db, models: {User, Post, Project, Comments, Post_like, Comment_Like, Message} } = require('../server/db')
const { faker } = require('@faker-js/faker')
const Report = require('../server/db/models/Report')
const Friendship = require('../server/db/models/Friendship')


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
      email: 'admin@gmail.com',
      first_name: 'Nicholas',
      last_name: 'Cage',
      about_me: 'Oscar Winner/Software Developer',
      ban_status: 'good_standing',
      is_banned: false,
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
      ban_status: 'good_standing',
      is_banned: false,
     })

     const pat = await User.create({ 
      username: 'pkay7691',
      password: 'password',
      is_admin: false,
      location: 'New York, NY',
      skill_level: 'Beginner',
      email: 'pat@gmail.com',
      first_name: 'Pat',
      last_name: 'Kenny',
      about_me: 'its me',
      ban_status: 'good_standing',
      is_banned: false,
     })


     const aaron = await User.create({ 
      username: 'jerkface420',
      password: 'password',
      is_admin: false,
      location: 'Los Angeles, CA',
      skill_level: 'Master',
      email: 'jerk@gmail.com',
      first_name: 'Aaron',
      last_name: 'Kramer',
      about_me: 'I am a jerk',
      ban_status: 'banned',
      is_banned: true,
     })
     
     function createUsers() {
      let users = [];
      for (let i = 0; i < 96; i++) {
        users.push({
      username: faker.internet.userName(),
      img_url: faker.image.avatar(),
      password: 'password',
      is_admin: false,
      location: `${faker.address.cityName()}, ${faker.address.stateAbbr()} `,
      skill_level: faker.helpers.arrayElement([
        "Master",
        "Beginner",
        "Intermediate",
        "Professional",
      ]),
      email: faker.helpers.unique(faker.internet.email),
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      about_me: faker.lorem.lines(3),
      ban_status: faker.helpers.arrayElement([
        "good_standing",
        "banned",
      ]),
      is_banned: faker.datatype.boolean(),
        });
      }
      return users;
    }

    const users = createUsers()
     await User.bulkCreate(users)



     
     function createProjects() {
      let projects = [];
      for (let i = 0; i < 50; i++) {
        projects.push({
      project_name: faker.company.name(),
      modelType: 'project',
      technologies: faker.helpers.arrayElement([
        "Node.js and React",
        "Python",
        "Java",
        "TypeScript",
      ]),
      is_admin: faker.datatype.boolean(),
      createdAt: faker.date.between('2020-01-01T00:00:00.000Z', '2021-01-01T00:00:00.000Z'),
     status: faker.helpers.arrayElement([
      "Open",
      "In Progress",
      "Completed",
    ]),
      details: faker.lorem.lines(8),
      project_type: faker.helpers.arrayElement([
        "Game",
        "Ecommerce App",
        "Fitness App",
        "Social Media",
        "Music Streamer",
       "Photo Editer",
       "Sports App",
      ]),
      github_url: faker.internet.url(),
        });
      }
      return projects;
    }

    const projects = createProjects()
    await Project.bulkCreate(projects)


    function createPosts() {
      let posts = [];
      for (let i = 0; i < 50; i++) {
        posts.push({
      title: faker.company.bs(),
      modelType: 'post',
      description: faker.lorem.paragraphs(1),
      url: faker.internet.url(),
      createdAt: faker.date.between('2020-01-01T00:00:00.000Z', '2021-01-01T00:00:00.000Z'),
      userId: faker.datatype.number({ 
        min: 1,
        max: 100,
       }),
      projectId: null,
        });
      }
      return posts;
    }
    const posts = createPosts()
    await Post.bulkCreate(posts)


    function createProjectPosts() {
      let projectPosts = [];
      for (let i = 0; i < 50; i++) {
        projectPosts.push({
      title: faker.company.bs(),
      modelType: 'post',
      description: faker.lorem.paragraphs(1),
      url: faker.internet.url(),
      createdAt: faker.date.between('2020-01-01T00:00:00.000Z', '2021-01-01T00:00:00.000Z'),
      userId: faker.datatype.number({ 
        min: 1,
        max: 100,
       }),
      projectId: faker.helpers.arrayElement([
        faker.datatype.number({ 
          min: 1,
          max: 49,
         }),
      ]),
        });
      }
      return projectPosts;
    }



    const projectPosts = createProjectPosts()
    await  Post.bulkCreate(projectPosts)


    const friendship1 = await Friendship.create({
      compositeId: '1&2',
      friendName: 'Johnny Tsunami',
      userName: 'Nicholas Cage',
      status: 'isFriend',
      userId: 1,
      friendId: 2,

     })

     const friendship2 = await Friendship.create({
      compositeId: '2&1',
      friendName: 'Nicholas Cage',
      userName: 'Johnny Tsunami',
      status: 'isFriend',
      userId: 2,
      friendId: 1,
     })

     const friendship3 = await Friendship.create({
      compositeId: '1&3',
      friendName: 'Pat Kenny',
      userName: 'Nicholas Cage',
      userId: 3,
      friendId: 1,
     })

     const friendship4 = await Friendship.create({
      compositeId: '1&4',
      friendName: 'Aaron Kramer',
      userName: 'Nicholas Cage',
      userId: 4,
      friendId: 1,
     })



    
     
  // User adding another user as a friend





  console.log(`seeded ${User.length} users`)

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


    //User being mean to another user in a post
    const meanPost = await Post.create({
      title: "I hate this guy",
      description: "I think Nic Cage is dumb",
    })

    await aaron.addPost(meanPost)
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

    // user sending a message

    const message1 = await Message.create({
      content: 'Whats your name?',
      senderId: 1,
      receiverId: 2,
    })

    const message2 = await Message.create({
      content: 'My name is Johnny',
      senderId: 2,
      receiverId: 1,
    })

    const message3 = await Message.create({
      content: 'Hello friend',
      senderId: 3,
      receiverId: 1,
    })
    const message4 = await Message.create({
      content: 'Hello friend',
      senderId: 2,
      receiverId: 3,
    })











  console.log(`aaron is banned`)
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
