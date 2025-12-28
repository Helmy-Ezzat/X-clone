import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.route.js'
import userRoutes from './routes/user.route.js'
import postRouter from './routes/post.route.js'
import notificationRoutes from './routes/notification.route.js'
import connectMongoDB from './db/connectMongoDB.js'
import cookieParser from 'cookie-parser'
import { v2 as cloudinary } from 'cloudinary'
import path from 'path'
import job from './cron/cron.js'
dotenv.config() // Load environment variables from .env file
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const app = express()
const PORT = process.env.PORT || 5000
const __dirname = path.resolve()

app.use(express.json({ limit: '5mb' })) // Middleware to parse JSON bodies in requests
// limit shouldn`t be too high to prevent DOS
app.use(express.urlencoded({ extended: true })) // Middleware to parse URL-encoded bodies in requests
app.use(cookieParser()) // Middleware to parse cookies in requests

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/posts', postRouter)
app.use('/api/notifications', notificationRoutes)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/dist')))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
  })
}

// Ensure the app is exported for Netlify/Vercel
export default app;

// Only listen when not in a Serverless environment
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Hi Helmy 👋 Server is running on port ${PORT}`)
    connectMongoDB()
    job.start()
  })
}
