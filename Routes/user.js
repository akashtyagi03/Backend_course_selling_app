const { Router } = require('express');
const { User } = require('../db'); 
const userRouter = Router();
const bcrypt = require('bcrypt');
const {signupSchema, signinSchema} = require('../Zod/userzod');
const jwt = require('jsonwebtoken');
const JWT_USER_PASSWORD = "890456"; //doubt this password saved previously in .env file or take form user
 
userRouter.post('/signup', async(req, res) => {
    //TODO- adding zod validation for signup
    //TODO- adding bcrypt for password hashing
    const { email, password, username } = req.body;
    const validation = signupSchema.safeParse(req.body);
    if (!validation.success) {
        return res.status(400).json({ error: validation.error.errors });
    }
    

    //put try catch block
    try{
        // Hash the password before saving it to the database
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
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

userRouter.post('/signin',async(req, res) => {
    const { email, password } = req.body;
    //TODO- adding zod validation for signin
    const validation = signinSchema.safeParse(req.body);
    if (!validation.success) {
        return res.status(400).json({ error: validation.error.errors });
    }

    //TODO- adding bcrypt for password hashing

    try {
        // 2. Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        // 3. Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        // 4. Create JWT token
        const token = jwt.sign({ userId: user._id }, JWT_USER_PASSWORD);

        return res.json({ token });
    } catch (error) {
        console.error('Signin error:', error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

userRouter.get('/purchases', (req, res) => {
    res.json({
        message: 'User signup endpoint'
    })
});

module.exports = {
    userRouter: userRouter
};