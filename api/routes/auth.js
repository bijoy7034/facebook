const express = require("express");
const user = require("../models/user");
const router = express.Router();
const User = require('../models/user')
const bcrypt = require('bcryptjs')


//reg
router.post('/register', async(req,res)=> {
    

    try{
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        const user = new User({
            username : req.body.username,
            email: req.body.email,
            password: hashedPassword
        })
        const newUser = await user.save()
        res.status(200).json(newUser)
    }catch(err){
        console.log(err)
    }
})

//login
router.post('/login', async(req,res)=>{
    try{
        const user = await User.findOne({email: req.body.email})
        if(!user) res.status(404).json({mssg:"N user found"})

        const validPass = await bcrypt.compare(req.body.password, user.password)
        if(!validPass) res.status(400).json({mssg: "Wrong Password"})

        res.status(200).json(user)

    }catch(err){
        res.status(500).json(err)
    }
})


module.exports = router