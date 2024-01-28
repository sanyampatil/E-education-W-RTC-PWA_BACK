import app from './app.js'
import connectDB from './src/db/dbconnection.js'
import { config } from 'dotenv'
config()

const PORT = process.env.PORT || 2000

app.listen(PORT, () => {
  connectDB()
  console.log(`server runnig on port http://localhost:${PORT}`)
})
