const express = require('express');

const { zodAdminSchema, zodCourseSchema } = require('../validation');

const jwt = require('jsonwebtoken');
const { User, Course } = require('../database');
const SECRET_KEY = process.env.SECRET_KEY;
const adminRoute = express.Router()

adminRoute.post("/signup",async(req,res)=>{
    console.log(req.body)
    if(!zodAdminSchema.safeParse(req.body).success){
        res.status(402).send({
            msg : "invalid validation"
        })
        console.log(zodAdminSchema.safeParse(req.body))
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

adminRoute.post("/signin",async(req,res)=>{
    if(!zodAdminSchema.safeParse(req.body).success){
        res.status(402).send({
            msg : "invalid credential"
        })
        console.log(zodAdminSchema.safeParse(req.body))
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

adminRoute.post("/createCourse",async(req,res)=>{
    if(!zodCourseSchema.safeParse(req.body).success){
        res.status(402).send({
            msg : "invalid credential"
        })
        return ;
    }
    let {title , imageLink , desc} = req.body;
    let response = await Course.findOne({
        title
    })
    if(!response){
        let courseId = Date.now() + Math.floor(Math.random() * 100000);
        await Course.create({
            title , 
            desc,
            courseId , 
            imageLink
        })
        res.send({
            msg : "course created"
        })
    } else {
        res.status(403).send({
            msg : "this course alredy exists"
        })
    }
})

adminRoute.get("/courses",async(req,res)=>{
    console.log("inside")
    let token = req.headers.token.split(" ")[1];
    console.log(token)
    // console.log()
    try{
        let response = jwt.verify(token , SECRET_KEY);
        let found = await User.findOne({
            username : response.username
        })
        if(!found){
            res.status(402).send({
                msg : "user not signed in"
            })
            console.log("user not signed in")
            return ;
        }
        let foundCourses = await Course.find({})
    
        res.status(200).send({
            foundCourses 
        })
        return ; 
    }
    catch(err){
        console.log("jwt error :",err);
        res.status(403).send({
            error : "unknown error occured"
        })
    }
    
    
    
})

module.exports = adminRoute;