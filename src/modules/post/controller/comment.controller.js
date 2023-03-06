
import { postModel } from './../../../../db/model/post.model.js';
import { commentModel } from './../../../../db/model/comment.model.js';

export const createcomment =async(req,res)=>{
    const {text}=req.body;
    const {id}=req.params;

    const post =await postModel.findById(id)
    if(!post){
        res.status(400).json({message:"cannot comment on post not exists"})
    }else{
        const comment =await commentModel.create({text,userId:req.user._id,postId:id})
     
        res.status(201).json({message:"success"})
    }
}