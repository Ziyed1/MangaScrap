const mongoose = require('mongoose');

const mangaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  coverImage: { type: String },
  status: { type: String, enum: ['En cours', 'Terminé'], default: 'En cours' },
  chapters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chapter' }],
}, { timestamps: true });

module.exports = mongoose.model('Manga', mangaSchema);