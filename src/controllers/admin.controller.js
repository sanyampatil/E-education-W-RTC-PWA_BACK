
import Admin from '../models/admin.model.js'
console.log(Admin)
const cookieOptions ={
  maxAge:7 * 24 * 60 *1000,
  httpOnly: true,
  secure:true
}
const registerAdmin = async (req, res) => {
  const { email, username, password } = req.body
  console.log( email,password,username)

  if (!username || !email || !password) {
    res.status(400).json({
      success: false,
      msg: 'all fields are required'
    })
  }

  const existedUser = await Admin.findOne({ email })

  if (existedUser) {
    res.status(400).json({
      success: false, 
      msg: 'user already exists'

    })
  }

  // if(!existedUser){
  //   res.status(400).json({
  //     success: false,
  //     msg: 'user registration failed'

  //   })
  // }

  const admin = await Admin.create({
    username,
    email,
    password
  })

  await admin.save();
  admin.password=undefined;

const token = await admin.generateJWTToken();

res.cookie("token",token,cookieOptions)

  res.status(400).json({
    success: true,
    msg: 'user registration successfuly!!',
    admin,
    token

  })
}



const loginUser = async (req, res) =>{
  const {email, username, password} = req.body
  console.log(email);

  try {
    if (!username && !email) {
       res.status(400).json({
        success:false,
        msg:"user name and email are required"
       })
    }
    
   
  
    const admin = await Admin.findOne({email}).select("+password")
  
    if (!admin || !admin.comparePassword(password)) {
      res.status(400).json({
        success:false,
        msg:"email or password dose not match"
       })
    }


    const token = admin.generateJWTToken()
    admin.password =  undefined;
    res.cookie('token',token,cookieOptions);
    
    res.status(200).json({
  
      success:true,
  
      msg:"admin login successfully"
     })
    }
    
   catch (error) {
    res.status(400).json({
  
      success:false,
  
      msg:"admin login nahi zala"
     })
    }
  }

//  const isPasswordValid = await user.isPasswordCorrect(password)

//  if (!isPasswordValid) {
//   throw new ApiError(401, "Invalid user credentials")
//   }

//  const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(user._id)

//   const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

//   const options = {
//       httpOnly: true,
//       secure: true
//   }

//   return res
//   .status(200)
//   .cookie("accessToken", accessToken, options)
//   .cookie("refreshToken", refreshToken, options)
//   .json(
//       new ApiResponse(
//           200, 
//           {
//               user: loggedInUser, accessToken, refreshToken
//           },
//           "User logged In Successfully"
//       )
//   )

// })
export { registerAdmin }