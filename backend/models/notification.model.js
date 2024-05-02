import mongoose from 'mongoose'

const notificationSchema = new mongoose.Schema(
  {
    // Sender of the notification
    from: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    // Receiver of the notification
    to: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    // Type of notification (e.g., 'follow' or 'like')
    type: { type: String, enum: ['follow', 'like'], required: true },
    // Read status of the notification (true if read, false if unread)
    read: { type: Boolean,default:false}, // Automatically add createdAt and updatedAt fields
  },
  { timestamps: true }
)

const Notification = mongoose.model('Notification', notificationSchema)

export default Notification
