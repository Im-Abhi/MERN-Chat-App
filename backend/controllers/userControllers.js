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
        res.status(400);
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

const authUser = asyncHandler( async (req, res) => {
    const { email, password } = req.body;  

    const user = await User.findOne({ email });

    if(user && (await user.matchPassword(password))) {
        res.json({
            _id:    user._id,
            name:   user.name,
            email:  user.email,
            pic:    user.pic,
            token:  generateToken(user._id)
        });
    } else {
        res.status(401);
        throw new Error("Invalid email or passowrd!");
    }
});

// /api/user?search=person
const allUsers = asyncHandler( async (req, res) => {
    const keyword = req.query.search ? {
        $or: [
            { name : { $regex: req.query.search, $options: "i" }},
            { email : { $regex: req.query.search, $options: "i" }},
        ]
    } : {} ;

    const users = await User.find(keyword).find({ _id : { $ne: req.user._id }});
    res.send(users);

    console.log(keyword);
});

module.exports = { registerUser, authUser, allUsers };