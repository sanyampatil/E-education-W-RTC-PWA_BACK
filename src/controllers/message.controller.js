import expressAsyncHandler from 'express-async-handler'

import Student from '../models/student.model.js'
import Chat from '../models/chat.model.js'
import Message from '../models/message.model.js'

const allMessages = expressAsyncHandler(async (req, res) => {
  console.log('hiii in allMessage ')
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate('sender', 'username email')
      .populate('reciever')
      .populate('chat')
    res.json(messages)
    // console.log('messages...........', messages)
  } catch (error) {
    res.status(400)
    throw new Error(error.message)
  }
})

const sendMessage = expressAsyncHandler(async (req, res) => {
  const { content, chatId } = req.body

  console.log(content, chatId)
  if (!content || !chatId) {
    console.log('Invalid data passed into request')
    return res.sendStatus(400)
  }

  var newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId
  }
  console.log('user id from msg', req.user._id)

  try {
    var message = await Message.create(newMessage)
    console.log(message)
    message = await message.populate('sender', 'name pic')
    message = await message.populate('chat')
    message = await message.populate('reciever')
    message = await Student.populate(message, {
      path: 'chat.users',
      select: 'username email'
    })

    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message })
    res.json(message)
  } catch (error) {
    res.status(400)
    throw new Error(error.message)
  }
})

export { allMessages, sendMessage }
