const router = require('express').Router()

router.use('/users', require('./users'))
router.use('/post', require ('./post'))
router.use('/report', require('./report'))
router.use('/project', require('./project'))
router.use('/comment', require('./comment'))
router.use('/commentlike', require('./commentlike'))
router.use('/postlike', require('./postlike'))
router.use('/projectmembership', require('./projectmembership'))
router.use('/chat', require('./chat'))
router.use('/postlike', require('./post_like'))
router.use('/support', require('./support'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})


module.exports = router
