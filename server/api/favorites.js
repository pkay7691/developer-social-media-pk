const router = require("express").Router();
const { models: { User, Project, Favorite } } = require('../db');

//find all favorites 
router.get('/', async(req, res, next)=>{
    try{
        const favorites = await Favorite.findAll({include:[User, Project ]});
        // console.log('THIS IS BACKEND BEFORE SINGLE FAVORITE___________________', favorites)
        res.send(favorites);
    }catch(error){
        next(error)
    }
})
router.post('/',async(req, res, next) => {
  try {
    const newFavorite = await Favorite.create(req.body);
    console.log(req.body)
    res.send(newFavorite);
  } catch (error) {
    next(error);
  }
})
// router.delete('/',async(req,res,next)=>{
//   console.log('at delete route')
//   try{
//     // console.log(req.params.id)
//     const remvfavorite = await Favorite.findByPk(req.params.id);
//     console.log(remvfavorite)
//     console.log('THIS IS BACKEND BEFORE SINGLE FAVORITE___________________', remvfavorite)
//     await remvfavorite.destroy();
//     res.send(remvfavorite)
//   }catch (error){
//     next(error)
//   }
// })
//get a single favorite project
.route('/:id')
.get(async(req, res, next)=>{
    try{
        console.log('THIS IS BACKEND SINGLE FAVORITE1___________________', favorite)
        const favorite = await Favorite.findByPk(req.params.id,{include:[User, Project ]});
        console.log('THIS IS BACKEND SINGLE FAVORITE___________________', favorite)
        res.send(favorite);
    }catch(error){
        next(error)
    }
})
.post(async(req, res, next) => {
  try {
    const newFavorite = await Favorite.create(req.body);
    const  project = await Project.findByPk(req.body.projectId)
    await project.addFavorite(newFavorite)
    console.log("LINE 52``````````", project)
    console.log("LINE 53``````````",req.body)
    res.send(newFavorite);
  } catch (error) {
    next(error);
  }
})

  //update a single favorite project
.put(async(req, res, next) => {
  try {
    const updateFavorite = await Favorite.findByPk(req.params.id);
    res.send(await updateFavorite.update(req.body));
  } catch (error) {
    next(error);
  }
})
  //remove a single favorite project
.delete(async(req,res,next)=>{
    try{
      console.log("DELETE ROUTE------------", req.params.id )
      const remvfavorite = await Favorite.findByPk(req.params.id);
      await remvfavorite.destroy();
      res.send(remvfavorite)
    }catch (error){
      next(error)
    }
  })

module.exports = router