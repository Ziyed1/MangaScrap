const express = require('express');
const router = express.Router();
const userMangaController = require('../controllers/userMangaController');

router.post('/', userMangaController.addFavorite);
router.get('/:userId', userMangaController.getFavorites);
router.patch('/:userId/:mangaId', userMangaController.updateProgress);

module.exports = router;