const router = require('express').Router()

router.use('/users', require('./users'))
router.use('/post', require ('./post'))
router.use('/report', require('./report'))
router.use('/project', require('./project'))
router.use('/comment', require('./comment'))
router.use('/commentlike', require('./commentlike'))
router.use('/postlike', require('./postlike'))
router.use('/projectmembership', require('./projectmembership'))
router.use('/chat', require('./message'))
router.use('/postlike', require('./post_like'))
router.use('/support', require('./support'))
router.use('/friendship', require('./friendship'))
router.use('/message', require('./message'))
router.use('/feed', require('./feed'))
router.use('/userfeed', require('./userfeed'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})


module.exports = router
