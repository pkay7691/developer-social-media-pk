const router = require('express').Router()
const { models: { User, Report, Friendship, Project, Post, Comments, Comment_Like, Support, Favorite } } = require('../db')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      // attributes: ['id', 'username']
      include:['friends', Project, Comments, Comment_Like, Post, Favorite]
    })
    res.send(users)
  } catch (err) {
    next(err)
  }
})

//router to find user by id
router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {include:['friends', Project, Comments, Comment_Like, Post, Favorite]})
    res.send(user)
  } catch (err) {
    next(err)
  }
})

//router to delete user by id
router.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    await User.destroy({
      where: {
        id: id,
      }
    })
    res.status(204).send(User.findByPk(id));
  } catch (err) {
    next(err)
  }
})

//router to post new user
router.post('/', async (req, res, next) => {
  try {
    const newUser = await User.create(req.body)
    res.send(newUser)
  } catch (err) {
    next(err)
  }
})

//router to update user based on id
router.put('/:id', async (req, res, next) => {
  try {
    const updateUser = await User.findByPk(req.params.id)
    res.send(await updateUser.update(req.body))
  } catch (err) {
    next(err)
  }
})

//router to report specific user
router.post('/:id/reportUser', async (req, res, next) => {
  try {
    const report = await Report.create(req.body)
    res.send(report)
  } catch (err) {
    next(err)
  }
})

//router to make a support request
router.post('/:id/support', async (req, res, next) => {
  try {
    const support = await Support.create(req.body)
    res.send(support)
  } catch (err) {
    next(err)
  }
})

//router switch between ban and unban user/ and update ban_status
router.put('/:id/ban', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id)
    res.send(await user.update(req.body))
  } catch (err) {
    next(err)
  }
})

module.exports = router;
