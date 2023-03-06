import { Schema,model } from "mongoose";

const userschema =new Schema({
    userName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    age:Number,
    gender:{
        type:String,
        default:'Male',
        enum:['Male','female']
    },
    confirmEmail:{
        type:Boolean,
        default:false
    },profilepic:String,
    coverpic:Array,
    phone:{
        type:String,
    },
    role:{
        type:String,
        default:'user',
        enum:['user','Admin']
    }
},{timestamps:true})

export const userModel = model('user',userschema)