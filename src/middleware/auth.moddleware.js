import jwt from 'jsonwebtoken'


const isLoggein = (req,res,next)=>{
 const {token} = req.cookies;
 if(!token){
  res.status(400).json({
   success:false,
    msg:"user plz login"
  })
 }

 const admin = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
req.admin= admin
next()
}
export default isLoggein