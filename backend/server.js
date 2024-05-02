import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.route.js'
import userRoutes from './routes/user.route.js'
import postRouter from './routes/post.route.js'
import notificationRoutes from './routes/notification.route.js'
import connectMongoDB from './db/connectMongoDB.js'
import cookieParser from 'cookie-parser'
import { v2 as cloudinary } from 'cloudinary'

dotenv.config() // Load environment variables from .env file
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json()) // Middleware to parse JSON bodies in requests
app.use(express.urlencoded({ extended: true })) // Middleware to parse URL-encoded bodies in requests
app.use(cookieParser()) // Middleware to parse cookies in requests

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/posts', postRouter)
app.use('/api/notifications', notificationRoutes)

app.listen(PORT, () => {
  console.log(`Hi Helmy 👋 Server is running on port ${PORT}`)
  connectMongoDB()
})
