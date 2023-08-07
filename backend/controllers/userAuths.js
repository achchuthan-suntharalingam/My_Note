const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');
const user = require('../models/userModel');

//register
const registerUser = asyncHandler(async(req,res) => {
    const {firstName,lastName,mobile,email,password} = req.body;

    if (!firstName || !lastName || !mobile || !email || !password) {
        res.status(400)
        throw new Error('Fill All Fields')
    }

    //email check
    const existingUser = await user.findOne({email});
    if (existingUser) {
        res.status(400)
        throw new Error('User Already Exists')
    }

    //password hashing
    const hashedPwsd = await bcrypt.hash(password, 10);

    //registering user
    const User = await user.create({firstName,lastName,mobile,email,password:hashedPwsd, token: generateToken(user.id)})

    if (User) {
        res.status(201).json(`User ${firstName +' '+ lastName} Registered`)
    }
    else{res.status(401).json({message:'Invalid Credentials'})}
});

//json webtoken
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '365d'})
}

module.exports = {registerUser}

