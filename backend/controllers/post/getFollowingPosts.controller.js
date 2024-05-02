import Post from '../../models/post.model.js'
import User from '../../models/user.model.js'

// Controller function to get posts from users followed by the authenticated user
const getFollowingPosts = async (req, res) => {
  try {
    const userId = req.user._id // Get authenticated user's ID from request
    const user = await User.findById(userId) // Find the authenticated user
    if (!user) return res.status(404).json({ error: 'User not found' })

    const following = user.following // Get the IDs of users followed by the authenticated user
    // Find posts created by users followed by the authenticated user
    const feedPosts = await Post.find({ user: { $in: following } }) // Find posts where user ID is in the 'following' array
      .sort({ createdAt: -1 }) // Sort posts by createdAt in descending order
      .populate({
        path: 'user', // Populate the 'user' field
        select: '-password', // Exclude the 'password' field from the populated user object
      })
      .populate({
        path: 'comments.user', // Populate the 'comments.user' field
        select: '-password', // Exclude the 'password' field from the populated user object
      })

    res.status(200).json(feedPosts)
  } catch (error) {
    console.log('Error in getFollowingPosts controller: ', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export default getFollowingPosts
