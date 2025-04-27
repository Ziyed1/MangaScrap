const Manga = require('../models/Manga');
const User = require('../models/User');

// Simuler une recherche de manga
const searchManga = async (req, res) => {
  const { title } = req.query;
  try {
    // Rechercher en base
    const mangas = await Manga.find({ title: { $regex: title, $options: 'i' } });
    res.json(mangas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Ajouter à mes lectures
const addFavorite = async (req, res) => {
  const { username, mangaId } = req.body;
  try {
    let user = await User.findOne({ username });
    if (!user) {
      user = new User({ username, favorites: [] });
    }
    if (!user.favorites.includes(mangaId)) {
      user.favorites.push(mangaId);
      await user.save();
    }
    res.json({ message: 'Manga ajouté à tes lectures !' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Voir mes lectures
const getFavorites = async (req, res) => {
  const { username } = req.query;
  try {
    const user = await User.findOne({ username }).populate('favorites');
    res.json(user.favorites);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  searchManga,
  addFavorite,
  getFavorites
};
