const jwt=require('jsonwebtoken');
const redisClient = require("../services/redis.service.js");

const authUser=async(req,res,next)=>{
      try{
            const token=req.header('Authorization').split(' ')[1];
            if(!token){
                  return res.status(401).json({error:'Unauthorized User!'});
            }
            const isBlacklisted=await redisClient.get(token);
            if(isBlacklisted){
                  res.cookies('token','');
                  return res.status(401).json({
                        error:'Unauthorized User!'
                  });
            }
            const decoded=jwt.verify(token,process.env.JWT_SECRET);
            req.user=decoded;
            next();
      }catch(error){
            console.log(error);
            return res.status(401).json({error:'Please authenticate'});
      }
}

module.exports=authUser;