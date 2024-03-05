import mongoose from 'mongoose'
const noteUploadSchema = new mongoose.Schema({
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin'
  },
  subName: {
    type: String,

    trim: true,
    index: true
  },
  className: {
    type: String,

    trim: true
  },
  topicName: {
    type: String,

    trim: true
  },
  noteFile: {
    public_id: {
      type: String
    },
    secure_url: {
      type: String
    }
  }
})

const noteUpload = mongoose.model('noteUpload', noteUploadSchema)
export default noteUpload
