import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.routes.js'
import connectMongoDB from './db/connectMongoDB.js'
import cookieParser from 'cookie-parser'

dotenv.config() // Load environment variables from .env file
const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json()) // Middleware to parse JSON bodies in requests
app.use(express.urlencoded({ extended: true })) // Middleware to parse URL-encoded bodies in requests
app.use(cookieParser()) // Middleware to parse cookies in requests

app.use('/api/auth', authRoutes)

app.listen(PORT, () => {
  console.log(`Hi Helmy 👋 Server is running on port ${PORT}`)
  connectMongoDB()
})
