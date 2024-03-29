import expressAsyncHandler from 'express-async-handler'
import NoteUpload from '../models/noteUpload.model.js'
import cloudinary from 'cloudinary'
import fs from 'fs/promises'
const notesUpload = async (req, res, next) => {
  const { subName, class_Name, topicName, createBy, id } = req.body

  console.log('data', subName, class_Name, topicName, createBy)

  console.log('adminId', id)
  const adminId = id
  try {
    const noteupload = await NoteUpload.create({
      subName,
      class_Name,
      topicName,
      createBy,
      adminId,
      noteFile: {
        public_id: '',
        secure_url: ''
      }
    })

    if (req.file) {
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: 'noteFile'
      })
      console.log('result', result)

      if (result) {
        noteupload, (noteupload.noteFile.public_id = result.public_id)
        noteupload.noteFile.secure_url = result.secure_url
      }

      fs.rm(`uploads/${req.file.filename}`)
    }

    res.status(200).json({
      success: true,
      message: 'Upload Notes',
      noteupload
    })
    await noteupload.save()
  } catch (error) {
    console.log('ERROR', error)
  }
}

const getNotes = async (req, res, next) => {
  console.log('hiii getNotes')
  const { id } = req.params
  console.log(id)
  try {
    const adminId = id
    const getnts = await NoteUpload.find({ adminId })

    res.status(200).json({
      success: true,
      getnts,
      massege: 'notes'
    })
  } catch (error) {
    console.log('error:-', error)
  }
}

const StudentgetNotes = async (req, res, next) => {
  console.log('hiii student  getNotes')

  try {
    const studentNotes = await NoteUpload.find({})

    res.status(200).json({
      success: true,
      studentNotes,
      massege: ' Your  Notes'
    })
  } catch (error) {
    console.log('error:-', error)
  }
}
export { notesUpload, getNotes, StudentgetNotes }
