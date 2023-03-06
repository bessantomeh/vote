import cloudinary from './../../../services/cloudinary.js';
import { postModel } from '../../../../db/model/post.model.js';
import { commentModel } from './../../../../db/model/comment.model.js';
import { pagination } from '../../../services/pagination.js'


export const createpost =async (req,res)=>{
    if(!req.files){
        res.status(400).json({message:"image required"})
       }else{
           const{title,caption}=req.body;
           const images=[];
           for (const file of req.files) {
            const{secure_url}= await cloudinary.uploader.upload(file.path,{folder:`gallery/${req.user._id}/post`})
              images.push(secure_url);
              const post =await postModel.create({title,caption,userId:req.user._id,images});
              res.status(201).json({message:"succses",post})
          }
       }
}

export const getposts =async(req,res)=>{
     const {page,size}=req.query;
         const{skip,limit}= pagination(page,size)
    const posts =await postModel.find({}).limit(limit).skip(skip).populate([{
    path:"userId",select:"userName -_id"
}]);
  const postList=[];
  for (const post of posts) {
    let comment =await commentModel.find({postId:post._id})
    postList.push({post,comment})
  }
    res.status(200).json({message:"success",postList})
}

export const likepost =async(req,res)=>{
 try{
      const {postId}=req.params;
      const post=await postModel.findOneAndUpdate({_id:postId},
        {$addToSet:{likes:req.user._id},
        $pull:{unlike:req.user._id},
      },
        {new:true})
        
      res.status(200).json({message:"success",post})

 }catch{
    res.status(500).json({message:"catch error"})
 }
}
export const unlikepost =async(req,res)=>{
    try{
         const {postId}=req.params;
         const post=await postModel.findOneAndUpdate({_id:postId},
           {$addToSet:{unlike:req.user._id} ,
            $pull:{likes:req.user._id} 
            
           },{new:true})
         res.status(200).json({message:"success",post})

    }catch{
       res.status(500).json({message:"catch error"})
    }
   }