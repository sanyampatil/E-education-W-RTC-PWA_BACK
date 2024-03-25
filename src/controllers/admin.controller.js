import Apperror from '../middleware/apperror.js'
import Admin from '../models/admin.model.js'

console.log(Admin)
const cookieOptions = {
  maxAge: 7 * 24 * 60 * 1000,
  httpOnly: true,
  secure: true
}

const registerAdmin = async (req, res, next) => {
  console.log()
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
      return next(new Apperror('Admin already exists', 400))
    }
    console.log('hiiii aalo bhau 3')

    // if(!existedUser){
    //   res.status(400).j  son({
    //     success: false,
    //     message: 'user registration failed'

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

    res.status(200).json({
      success: true,
      message: 'Admin registration successfuly!!',
      admin,
      token
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'nahi registration successfuly!!',
      error
    })
  }
}

const loginAdmin = async (req, res) => {
  const { email, password } = req.body
  console.log('User data>', email, password)

  try {
    if (!password || !email) {
      return next(new Apperror('all fields are required', 400))
    }

    const admin = await Admin.findOne({ email }).select('+password')

    console.log('admin is info', admin)

    if (!admin || !admin.comparePassword(password)) {
      return next(new Apperror('email dose not match', 400))
    }
    console.log('password compare zala')

    const token = await admin.generateJWTToken()
    admin.password = undefined
    res.cookie('token', token, cookieOptions)
    console.log('cookie set zali')

    res.status(200).json({
      success: true,

      message: 'Admin login successfully',

      admin,
      token
    })
  } catch (error) {
    res.status(400).json({
      success: false,

      message: 'Admin login nahi zala'
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

const logoutAdmin = async (req, res) => {
  const { id } = req.body
  console.log('id', id)

  console.log(req.body)

  res.cookie('token', null, {
    secure: true,
    maxAge: 0,
    httpOnly: true
  })

  res.status(200).json({
    success: true,

    message: 'admin  logout zala'
  })
}

// const getAdmin = async (req, res) => {
//   try {
//     const adminId = req.admin.id

//     const admin = await Admin.findById(adminId)

//     res.status(200).json({
//       success: true,

//       message: 'user detail',
//       admin
//     })
//   } catch (error) {
//     res.status(200).json({me
//       success: true,

//       message: 'failed to fetch admin profile',
//       user
//     })
//   }
// }

export { registerAdmin, loginAdmin, logoutAdmin }
