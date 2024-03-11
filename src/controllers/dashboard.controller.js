import expressAsyncHandler from 'express-async-handler'
import Student from '../models/student.model.js'
import Schedule from '../models/schedule.model.js'

const fetchAllStudent = expressAsyncHandler(async (req, res) => {
  console.log('ujhbduhduhu')

  const student = await Student.find({})
  console.log('dataaal', student)

  res.status(200).json({
    sucess: true,
    student
  })
})
const CreateScheLiveClass = expressAsyncHandler(async (req, res) => {
  // const {id} = req.body
  // console.log("id",id)
  const { Createby, TitleOfClass, Topic_heading, create_Date, Time } = req.body
  console.log(Createby, TitleOfClass, Topic_heading, create_Date, Time)
  try {
    const schedule = await Schedule.create({
      TitleOfClass,
      Topic_heading,
      create_Date,
      Time,
      Createby
      // adminId,
    })
    res.status(200).json({
      sucess: true,
      message: 'successfully create Schedule',
      schedule
    })
    await schedule.save()
    // const schedule = await find({adminId})
  } catch (error) {
    res.status(400).json({
      sucess: true,
      message: 'failed create Schedule',
      error
    })
  }
})

const fetchAllSchedule = expressAsyncHandler(async (req, res) => {
  console.log('allo under')

  try {
    const allschedule = await Schedule.find({})
    res.status(200).json({
      sucess: true,
      massege: 'your schedule',
      allschedule
    })
  } catch (error) {
    res.status(200).json({
      sucess: true,
      massege: 'gya dabun',
      error
    })


  }
})
export { fetchAllStudent, CreateScheLiveClass, fetchAllSchedule }
