const { Router } = require('express');
const adminRouter = Router();


adminRouter.post('/signup', (req, res) => {
    res.json({
        message: 'User signup endpoint'
    })
});

adminRouter.post('/signin', (req, res) => {
    res.json({
        message: 'User signup endpoint'
    })
});

adminRouter.post('/course', (req, res) => {
    res.json({
        message: 'User signup endpoint'
    })
});

adminRouter.put('/course', (req, res) => {
    res.json({
        message: 'User signup endpoint'
    })
});

adminRouter.get('/course/bulk', (req, res) => {
    res.json({
        message: 'User signup endpoint'
    })
});

module.exports = {
    adminRouter: adminRouter
};
