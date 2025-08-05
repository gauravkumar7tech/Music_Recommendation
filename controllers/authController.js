const User = require('../models/User')
const bcrypt = require('bcrypt')

const authController = {
  // Get login page
  getLogin: (req, res) => {
    res.render('login')
  },

  // Get register page
  getRegister: (req, res) => {
    res.render('register')
  },

  // Login user
  login: async (req, res) => {
    try {
      const { username, password } = req.body
      
      const user = await User.findOne({ username })
      if (!user) {
        return res.render('login', { error: 'Invalid username or password' })
      }

      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        return res.render('login', { error: 'Invalid username or password' })
      }

      req.session.user = {
        id: user._id,
        username: user.username,
        email: user.email
      }

      res.redirect('/')
    } catch (error) {
      res.render('login', { error: 'Login failed. Please try again.' })
    }
  },

  // Register user
  register: async (req, res) => {
    try {
      const { username, email, password, confirmPassword } = req.body

      if (password !== confirmPassword) {
        return res.render('register', { error: 'Passwords do not match' })
      }

      const existingUser = await User.findOne({ 
        $or: [{ username }, { email }] 
      })
      
      if (existingUser) {
        return res.render('register', { error: 'Username or email already exists' })
      }

      const hashedPassword = await bcrypt.hash(password, 10)
      
      const user = new User({
        username,
        email,
        password: hashedPassword
      })

      await user.save()

      req.session.user = {
        id: user._id,
        username: user.username,
        email: user.email
      }

      res.redirect('/')
    } catch (error) {
      res.render('register', { error: 'Registration failed. Please try again.' })
    }
  },

  // Logout user
  logout: (req, res) => {
    req.session.destroy()
    res.redirect('/auth/login')
  }
}

module.exports = authController
