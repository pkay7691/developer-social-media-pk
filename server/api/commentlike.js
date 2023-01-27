const router = require("express").Router();
const { models: { User, Comment_Like } } = require('../db');


//find all commentslikes
router.get("/", async (req, res, next) => {
  try {
    const commentLikes = await Comment_Like.findAll({include: [User]});
    res.send(commentLikes);
  } catch (error) {
    next(error);
  }
});

//find single comment like by id
router.get("/:id", async (req, res, next) => {
  try {
    const commentLike = await Comment_Like.findByPk(req.params.id, {include: [User]});
    res.send(commentLike);
  } catch (error) {
    next(error);
  }
});

//router for new comment like
router.post("/", async (req, res, next) => {
  try {
    const newCommentLike = await Comment_Like.create(req.body);
    res.send(newCommentLike);
  } catch (error) {
    next(error);
  }
});

//router to update a comment like
router.put("/:id", async (req, res, next) => {
  try {
    const updateCommentLike = await Comment_Like.findByPk(req.params.id);
    res.send(await updateCommentLike.update(req.body));
  } catch (error) {
    next(error);
  }
});

// router to delete a comment like base on id
router.delete('/:id', async(req,res,next)=>{
  try{
    const commentLike = await Comment_Like.findByPk(req.params.id);
    await commentLike.destroy();
    res.send(commentLike)
  }catch (error){
    next(error)
  }
})

module.exports = router
