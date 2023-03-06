import mongoose from "mongoose";


const connectDB =async()=>{
    return await mongoose.connect(process.env.DBURL).then(
        res=>{
            console.log("connectdb");
        }).catch(
        res=>{
            console.log("fail connect db",err)
        })

}
export default connectDB