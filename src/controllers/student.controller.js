import Student from '../models/student.model.js'

const cookieOptions = {
  maxAge: 7 * 24 * 60 * 1000,
  httpOnly: true,
  secure: false
}
const registerStu = async (req, res) => {
  const { username, email, password } = req.body
  console.log(email, password, username)
  console.log('hiiii aalo bhau')

  if (!username || !email || !password) {
    res.status(400).json({
      success: false,
      msg: 'all fields are required'
    })
  }



  const existedUser = await Student.findOne({ email })

  if (existedUser) {
    res.status(400).json({
      success: false,
      msg: 'student already exists'
    })
  }

  const student = await Student.create({
    username,
    email,
    password
  })

  await student.save()
  student.password = undefined

  const token = await student.generateJWTToken()

  res.cookie('token', token, cookieOptions)

  res.status(400).json({
    success: true,
    msg: 'student registration successfuly!!',
    student,
    token
  })
}

const loginStu = async (req, res) => {
  const { email, password } = req.body
  console.log(email)

  try {
    if (!password || !email) {
      res.status(400).json({
        success: false,
        msg: 'student name and email are required'
      })
    }

    const student = await Student.findOne({ email }).select('+password')

    if (!student || !student.comparePassword(password)) {
      res.status(400).json({
        success: false,
        msg: 'email or password dose not match'
      })
    }

    const token = await student.generateJWTToken()
    student.password = undefined

    res.cookie('token', token, cookieOptions)

    res.status(200).json({
      success: true,

      msg: 'admin login successfully',

      student,

      token
    })
  } catch (error) {
    res.status(400).json({
      success: false,

      msg: 'admin login nahi zala'
    })
  }
}

const logoutStu = async (req, res) => {
  const { id } = req.student

  console.log(req.student)

  res.cookie('token', null, {
    secure: true,
    maxAge: 0,
    httpOnly: true
  })

  res.status(200).json({
    success: true,

    msg: 'student logout zala'
  })
}

const getStu = async (req, res) => {
  try {
    const userId = req.student.id

    const student = await Student.findById(userId)

    res.status(200).json({
      success: true,

      msg: 'student detail',
      student
    })
  } catch (error) {
    res.status(200).json({
      success: true,

      msg: 'failed to fetch admin profile',
      student
    })
  }
}
export { registerStu, loginStu, logoutStu, getStu }
