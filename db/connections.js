// requirements: import mongoose
const mongoose = require('mongoose')

// Connect to a local database called "the-donut-shop"
mongoose.connect('mongodb://localhost/Project-2')
  .then(() => {
    // When it connects, then console.log "Connected to MongoDB"
    console.log('Connected to MongoDB')
  })
  .catch((e) => {
    console.log('OH NO AN ERROR EVERYONE PANIC')
    console.log(e)
  })



// export your mongoose connection
module.exports = mongoose