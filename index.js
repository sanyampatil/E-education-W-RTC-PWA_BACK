import app from './app.js'
import connectDB from './src/db/dbconnection.js'
import { config } from 'dotenv'
// import cloudnary from 'cloudinary'
import {createServer} from  'http'


config()

const PORT = process.env.PORT

import { Server } from 'socket.io'
const server =  createServer(app)

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true
  }
})  



io.on('connection', socket => {
  console.log('socket io connection instablished')
  console.log(socket.id)

  socket.on('setup', user => {
    socket.join(user.data._id)
    console.log('Server join user >', user.data._id)
    socket.emit(connetecd)
  })
  socket.on('join chat', user => {
    socket.join(room)
    console.log('user join room', room)
  })

  socket.on('new message', newMessageStatus => {
    var chat = newMessageStatus.chat
    if (!chat.users) {
      return console.log('chat users not defined')
    }

    chat.users.forEach(user => {
      if (user._id == newMessageStatus.sender._id) return
      socket.in(user._id).emit('message recieved', newMessageRecieved)
    })
  })
})



import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: 'dyvxumoqh',
  api_key: '579672675569782',
  api_secret: '1-qJkNSnY7ED-PIQXbRjFi1uTAo'
})

server.listen(PORT, () => {
  connectDB()
  console.log(`server runnig on port http://localhost:${PORT}`)
})
// app.listen(8000)
