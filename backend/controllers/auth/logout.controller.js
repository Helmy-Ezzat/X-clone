const logout = async (req, res) => {
  try {
    // Clear the JWT cookie by setting its value to an empty string and maxAge to 0
    res.cookie('jwt', '', { maxAge: 0 })
    res.status(200).json({ message: 'Logged out successfully' })
  } catch (error) {
    console.log('Error in logout controller', error.message)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export default logout