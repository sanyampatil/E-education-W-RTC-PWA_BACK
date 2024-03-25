//   card madhe searching ani student scheule doubts eyc mail transformation and online class attend data keeping  edit shecdule and doubt he sarv karayacha ahes

import app from './app.js'
import connectDB from './src/db/dbconnection.js'
import { config } from 'dotenv'
// import cloudnary from 'cloudinary'
import { createServer } from 'http'

config()

const PORT = process.env.PORT

import { Server } from 'socket.io'
const server = createServer(app)

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true
  }
})

const emailToSocketMapping = new Map()
const SocketToEmailMapping = new Map()

io.on('connection', socket => {
  // SOCKET FOR VIDEO CHAT

  console.log('video connection zal re baba')
  socket.on('join-room', data => {
    const { roomId, emailId } = data
    console.log(`user${emailId} and ${roomId}`)
    emailToSocketMapping.set(emailId, socket.id)
    emailToSocketMapping.set(socket.id, emailId, socket.id)
    
    socket.join(roomId)
    socket.emit('joined-room', { roomId })
    socket.emit('user-joined-room', { emailId })
    console.log('zal re bhau')
  })

  socket.on('call-user', data => {
    const { emailId, offer } = data
    const socketId = emailToSocketMapping.get(socket.id)
    const fromEmail = SocketToEmailMapping.get(emailId)
    socket.to(socketId).emit('incomming-call', { from: fromEmail, offer })
  })

  console.log('socket io connection instablished')
  console.log('socket id', socket.id)

  socket.on('setup', user => {
    socket.join(user.data._id)
    console.log('Server join user >', user.data._id)
    console.log('Server join username >', user.data.username)

    socket.emit('connected')
  })
  socket.on('join chat', room => {
    socket.join(room)
    console.log('user join room', room)
  })

  socket.on('new message', newMessageStatus => {
    console.log('new message', newMessageStatus)
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

// io.on('connection-video-chat', socket => {

// })
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
