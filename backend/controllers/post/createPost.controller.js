import Post from '../../models/post.model.js'
import User from '../../models/user.model.js'
import { v2 as cloudinary } from 'cloudinary'
import { v4 as uuidv4 } from 'uuid' // لإضافة توليد UUID

const createPost = async (req, res) => {
  try {
    const { text } = req.body // Extract text from request body
    let { img } = req.body // Extract img from request body
    const userId = req.user._id.toString() // Get user ID from request

    // Find user by ID
    const user = await User.findById(userId)
    if (!user) return res.status(404).json({ message: 'User not found' })

    // Check if post has neither text nor image
    if (!text && !img) {
      return res.status(400).json({ error: 'Post must have text or image' })
    }

    // Upload image to Cloudinary if provided
    if (img) {
      const uniqueId = uuidv4() // توليد معرف فريد للصورة
      const uploadedResponse = await cloudinary.uploader.upload(img, {
        public_id: `helmy_${uniqueId}`, // استخدام معرف فريد للصورة
      })
      img = uploadedResponse.secure_url
    }

    // Create a new post instance
    const newPost = new Post({
      user: userId, // Set user ID for the post
      text, // Set text for the post
      img, // Set image URL for the post
    })

    // Save the new post
    await newPost.save()
    res.status(201).json(newPost)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
    console.log('Error in createPost controller: ', error)
  }
}

export default createPost
