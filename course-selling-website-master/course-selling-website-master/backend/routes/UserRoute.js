const express = require('express');

const { zodUserSchema } = require('../validation');

const jwt = require('jsonwebtoken');
const { User } = require('../database');
const SECRET_KEY = process.env.SECRET_KEY;
const userRoute = express.Router()

userRoute.post("/signup",async(req,res)=>{
    if(!zodUserSchema.safeParse(req.body).success){
        res.status(402).send({
            msg : "invalid validation"
        })
        console.log(zodUserSchema.safeParse(req.body))
        return ;
        
    }
    let {username , password} = req.body;
    let response = await User.findOne({
        username
    });
    if(!response){
        await User.create({
            username,
            password
        });
        res.status(201).send({
            msg : "User created"
        })
        return ;
    } else {
        res.status(400).send({
            msg : "User alredy exists"
        })
    }
})

userRoute.post("/signin",async(req,res)=>{

    if(!zodUserSchema.safeParse(req.body).success){
        res.status(402).send({
            msg : "invalid validation"
        })
        console.log(zodUserSchema.safeParse(req.body))
        return ;
        
    }
    let {username , password} = req.body;
    let response = await User.findOne({
        username
    });
    if(!response){
        
        res.status(404).send({
            msg : "User dosen't exists"
        })
        return ;
    } else {
        console.log(SECRET_KEY)
        let token = jwt.sign({ username , password }, SECRET_KEY);
        res.status(200).send({
            token : "bearer " + token
        })
    }
})

module.exports = userRoute;