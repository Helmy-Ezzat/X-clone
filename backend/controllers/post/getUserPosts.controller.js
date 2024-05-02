import Post from "../../models/post.model.js"
import User from "../../models/user.model.js"

// Controller function to get posts of a specific user
const getUserPosts = async (req, res) => {
  try {
    const { username } = req.params // Extract username from request parameters
    // Find user by username
    const user = await User.findOne({ username })
    if (!user) return res.status(404).json({ error: 'User not found' })
    // Find posts created by the user, sorted by createdAt (descending order)
    const posts = await Post.find({ user: user._id })
      .sort({ createdAt: -1 }) // Sort by createdAt in descending order
      .populate({
        path: 'user', // Populate the 'user' field
        select: '-password', // Exclude the 'password' field from the populated user object
      })
      .populate({
        path: 'comments.user', // Populate the 'comments.user' field
        select: '-password', // Exclude the 'password' field from the populated user object
      })

    res.status(200).json(posts)
  } catch (error) {
    console.log('Error in getUserPosts controller: ', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export default getUserPosts