import Post from "../../models/post.model.js"
import User from "../../models/user.model.js"

// Controller function to get liked posts of a user
const getLikedPosts = async (req, res) => {
  const userId = req.params.id

  try {
    // Find the user by ID
    const user = await User.findById(userId)
    if (!user) return res.status(404).json({ error: 'User not found' })
    // Find liked posts of the user and populate user and comments.user fields
    const likedPosts = await Post.find({ _id: { $in: user.likedPosts } })
      .populate({
        path: 'user', // Populate the 'user' field
        select: '-password', // Exclude the 'password' field from the populated user object
      })
      .populate({
        path: 'comments.user', // Populate the 'comments.user' field
        select: '-password', // Exclude the 'password' field from the populated user object
      })

    res.status(200).json(likedPosts)
  } catch (error) {
    console.log('Error in getLikedPosts controller: ', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export default getLikedPosts