const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const mangaRoutes = require('./routes/mangaRoutes');
const connectDB = require('./utils/db');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/userRoutes');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json()); // pour parser le JSON

// Connexion DB
connectDB();

// Routes
app.use('/api/manga', mangaRoutes);

app.use('/api/auth', authRoutes);

app.use('/api/user', userRoutes);

// Serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));