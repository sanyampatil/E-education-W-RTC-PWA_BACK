import Apperror from '../middleware/apperror.js'
import Admin from '../models/admin.model.js'
Apperror

console.log(Admin)
const cookieOptions = {
  maxAge: 7 * 24 * 60 * 1000,
  httpOnly: true,
  secure: true
}
const registerAdmin = async (req, res, next) => {
  
  const { username, email, password } = req.body
  console.log(email, password, username)
  console.log('hiiii aalo bhau 1')

  try {
    if (!username || !email || !password) {
      return next(new Apperror('all fields are required', 400))
    }
    console.log('hiiii aalo bhau 2')

    const existedUser = await Admin.findOne({ email })

    if (existedUser) {
      return next(new Apperror('user already exists', 400))
    }
    console.log('hiiii aalo bhau 3')

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

    await admin.save()
    admin.password = undefined

    const token = await admin.generateJWTToken()

    res.cookie('token', token, cookieOptions)

    res.status(400).json({
      success: true,
      msg: 'user registration successfuly!!',
      admin,
      token
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: 'nahi registration successfuly!!',
      error
    })
  }
}

// const loginAdmin = async (req, res) => {
//   const { email, password } = req.body
//   console.log(email)

//   try {
//     if (!password || !email) {
//       res.status(400).json({
//         success: false,
//         msg: 'user name and email are required'
//       })
//     }

//     const admin = await Admin.findOne({ email }).select('+password')

//     if (!admin || !admin.comparePassword(password)) {
//       res.status(400).json({
//         success: false,
//         msg: 'email or password dose not match'
//       })
//     }

//     const token = await admin.generateJWTToken()
//     admin.password = undefined
//     res.cookie('token', token, cookieOptions)

//     res.status(200).json({
//       success: true,

//       msg: 'admin login successfully',

//       admin,
//       token
//     })
//   } catch (error) {
//     res.status(400).json({
//       success: false,

//       msg: 'admin login nahi zala'
//     })
//   }
// }

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

// const logoutAdmin = async (req, res) => {
//   const { id } = req.admin

//   console.log(req.admin)
//   res.cookie('token', null, {
//     secure: true,
//     maxAge: 0,
//     httpOnly: true
//   })

//   res.status(200).json({
//     success: true,

//     msg: 'user logout zala'
//   })
// }

// const getAdmin = async (req, res) => {
//   try {
//     const adminId = req.admin.id

//     const admin = await Admin.findById(adminId)

//     res.status(200).json({
//       success: true,

//       msg: 'user detail',
//       admin
//     })
//   } catch (error) {
//     res.status(200).json({
//       success: true,

//       msg: 'failed to fetch admin profile',
//       user
//     })
//   }
// }
export { registerAdmin }
