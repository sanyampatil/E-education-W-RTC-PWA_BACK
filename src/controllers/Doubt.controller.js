import expressAsyncHandler from 'express-async-handler'
import Doubt from '../models/Dout.model.js'
import Student from '../models/student.model.js'

const sendDoubt = expressAsyncHandler(async (req, res) => {
  try {
    console.log('hiiiiii')
    console.log('Add hvydg fgeyfe')
    // const { userId } = req.body
    // console.log('user id', req.user.id)
    // console.log(',,,,,,,<<<', userId) // console.log(req.admin._id)

    const { studentName, class_name, doubt, _id } = req.body
    console.log(studentName, class_name, doubt, _id)
    const student = await Student.findById(_id)
    console.log(student._id)

    const StudentId = student._id

    const mydoubt = await Doubt.create({
      StudentId,
      studentName,
      class_name,
      doubt
    })

    console.log('create entry')

    res.status(200).json({
      success: true,
      message: 'send your doubt',
      mydoubt
    })

    console.log('response aala')

    await mydoubt.save()

    console.log('save zala')
  } catch (error) {
    console.log(error)
  }
})
const fetchAllDoubts = expressAsyncHandler(async (req, res) => {
  console.log('ujhbduhduhu')
  const { id } = req.params
  const StudentId = id
  console.log("id",StudentId)
  const student = await Doubt.find({StudentId}).select('+studentName')
  console.log("dataaal",student)

  
  // // const StudentId = student._id
  // // if (studentId === _id) {
  // const allDouts = await Doubt.find(studentId)

  res.status(200).json({
    sucess: true,
    student
  })
})

export { sendDoubt, fetchAllDoubts }
