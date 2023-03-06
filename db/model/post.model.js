
import { Schema,model,Types } from "mongoose";

const postschema =new Schema({
    title:{
        type:String,
        required:true
    },
    caption:{
        type:String,
        required:true,
    },
    userId:{
        type:Types.ObjectId,
        required:true,
        ref:'user'
    },
    image:{
     type:Array   
    ,required:true
},
    likes:[{type:Types.ObjectId,ref:'user'}],
    unlike:[{type:Types.ObjectId,ref:'user'}],
    counts:{type:Number,default:0}
    // commentsId:[{type:Types.ObjectId,ref:'comment'}],
    
},{timestamps:true})

postschema.post('findOneAndUpdate',async function(){
    let docToupdate=await this.model.find({_id:this.getQuery()._id});
    docToupdate.counts=docToupdate.likes.length - docToupdate.unlike.length;
    docToupdate.save();
})

export const postModel = model('post',postschema)