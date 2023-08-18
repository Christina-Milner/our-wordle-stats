const mongoose = require('mongoose')

const EntrySchema = new mongoose.Schema({
    num: { type: Number, unique: true },
    christina: Number,
    fet: Number,
    cStarter: String,
    fStarter: String,
    solution: String
  })

  module.exports = mongoose.model('Entry', EntrySchema)