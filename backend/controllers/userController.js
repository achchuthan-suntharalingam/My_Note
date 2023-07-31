const user = require('../models/userModel');
const bcrypt = require('bcrypt');

//creating new user
const createNewUser = (async(req,res) => {
    const {firstName,lastName,email,mobile,password} = req.body;

    //empty fields validating
    if (!firstName || !lastName|| !email|| !mobile|| !password) {
        return res.status(400).json({message: "Please Fill Up All Fields"})
    };

    //duplicate mail check
    const duplicate = await user.findOne({email});
    if (duplicate){
        return res.status(409).json({message:"Exisitng Email ID"})
    };

    //password hasing
    const hashedPwd = await bcrypt.hash(password,10);

    const userObject = {firstName,lastName,email,mobile,password:hashedPwd};

    const User = await user.create(userObject);

    if (User) {
        return res.status(201).json({message:`New User ${firstName +' '+ lastName}  Created` })
    }
    else{
        return res.status(400).json({message:"Failed to Create New User"})
    }

});


module.exports = {createNewUser}