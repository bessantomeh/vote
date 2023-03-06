import express from 'express'
import dotenv from 'dotenv'
import connectDB from './db/conniction.js';
import * as indexRouter from './src/modules/index.router.js'
dotenv.config({path:'./config/.env'});
const app = express()
const port = 3000
app.use(express.json());
connectDB();
const baseurl=process.env.BASEURL
app.use(`${baseurl}/auth`,indexRouter.authRouter)
app.use(`${baseurl}/user`,indexRouter.userRouter)
app.use(`${baseurl}/post`,indexRouter.PostRouter)

app.use('*',(req,res)=>{
    res.json({message:"page not found"})
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))