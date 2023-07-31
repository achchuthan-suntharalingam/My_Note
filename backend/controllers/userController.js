const user = require('../models/userModel');
const bcrypt = require('bcrypt');

//creating new user
const createNewUser = (async(req,res) => {
    const {firstName,lastName,email,mobile,password} = req.body;

    //empty fields validating
    if (!firstName || !lastName|| !email|| !mobile|| !password) {
        return res.status(400).json({message: "Please Fill Up All Fields"})
    };

    //Mail Duplication Caheck
    
});
