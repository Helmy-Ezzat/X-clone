import User from "../../models/user.model.js"

// Controller function to get suggested users for the current user
export const getSuggestedUsers = async (req, res) => {
    try {
      const userId = req.user._id // Get current user's ID from request
      // Find users followed by the current user
      const usersFollowedByMe = await User.findById(userId).select('following')
      // Find random users excluding the current user
      const users = await User.aggregate([
        {
          $match: {
            _id: { $ne: userId }, // Exclude the current user
          },
        },
        { $sample: { size: 10 } }, // Get a random sample of 10 users
      ])
      // Filter out users already followed by the current user
      const filteredUsers = users.filter(
        (user) => !usersFollowedByMe.following.includes(user._id)
      )
      // Get the first 4 suggested users
      const suggestedUsers = filteredUsers.slice(0, 4)
      // Set password to null for each suggested user (for security reasons)
      suggestedUsers.forEach((user) => (user.password = null))
      res.status(200).json(suggestedUsers)
    } catch (error) {
        console.log('Error in getSuggestedUsers controller: ', error.message)
        res.status(500).json({ error: error.message })
    }
}
