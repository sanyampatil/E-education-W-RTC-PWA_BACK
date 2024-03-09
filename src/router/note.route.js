import { Router } from 'express'
import upload from '../middleware/multer.middleware.js'
import { StudentgetNotes, getNotes, notesUpload } from '../controllers/note.controller.js'
const  NotesRouter = Router()
NotesRouter.route('/notes-upload').post(upload.single('noteFile'),notesUpload)

NotesRouter.route('/fetch-Notes/:id').get(getNotes)
NotesRouter.route('/student/fetch-Notes').get(StudentgetNotes)



export default NotesRouter
