import app from './app.js'
import connectDB from './src/db/dbconnection.js'
import { config } from 'dotenv'
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
  

// });


app.listen(PORT, () => {
  connectDB()
  console.log(`server runnig on port http://localhost:${PORT}`)
})
app.listen(8000)
