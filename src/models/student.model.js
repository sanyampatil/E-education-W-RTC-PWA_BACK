import mongoose, { Schema } from 'mongoose'
  import bcrypt from 'bcryptjs'

const studentSchema = new Schema(
  {
    username: {
      type: String,
      requried: true,
    },
    email: {
      type: String,
      requried: true,
    },
    password: {
      type: String,
      requried: true,
    },
  },
  {
    timeStamp: true,
  }
);    
// studentSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) {
//     return next()
//   }

//   this.password = await bcrypt.hash(this.password, 10)
// //   next()
// })


// studentSchema.methods.generateJWTToken = async function () {
//   return await jwt.sign(
//     {
//       id: this._id,
//       email: this.email
//     },
//     process.env.ACCESS_TOKEN_SECRET,
//     {
//       expiresIn: '24h'
//     }
//   )
// }

// studentSchema.methods.comparePassword = async function (plainTextPassword){
//     return await bcrypt.compare(plainTextPassword, this.password)
// }


studentSchema.methods.matchPassword = async function (enteredPassword) {
  console.log("giii")
  console.log(enteredPassword)
  console.log(this.password)
  return await bcrypt.compare(enteredPassword, this.password);
  console.log("zal ka?")
};

studentSchema.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Student = mongoose.model('Student',studentSchema)

export default Student
