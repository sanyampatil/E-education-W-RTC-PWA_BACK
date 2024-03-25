import mongoose from 'mongoose'
const DoubtSchema = new mongoose.Schema(
  {
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin'    
    },

    StudentId: {
      type: String
    },

    studentName: {
      type: String,
      // required: true,
      // unique: true,
      trim: true,
      index: true
    },

    class_name: {
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
  },
  {
    timestamps: true
  }
)

const Doubt = mongoose.model('Doubt', DoubtSchema)
export default Doubt
