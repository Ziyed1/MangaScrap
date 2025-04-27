const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');

// Toutes les routes protégées par JWT
router.post('/addFavorite', protect, userController.addFavorite);
router.get('/favorites', protect, userController.getFavorites);
router.delete('/removeFavorite', protect, userController.removeFavorite);
router.patch('/updateReadingProgress', protect, userController.updateReadingProgress);

module.exports = router;
