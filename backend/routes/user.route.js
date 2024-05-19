import express from 'express'
import { protectedRoute } from '../middleware/protectedRoute.js'
import { getUserProfile } from '../controllers/user/getUserProfile.controller.js'
import { followUnfollowUser } from '../controllers/user/followUnfollowUser.controller.js'
import { updateUser } from '../controllers/user/updateUser.controller.js'
import { getSuggestedUsers } from '../controllers/user/getSuggestedUsers.controller.js'

const router = express.Router()

router.get('/profile/:username',protectedRoute,getUserProfile)
router.post('/follow/:id', protectedRoute, followUnfollowUser)
router.post('/update',protectedRoute,updateUser)
router.get('/suggested', protectedRoute, getSuggestedUsers)

export default router
