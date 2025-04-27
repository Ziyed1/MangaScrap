const express = require('express');
const router = express.Router();
const { searchManga, addFavorite, getFavorites } = require('../controllers/mangaController');

// Chercher un manga
router.get('/search', searchManga);

// Ajouter un manga à mes lectures
router.post('/add', addFavorite);

// Voir mes lectures
router.get('/favorites', getFavorites);

module.exports = router;
