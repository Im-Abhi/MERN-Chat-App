const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const generateToken = require('../config/generateToken');

const registerUser = asyncHandler( async (req, res) => {
    const { name, email, password, pic } = req.body;
    if( !name || !email || !password) {
        res.status(400);
        throw new Error("Please fill all the required fields");
    }

    const userExists = await User.findOne({ email });

    if(userExists) {
        res.statu(400);
        throw new Error("User with the provided email already exists!");
    } else {
        const newUser = await User.create({
            name,
            email,
            password,
            pic
        });

        if(newUser)
        {
            res.status(201).json({
                _id:    newUser._id,
                name:   newUser.name,
                email:  newUser.email,
                pic:    newUser.pic,
                token:  generateToken(newUser._id)
            })
        } else {
            res.status(400);
            throw new Error("Ran into an error failed to create new User");
        }
    }
});

module.exports = { registerUser };