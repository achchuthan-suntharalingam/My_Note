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

//login
const loginUser = asyncHandler(async(req,res) => {
    const {email, password} = req.body
    
    if (!email || !password){
        res.status(400).json({message:'All Ceredentials Are Required'})
    }

    const User = await user.findOne({email})

    if (User && User.active == true){
        if (await bcrypt.compare(password, User.password)){
            res.status(201).json({message:`Logged In As ${User.firstName +' '+ User.lastName}`, token: generateToken(User.id)})
        }
        else{
            res.status(401).json({message:'Invalid Password'})
        }
    }
    else{
        res.status(401).json({message:'User is Not Active or No User'})
    }
});

//getoneuser
const getOneUser = asyncHandler(async (req, res) => {
    const id = req.params['id'];

    const User = await user.findById(id).select('-password');

    if (!User) {
        return res.status(400).json({ message: 'User not found' })
    } else {
        return res.status(201).json(User);
    } 
});

//json webtoken
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '365d'})
}

module.exports = {registerUser, loginUser, getOneUser}

