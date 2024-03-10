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
  console.log(Createby,TitleOfClass,Topic_heading,create_Date,Time)
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
    schedule
  })
   await schedule.save()
  // const schedule = await find({adminId})
})

const fetchAllSchedule = expressAsyncHandler(async (req, res) => {
  console.log("allo under")
  
const allschedule = await Schedule.find({})
res.status(200).json({
  sucess: true,
  massege:"gya dabun",
  allschedule
})

})
export { fetchAllStudent, CreateScheLiveClass ,fetchAllSchedule}
