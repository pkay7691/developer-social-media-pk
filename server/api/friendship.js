const router = require("express").Router();
const { models: { User, Post_like, Friendship } } = require('../db');



//find all friendships
router.get("/", async (req, res, next) => {
  try {
    const friendships = await Friendship.findAll();
    res.send(friendships);
  } catch (error) {
    next(error);
  }
});

//find single friendship by id
router.get("/:id", async (req, res, next) => {
  try {
    const friendship = await Friendship.findByPk(req.params.id);
    res.send(friendship);
  } catch (error) {
    next(error);
  }
});

//router for new friendship
router.post("/", async (req, res, next) => {
  try {
    const newFriendship = await Friendship.create(req.body);
    res.send(newFriendship);
  } catch (error) {
    next(error);
  }
});

//router to update a friendship
router.put("/:id", async (req, res, next) => {
  try {
    const updateFriendship = await Friendship.findByPk(req.params.id);
    res.send(await updateFriendship.update(req.body));
  } catch (error) {
    next(error);
  }
});

// router to delete a friendship base on id
router.delete('/:id', async(req,res,next)=>{
  try{
    const friendship = await Friendship.findByPk(req.params.id);
    await friendship.destroy();
    res.send(friendship)
  }catch (error){
    next(error)
  }
})

module.exports = router
