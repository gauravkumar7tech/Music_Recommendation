const express = require('express')
const router = express.Router()
const musicController = require('../controllers/musicController')

// Home page - show all music
router.get('/', musicController.getAllMusic)

// Get music by genre
router.get('/genre/:genre', musicController.getMusicByGenre)

// Add music form
router.get('/add', musicController.getAddMusicForm)

// Add music
router.post('/add', musicController.addMusic)

// Random suggestion
router.get('/random', musicController.getRandomSuggestion)

module.exports = router