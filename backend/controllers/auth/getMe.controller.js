import User from '../../models/user.model.js'

// Controller function to get the current authenticated user (me)
const getMe = async (req, res) => {
  try {
    // Find the current authenticated user by their ID and exclude the password field
    const user = await User.findById(req.user._id).select('-password')
    res.status(200).json(user)
  } catch (error) {
    console.log('Error in getMe controller', error.message)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export default getMe