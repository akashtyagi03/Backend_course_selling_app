const { Router } = require('express');
const { userMiddleware } = require('../middleware/usermiddle');
const { Purchase, Course } = require('../db');

const courseRouter = Router();

courseRouter.post('/purchase', userMiddleware, async(req, res) => {
    const userId = req.userId;
    const courseId = req.body.courseId;

    await Purchase.create({
        userID: userId,
        courseID: courseId
    })
    res.json({
        message: 'you bought the course successfully',
    })
});

courseRouter.get('/preview', async(req, res) => {
    const courses = await Course.find({});
    res.json({
        courses
    })
});

module.exports = {
    courseRouter: courseRouter  
};