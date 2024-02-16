import express from 'express'
import { allMessages, sendMessage } from '../controllers/message.controller.js'
import protect from '../middleware/studentAuthmiddleware.js'


const messageRouter = express.Router()

messageRouter.route('/:chatId').get(protect, allMessages)
messageRouter.route('/').post(protect, sendMessage)

export default  messageRouter
