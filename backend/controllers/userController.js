const user = require('../models/userModel');
const bcrypt = require('bcrypt');

//create new user
const newUser = (async(req,res) => {
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

//get user
const getUser = (async(req,res) => {
    const id = req.params['id'];
    const User = await user.findById(id).select('-password');

    if (!User) {
        return res.status(400).json({message:"User Not Found"});        
    }
    else {
        return res.status(201).json(User);     
    }
});

//update user
const updateUser = (async(req,res) => {
    const {id,firstName,lastName,mobile} =req.body;
    
    //fields check
    if (!id|| !firstName|| !lastName|| !mobile){
        return res.status(400).json({message:"All Fields Are Required"});
    }

    //user existing or not
    const User = await user.findById(id);
    if (!User){
        return res.status(400).json({message:"User Not Found"})
    }

    User.firstName = firstName;
    User.lastName = lastName;
    User.mobile = mobile;

    const updatedUser = await User.save();
    res.status(201).json({message:`User ${updatedUser.firstName +' '+ updatedUser.lastName} Updated`})

})

module.exports = {newUser, getUser, updateUser}