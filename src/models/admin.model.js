import mongoose, { Schema } from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const adminSchema = new Schema(
  {
    username: {
      type: String,
      // required: true,
      trim: true,
      index: true
    },
    email: {
      type: String,
      // required: true,
      unique: true,
      lowecase: true,
      trim: true
    },
    // fullName: {
    //     type: String,
    //     required: true,
    //     trim: true,
    //     index: true
    // },
    // avatar: {
    //     type: String, // cloudinary url
    //     required: true,
    // },

    password: {
      type: String,
      // required: [true, 'Password is required'],
      select:false
    }
  },
  {
    timestamps: true
  }
)

adminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }

  this.password = await bcrypt.hash(this.password, 10)
  console.log(this)
//   next()
})

adminSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

adminSchema.methods.generateJWTToken = async function () {
  return await jwt.sign(
    {
      id: this._id,
      email: this.email
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: '24h'
    }
  )
}

adminSchema.methods.comparePassword = async function (plainTextPassword){
    return await bcrypt.compare(plainTextPassword, this.password)
}

// adminSchema.methods.generateRefreshToken = function(){
//     return jwt.sign(
//         {
//             _id: this._id,

//         },
//         process.env.REFRESH_TOKEN_SECRET,
//         {
//             expiresIn: process.env.REFRESH_TOKEN_EXPIRY
//         }
//     )
// }
const Admin = mongoose.model('Admin', adminSchema)
export default Admin
