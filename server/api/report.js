const router = require('express').Router();
const { models: { Report, User }} = require('../db');


module.exports = router;

//user is the person who is reporting
//reportee is the person who is being reported
router.post('/', async (req, res, next) => {
    try {
        const report = await Report.create(req.body)
        res.json(report)
    } catch (err) {
        next(err)
    }
});

// shows all reports
router.get('/', async (req, res, next) => {
    try {
        const reports = await Report.findAll({include: User});
        res.json(reports);
    } catch (err) {
        next(err)
    }
});




