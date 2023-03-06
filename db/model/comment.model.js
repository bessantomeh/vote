
import { Schema,model,Types } from "mongoose";

const commentschema =new Schema({
    text:{
        type:String,
        required:true
    },
    userId:{
        type:Types.ObjectId,
        required:true,
        ref:'user'
    },
    postId:{
        type:Types.ObjectId,
        required:true,
        ref:'post'
    }
    
},{timestamps:true})

export const commentModel = model('comment',commentschema)