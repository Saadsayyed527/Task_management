const express = require('express');
const User = require('../Models/User');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


router.get('/', async(req,res)=>{
    // res.send("user route working ");
    const user = await User.find({});
    res.send(user);
})


router.post('/register',async(req,res)=>{

  // whenever registering just  hash the password
  try { 
     const {name,email,password} =req.body;
     const user = new User({
        name,
        email,
        password

     });
     await user.save();
     res.status(200).send({user, message:"user have been created "});
  } catch (error) {
    res.status(400).send({error:err});
    
  }
})

router.post('/login',async(req,res)=>{
    try { 
        const {email,password} =req.body;
        const user = await User.findOne({email});
        if(!user){
            throw new Error('User not fount ')
        }
// check the password 
    const isMatch = await bcrypt.compare(password,user.password);

    // now username and password is correct then generate a token 
 
    const token = jwt.sign({
        _id: user._id.toString()
    },process.env.JWT_SECRET_KET);

        res.status(200).send({user, token,message:"user loged in "});
     } catch (error) {
       res.status(400).send({error:err});
       
     }
})

module.exports= router
