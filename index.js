import app from './app.js'
import connectDB from './src/db/dbconnection.js'
import { config } from 'dotenv'
// import cloudnary from 'cloudinary'

// import { Server, Socket } from 'socket.io'
config()

const PORT = process.env.PORT
// const io = new Server()
// io.on("connection",(socket)=>{
//   socket.on("join-room",(data)=>{
//     const {roomId,emailId} = data;
//     socket.join(roomId);
//     socket.broadc ast
//   })

// // });
// cloudnary.v2.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUD_API_KEY,
//   api_secret: process.env.CLOUD_API_SECRET
// })

import {v2 as cloudinary} from 'cloudinary';

cloudinary.config({
  cloud_name: 'dyvxumoqh',
  api_key: '579672675569782',
  api_secret: '1-qJkNSnY7ED-PIQXbRjFi1uTAo'
});

app.listen(PORT, () => {
  connectDB()
  console.log(`server runnig on port http://localhost:${PORT}`)
})
// app.listen(8000)
