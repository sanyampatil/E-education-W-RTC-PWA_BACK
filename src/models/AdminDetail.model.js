import mongoose from 'mongoose'
const detailAdminSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    index: true
  },
  branch: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  // class: {
  //   type: String,
  //   required: true,
  //   unique: true,
  //   trim: true,

  // },
  subject: {
    type: String,
    required: true,
    unique: true,
    trim: true
  }
  //   avatar: {
  //     type: String, // cloudinary url
  //     required: true,f
  // },
  // coverImage: {
  //     type: String, // cloudinary url
  // },
})

const DetailAdmin = mongoose.model('DetailAdmin', detailAdminSchema)
export default DetailAdmin
