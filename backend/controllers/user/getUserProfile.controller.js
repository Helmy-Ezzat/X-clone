import User from '../../models/user.model.js'

// Controller function to get user profile by username
export const getUserProfile = async (req, res) => {
  const { username } = req.params // Extract username from request parameters
  try {
    // Find user by username in the database and exclude the password field
    const user = await User.findOne({ username }).select('-password')
    if (!user) return res.status(404).json({ message: 'User not found' }) // If user is not found
    
    res.status(200).json(user) // If user is found
  } catch (error) {
    console.log('Error in getUserProfile controller: ', error.message)
    res.status(500).json({ error: error.message })
  }
}
