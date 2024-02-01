import mongoose, { Schema } from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      index: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowecase: true,
      trim: true
    },
    

    password: {
      type: String,
      required: [true, 'Password is required'],
      select:false
    }
  },
  {
    timestamps: true
  }
)

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }

  this.password = await bcrypt.hash(this.password, 10)
//   next()
})


userSchema.methods.generateJWTToken = async function () {
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

userSchema.methods.comparePassword = async function (plainTextPassword){
    return await bcrypt.compare(plainTextPassword, this.password)
}

const User = mongoose.model('User',userSchema)

export default User
