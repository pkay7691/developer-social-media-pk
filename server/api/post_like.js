const router = require("express").Router();
const { models: { User, Post_like } } = require('../db');



//find all post likes
router.get("/", async (req, res, next) => {
  try {
    const postLikes = await Post_like.findAll({include: [User]});
    res.send(postLikes);
  } catch (error) {
    next(error);
  }
});

//find single postlike by id
router.get("/:id", async (req, res, next) => {
  try {
    const postlike = await Post_like.findByPk(req.params.id, {include: [User]});
    res.send(postlike);
  } catch (error) {
    next(error);
  }
});

//router for new postlike
router.post("/", async (req, res, next) => {
  try {
    const newPostLike = await Post_like.create(req.body);
    res.send(newPostLike);
  } catch (error) {
    next(error);
  }
});

//router to update a postlike
router.put("/:id", async (req, res, next) => {
  try {
    const updatePostLike = await Post_like.findByPk(req.params.id);
    res.send(await updatePostLike.update(req.body));
  } catch (error) {
    next(error);
  }
});

// router to delete a postlike base on id
router.delete('/:id', async(req,res,next)=>{
  try{
    const postlike = await Post_like.findByPk(req.params.id);
    await postlike.destroy();
    res.send(postlike)
  }catch (error){
    next(error)
  }
})

module.exports = router
