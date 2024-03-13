import expressAsyncHandler from 'express-async-handler'
import Doubt from '../models/Dout.model.js'
import Student from '../models/student.model.js'

const sendDoubt = expressAsyncHandler(async (req, res) => {
  try {
    // const { userId } = req.body
    // console.log('user id', req.user.id)
    // console.log(',,,,,,,<<<', userId) // console.log(req.admin._id)

    const { studentName, class_name, doubt, _id } = req.body
    console.log(studentName, class_name, doubt, _id)
    const student = await Student.findById(_id)
    console.log(student._id)
    console.log('aalo mi ')
    const StudentId = student._id
1
    const Allstudents = await Student.find({})

    console.log('this is the Student', Allstudents)
    const mydoubt = await Doubt.create({
      StudentId,
      studentName,
      class_name,
      doubt
    })

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

const sendMailAll = expressAsyncHandler(async (req, res) => {
  console.log('send mail')
  // try {
  //   const Allstudents = Student.find({})
  //   console.log(
  //     'this is the Student',
  //     Allstudents
  //   )

  //   // const transporter = nodemailer.createTransport({
  //   //   service: 'gmail',
  //   //   auth: {
  //   //     user: 'patilsanyam869@gmail@gmail.com', // Your Gmail email
  //   //     pass: 'cjndhbdydvd' // Your Gmail password
  //   //   }
  //   // })

  //   // for (const user of users) {
  //   //   await transporter.sendMail({
  //   //     from: 'patilsanyam869@gmail@gmail.com',
  //   //     to: user.email,
  //   //     subject: 'New Information Available!',
  //   //     text: message
  //   //   })
  //   // }
  // } catch (error) {
  //   console.log('error', error)
  // }
})

const fetchAllDoubts = expressAsyncHandler(async (req, res) => {
  console.log('ujhbduhduhu')
  const { id } = req.params
  const StudentId = id
  console.log('id', StudentId)
  const student = await Doubt.find({ StudentId }).select('+studentName')
  console.log('dataaal', student)

  // // const StudentId = student._id
  // // if (studentId === _id) {
  // const allDouts = await Doubt.find(studentId)

  res.status(200).json({
    sucess: true,
    student
  })
})

const AdminfetchAllDoubts = expressAsyncHandler(async (req, res) => {
  const allDoubts = await Doubt.find({})
  console.log('allDoubts', allDoubts)
  res.status(200).json({
    sucess: true,
    allDoubts
  })
})

export { sendDoubt, sendMailAll, fetchAllDoubts, AdminfetchAllDoubts }
