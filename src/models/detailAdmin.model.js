import mongoose from 'mongoose'
const detailAdminSchema = new mongoose.Schema({
  fullName: {
    type: String
  },
  branch: {
    type: String
  },
  class: {
    type: String
  },
  subject: {
    type: String
  },
  avatar: {
    type: String
  },
  coverImage: {
    type: String
  }
})

const DetailAdmin = mongoose.model('DetailAdmin', detailAdminSchema)
