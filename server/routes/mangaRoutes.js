const express = require('express');
const router = express.Router();
const mangaController = require('../controllers/mangaController');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' }); 

router.post('/', upload.single('cover'), mangaController.createManga);
router.get('/', mangaController.getMangas);

module.exports = router;
