import bcrypt from 'bcryptjs'
import User from '../../models/user.model.js'
import { v2 as cloudinary } from 'cloudinary'

export const updateUser = async (req, res) => {
  // Destructure request body
  let { fullName, email, username, currentPassword, newPassword, bio, link } =
    req.body
  let { profileImg, coverImg } = req.body
  // Get user ID from request
  const userId = req.user._id
  try {
    // Find user by ID
    let user = await User.findById(userId)
    if (!user) return res.status(404).json({ message: 'User not found' })
    // Check if currentPassword and newPassword are both provided
    if (
      (!newPassword && currentPassword) ||
      (!currentPassword && newPassword)
    ) {
      return res.status(400).json({
        error: 'Please provide both current password and new password',
      })
    }
    // If both currentPassword and newPassword are provided
    if (currentPassword && newPassword) {
      // Compare currentPassword with the user's hashed password
      const isMatch = await bcrypt.compare(currentPassword, user.password)
      if (!isMatch) {
        return res.status(400).json({ error: 'Current password is incorrect' })
      }
      // Validate newPassword length
      if (newPassword.length < 6) {
        return res
          .status(400)
          .json({ error: 'Password must be at least 6 characters long' })
      }
      // Generate salt and hash newPassword
      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(newPassword, salt)
    }
    // Update profileImg if provided
    if (profileImg) {
      // Delete previous profile image from cloudinary if exists
      if (user.profileImg) {
        // https://res.cloudinary.com/dyfqon1v6/image/upload/v1712997552/zmxorcxexpdbh8r0bkjb.png
        await cloudinary.uploader.destroy(
          user.profileImg.split('/').pop().split('.')[0]
        )
      }
      // Upload new profile image to cloudinary
      const uploadedResponse = await cloudinary.uploader.upload(profileImg)
      profileImg = uploadedResponse.secure_url
    }
    // Update coverImg if provided
    if (coverImg) {
      // Delete previous cover image from cloudinary if exists
      if (user.coverImg) {
        await cloudinary.uploader.destroy(
          user.coverImg.split('/').pop().split('.')[0]
        )
      }
      // Upload new cover image to cloudinary
      const uploadedResponse = await cloudinary.uploader.upload(coverImg)
      coverImg = uploadedResponse.secure_url
    }
    // Update user properties
    user.fullName = fullName || user.fullName
    user.email = email || user.email
    user.username = username || user.username
    user.bio = bio || user.bio
    user.link = link || user.link
    user.profileImg = profileImg || user.profileImg
    user.coverImg = coverImg || user.coverImg
    // Save updated user
    user = await user.save()
    // password should be null in response
    user.password = null
    // Respond with updated user
    return res.status(200).json(user)
  } catch (error) {
    console.log('Error in updateUser controller: ', error.message)
    res.status(500).json({ error: error.message })
  }
}


// let url =
//   'https://res.cloudinary.com/dyfqon1v6/image/upload/v1712997552/zmxorcxexpdbh8r0bkjb.png'

// 1
/*
console.log(url.split('/'))
[
    'https:',
  '',
  'res.cloudinary.com',
  'dyfqon1v6',
  'image',
  'upload',
  'v1712997552',
  'zmxorcxexpdbh8r0bkjb.png',
]
*/
// 2
/*
console.log(url.split('/').pop())
zmxorcxexpdbh8r0bkjb.png
*/
// 3
/*
console.log(url.split('/').pop().split('.'))
['zmxorcxexpdbh8r0bkjb', 'png']
*/
// 4
/*
console.log(url.split('/').pop().split('.')[0])
zmxorcxexpdbh8r0bkjb
*/



