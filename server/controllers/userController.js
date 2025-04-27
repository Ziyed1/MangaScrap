const User = require('../models/User');

// Ajouter un manga aux favoris
exports.addFavorite = async (req, res) => {
    const { mangaId } = req.body;
    try {
        const user = await User.findById(req.user._id);
        if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

        if (!user.favorites.includes(mangaId)) {
            user.favorites.push({ manga: mangaId });
            await user.save();
        }
        res.status(200).json({ message: 'Manga ajouté aux favoris' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
};

// Voir les favoris
exports.getFavorites = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('favorites.manga');
        res.status(200).json(user.favorites);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
};

// Retirer un manga des favoris
exports.removeFavorite = async (req, res) => {
    const { mangaId } = req.body;
    try {
        const user = await User.findById(req.user._id);
        user.favorites = user.favorites.filter(fav => fav.manga.toString() !== mangaId);
        await user.save();
        res.status(200).json({ message: 'Manga retiré des favoris' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
};

// Mettre à jour la progression de lecture
exports.updateReadingProgress = async (req, res) => {
    const { mangaId, currentChapter } = req.body;
    try {
        const user = await User.findById(req.user._id);

        const fav = user.favorites.find(f => f.manga.toString() === mangaId);
        if (fav) {
            fav.currentChapter = currentChapter;
            await user.save();
            res.status(200).json({ message: 'Progression mise à jour' });
        } else {
            res.status(404).json({ message: 'Manga pas trouvé dans les favoris' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
};
