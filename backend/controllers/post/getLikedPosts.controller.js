import Post from "../../models/post.model.js"
import User from "../../models/user.model.js"

// Controller function to get liked posts of a user
const getLikedPosts = async (req, res) => {
  const userId = req.params.id

  try {
    const user = await User.findById(userId)
    if (!user) return res.status(404).json({ error: 'User not found' })

      console.log('User liked posts:', user.likedPosts)

    const likedPosts = await Post.find({ _id: { $in: user.likedPosts } })
      .populate({
        path: 'user',
        select: '-password',
      })
      .populate({
        path: 'comments.user',
        select: '-password',
      })

    res.status(200).json(likedPosts)
  } catch (error) {
    console.log('Error in getLikedPosts controller: ', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export default getLikedPosts