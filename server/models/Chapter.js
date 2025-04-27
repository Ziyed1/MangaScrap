const mongoose = require('mongoose');

const chapterSchema = new mongoose.Schema({
  manga: { type: mongoose.Schema.Types.ObjectId, ref: 'Manga', required: true },
  number: { type: Number, required: true },
  title: { type: String },
  images: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model('Chapter', chapterSchema);
