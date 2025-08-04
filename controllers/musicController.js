const Music = require('../models/Music')

const musicController = {
  // Get all music
  getAllMusic: async (req, res) => {
    try {
      const music = await Music.find().sort({ createdAt: -1 })
      res.render('index', { music })
    } catch (error) {
      res.status(500).render('error', { error: error.message })
    }
  },

  // Get music by genre
  getMusicByGenre: async (req, res) => {
    try {
      const { genre } = req.params
      const music = await Music.find({ 
        genre: new RegExp(genre, 'i') 
      }).sort({ createdAt: -1 })
      res.render('genre-suggestions', { music, genre: genre.charAt(0).toUpperCase() + genre.slice(1) })
    } catch (error) {
      res.status(500).render('error', { error: error.message })
    }
  },

  // Add new music form
  getAddMusicForm: (req, res) => {
    res.render('add-music')
  },

  // Add new music
  addMusic: async (req, res) => {
    try {
      const music = new Music(req.body)
      await music.save()
      res.redirect('/')
    } catch (error) {
      res.status(400).render('add-music', { error: error.message })
    }
  },

  // Get random music suggestion
  getRandomSuggestion: async (req, res) => {
    try {
      const count = await Music.countDocuments()
      if (count === 0) {
        return res.render('random-suggestion', { music: null })
      }
      const random = Math.floor(Math.random() * count)
      const music = await Music.findOne().skip(random)
      res.render('random-suggestion', { music })
    } catch (error) {
      res.status(500).render('error', { error: error.message })
    }
  }
}

module.exports = musicController
