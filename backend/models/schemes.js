const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Panel schema
const panelSchema = new mongoose.Schema({
  page_number: { type: Number },
  panel_number: { type: Number },
  image: { type: Buffer },
  dialogue: [{ type: String }]
});

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
  panels: [panelSchema],
  created_at: { type: Date, default: Date.now },
  character_description: [{ type: String }],
  comic_prompt: { type: String }
});
  
const Panel = mongoose.model('Panel', panelSchema);
const Comic = mongoose.model('Comic', comicSchema);

module.exports = { User, Comic, Panel };