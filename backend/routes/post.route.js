import express from 'express'
import { protectedRoute } from '../middleware/protectedRoute.js'
import {
  commentOnPost,
  createPost,
  deletePost,
  getAllPosts,
  getFollowingPosts,
  getLikedPosts,
  getUserPosts,
  likeUnlikePost,
} from '../controllers/post/index.js'

const router = express.Router()

router.post('/create', protectedRoute, createPost)
router.delete('/:id', protectedRoute, deletePost)
router.get('/user/:username', protectedRoute, getUserPosts)
router.get('/all', protectedRoute, getAllPosts)
router.post('/like/:id', protectedRoute, likeUnlikePost)
router.post('/comment/:id', protectedRoute, commentOnPost)
router.get('/likes/:id', protectedRoute, getLikedPosts)
router.get('/following', protectedRoute, getFollowingPosts)

export default router
