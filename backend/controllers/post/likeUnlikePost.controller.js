import Notification from '../../models/notification.model.js'
import Post from '../../models/post.model.js'
import User from '../../models/user.model.js'

const likeUnlikePost = async (req, res) => {
  try {
    const userId = req.user._id // Get user ID from request
    const { id: postId } = req.params // Get post ID from request parameters

    // Find the post by ID
    const post = await Post.findById(postId)

    // Check if the post exists
    if (!post) return res.status(404).json({ error: 'Post not found' })

    // Check if the user has already liked the post
    const userLikedPost = post.likes.includes(userId)

    if (userLikedPost) {
      // Unlike post
      await Post.updateOne({ _id: postId }, { $pull: { likes: userId } }) // Remove user ID from post's likes array
      await User.updateOne({ _id: userId }, { $pull: { likedPosts: postId } }) // Remove post ID from user's likedPosts array

      // Filter out the unliked post from the likes array
      const updatedLikes = post.likes.filter(
        (id) => id.toString() !== userId.toString()
      )
      res.status(200).json(updatedLikes) // Respond with the updated likes array
    }else{
      // Like post
      post.likes.push(userId) // Add user ID to post's likes array
      await User.updateOne({ _id: userId }, { $push: { likedPosts: postId } }) // Add post ID to user's likedPosts array
      await post.save() // Save the updated post

      // Create a new notification for the post's owner
      const notification = new Notification({
        from: userId, // Notification sender is the user who liked the post
        to: post.user, // Notification receiver is the post's owner
        type: 'like', // Notification type is "like"
      })
      await notification.save() // Save the notification

      const updatedLikes = post.likes // Get the updated likes array
      res.status(200).json(updatedLikes) // Respond with the updated likes array
    }
  } catch (error) {
    console.log('Error in likeUnlikePost controller: ', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export default likeUnlikePost