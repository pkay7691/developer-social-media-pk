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

//find single post like by id
router.get("/:id", async (req, res, next) => {
  try {
    const postLike = await Post_like.findByPk(req.params.id, {include: [User]});
    res.send(postLike);
  } catch (error) {
    next(error);
  }
});

// new post like
router.post("/", async (req, res, next) => {
  try {
    const newPostLike = await Post_like.create(req.body);
    res.send(newPostLike);
  } catch (error) {
    next(error);
  }
});

//update a post like
router.put("/:id", async (req, res, next) => {
  try {
    const updatePostLike = await Post_like.findByPk(req.params.id);
    res.send(await updatePostLike.update(req.body));
  } catch (error) {
    next(error);
  }
});

// delete a post like
router.delete('/:id', async(req,res,next)=>{
  try{
    const postLike = await Post_like.findByPk(req.params.id);
    await postLike.destroy();
    res.send(postLike)
  }catch (error){
    next(error)
  }
})

module.exports = router
