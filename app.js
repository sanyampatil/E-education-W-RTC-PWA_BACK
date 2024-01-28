import express from 'express';
import adminRouter from './src/router/admin.router.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'
const app = express()

app.use(express.json())
app.use(cookieParser())


// console.log(CLINT_URL)
app.use(cors({
 origin:process.env.CLINT_URL,
 methods:'GET,POST,PUT,DELETE',
 credentials:true,

}))
app.get("/" ,(req,res)=>{
 res.send("hello");
})
app.use('/api/v1/admin',adminRouter) 


export default app