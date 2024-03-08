import expressAsyncHandler from 'express-async-handler'
import Student from '../models/student.model.js'

const fetchAllStudent = expressAsyncHandler(async (req, res) => {
 
  console.log('ujhbduhduhu')

  const student = await Student.find({})
  console.log('dataaal', student)

  res.status(200).json({
    sucess: true,
    student
  })
})

export { fetchAllStudent}

