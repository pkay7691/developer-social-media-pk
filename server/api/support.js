const router = require('express').Router();
const { models: { Support, User }} = require('../db');

module.exports = router;

//returns all supports
router.get('/', async (req, res, next) => {
    try {
        const supports = await Support.findAll({include: User});
        res.json(supports);
    } catch (err) {
        next(err)
    }
}
);

//returns a single support
router.get('/:id', async (req, res, next) => {
    try {
        const support = await Support.findByPk(req.params.id);
        res.json(support);
    } catch (err) {
        next(err)
    }
}
);

//update a support
router.put('/:id', async (req, res, next) => {
    try {
        const support = await Support.findByPk(req.params.id);
        await support.update(req.body);
        res.json(support);
    } catch (err) {
        next(err)
    }
}
);

//create a support request
router.post('/', async (req, res, next) => {
    try {
        const support = await Support.create(req.body);
        res.json(support);
    } catch (err) {
        next(err)
    }
}
);