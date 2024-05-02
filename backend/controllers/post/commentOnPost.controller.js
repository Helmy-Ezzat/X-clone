import Post from "../../models/post.model.js"

// Controller function to add a comment to a post
const commentOnPost = async (req, res) => {
  try {
    const { text } = req.body // Extract text from request body
    const postId = req.params.id // Extract post ID from request parameters
    const userId = req.user._id // Extract user ID from authenticated user
    // Check if the text field is provided
    if (!text) {
      return res.status(400).json({ error: 'Text field is required' })
    }
    // Find the post by ID
    const post = await Post.findById(postId)
    // Check if the post exists
    if (!post) {
      return res.status(404).json({ error: 'Post not found' })
    }
    // Create a comment object with user ID and text
    const comment = { user: userId, text }
    // Add the comment to the post's comments array
    post.comments.push(comment)
    // Save the updated post
    await post.save()

    res.status(200).json(post)
  } catch (error) {
    console.log('Error in commentOnPost controller: ', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export default commentOnPost