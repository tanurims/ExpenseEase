const jwt = require('jsonwebtoken');
const User = require('../models/User');


//generate JWT token
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "1h"});

};

//REGISTER USER
exports.registerUser = async (req, res) => {
    const {fullName, email, password, profileImageUrl} = req.body;

    //validation
    if(!fullName || !email || !password) {
        return res.status(400).json({message: "All fields are required"});
    }

    try {

        const existingUser = await User.findOne({email});
        if(existingUser) {
            return res.status(400).json({message: "Email already exists"});
        }

        //create user
        const user = await User.create({
            fullName,
            email,
            password,
            profileImageUrl,
        });

        res.status(201).json({
            id: user._id,
            user,
            token: generateToken(user._id),
        });
        
    } catch (err) {
        res
         .status(500)
         .json({message: "Error registering user", error: err.message});
        
    }
};

//login user
exports.loginUser = async (req, res) => {};

//get user info
exports.getUserInfo = async (req, res) => {};