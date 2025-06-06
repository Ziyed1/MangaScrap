const express = require('express');
const app = express();
const authRoutes = require('./routes/auth');
require('dotenv').config();
const connectDB = require('./config/dynamo');
const mangaRoutes = require('./routes/mangaRoutes');
const userMangaRoutes = require('./routes/userMangaRoutes');

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/mangas', mangaRoutes);
app.use('/api/favorites', userMangaRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));