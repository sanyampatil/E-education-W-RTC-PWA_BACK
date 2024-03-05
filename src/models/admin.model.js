import mongoose, { Schema } from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const adminSchema = new Schema(

  
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
      select: false
    },



    DetailAdmin: [
      {
        fullName: {
          type: String,
          // required: true,f
          // unique: true,
          trim: true,
          index: true
        },
        branch: {
          type: String,
          // required: true,
          // unique: true,
          trim: true
        },
        subs: {
          type: String,
          // required: true,
          // unique: true,
          trim: true
        },
        avatar: {
          public_id: {
            type: String
          },
          secure_url: {
            type: String
          }
        }
      }
    ]
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

adminSchema.methods.isPasswordCorrect = async function (password) {
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
      expiresIn: '10min'
    }
  )
}

adminSchema.methods.comparePassword = async function (plainTextPassword) {
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
