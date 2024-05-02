import Notification from '../../models/notification.model.js'
import User from '../../models/user.model.js'

// Controller function to handle user follow/unfollow actions
export const followUnfollowUser = async (req, res) => {
  try {
    const { id } = req.params
    const userToModify = await User.findById(id) // Find user to follow/unfollow
    const currentUser = await User.findById(req.user._id) // Find current user

    // Check if trying to follow/unfollow own account
    if (id === req.user._id.toString()) {
      return res
        .status(400)
        .json({ error: 'You can`t follow/unfollow yourself' })
    }

    // Check if either userToModify or currentUser not found
    if (!userToModify || !currentUser) {
      return res.status(400).json({ error: 'User not found' })
    }

    // Check if current user is already following the userToModify
    const isFollowing = currentUser.following.includes(id)
    if (isFollowing) {
      // Unfollow user
      await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } })
      await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } })

      res.status(200).json({ message: 'User unfollowed successfully' })
    } else {
      // Follow user
      await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } })
      await User.findByIdAndUpdate(req.user._id, { $push: { following: id } })

      // Create new notification for the followed user
      const newNotification = new Notification({
        type: 'follow',
        from: req.user._id,
        to: userToModify._id,
      })
      await newNotification.save()
      res.status(200).json({ message: 'User followed successfully' })
    }
  } catch (error) {
    console.log('Error in follwUnfollowUser controller: ', error.message)
    res.status(500).json({ error: error.message })
  }
}
