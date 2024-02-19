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

const app = express()

app.use(
  cors({
    origin: process.env.CLINT_URL,
    credentials: true,
    methods: ['GET', 'POST', 'DELETE', 'PUT']
  })
)

app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded({ extended: true, limit: '16kb' }))
app.use(express.static('public'))
app.use(cookieParser())

app.use('/api/v1/admin', adminRouter)
app.use('/api/v1/student', stuRouter)

app.use('/api/v1/chat', chatRouter)
app.use('/api/v1/message', messageRouter)

app.use('/api/v1/me', DetailRouter)

// app.options('*',cors())
export default app
