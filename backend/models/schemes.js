const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// User schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    created_at: { type: Date, default: Date.now }
  });
  
  const User = mongoose.model('User', userSchema);
  
  // Comic schema
  const comicSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    pages: [{
      page_number: { type: Number },
      panel_number: { type: Number },
      image: [{ type: Buffer }],
      dialogue: [{ type: String }]
    }],
    created_at: { type: Date, default: Date.now },
    character_description: [{ type: String }]
  });
  
const Comic = mongoose.model('Comic', comicSchema);

module.exports = User, Comic;