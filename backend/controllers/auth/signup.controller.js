import bcrypt from 'bcryptjs'
import User from '../../models/user.model.js'
import { generateTokenAndSetCookie } from '../../lib/utils/generateToken.js'

export const signup = async (req, res) => {
  try {
    // Destructure user data from request body
    const { fullName, username, email, password } = req.body

    // Regular expression to validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' })
    }

    // Check if username is already taken
    const existingUser = await User.findOne({ username })
    if (existingUser) {
      return res.status(400).json({ error: 'Username is already taken' })
    }
    // Check if email is already taken
    const existingEmail = await User.findOne({ email })
    if (existingEmail) {
      return res.status(400).json({ error: 'Email is already taken' })
    }

    // Check if password length is less than 6 characters
    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: 'Password must be at least 6 characters long' })
    }
    // Generate a salt with 10 rounds for password hashing
    const salt = await bcrypt.genSalt(10)
    // Hash the password using the generated salt
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create a new user object with hashed password
    const newUser = new User({
      fullName,
      username,
      email,
      password: hashedPassword,
    })
    if (newUser) {
      // If a new user is successfully created:

      // 1- Generate token and set cookie for authentication
      generateTokenAndSetCookie(newUser._id, res)

      // 2- Save the new user to the database
      await newUser.save()

      // 3- Respond with status 201 (Created) and the new user data
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        email: newUser.email,
        followers: newUser.followers,
        following: newUser.following,
        profileImg: newUser.profileImg,
        coverImg: newUser.coverImg,
      })
    } else {
      // If the new user creation fails due to invalid data:

      // Respond with status 400 (Bad Request) and an error message
      res.status(400).json({ error: 'Invalid user data' })
    }
  } catch (error) {
    console.log('Error in signup controller ', error.message)
    res.status(500).json({ error: 'Internal Server Error!' })
  }
}
