import express from 'express'
import adminRouter from './src/router/admin.router.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import bodyParser from 'body-parser'
const app = express()


app.use(cors({
  origin:'http://localhost:5174',
  credentials: true,
  methods: ['GET', 'POST', 'DELETE', 'PUT'],


}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())
app.use(bodyParser.json())



app.use('/api/v1/admin', adminRouter)
app.options('*',cors())
export default app
