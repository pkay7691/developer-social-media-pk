const router = require('express').Router()
const { models: { Project, User, Post }} = require('../db')

module.exports = router

//shows all projects
router.get('/', async (req, res, next) => {
    try {
        const projects = await Project.findAll({
            include: ['member', Post]
        });
        res.json(projects);
    } catch (err) {
        next(err)
    }
});

//shows a single project
router.get('/:id', async (req, res, next) => {
    try {
        const project = await Project.findByPk(req.params.id,  {include: ['member', Post]});
        res.json(project);
    } catch (err) {
        next(err)
    }
});

//creates a new project
router.post('/', async (req, res, next) => {
    try {
        const project = await Project.create(req.body)
        const user = await User.findByPk(req.body.member.id)
        await project.addMember(user)
        res.json(project)
    } catch (err) {
        next(err)
    }
});

//updates a project
router.put('/:id', async (req, res, next) => {
    try {
        const project = await Project.findByPk(req.params.id);
        await project.update(req.body);
        res.json(project);
    } catch (err) {
        next(err)
    }
});

//deletes a project
router.delete('/:id', async (req, res, next) => {
    try {
        const project = await Project.findByPk(req.params.id);
        await project.destroy();
        res.json(project);
    } catch (err) {
        next(err)
    }
});

//shows all projects associated with a user
router.get('/:id/projects', async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id);
        const projects = await user.getProjects();
        res.json(projects);
    } catch (err) {
        next(err)
    }
});

//adds a project to a user
router.post('/:id/projects', async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id);
        const project = await Project.create(req.body);
        await user.addProject(project);
        res.json(project);
    } catch (err) {
        next(err)
    }
});

//removes a project from a user
router.delete('/:id/projects/:projectId', async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id);
        const project = await Project.findByPk(req.params.projectId);
        await user.removeProject(project);
        res.json(project);
    } catch (err) {
        next(err)
    }
});

//shows all users associated with a project
router.get('/:id/users', async (req, res, next) => {
    try {
        const project = await Project.findByPk(req.params.id);
        const users = await project.getUsers();
        res.json(users);
    } catch (err) {
        next(err)
    }
});

//adds a user to a project
router.post('/:id/users', async (req, res, next) => {
    try {
        const project = await Project.findByPk(req.params.id);
        const user = await User.create(req.body);
        await project.addUser(user);
        res.json(user);
    } catch (err) {
        next(err)
    }
});

//removes a user from a project
router.delete('/:id/users/:userId', async (req, res, next) => {
    try {
        const project = await Project.findByPk(req.params.id);
        const user = await User.findByPk(req.params.userId);
        await project.removeUser(user);
        res.json(user);
    } catch (err) {
        next(err)
    }
});

module.exports = router;
