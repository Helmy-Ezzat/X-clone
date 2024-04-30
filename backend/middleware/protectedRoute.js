import User from '../models/user.model.js'
import jwt from 'jsonwebtoken'
// Middleware function to protect routes by verifying JWT token
export const protectedRoute = async (req, res, next) => {
  try {
    // Extract JWT token from request cookies
    const token = req.cookies.jwt
    // If no token is provided
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized: No Token Provided' })
    }
    // Verify the JWT token using the JWT_SECRET from environment variables
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    // If token is invalid
    if (!decoded) {
      return res.status(401).json({ error: 'Unauthorized: Invalid Token' })
    }
    // Find user by userId extracted from the decoded token and exclude the password field
    const user = await User.findById(decoded.userId).select('-password')
    // If user is not found
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    req.user = user // Attach the user object to the request object for use in subsequent middleware or route handlers
    next() // Call the next middleware or route handler
  } catch (error) {
    console.log('Error in protectedRoute middleware', error.message)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}
