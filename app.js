import express from 'express'
import adminRouter from './src/router/admin.router.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
const app = express()
console.log(process.env.CLINT_URL)

app.use(
  cors({
      origin: process.env.CLINT_URL,
      methods: ['GET', 'POST', 'DELETE', 'PUT'],
      credentials: true
  })
)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.CLINT_URL);
  next();
});

// app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(cookieParser())

//
app.use('/api/v1/admin', adminRouter)

export default app  
