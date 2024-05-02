import Post from "../../models/post.model.js"

const getAllPosts = async (req, res) => {
  try {
    // Find all posts, sorted by createdAt (descending order), and populate user and comments.user fields
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate({
        path: 'user', // Populate the 'user' field
        select: '-password', // Exclude the 'password' field from the populated user object
      })
      .populate({
        path: 'comments.user', // Populate the 'comments.user' field
        select: '-password', // Exclude the 'password' field from the populated user object
      })
    // Check if there are no posts
    if (posts.length === 0) {
      return res.status(200).json([]) // Respond with an empty array if there are no posts
    }

    res.status(200).json(posts)
  } catch (error) {
    console.log('Error in getAllPosts controller: ', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export default getAllPosts