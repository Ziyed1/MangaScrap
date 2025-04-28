const { createManga, getAllMangas } = require('../models/Manga');
const { uploadCoverImage } = require('../services/uploadService');
const { v4: uuidv4 } = require('uuid');

exports.createManga = async (req, res) => {
  try {
    const { title, description } = req.body;
    const cover = req.file?.path; 

    if (!cover) {
      return res.status(400).json({ message: "Image de couverture requise." });
    }

    const coverUrl = await uploadCoverImage(cover);

    const mangaData = {
      mangaId: uuidv4(),
      title,
      description,
      coverUrl,
    };

    await createManga(mangaData);

    res.status(201).json({ message: "Manga créé avec succès.", manga: mangaData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

exports.getMangas = async (req, res) => {
  try {
    const mangas = await getAllMangas();
    res.status(200).json(mangas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};
