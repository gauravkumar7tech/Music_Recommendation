const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')

// Login page
router.get('/login', authController.getLogin)

// Register page
router.get('/register', authController.getRegister)

// Login user
router.post('/login', authController.login)

// Register user
router.post('/register', authController.register)

// Logout user
router.get('/logout', authController.logout)

module.exports = router
