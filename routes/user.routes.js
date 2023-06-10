const express = require("express");

const bcrypt = require('bcrypt');

var jwt = require('jsonwebtoken');

require('dotenv').config();

const {UserModel} = require("../models/user.model.js");
const { auth } = require("../middlewares/auth.middleware.js");

const userRoute = express.Router();

userRoute.post("/register",async(req,res)=>{
    const password = req.body.password;
    try {   
        bcrypt.hash(password, 5, function(err, hash) {
            if(err){
                console.log("Error",err);

                res.status(400).json({error:err});
            }else{
                req.body.password = hash;
                const newUser = new UserModel(req.body);
                newUser.save();

                res.status(201).json({message:"New user has been registered"})
            }
        });
        
    } catch (error) {
        console.log("Error",error);

        res.status(400).json({error:error});
    }
})

userRoute.post("/login",async(req,res)=>{
    const password = req.body.password;
    try {
        const user = await UserModel.findOne({email:req.body.email});

        bcrypt.compare(password, user.password,function(err, result) {
        if(result){
            const token = jwt.sign({name:user.name,email:user.email}, process.env.privateKey);
            res.status(200).json({
                message : "Login Successfull",
                token : token
            })
        }else{
            console.log("Error",err);

            res.status(400).json({error:err});
        }
        })
    } catch (error) {
        console.log("Error",error);

        res.status(400).json({error:"Wrong credentials"});
    }
})

userRoute.use(auth);

userRoute.get("/profile",async(req,res)=>{
    try {
        const user = await UserModel.findOne({name:req.body.name,email:req.body.email});

        res.status(200).json({data:user}); 
    } catch (error) {
        console.log("Error",error);

        res.status(400).json({error:error});
    }
})
module.exports = {userRoute};