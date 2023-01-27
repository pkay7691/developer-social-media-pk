const router = require("express").Router();
const { models: { User, Comments, Comment_Like } } = require('../db');


//find all comments
router.get("/", async (req, res, next) => {
  try {
    const comments = await Comments.findAll({include: [User, Comment_Like]});
    res.send(comments);
  } catch (error) {
    next(error);
  }
});

//find single comment by id
router.get("/:id", async (req, res, next) => {
  try {
    const comment = await Comments.findByPk(req.params.id, {include: [User, Comment_Like]});
    res.send(comment);
  } catch (error) {
    next(error);
  }
});

//router for new comment
router.post("/", async (req, res, next) => {
  try {
    const newComment = await Comments.create(req.body);
    res.send(newComment);
  } catch (error) {
    next(error);
  }
});

//router to update a comment
router.put("/:id", async (req, res, next) => {
  try {
    const updateComment = await Comments.findByPk(req.params.id);
    res.send(await updateComment.update(req.body));
  } catch (error) {
    next(error);
  }
});

// router to delete a comment base on id
router.delete('/:id', async(req,res,next)=>{
  try{
    const comment = await Comments.findByPk(req.params.id);
    await comment.destroy();
    res.send(comment)
  }catch (error){
    next(error)
  }
})

module.exports = router
