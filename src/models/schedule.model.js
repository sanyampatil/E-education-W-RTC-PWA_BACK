import mongoose from 'mongoose'
const scheduleSchema = new mongoose.Schema({
  adminId : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin'
  },
  Createby: {
    type: String,
    trim: true
  },
  Time: {
    type: String,
    trim: true
  },

  create_Date: {
    type: String,
    // required: true,
    // unique: true,
    trim: true,
    index: true
  },
  TitleOfClass: {
    type: String,
    // required: true,
    // unique: true,
    trim: true
  },
  Topic_heading: {
    type: String,
    // required: true,
    // unique: true,
    trim: true
  },

  Dout_date: {}
})

const Schedule = mongoose.model('Schedule', scheduleSchema)
export default Schedule
