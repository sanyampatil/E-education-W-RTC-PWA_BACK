import mongoose from 'mongoose'
const Schema = new mongoose.Schema({
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin'
  },

  StudentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  },

  studentName: {
    type: String,
    // required: true,
    // unique: true,
    trim: true,
    index: true
  },

  className: {
    type: String,
    // required: true,
    // unique: true,
    trim: true
  },
  doubt: {
    type: String,
    // required: true,
    // unique: true,
    trim: true
  }
})

const Doubt = mongoose.model('Doubt', DoubtSchema)
export default Doubt
