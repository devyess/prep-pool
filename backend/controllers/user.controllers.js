const jwt=require('jsonwebtoken');
const bcrypt = require('bcrypt');
const users= require('../models/user.models');
const registerValidation = require('../validation/register.validation');
const redisClient = require("../services/redis.service.js");
const submissions=require('../models/submission.models');
const submissionValidation=require('../validation/submission.validation');

const userRegister=async(req,res)=>{
      try{
            const registerValidatedData=await registerValidation.safeParse(req.body);
            if(!registerValidatedData.success){
                  return res.status(403).json({
                        message:"Password must be minimum 6 letters long",
                        error:registerValidatedData.error
                  });
            }
            const {userName,email,password}=registerValidatedData.data;
            const checkEmail=await users.findOne({email:email});
            if(checkEmail){
                  return res.status(402).json({
                        message:"User already exists",
                  });
            }
            const hashedPassword=await bcrypt.hash(password,10);
            const user=new users({
                  userName:userName,
                  email:email,
                  password:hashedPassword
            });
            user.save();
            return res.status(200).json({
                  message:"User registered successfully"
            });
      }catch(err){
            return res.status(500).json({
                  message:"Internal server error",
                  error:err
            });
      }
}

const userLogin=async(req,res)=>{
      try{
            const {email,password}=req.body;
            const user=await users.findOne({email:email});
            if(!user){
                  return res.status(404).json({
                        message:"User not found"
                  });
            }
            const checkPassword=await bcrypt.compare(password,user.password);
            if(!checkPassword){
                  return res.status(401).json({
                        message:"Invalid password"
                  });
            }
            const token=jwt.sign({email},process.env.JWT_SECRET); 
            return res.status(200).json({
                  message:"User logged in successfully",
                  token
            });
      }
      catch(err){
            return res.status(500).json({
                  message:"Internal server error",
                  error:err
            });
      }
}

const userLogout=async(req,res)=>{
      try{
            const token=req.header('Authorization').split(' ')[1];
            redisClient.set(token,'blacklisted');
            return res.status(200).json({
                  message:"User logged out successfully"
            });
      }catch(err){
            return res.status(500).json({
                  message:"Internal server error",
                  error:err
            });
      }
}

const postQuestion=async(req,res)=>{
      try{
            const submissionValidatedData=await submissionValidation.safeParse(req.body);
            if(!submissionValidatedData.success){
                  return res.status(403).json({
                        message:"Validation error",
                        error:submissionValidatedData.error
                  });
            }
            const {userName,country,company,question}=submissionValidatedData.data;
            const token=req.header('Authorization').split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await users.findOne({ email: decoded.email });
            const submission=new submissions({
                  userId:user._id,
                  userName:userName,
                  country:country,
                  company:company,
                  question:question,
                  createdAt:new Date(),
                  updatedAt:new Date()
            });
            submission.save();
            return res.status(200).json({
                  message:"Question posted successfully"
            });
      }catch(err){
            return res.status(500).json({
                  message:"Internal server error",
                  error:err
            });
      }
}

const getSelfQues=async(req,res)=>{
      try{
            const token=req.header('Authorization').split(' ')[1];
            const decoded=jwt.verify(token,process.env.JWT_SECRET);
            const user=await users.findOne({email:decoded.email});
            const questions=await submissions.find({userId:user._id});
            return res.status(200).json({
                  message:"Questions fetched successfully",
                  questions
            });
      }catch(err){
            return res.status(500).json({
                  message:"Internal server error",
                  error:err
            });
      }
}

const editQues=async(req,res)=>{
      try{  
            const newId=req.params.id;
            const token=req.header('Authorization').split(' ')[1];
            const decoded=jwt.verify(token,process.env.JWT_SECRET);
            const user=await users.findOne({email:decoded.email});
            const submission=await submissions.findById(newId);
            if(!submission){
                  return res.status(404).json({
                        message:"Question not found"
                  });
            }
            if(submission.userId.toString()!==user._id.toString()){
                  return res.status(401).json({
                        message:"Unauthorized access"
                  });
            }
            const {
                  userName = submission.userName,
                  country = submission.country,
                  company = submission.company,
                  question = submission.question
                } = req.body;
            submission.userName=userName;
            submission.country=country;
            submission.company=company;
            submission.question=question;
            submission.updatedAt=new Date();
            submission.save();
            return res.status(200).json({
                  message:"Question updated successfully"
            });
      }catch(err){
            return res.status(500).json({
                  message:"Internal server error",
                  error:err.message
            });
      }
}

const getAllQues=async(req,res)=>{
      try{
            const questions=await submissions.find();
            return res.status(200).json({
                  message:"Questions fetched successfully",
                  questions
            });
      }catch(err){
            return res.status(500).json({
                  message:"Internal server error",
                  error:err
            });
      }
}
module.exports={
      userRegister,
      userLogin,
      userLogout,
      postQuestion,
      getSelfQues,
      editQues,
      getAllQues
}