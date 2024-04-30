import jwt from 'jsonwebtoken'

// Function to generate JWT token and set it as a cookie in the response
export const generateTokenAndSetCookie = (userId, res) => {
  // Generate JWT token with userId payload using JWT_SECRET from environment variables
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '15d', // Token expiration set to 15 days
  })
  // Set the JWT token as a cookie in the response
  res.cookie('jwt', token, {
    maxAge: 15 * 24 * 60 * 60 * 100, // Max age of the cookie set to 15 days in milliseconds
    httpOnly: true, // Cookie is accessible only through HTTP requests, not through JavaScript (prevent XSS attacks cross-site scripting attacks)
    sameSite: 'strict', // Cookie is sent only in same-site requests (CSRF attacks cross-site request forgery attacks)
    secure: process.env.NODE_ENV !== 'development', // Cookie is sent over HTTPS in production environment
  })
}
