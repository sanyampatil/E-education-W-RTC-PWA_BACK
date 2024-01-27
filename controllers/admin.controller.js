import { Admin } from '../models/admin.model.js'

const registerAdmin = async (req, res) => {
  const { email, username, password } = req.body
  console.log('email: ', email)

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
      msg: 'all fields are required'
    })
  }

  const admin = await Admin.create({
    username,
    email,
    password
  })
}

export { registerAdmin }
