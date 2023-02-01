const router = require("express").Router();
const { models: { User, Project_Membership, Project } } = require('../db');


//find all project membership
router.get("/", async (req, res, next) => {
  try {
    const projectMemberships = await Project_Membership.findAll();
    res.send(projectMemberships);
  } catch (error) {
    next(error);
  }
});

//find single project membership by id
router.get("/:id", async (req, res, next) => {
  try {
    const projectMembership = await Project_Membership.findByPk(req.params.id);
    res.send(projectMembership);
  } catch (error) {
    next(error);
  }
});

//router for new project membership
router.post("/", async (req, res, next) => {
  try {
    const newProjectMembership = await Project_Membership.create(req.body);
    res.send(newProjectMembership);
  } catch (error) {
    next(error);
  }
});

//router to update a project membership
router.put("/:id", async (req, res, next) => {
  try {
    const updateProjectMembership = await Project_Membership.findByPk(req.params.id);
    res.send(await updateProjectMembership.update(req.body));
  } catch (error) {
    next(error);
  }
});

// router to delete a project membership base on id
router.delete('/:id', async(req,res,next)=>{
  try{
    const projectMembership = await Project_Membership.findByPk(req.params.id);
    await projectMembership.destroy();
    res.send(projectMembership)
  }catch (error){
    next(error)
  }
})

module.exports = router
