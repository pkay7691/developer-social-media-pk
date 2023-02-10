const router = require("express").Router();
const { models: { User, Friendship, Project, Post, Comments, Comment_Like } } = require('../db');
const Post_like = require("../db/models/Post_like");

//find all posts
router.get("/", async (req, res, next) => {
  try {
    const posts = await Post.findAll({include: [User, Project, Comments, Post_like]});
    res.send(posts);
  } catch (error) {
    next(error);
  }
});

//find post by single post
router.get("/:id", async (req, res, next) => {
  try {
    const post = await Post.findByPk(req.params.id, {include: [User, Project, Comments, Post_like]});
    res.send(post);
  } catch (error) {
    next(error);
  }
});

//router for new post
router.post("/", async (req, res, next) => {
  try {
    const newPost = await Post.create(req.body);
    res.send(newPost);
  } catch (error) {
    next(error);
  }
});

//router to update a post
router.put("/:id", async (req, res, next) => {
  try {
    const updatePost = await Post.findByPk(req.params.id);
    res.send(await updatePost.update(req.body));
  } catch (error) {
    next(error);
  }
});

// router to delete a post base on id
router.delete('/:id', async(req,res,next)=>{
  try{
    const id = req.params.id
    await Post.destroy({
      where: {
        id: id
      }
    });
    res.status(204).send(Post.findByPk(id))
  }catch (error){
    next(error)
  }
})

module.exports = router
