import bcrypt from 'bcryptjs'
import User from '../../models/user.model.js'
import { generateTokenAndSetCookie } from '../../lib/utils/generateToken.js'

export const login = async (req, res) => {
  try {
    // 1- Extract username and password from request body
    const { username, password } = req.body
    // 2- Find user by username in the database
    const user = await User.findOne({ username })
    // 3- Check if user exists and if password is correct
    const isPasswordCorrect =
      user && (await bcrypt.compare(password, user.password))
    // 4- If user does not exist or password is incorrect, respond with error
    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: 'Invalid username or password' })
    }
    // 5- If user is exist => Generate token and set it as cookie in the response
    generateTokenAndSetCookie(user._id, res)
    // 6- Respond with user data (excluding password) and status 200 (OK)
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      followers: user.followers,
      following: user.following,
      profileImg: user.profileImg,
      coverImg: user.coverImg,
    })
  } catch (error) {
    console.log('Error in login controller ', error.message)
    res.status(500).json({ error: 'Internal Server Error!' })
  }
}
