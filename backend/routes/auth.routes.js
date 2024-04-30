import express from 'express'
import { getMe } from '../controllers/auth/getMe.controller.js'
import { signup } from '../controllers/auth/signup.controller.js'
import { login } from '../controllers/auth/login.controller.js'
import { logout } from '../controllers/auth/logout.controller.js'
import { protectedRoute } from '../middleware/protectedRoute.js'

const router = express.Router()

router.get('/me', protectedRoute, getMe)
router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', logout)

export default router
