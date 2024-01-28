import User from "../models/user.model"

const cookieOptions = {
  maxAge: 7 * 24 * 60 * 1000,
  httpOnly: true,
  secure: true
}
const registerUser = async (req, res) => {
  const { email, username, password } = req.body
  console.log(email, password, username)
  console.log("hiiii aalo bhau")

  if (!username || !email || !password) {
    res.status(400).json({
      success: false,
      msg: 'all fields are required'
    })
  }

  const existedUser = await User.findOne({ email })

  if (existedUser) {
    res.status(400).json({
      success: false,
      msg: 'user already exists'
    })
  }

  
  const user = await User.create({

    username,
    email,
    password
  })

  await user.save()
  admin.password = undefined

  const token = await user.generateJWTToken()


  res.cookie('token', token, cookieOptions)

  res.status(400).json({
    success: true,
    msg: 'user registration successfuly!!',
    user,

    token
  })
}

const loginUser = async (req, res) => {

  const { email, password } = req.body
  console.log(email)

  try {
    if (!password || !email) {
      res.status(400).json({
        success: false,
        msg: 'user name and email are required'
      })
    }

    const user = await User.findOne({ email }).select('+password')

    if (!user || !user.comparePassword(password)) {
      res.status(400).json({
        success: false,
        msg: 'email or password dose not match'
      })
    }

    const token = await user.generateJWTToken()
    user.password = undefined

    res.cookie('token', token, cookieOptions)

    res.status(200).json({
      success: true,

      msg: 'admin login successfully',

     user,

      token
    })
  } catch (error) {
    res.status(400).json({
      success: false,

      msg: 'admin login nahi zala'
    })
  }
}


const logoutUser = async (req, res) => {
    
  const { id } = req.user


  console.log(req.user)

  res.cookie('token', null, {
    secure: true,
    maxAge: 0,
    httpOnly: true
  })

  res.status(200).json({
    success: true,

    msg: 'user logout zala'
  })
}

const getUser = async (req, res) => {

  try {
    const userId = req.user.id


    const user = await User.findById(userId)



    res.status(200).json({
      success: true,

      msg: 'user detail',
      user
    })
  } catch (error) {
    res.status(200).json({
      success: true,

      msg: 'failed to fetch admin profile',
      user
    })
  }
}
export { registerUser,logoutUser,loginUser,getUser}

