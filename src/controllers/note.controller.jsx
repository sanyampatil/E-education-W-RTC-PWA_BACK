import expressAsyncHandler from 'express-async-handler'
import NoteUpload from '../models/noteUpload.model'

const notesUpload = async (req, res, next) => {
  const noteupload = await NoteUpload.create({
    subName,
    class_Name,
    topicName,
    createBy,
    noteFile: {
      public_id: '',
      secure_url: ''
    }
  })

  if (req.file) {
    const result = await cloudinary.v2.uploader.upload(req.file.path, {
      folder: 'Notes'
    })
    console.log('result', result)

    if (result) {
      noteupload, (noteupload.avatar.public_id = result.public_id)
      noteupload.avatar.secure_url = result.secure_url
    }

    fs.rm(`Notes/${req.file.filename}`)
  }

  await noteupload.save()

  res.status(200).json({
    success: true,
    message: 'create admin profile',
    noteupload 
  })
}

export { notesUpload }
