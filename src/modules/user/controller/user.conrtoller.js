import { userModel}  from './../../../../db/model/user.model.js';
import cloudinary from './../../../services/cloudinary.js';

export const getprofile = async(req,res)=>{
   try{
     const user=await userModel.findById(req.user._id)
     res.status(200).json({message:"success",user})
   
    }catch(error){
      res.status(500).json({message:"server error"},error)
}
}

export const profilepic = async(req,res)=>{
  try{
   if(!req.file){
    res.status(400).json({message:"please upload profile pic"})
   }else{
   const{secure_url}= await cloudinary.uploader.upload(req.file.path,{folder:`user/${req.user._id}/profilepic`})
   
   const user =await userModel.findByIdAndUpdate(req.user._id,{profilepic:secure_url})
   res.status(200).json({message:"succses"})
} } catch(error){
  res.status(500).json({message:"server error"},error)
}
}

export const profilecoverimage =async(req,res)=>{
  try{
    if(!req.files){
     res.status(400).json({message:"please upload cover pic"})
    }else{
      const images=[];
for (const file of req.files) {
  const{secure_url}= await cloudinary.uploader.upload(file.path,{folder:`user/${req.user._id}/profileCoverpic`})
    images.push(secure_url);
}
    const user =await userModel.findByIdAndUpdate(req.user._id,{coverpic:images})
    res.status(200).json({message:"succses"})
 } } catch(error){
   res.status(500).json({message:"server error"},error)
 }
}