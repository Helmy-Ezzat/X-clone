import Notification from "../../models/notification.model.js"

const deleteNotifications = async (req, res) => {
  try {
    const userId = req.user._id

    await Notification.deleteMany({ to: userId })

    res.status(200).json({ message: 'Notifications deleted successfully' })
  } catch (error) {
    console.log('Error in deleteNotifications function', error.message)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export default deleteNotifications