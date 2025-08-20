const { Router } = require('express');
const adminRouter = Router();
const { Admin } = require("../db");
const { signupSchema, signinSchema } = require('../Zod/userzod');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_ADMIN_PASSWORD = ""; //doubt this password saved previously in .env file or take form user

adminRouter.post('/signup',async(req, res) => {
    const { email, password, username } = req.body;
    const validation = signupSchema.safeParse(req.body);
    if (!validation.success) {
        return res.status(400).json({ error: validation.error.errors });
    }
    
    //put try catch block
    try{
        // Hash the password before saving it to the database
        const hashedPassword = await bcrypt.hash(password, 10);
        await Admin.create({
            email,
            password: hashedPassword,
            username
        })
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }

    res.json({
        massage: 'User signup succesfully',
    })
});

adminRouter.post('/signin', async(req, res) => {
    const { email, password } = req.body;
    //TODO- adding zod validation for signin
    const validation = signinSchema.safeParse(req.body);
    if (!validation.success) {
        return res.status(400).json({ error: validation.error.errors });
    }

    //TODO- adding bcrypt for password hashing

    try {
        const adminUser = await Admin.findOne({ email });
        if (!adminUser) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, adminUser.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const token = jwt.sign({ AdminId: adminUser._id }, JWT_ADMIN_PASSWORD);
        return res.json({ token });
    } catch (error) {
        console.error('Signin error:', error);
        return res.status(500).json({ error: "Internal server error" });
    }
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
