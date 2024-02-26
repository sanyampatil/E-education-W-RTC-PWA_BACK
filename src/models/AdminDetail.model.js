import mongoose from 'mongoose'
const detailAdminSchema = new mongoose.Schema({
  fullName: {
    type: String,
    // required: true,
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
})

const DetailAdmin = mongoose.model('DetailAdmin', detailAdminSchema)
export default DetailAdmin
