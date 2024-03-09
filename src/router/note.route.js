import { Router } from 'express'
import { notesUpload } from '../controllers/note.controller.js'
const NotesRouter = Router()
NotesRouter.route('/notes-upload').post(notesUpload)


export default NotesRouter
