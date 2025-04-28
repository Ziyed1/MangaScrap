const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  favorites: [{
    manga: { type: mongoose.Schema.Types.ObjectId, ref: 'Manga' },
    currentChapter: { type: Number, default: 1 }
}]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
