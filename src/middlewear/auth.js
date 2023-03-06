
import  jwt  from 'jsonwebtoken';
import { userModel } from './../../db/model/user.model.js';
export const roles ={
    Admin:"Admin",
    "user":"user"
}
export const  auth =(accessRoles=[])=>{
  try{
    return async (req,res,next)=>{
        let {token}=req.headers;
        if(!token.startsWith(process.env.BEARERKEY)){
            res.status(400).json({message:"invalid bearer key"})
        }
       else{
           token =token.split(process.env.BEARERKEY)[1];
           const decoded =jwt.verify(token,process.env.AUTHTOKEN)
           if(!decoded.id){
            res.status(400).json({message:"invalid token payload"})
           }else{
            const user =await userModel.findById(decoded.id).select("_id role")
           if(!user){
            res.status(401).json({message:"not regster user"});
           }else{
            if(!accessRoles.includes(user.role)){
            res.status(403).json({message:"un authorized user"});

            }else{
               req.user=user;
            next(); 
            }
            
           }
           }
       }
    }
}catch(error){
      res.status(500).json({message:"server error"},error)
}
}