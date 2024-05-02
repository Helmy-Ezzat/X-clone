import Post from "../../models/post.model.js"
import { v2 as cloudinary } from 'cloudinary'

const deletePost = async (req, res) => {
  try {
    // Find the post by ID
    const post = await Post.findById(req.params.id)
    // Check if the post exists
    if (!post) {
      return res.status(404).json({ error: 'Post not found' })
    }
    // Check if the authenticated user is the owner of the post
    if (post.user.toString() !== req.user._id.toString()) {
      return res
        .status(401)
        .json({ error: 'You are not authorized to delete this post' })
    }

    if (post.img) {
      const imgId = post.img.split('/').pop().split('.')[0] // Extract public ID of the image from the URL
      await cloudinary.uploader.destroy(imgId) // Delete the image from Cloudinary
    }
    // Delete the post from the database
    await Post.findByIdAndDelete(req.params.id)

    res.status(200).json({ message: 'Post deleted successfully' })
  } catch (error) {
    console.log('Error in deletePost controller: ', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export default deletePost