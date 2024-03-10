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
const {Createby,TitleOfClass,Topic_heading,create_Date,Time} = req.body
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
// const schedule = await find({adminId})



})


export { fetchAllStudent,CreateScheLiveClass}

