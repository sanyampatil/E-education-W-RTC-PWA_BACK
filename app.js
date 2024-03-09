import { config } from 'dotenv'
config()
import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'

// import bodyParser from 'body-parser'
import adminRouter from './src/router/admin.router.js'
import stuRouter from './src/router/student.router.js'
import chatRouter from './src/router/chat.router.js'

import messageRouter from './src/router/message.route.js'
import bodyParser from 'body-parser'
import DetailRouter from './src/router/adminDetailsRouter.js'
import fileUpload from 'express-fileupload'
import DoutRouter from './src/router/Doubt.route.js'
import dashboardRouter from './src/router/dashborad.route.js'
import NotesRouter from './src/router/note.route.js'

const app = express()
// app.use(fileUpload())
// app.use(bodyParser.json())
app.use(
  cors({
    origin: process.env.CLINT_URL,  
    credentials: true,
    methods: ['GET', 'POST', 'DELETE', 'PUT']
  })  
)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use(morgan('dev'))
app.use(cookieParser())
app.use(bodyParser.json())

app.use('/api/v1/admin', adminRouter)
app.use('/api/v1/student', stuRouter)

app.use('/api/v1/chat', chatRouter)
app.use('/api/v1/message', messageRouter)

app.use('/api/v1/admin/me', DetailRouter)

app.use('/api/v1/student/Doubt', DoutRouter)
app.use('/api/v1/admin-dashboard', dashboardRouter)
app.use('/api/v1/admin-notes', NotesRouter)




// app.options('*',cors())
export default app  
