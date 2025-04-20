const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try{
        const {name, email, password, role} = req.body;

        //check existing user
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message: "User already exists"});
        }

        //hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        //create new user
        const user = new User({
            name,
            email,
            password: hashedPassword,
            role
        });

        //save user to database
        await user.save();
        res.status(201).json({message: "User registered successfully"});
    } 
    catch(err){
        console.log(err);
        res.status(500).json({message: err.message});
    }
}

exports.login = async (req, res) => {
    try{
        const {email, password} = req.body;

        //check existing user
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: "Invalid credentials"});
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect){
            return res.status(400).json({message: "Invalid credentials"});
        }

        //create token
        const token = jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET, {expiresIn: "1h"});
        res.status(200).json({token});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: err.message});
    }
}