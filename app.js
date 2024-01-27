import express from 'express';
import { Admin } from './models/admin.model.js';
import adminRouter from './router/admin.router.js';
const app = express()



app.get("/" ,(req,res)=>{
 res.send("hello");
})
app.use('/api/v1/',adminRouter) 


export default app