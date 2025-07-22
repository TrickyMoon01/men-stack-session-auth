const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();
const User = require('../models/user.js');

router.get('/sign-up', (req, res) => {
    res.render('auth/sign-up.ejs');
});

router.post('/sign-up', async (req, res) => {
    const userInDataBase = await User.findOne({ username: req.body.username });

    if (userInDataBase) {
        return res.send('username already taken');
    }

    if (req.body.password !== req.body.confirmPassword) {
        return res.send('Password and Confirm password must match');
    }
    
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    req.body.password = hashedPassword;
    // hashedPassword is holding the value that comes back from bcrypt running a hashSync method on the password
    
    const user = await User.create(req.body);

    res.send(`Thanks for signing up ${user.username}`);
});

module.exports = router;