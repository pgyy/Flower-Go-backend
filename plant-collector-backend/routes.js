// routes.js

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const router = express.Router();

// Register User
router.post('/register', async (req, res) => {
    console.log('Register endpoint hit'); // Add this line
    const { username, email, password } = req.body;
    try {
        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, passwordHash });
        await newUser.save();
        res.json({ success: true, message: 'User registered successfully' });
    } catch (error) {
        console.error(error); // Add this line
        res.status(500).json({ success: false, message: error.message });
    }
});

// Login User
router.post('/login', async (req, res) => {
    console.log('Login endpoint hit'); // Add this line
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }
        const token = jwt.sign({ userID: user._id }, 'secretkey', { expiresIn: '1h' });
        res.json({ success: true, token, userID: user._id });
    } catch (error) {
        console.error(error); // Add this line
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
