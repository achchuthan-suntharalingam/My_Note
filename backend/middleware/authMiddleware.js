const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const user = require('../models/userModel');

const protect = asyncHandler(async(req,res) => {
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token,process.env.JWT_SECRET)
            req.User = await user.findById(decoded.id).select('-password')
            nex()

        }
        catch(error){
            res.status(401).json({message:'Not Authorizd'})
            throw new Error('Not authorized')
        }
    }
    if (!token){
        res.status(401).json({message:'Not Authorized, No Token'})
        throw new Error('Not Authorized, No Token')
    }
});

const authUser = asyncHandler(async(req,res) => {
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token = req.header.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            const User = await user.findById(decoded.id).select('-password')

            if (User.active != true){
                res.status(401).json({message:'Not Authorized'})
            }
            else{
                next()
            }
        }
        catch(error){
            res.status(401).json({message:'Not Authorized'})
            throw new Error('Not authorized')
        }
    }
    if (!token){
        res.status(401).json({message:'Not Authorized'})
        throw new Error('Not Authorized, No Token')
    }
});


module.exports = {protect, authUser}