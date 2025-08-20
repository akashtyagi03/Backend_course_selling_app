const { Router } = require('express');
const adminRouter = Router();
const { Admin, Course } = require("../db");
const { signupSchema, signinSchema } = require('../Zod/userzod');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_ADMIN_PASSWORD } = require('../config');
const { adminMiddleware } = require('../middleware/adminmiddle');

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

adminRouter.post('/course',adminMiddleware, async(req, res) => {
    const adminId = req.adminId;
    const { title, description, price, Imageurl } = req.body;

    const courseId = await Course.create({
        title,
        description,
        price,
        Imageurl,
        creatorId: adminId
    });

    res.json({
        message: 'course created successfully',
        courseId: courseId._id
    })
});

adminRouter.put('/course', adminMiddleware, async(req, res) => {
    const adminId = req.adminId;
    const { courseId, title, description, price, Imageurl } = req.body;

    const updatecourse = await Course.updateOne({
        _id: courseId, 
        creatorId: adminId
    }, {
        title,
        description,
        price,
        Imageurl,    
    });

    res.json({
        message: 'course updated successfully',
        courseId: updatecourse._id
    })
});

adminRouter.get('/course/bulk',adminMiddleware, async(req, res) => {
    const adminId = req.adminId;
    const course = await Course.find({
        creatorId: adminId
    });
    if (!course) {
        return res.status(404).json({ error: "No courses found" });
    }

    res.json({
        message: 'User signup endpoint',
        course
    })
});

module.exports = {
    adminRouter: adminRouter
};
