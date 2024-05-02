import Notification from '../../models/notification.model.js'

// Function to get notifications for the authenticated user
const getNotifications = async (req, res) => {
  try {
    const userId = req.user._id // Get the user ID from the request
    // Find notifications for the authenticated user and populate the 'from' field with selected fields
    const notifications = await Notification.find({ to: userId }).populate({
      path: 'from',
      select: 'username profileImg',
    })
    // Mark all notifications as read for the authenticated user
    await Notification.updateMany({ to: userId }, { read: true })

    res.status(200).json(notifications)
  } catch (error) {
    console.log('Error in getNotifications function', error.message)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export default getNotifications
