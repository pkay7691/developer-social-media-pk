// const router = require("express").Router();
// const {models:{User,Project_Membership,JoinRequest}}= require('../db');

// //find all joinRequest
// router,get("/",async (req,res, next)=>{
//   try{
//     const joinRequest= await JoinRequest.findAll();
//     res.send(joinRequest);
//   }catch(error){
//     next(error)
//   }
// });

// //find single joinRequest
// router.get("/:id", async (req,res, next)=>{
//   try{
//     const joinRequest= await JoinRequest.findByPk(req.params.id);
//     res.send(joinRequest);
//   }catch(error){
//     next(error);
//   }
// });

// //find for new joinRequest
// router.post("/", async (req, res, next)=>{
//   try{
//     const newJoinRequest= await JoinRequest.create(req.body);
//     res.send(newJoinRequest);
//   }catch(error){
//     next(error)
//   }
// });

// //to update a joinRequest
// router.put("/:id", async (req,res, next)=>{
//   try{
//    const updateJoinRequest= await JoinRequest.findByPk(req.params.id);
//    res.send(await updateJoinRequest.update(req.body));
//   }catch(error){
//     next(error)
//   }
// });

// router.delete("/:id", async(req,res,next)=>{
//   try{
// const joinRequest= await JoinRequest.findByPk(req.params.id);
// await joinRequest.destroy();
// res.send(joinRequest)
//   }catch(error){
//     next(error)
//   }
// });

// module.exports = router
