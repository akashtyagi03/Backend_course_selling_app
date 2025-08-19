const { Router } = require('express');

const courseRouter = Router();

courseRouter.post('/purchase', (req, res) => {
    res.json({
        message: 'User signup endpoint'
    })
});

courseRouter.get('/preview', (req, res) => {
    res.json({
        message: 'User signup endpoint'
    })
});

module.exports = {
    courseRouter: courseRouter  
};