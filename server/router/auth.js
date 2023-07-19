const express = require('express');
const authRouter = express.Router();
const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

// sign up 
authRouter.post("/api/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const exinstingUser = await User.findOne({ email });

        // if user with same email exists
        if (exinstingUser) {
            return res.status(400).json({
                msg: "User with same email already exists!"
            });
        }

        // if new user
        const hashedPassword = await bcryptjs.hash(password, 8);

        let user = new User({
            email,
            password: hashedPassword,
            name
        });
        user = await user.save();
        res.json(user);
    } catch (error) {
        res.status(500).json({
            error: e.message
        });
    }
});

// sign in
authRouter.post("/api/signin", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        // if the user doesn't exists
        if (!user) {
            return res.status(400).json({
                msg: "User with this email does not exist!"
            });
        }

        // if user exists, check for the password & password doesn't match
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                msg: "Incorrect password"
            });
        }

        // if password matched then create
        const token = jwt.sign({ id: user._id }, "passwordKey");
        // ...user._doc will only give necessary data like inputed
        res.json({
            token, ...user._doc
        });

    } catch (error) {
        res.status(500).json({
            error: e.message
        });
    }
});

module.exports = authRouter;