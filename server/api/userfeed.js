const router = require("express").Router();
const { FeedRounded } = require("@mui/icons-material");
const { models: { User, Comments, Comment_Like, Post, Project, Post_like } } = require('../db');




//get userfeed by id
router.get("/:id", async (req, res, next) => {
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit)
    const id = parseInt(req.params.id)
    console.log(req.params.id)
    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    const feed = [];

    const posts = await Post.findAll({include: [User, Project, Comments, Post_like]});
    posts.forEach(post => {
      if (post.userId === id) {
        feed.push(post)
      }
    })

    feed.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))
    feed.filter(item  =>  item.userId !== id )


    const results = {};

    if (endIndex < feed.length)
    results.next = {
      page: page + 1,
      limit: limit
    }

    if (startIndex > 0) {
      results.previous = {
        page: page  - 1,
        limit: limit
      }
    }
    
   
    results.results = feed.slice(startIndex, endIndex)
    res.send(results)
    
  } catch (error) {
    next(error);
  }
});


module.exports = router
