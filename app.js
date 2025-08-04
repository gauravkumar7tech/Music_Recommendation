const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const musicRoutes = require('./routes/musicRoutes')

const app = express()
const port = 3000

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/musicsuggestion', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// Set view engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// Middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.use('/', musicRoutes)

app.listen(port, () => {
  console.log(`Music suggestion app listening on port ${port}`)
})

